import { NextResponse } from "next/server";
import { getProductById, updateProduct, deleteProduct } from "../../../../lib/models";
import { verifyRequestAuth } from "../../../../lib/auth";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const product = await getProductById(params.id);
  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const auth = await verifyRequestAuth(request);
  if (!auth || auth.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const updated = await updateProduct(params.id, body);
  if (!updated) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }
  return NextResponse.json(updated);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const auth = await verifyRequestAuth(request);
  if (!auth || auth.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const result = await deleteProduct(params.id);
  return NextResponse.json({ deletedCount: result.deletedCount });
}
