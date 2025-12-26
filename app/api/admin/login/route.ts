import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";
import bcrypt from "bcrypt";
import { generateToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }
const AdminModel = Admin as any;
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    const ok = await bcrypt.compare(password, admin.password);
    if (!ok) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    // create JWT
    const token = generateToken({ id: admin._id.toString(), email });

    // set cookie
    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (err) {
    console.error("LOGIN API ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
