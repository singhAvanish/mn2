import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export async function verifyAuth() {
  try {
    const cookieStore = await cookies(); // ✅ FIX: await required
    const token = cookieStore.get("admin_token")?.value;

    if (!token) return null;

    const decoded = verifyToken(token);
    if (!decoded) return null;

    return decoded;
  } catch (err) {
    console.error("Auth error:", err);
    return null;
  }
}
