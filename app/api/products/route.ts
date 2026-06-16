import { NextResponse } from "next/server";
import { getProducts, createProduct } from "../../../lib/models";
import { verifyRequestAuth } from "../../../lib/auth";
import { generateCsrfToken, verifyCsrfToken } from "../../../lib/csrf";

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
  const body = await request.json();
  const product = await createProduct(body);
  return NextResponse.json(product);
}
