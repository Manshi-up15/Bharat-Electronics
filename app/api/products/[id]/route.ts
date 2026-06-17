import { NextResponse } from "next/server";
import { getProductById, updateProduct, deleteProduct } from "../../../../lib/models";
import { verifyRequestAuth } from "../../../../lib/auth";
import { productSchema } from "../../../../lib/validation";
import { sanitizeObject } from "../../../../lib/sanitize";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const product = await getProductById(id);
    if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;  
  const auth = await verifyRequestAuth(request);
  if (!auth || auth.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const cleaned = sanitizeObject(body);
  const parsed = productSchema.partial().safeParse(cleaned);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid product data" }, { status: 400 });
  }
  const updated = await updateProduct(id, parsed.data as unknown as Parameters<typeof updateProduct>[1]);
  if (!updated) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }
  return NextResponse.json(updated);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;  
  const auth = await verifyRequestAuth(request);
  if (!auth || auth.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const result = await deleteProduct(id);
  return NextResponse.json({ deletedCount: result.deletedCount });
}
