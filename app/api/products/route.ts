import { NextResponse } from "next/server";
import { getProducts, createProduct } from "../../../lib/models";
import { verifyRequestAuth } from "../../../lib/auth";
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
  const bodyRaw = await request.json();
  const body = sanitizeObject(bodyRaw);
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid product data", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const product = await createProduct(
    parsed.data as unknown as Parameters<typeof createProduct>[0]
  );
  return NextResponse.json(product);
}
