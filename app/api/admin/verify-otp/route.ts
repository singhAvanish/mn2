import { NextResponse } from "next/server";
import Admin from "@/lib/models/Admin";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  await connectDB();
  const { otp } = await req.json();

  const admin = await Admin.findOne();
  if (!admin) return NextResponse.json({ error: "Admin not found" }, { status: 404 });

  if (admin.otp !== otp || admin.otpExpiresAt < new Date()) {
    return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 401 });
  }

  admin.otp = null;
  await admin.save();

  return NextResponse.json({ success: true });
}
