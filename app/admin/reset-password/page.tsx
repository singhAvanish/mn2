"use client";

import { useState } from "react";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");

  async function reset() {
    const res = await fetch("/api/admin/reset-password", {
      method: "POST",
      body: JSON.stringify({ newPassword })
    });

    if (res.ok) {
      alert("Password updated — please login");
      window.location.href = "/admin/login";
    }
  }

  return (
    <div>
      <h1>Reset Password</h1>
      <input type="password" placeholder="new password" onChange={e => setNewPassword(e.target.value)} />
      <button onClick={reset}>Update Password</button>
    </div>
  );
}
