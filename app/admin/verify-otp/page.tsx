"use client";

import { useState } from "react";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");

  async function verify() {
    const res = await fetch("/api/admin/verify-otp", {
      method: "POST",
      body: JSON.stringify({ otp })
    });

    if (res.ok) window.location.href = "/admin/reset-password";
    else alert("Invalid OTP");
  }

  return (
    <div>
      <h1>Enter OTP</h1>
      <input onChange={e => setOtp(e.target.value)} />
      <button onClick={verify}>Verify</button>
    </div>
  );
}
