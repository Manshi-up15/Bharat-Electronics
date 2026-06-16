import { NextResponse } from "next/server";
import cloudinary from "../../../../lib/cloudinary";
import { createGalleryItem } from "../../../../lib/models";
import { verifyRequestAuth } from "../../../../lib/auth";

export async function POST(request: Request) {
  const auth = await verifyRequestAuth(request);
  if (!auth || auth.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const form = await request.formData();
  const file = form.get("file") as any;
  const folder = form.get("folder") as string | null;
  const title = form.get("title") as string | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString("base64");
  const dataUri = `data:${file.type};base64,${base64}`;

  try {
    const result = await cloudinary.uploader.upload(dataUri, { folder: folder || "bharat-electronics/gallery" });
    const item = await createGalleryItem({ imageUrl: result.secure_url, publicId: result.public_id, title: title || "" });
    return NextResponse.json(item);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
