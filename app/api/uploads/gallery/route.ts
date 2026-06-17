import { NextResponse } from "next/server";
import { uploadDataUri } from "../../../../lib/cloudinary";
import { createGalleryItem } from "../../../../lib/models";
import { verifyRequestAuth } from "../../../../lib/auth";
import { verifyCsrfToken } from "../../../../lib/csrf";
import { sanitizeInput } from "../../../../lib/sanitize";
import type { GalleryItem } from "../../../../lib/types";

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

  const form = await request.formData();
  const files = form.getAll("file") as unknown as File[];
  const folder = (form.get("folder") as string) || "bharat-electronics/gallery";
  const title = sanitizeInput((form.get("title") as string) || "");

  if (!files || files.length === 0) {
    return NextResponse.json({ error: "No files provided" }, { status: 400 });
  }

  try {
    const created: GalleryItem[] = [];
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString("base64");
      const dataUri = `data:${file.type};base64,${base64}`;
      const result = await uploadDataUri(dataUri, { folder });
      const item = await createGalleryItem({ imageUrl: result.secure_url, publicId: result.public_id, title });
      created.push(item);
    }
    return NextResponse.json(created);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
