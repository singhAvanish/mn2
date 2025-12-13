import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";
import bcrypt from "bcrypt";

export async function GET() {
  try {
    await connectDB();

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      return NextResponse.json(
        { error: "ADMIN_EMAIL or ADMIN_PASSWORD missing in .env" },
        { status: 400 }
      );
    }

    const exists = await Admin.findOne({ email });

    if (exists) {
      return NextResponse.json({ message: "Admin already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await Admin.create({
      email,
      password: hashed,
    });

    return NextResponse.json({ message: "Admin created successfully!" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
