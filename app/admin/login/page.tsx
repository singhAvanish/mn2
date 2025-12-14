// "use client";

// import { signIn } from "next-auth/react";
// import { useState } from "react";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   async function handleSubmit(e) {
//     e.preventDefault();

//     const result = await signIn("credentials", {
//       redirect: false,
//       email,
//       password,
//     });

//     console.log("SIGNIN RESULT:", result);

//     if (result?.error) {
//       alert("Invalid email or password");
//       return;
//     }

//     // SUCCESS — redirect manually
//     window.location.href = "/admin/dashboard";
//   }

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <form
//         onSubmit={handleSubmit}
//         className="p-6 bg-gray-100 rounded-lg shadow-md w-96"
//       >
//         <h1 className="text-xl font-bold mb-4">Admin Login</h1>

//         <input
//           className="input"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           className="input"
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button className="btn w-full mt-4">Login</button>
//       </form>
//     </div>
//   );
// }
// "use client";

// import { signIn } from "next-auth/react";
// import { useState } from "react";

// export default function AdminLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const submit = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
//   setError("");
//   setLoading(true);

//   const result = await signIn("credentials", {
//     redirect: false,
//     email,
//     password,
//   });

//   if (result?.error) {
//     setError("Invalid credentials");
//     setLoading(false);
//     return;
//   }

//   window.location.href = "/admin/dashboard";
// };


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
//       <form
//         onSubmit={submit}
//         className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
//       >
//         <h2 className="text-2xl font-semibold text-center mb-6">
//           Admin Login
//         </h2>

//         {/* Email */}
//         <input
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           type="email"
//           required
//           className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
//         />

//         {/* Password */}
//         <input
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           type="password"
//           required
//           className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
//         />

//         {/* Error */}
//         {error && (
//           <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
//         )}

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition font-medium disabled:opacity-50"
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit() {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });

    if (res.ok) window.location.href = "/admin/dashboard";
    else alert("Invalid login");
  }

  return (
    <div>
      <h1>Admin Login</h1>
      <input placeholder="email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={submit}>Login</button>

      <a href="/admin/reset-password">Forgot password?</a>
    </div>
  );
}
