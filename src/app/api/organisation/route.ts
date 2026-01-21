import dbConfig from "@/middlewares/db.config";
import Organisation from "@/model/Organisation.model";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function GET(req: NextRequest) {
  const serachParams = req.nextUrl.searchParams;
  const id = serachParams.get("id");
  if (!id) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }
  try {
    const organisations = await Organisation.find({ owner: id });
    return NextResponse.json({ organisations }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
