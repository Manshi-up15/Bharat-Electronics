import { NextResponse } from "next/server";
import { upsertSettings } from "../../../lib/models";
import { verifyRequestAuth } from "../../../lib/auth";
import { verifyCsrfToken } from "../../../lib/csrf";
import { sanitizeObject } from "../../../lib/sanitize";
import { settingsSchema } from "../../../lib/validation";

export async function PUT(request: Request) {
  const auth = await verifyRequestAuth(request);
  if (!auth || auth.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cookie = request.headers.get("cookie") || "";
  const match = cookie.match(/csrfToken=([^;]+)/);
  const cookieToken = match ? match[1] : null;
  const headerToken = request.headers.get("x-csrf-token") || undefined;
  if (!verifyCsrfToken(cookieToken || undefined, headerToken)) {
    return NextResponse.json({ error: "CSRF verification failed" }, { status: 403 });
  }

  const bodyRaw = await request.json();
  const body = sanitizeObject(bodyRaw);
  const parsed = settingsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid settings data" }, { status: 400 });
  }

  const settings = await upsertSettings(parsed.data);
  return NextResponse.json(settings);
}
