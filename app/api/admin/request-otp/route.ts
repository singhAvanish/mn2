import { NextResponse } from "next/server";
import Admin from "@/lib/models/Admin";
import { connectDB } from "@/lib/mongodb";
import nodemailer from "nodemailer";

export async function POST() {
  await connectDB();

  const admin = await Admin.findOne();
  if (!admin) return NextResponse.json({ error: "Admin not found" }, { status: 404 });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = new Date(Date.now() + 10 * 60 * 1000);

  admin.otp = otp;
  admin.otpExpiresAt = expiry;
  await admin.save();

  // EMAIL TRANSPORT
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    to: admin.email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It expires in 10 minutes.`
  });

  return NextResponse.json({ success: true });
}
