import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Allow login page without redirect
  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  // Protect ALL other /admin routes
  if (pathname.startsWith("/admin")) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}
