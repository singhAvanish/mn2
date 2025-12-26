import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },

  // OTP Feature
  otp: { type: String, default: null },
  otpExpiresAt: { type: Date, default: null }
});

// Prevent OverwriteModelError
export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
