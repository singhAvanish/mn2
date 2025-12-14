import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, otp, newPassword } = await req.json();

    if (!email || !otp || !newPassword) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    // find admin
const AdminModel = Admin as any;
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return NextResponse.json(
        { error: "Admin not found" },
        { status: 404 }
      );
    }

    // OTP must match and not expired
    if (admin.resetOtp !== otp || admin.resetOtpExpiry < Date.now()) {
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    // update password
    const hashed = await bcrypt.hash(newPassword, 10);
    admin.password = hashed;
    admin.resetOtp = null;
    admin.resetOtpExpiry = null;

    await admin.save();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("RESET ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
