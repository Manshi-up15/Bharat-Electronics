import { NextResponse } from "next/server";
import { getGalleryItems, createGalleryItem } from "../../../lib/models";
import { verifyRequestAuth } from "../../../lib/auth";

export async function GET() {
  const gallery = await getGalleryItems();
  return NextResponse.json(gallery);
}

export async function POST(request: Request) {
  const auth = await verifyRequestAuth(request);
  if (!auth || auth.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const galleryItem = await createGalleryItem(body);
  return NextResponse.json(galleryItem);
}
