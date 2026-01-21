import dbConfig from "@/middlewares/db.config";
import User from "@/model/User.model";
import { User as UserType } from "@/types/User";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "No token found" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET!) as UserType;
    if (!data) {
      return NextResponse.json({ error: "Invalid token" });
    }
    if (data.role === "admin") {
      return NextResponse.json({ user: data }, { status: 200 });
    }
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }
    return NextResponse.json({ user, status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err }, { status: 401 });
  }
}
