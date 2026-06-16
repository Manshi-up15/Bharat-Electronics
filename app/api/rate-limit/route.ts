import { NextResponse } from "next/server";
import { tooManyRequests } from "../../../lib/rateLimiter";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
  if (tooManyRequests(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  return NextResponse.json({ ok: true });
}
