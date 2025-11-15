'use client';
import { signIn } from "next-auth/react";
import { useState } from "react";


export default function Login() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');


return (
<div className="flex items-center justify-center h-screen">
<form
onSubmit={(e) => {
e.preventDefault();
signIn('credentials', { email, password, callbackUrl: '/admin/dashboard' });
}}
className="p-6 bg-gray-100 rounded-lg shadow-md w-96"
>
<h1 className="text-xl font-bold mb-4">Admin Login</h1>
<input className="input" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
<input className="input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
<button className="btn w-full mt-4">Login</button>
</form>
</div>
);
}