import { NextRequest, NextResponse } from "next/server";
import excel from "exceljs";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import archiver from "archiver";
import path from "path";
import fs from "fs";
import Certificate from "@/model/Certificate.model";
import jwt from "jsonwebtoken";
import dbConfig from "@/middlewares/db.config";

import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

dbConfig();

interface RecipientData {
  name: excel.CellValue;
  email: excel.CellValue;
  department: excel.CellValue;
  cgpa?: excel.CellValue;
  prn?: excel.CellValue;
  date: Date;
  certificateId?: string;
  verificationLink?: string;
  mongoId?: string;
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect("/login");
  }
  const data = jwt.verify(token, process.env.JWT_SECRET!);
  if (!data) {
    return NextResponse.redirect("/login");
  }
  const formData = await req.formData();
  const excelFile = formData.get("excelFile") as File;
  const certificateTemplate = formData.get("certificateTemplate") as File;
  const title = formData.get("title");
  const description = formData.get("description");
  const issuingOrganisation = formData.get("issuingOrganisation");
  const issuedOn = formData.get("issuedOn");
  const category = formData.get("category");

  if (
    !excelFile ||
    !certificateTemplate ||
    !issuingOrganisation ||
    !title ||
    !description ||
    !category ||
    !issuedOn
  ) {
    return NextResponse.json(
      { message: "Please fill all the fields" },
      { status: 400 }
    );
  }

  const tmpDir = path.join(process.cwd(), "tmp");
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }

  const excelFilePath = path.join(tmpDir, excelFile.name);
  const certificateTemplatePath = path.join(tmpDir, certificateTemplate.name);

  await fs.promises.writeFile(
    excelFilePath,
    Buffer.from(await excelFile.arrayBuffer())
  );
  await fs.promises.writeFile(
    certificateTemplatePath,
    Buffer.from(await certificateTemplate.arrayBuffer())
  );

  const generatedCertificatesPath = path.join(tmpDir, "certificates");
  deleteFolderRecursive(generatedCertificatesPath);
  fs.mkdirSync(generatedCertificatesPath, { recursive: true });

  try {
    const workbook = new excel.Workbook();
    await workbook.xlsx.readFile(excelFilePath);
    const worksheet = workbook.getWorksheet(1);
    const recipients: RecipientData[] = [];
    const certificateData = [];

    for (const row of worksheet.getRows(2, worksheet.rowCount - 1)) {
      const recipientData: RecipientData = {
        name: row.getCell(1).value,
        email: row.getCell(2).value || "",
        department: row.getCell(3).value || "",
        cgpa: row.getCell(4).value || "",
        prn: row.getCell(5).value || "",
      };
      recipientData.certificateId = await generateNextCertificateID();
      recipientData.verificationLink = `${req.nextUrl.origin}/verify?id=${recipientData.certificateId}`;
      const newCertificate = await Certificate.create({
        issuer: data.id,
        certificateId: recipientData.certificateId,
        issuingOrganisation,
        issuedTo: recipientData,
        certificateDetails: { title, description, category },
        issuedOn,
      });
      certificateData.push({
        id: recipientData.certificateId,
        mongoId: newCertificate._id,
      });

      recipients.push({
        certificateId: recipientData.certificateId,
        mongoId: newCertificate._id,
        name: recipientData.name,
        date: new Date(issuedOn as string).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        verificationLink: recipientData.verificationLink,
        email: recipientData.email,
        department: recipientData.department,
        cgpa: recipientData.cgpa,
        prn: recipientData.prn,
      });
    }

    for (const recipientData of recipients) {
      try {
        const zip = new PizZip(fs.readFileSync(certificateTemplatePath));
        const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
        });
        console.log("Generating Certificate for:", recipientData.name);
        doc.render(recipientData);
        const docxBuffer = doc
          .getZip()
          .generate({ type: "nodebuffer", compression: "DEFLATE" });

        const docxFilePath = path.join(
          generatedCertificatesPath,
          `${(recipientData?.name as string).trim().split(" ").join("_")}.docx`
        );
        fs.writeFileSync(docxFilePath, docxBuffer);
        const pythonScriptPath = "python/docx-to-pdf.py";
        await execAsync(
          `py -3.12 ${pythonScriptPath} ${(recipientData?.name as string)
            .trim()
            .split(" ")
            .join("_")}.docx`
        );
        fs.unlinkSync(docxFilePath);
      } catch (error) {
        console.error("Error generating certificate:", error);
      }
    }

    const zipPath = path.join("public", "generated.zip");
    await createZip(generatedCertificatesPath, zipPath);
    deleteFolderRecursive(generatedCertificatesPath);
    fs.unlinkSync(excelFilePath);
    fs.unlinkSync(certificateTemplatePath);
    return NextResponse.json(
      {
        message: "Certificates generated successfully",
        path: zipPath,
        certificateData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { message: "Error generating certificates" },
      { status: 500 }
    );
  }
}

async function generateNextCertificateID(): Promise<string> {
  const latestCertificate = await Certificate.findOne({}, { certificateId: 1 })
    .sort({ certificateId: -1 })
    .lean();
  if (!latestCertificate) {
    return "A000-0000-0000-0001";
  }

  const lastId = (latestCertificate as any).certificateId!;
  const match = lastId.match(/^A(\d{3})-(\d{4})-(\d{4})-(\d{4})$/);
  if (!match) throw new Error("Invalid certificate ID format");

  let [_, part1, part2, part3, part4] = match.map(Number);
  part4 += 1;
  if (part4 > 9999) {
    part4 = 0;
    part3 += 1;
  }
  if (part3 > 9999) {
    part3 = 0;
    part2 += 1;
  }
  if (part2 > 9999) {
    part2 = 0;
    part1 += 1;
  }
  if (part1 > 999) throw new Error("ID limit exceeded");

  return `A${part1.toString().padStart(3, "0")}-${part2
    .toString()
    .padStart(4, "0")}-${part3.toString().padStart(4, "0")}-${part4
    .toString()
    .padStart(4, "0")}`;
}

function createZip(folderPath: string, zipFilePath: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => resolve(true));
    archive.on("error", (err) => reject(err));

    archive.pipe(output);
    archive.directory(folderPath, false);
    archive.finalize();
  });
}

function deleteFolderRecursive(folderPath: string) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file);
      fs.lstatSync(curPath).isDirectory()
        ? deleteFolderRecursive(curPath)
        : fs.unlinkSync(curPath);
    });
    fs.rmdirSync(folderPath);
  }
}
