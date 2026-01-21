import User from "@/model/User.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await User.find();
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
