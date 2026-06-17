import { NextResponse } from "next/server";
import { getProducts, createProduct } from "../../../lib/models";
import { verifyRequestAuth } from "../../../lib/auth";
import { verifyCsrfToken } from "../../../lib/csrf";
import { productSchema } from "../../../lib/validation";
import { sanitizeObject } from "../../../lib/sanitize";

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const auth = await verifyRequestAuth(request);
  if (!auth || auth.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // simple CSRF protection: expect header x-csrf-token matching cookie
  const cookie = request.headers.get("cookie") || "";
  const match = cookie.match(/csrfToken=([^;]+)/);
  const cookieToken = match ? match[1] : null;
  const headerToken = request.headers.get("x-csrf-token");
  if (!verifyCsrfToken(cookieToken || undefined, headerToken || undefined)) {
    return NextResponse.json({ error: "CSRF verification failed" }, { status: 403 });
  }
  const bodyRaw = await request.json();
  const body = sanitizeObject(bodyRaw);
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid product data" }, { status: 400 });
  }
  const product = await createProduct(parsed.data as unknown as Parameters<typeof createProduct>[0]);
  return NextResponse.json(product);
}
