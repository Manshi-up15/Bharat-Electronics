import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { tooManyRequests } from "./lib/rateLimiter";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin")) {
    // allow unauthenticated access to the login page
    if (pathname === "/admin/login" || pathname === "/admin/login/") {
      return NextResponse.next();
    }
    const token = req.cookies.get("authToken")?.value;
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET || "");
    } catch (e) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  // basic rate limiting by IP for all API routes
  if (pathname.startsWith("/api")) {
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    if (tooManyRequests(String(ip))) {
      return new NextResponse(JSON.stringify({ error: "Too many requests" }), { status: 429 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin"]
};
