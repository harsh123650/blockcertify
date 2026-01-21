import dbConfig from "@/middlewares/db.config";
import Organisation from "@/model/Organisation.model";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function POST(req: NextRequest) {
  const { newOrganisation, owner } = await req.json();
  try {
    const organisation = new Organisation({
      ...newOrganisation,
      owner,
    });
    await organisation.save();
    return NextResponse.json(
      { message: "Organisation Added" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
