import { NextResponse } from "next/server";
import { upsertSettings } from "../../../lib/models";
import { verifyRequestAuth } from "../../../lib/auth";
import { sanitizeObject } from "../../../lib/sanitize";
import { settingsSchema } from "../../../lib/validation";

export async function PUT(request: Request) {
  const auth = await verifyRequestAuth(request);
  if (!auth || auth.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
