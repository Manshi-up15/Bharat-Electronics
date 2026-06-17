import { NextResponse } from "next/server";
import { getCategoryBySlug, updateCategory, deleteCategory } from "../../../../lib/models";
import { verifyRequestAuth } from "../../../../lib/auth";
import { categorySchema } from "../../../../lib/validation";
import { sanitizeObject } from "../../../../lib/sanitize";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }
  return NextResponse.json(category);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const auth = await verifyRequestAuth(request);
  if (!auth || auth.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const existing = await getCategoryBySlug(slug);
  if (!existing || !existing.id) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }
  const bodyRaw = await request.json();
  const body = sanitizeObject(bodyRaw);
  const parsed = categorySchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid category data", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const updated = await updateCategory(existing.id, parsed.data);
  return NextResponse.json(updated);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const auth = await verifyRequestAuth(request);
  if (!auth || auth.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const existing = await getCategoryBySlug(slug);
  if (!existing || !existing.id) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }
  const result = await deleteCategory(existing.id);
  return NextResponse.json({ deletedCount: result.deletedCount });
}
