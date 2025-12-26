import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const AdminModel = Admin as any;
    const admin = await AdminModel.findOne({ email });

    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    admin.otp = otp;
    admin.otpExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    await admin.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: admin.email,
      subject: "Admin Password Reset OTP",
      text: `Your OTP is ${otp}. It expires in 10 minutes.`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("REQUEST OTP ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
