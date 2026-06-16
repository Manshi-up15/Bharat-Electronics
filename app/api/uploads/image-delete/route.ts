import { NextResponse } from "next/server";
import cloudinary, { destroy } from "../../../../lib/cloudinary";
import { deleteGalleryItem, removeImageFromProducts } from "../../../../lib/models";
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
    const result = await destroy(publicId);
    if (galleryId) {
      await deleteGalleryItem(galleryId);
    }
    await removeImageFromProducts(publicId);
    return NextResponse.json({ result });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
