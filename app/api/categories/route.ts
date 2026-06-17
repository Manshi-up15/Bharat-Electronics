import { NextResponse } from "next/server";
import { getCategories, createCategory } from "../../../lib/models";
import { verifyRequestAuth } from "../../../lib/auth";
import { categorySchema } from "../../../lib/validation";
import { sanitizeObject } from "../../../lib/sanitize";

export async function GET() {
  const categories = await getCategories();
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const auth = await verifyRequestAuth(request);
  if (!auth || auth.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const bodyRaw = await request.json();
  const body = sanitizeObject(bodyRaw);
  const parsed = categorySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid category data", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const category = await createCategory(parsed.data);
  return NextResponse.json(category);
}
