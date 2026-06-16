import { NextResponse } from "next/server";
import { deleteGalleryItem, getGalleryItem, removeImageFromProducts } from "../../../../lib/models";
import { verifyRequestAuth } from "../../../../lib/auth";
import { verifyCsrfToken } from "../../../../lib/csrf";
import { destroy } from "../../../../lib/cloudinary";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const item = await getGalleryItem(id);
  if (!item) {
    return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
  }
  return NextResponse.json(item);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
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

  const { id } = params;
  const item = await getGalleryItem(id);
  if (!item) {
    return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
  }

  try {
    await destroy(item.publicId);
    await deleteGalleryItem(id);
    await removeImageFromProducts(item.publicId);
    return NextResponse.json({ deletedCount: 1 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
