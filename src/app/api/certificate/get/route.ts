import dbConfig from "@/middlewares/db.config";
import Certificate from "@/model/Certificate.model";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { message: "Invalid Certificate ID" },
      { status: 400 }
    );
  }
  try {
    const certificate = await Certificate.findOne({ _id: id })
      .populate("issuer")
      .populate("issuingOrganisation");
    if (!certificate) {
      return NextResponse.json(
        { message: "Certificate Not Found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Certificate Not Found", certificate: certificate },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error Fetching Certificate" },
      { status: 500 }
    );
  }
}
