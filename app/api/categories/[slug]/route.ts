import { NextResponse } from "next/server";
import { getCategoryBySlug, getProducts, getCategoryById, updateCategory, deleteCategory } from "../../../../lib/models";
import { verifyRequestAuth } from "../../../../lib/auth";
import { categorySchema } from "../../../../lib/validation";
import { sanitizeObject } from "../../../../lib/sanitize";
import { verifyCsrfToken } from "../../../../lib/csrf";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const category = await getCategoryBySlug(params.slug);
  if (!category) {
    return NextResponse.json({ error: "Category not found." }, { status: 404 });
  }
  const products = await getProducts();
  const filtered = products.filter((product) => product.categoryId === category.id);
  return NextResponse.json({ ...category, products: filtered });
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
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

  const category = await getCategoryBySlug(params.slug);
  if (!category) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const bodyRaw = await request.json();
  const body = sanitizeObject(bodyRaw);
  const parsed = categorySchema.partial().safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  const updated = await updateCategory(category.id as string, parsed.data as any);
  return NextResponse.json(updated);
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
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
  const category = await getCategoryBySlug(params.slug);
  if (!category) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const result = await deleteCategory(category.id as string);
  return NextResponse.json({ deletedCount: result.deletedCount });
}
