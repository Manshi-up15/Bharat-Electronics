import { NextResponse } from "next/server";
import { deleteGalleryItem } from "../../../../lib/models";
import { verifyRequestAuth } from "../../../../lib/auth";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const auth = await verifyRequestAuth(request);
  if (!auth || auth.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const result = await deleteGalleryItem(id);
  return NextResponse.json({ deletedCount: result.deletedCount });
}
