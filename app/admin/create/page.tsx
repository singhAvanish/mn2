"use client";

import { useState } from "react";

export default function CreateAdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    const res = await fetch("/api/create-admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMsg("❌ " + data.error);
    } else {
      setMsg("✅ Admin created successfully!");
      setEmail("");
      setPassword("");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create First Admin
        </h1>

        <p className="text-sm text-gray-600 mb-4">
          ⚠ This page will only work if no admin exists.
        </p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full p-3 border rounded"
              value={email}
              placeholder="admin@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full p-3 border rounded"
              value={password}
              placeholder="Strong password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-800"
          >
            {loading ? "Processing..." : "Create Admin"}
          </button>
        </form>

        {msg && (
          <p className="mt-4 text-center text-sm font-semibold">{msg}</p>
        )}
      </div>
    </div>
  );
}
