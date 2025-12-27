import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to admin/company
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "mangomultimediacompany@gmail.com", // Your company email
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #111; border-bottom: 2px solid #111; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 10px 0;"><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <p style="margin: 10px 0;"><strong>Company:</strong> ${company || "Not provided"}</p>
          </div>
          
          <div style="background: #f8f8f8; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Message:</strong></p>
            <p style="margin: 10px 0; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>This email was sent from your website contact form.</p>
          </div>
        </div>
      `,
    });

    // Auto-reply to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for contacting Mango Multimedia",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #111;">Thank You for Reaching Out!</h2>
          
          <p>Hi ${name},</p>
          
          <p>We've received your message and appreciate you taking the time to contact us.</p>
          
          <p>Our team will review your inquiry and get back to you within 24-48 hours.</p>
          
          <div style="background: #f8f8f8; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Your message:</strong></p>
            <p style="margin: 10px 0; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p>In the meantime, feel free to reach us at:</p>
          <ul style="list-style: none; padding: 0;">
            <li>📞 +91 8652286252</li>
            <li>📞 +91 8652286072</li>
            <li>✉️ mangomultimediacompany@gmail.com</li>
          </ul>
          
          <p>Best regards,<br>
          <strong>Mango Multimedia Team</strong></p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>GR 01, Aasra Building, Gulmohar Lane, Chunabhatti, Mumbai, Maharashtra 400022</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out! We'll get back to you soon.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}