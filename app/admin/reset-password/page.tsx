"use client";

import { useState } from "react";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState<1 | 2>(1);

  async function requestOtp() {
    const res = await fetch("/api/admin/request-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (!res.ok) return alert(data.error);

    setStep(2);
    alert("OTP sent to email");
  }

  async function resetPassword() {
    const res = await fetch("/api/admin/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, newPassword }),
    });

    const data = await res.json();
    if (!res.ok) return alert(data.error);

    alert("Password updated. Login again.");
    window.location.href = "/admin/login";
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>

      {step === 1 && (
        <>
          <input
            className="border p-2 w-full mb-3"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={requestOtp}
            className="bg-black text-white px-4 py-2 w-full"
          >
            Send OTP
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            className="border p-2 w-full mb-3"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <input
            type="password"
            className="border p-2 w-full mb-3"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            onClick={resetPassword}
            className="bg-black text-white px-4 py-2 w-full"
          >
            Update Password
          </button>
        </>
      )}
    </div>
  );
}
