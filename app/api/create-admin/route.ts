import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    await connectDB();

    const adminCount = await Admin.countDocuments();

    // ❗ Allow only the FIRST admin to be created
    if (adminCount >= 1) {
      return NextResponse.json(
        { error: "Admin already exists. Cannot create more." },
        { status: 403 }
      );
    }

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      email,
      password: hashed,
    });

    return NextResponse.json(
      { success: true, message: "Admin created successfully", admin },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
