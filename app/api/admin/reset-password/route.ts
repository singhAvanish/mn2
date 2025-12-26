import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, otp, newPassword } = await req.json();

    if (!email || !otp || !newPassword) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const AdminModel = Admin as any;
    const admin = await AdminModel.findOne({ email });

    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    if (
      admin.otp !== otp ||
      !admin.otpExpiresAt ||
      admin.otpExpiresAt < Date.now()
    ) {
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    admin.password = await bcrypt.hash(newPassword, 10);
    admin.otp = null;
    admin.otpExpiresAt = null;

    await admin.save();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("RESET ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
