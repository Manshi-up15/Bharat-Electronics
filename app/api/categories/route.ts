import { NextResponse } from "next/server";
import { getCategories, createCategory } from "../../../lib/models";
import { verifyRequestAuth } from "../../../lib/auth";
import { categorySchema } from "../../../lib/validation";
import { sanitizeObject } from "../../../lib/sanitize";
import { verifyCsrfToken } from "../../../lib/csrf";

export async function GET() {
  const categories = await getCategories();
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
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

  const bodyRaw = await request.json();
  const body = sanitizeObject(bodyRaw);
  const parsed = categorySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }
  const category = await createCategory(parsed.data as any);
  return NextResponse.json(category);
}
