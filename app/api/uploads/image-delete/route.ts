import { NextResponse } from "next/server";
import cloudinary from "../../../../lib/cloudinary";
import { deleteGalleryItem } from "../../../../lib/models";
import { verifyRequestAuth } from "../../../../lib/auth";

export async function DELETE(request: Request) {
  const auth = await verifyRequestAuth(request);
  if (!auth || auth.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const { publicId, galleryId } = body;
  if (!publicId) {
    return NextResponse.json({ error: "publicId required" }, { status: 400 });
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    if (galleryId) {
      await deleteGalleryItem(galleryId);
    }
    return NextResponse.json({ result });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
