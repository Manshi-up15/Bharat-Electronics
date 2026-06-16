import { NextResponse } from "next/server";
import { getGalleryItems, createGalleryItem } from "../../../lib/models";
import { verifyRequestAuth } from "../../../lib/auth";
import { sanitizeObject } from "../../../lib/sanitize";
import { galleryItemSchema } from "../../../lib/validation";
import { generateCsrfToken, verifyCsrfToken } from "../../../lib/csrf";

export async function GET() {
  const gallery = await getGalleryItems();
  return NextResponse.json(gallery);
}

export async function POST(request: Request) {
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
  const parsed = galleryItemSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid gallery data" }, { status: 400 });
  }

  const galleryItem = await createGalleryItem(parsed.data as any);
  return NextResponse.json(galleryItem);
}
