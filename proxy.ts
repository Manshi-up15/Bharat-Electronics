import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { tooManyRequests } from "./lib/rateLimiter";

function decodeJwt(token: string) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payloadPart = parts[1];
    let base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }
    const jsonStr = atob(base64);
    return JSON.parse(jsonStr);
  } catch (e) {
    return null;
  }
}

export function proxy(req: NextRequest) {
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

    const payload = decodeJwt(token);
    if (!payload || payload.role !== "admin" || (payload.exp && payload.exp < Date.now() / 1000)) {
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
