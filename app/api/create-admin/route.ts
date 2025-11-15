import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";
import bcrypt from "bcrypt";

export async function GET() {
  try {
    await connectDB();

    const email = "admin@gmail.com";       // CHANGE IF YOU WANT
    const password = "Admin@123";          // CHANGE IF YOU WANT

    const hashed = await bcrypt.hash(password, 10);

    const exists = await Admin.findOne({ email });
    if (exists) {
      return NextResponse.json({ message: "Admin already exists" });
    }

    await Admin.create({
      email,
      password: hashed,
    });

    return NextResponse.json({
      message: "Admin created successfully!",
      login: { email, password },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
