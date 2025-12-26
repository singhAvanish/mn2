import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/jwt";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;

  // ALL PUBLIC ADMIN ROUTES
  const publicPaths = [
    "/admin/login",
    "/admin/reset-password",
    "/admin/verify-otp",
    "/admin/create" // ⭐ allow first admin creation
  ];

  const pathname = req.nextUrl.pathname;

  // If route is public → allow
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // If route starts with /admin → apply protection
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    const valid = verifyToken(token);
    if (!valid) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
