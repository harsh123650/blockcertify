import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConfig from "@/middlewares/db.config";
import User from "@/model/User.model";

dbConfig();

export async function POST(req: NextRequest) {
  try {
    const { formData } = await req.json();
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.profileImage
    ) {
      return NextResponse.json(
        { message: "Please provide all the required fields" },
        { status: 400 }
      );
    }

    // Validate password length
    if (formData.password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email: formData.email });
    if (userExists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    const hashedPassword = bcrypt.hashSync(formData.password, 10);
    const newUser = new User({
      ...formData,
      password: hashedPassword,
    });

    await newUser.save();
    return NextResponse.json(
      { message: "User created successfully", newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
