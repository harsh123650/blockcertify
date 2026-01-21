import User from "@/model/User.model";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const { user } = await req.json();
  try {
    await User.updateOne({ _id: user._id }, user);
    return NextResponse.json({
      message: "Profile updated successfully!",
      user,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred while updating the profile!" },
      { status: 500 }
    );
  }
}
