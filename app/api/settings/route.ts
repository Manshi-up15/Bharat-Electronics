import { NextResponse } from "next/server";
import { getSettings, upsertSettings } from "../../../lib/models";
import { verifyRequestAuth } from "../../../lib/auth";

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json(settings || {});
}

export async function POST(request: Request) {
  const auth = await verifyRequestAuth(request);
  if (!auth || auth.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const settings = await upsertSettings(body);
  return NextResponse.json(settings);
}
