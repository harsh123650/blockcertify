import dbConfig from "@/middlewares/db.config";
import Certificate from "@/model/Certificate.model";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
  try {
    const certificates = await Certificate.find({ issuer: decoded.id })
      .populate("issuer", "name email")
      .populate("issuingOrganisation", "name");

    return NextResponse.json(certificates);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch certificates" },
      { status: 500 }
    );
  }
}
