import { NextResponse } from "next/server";
import { getCategories, createCategory } from "../../../lib/models";
import { verifyRequestAuth } from "../../../lib/auth";

export async function GET() {
  const categories = await getCategories();
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const auth = await verifyRequestAuth(request);
  if (!auth || auth.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const category = await createCategory(body);
  return NextResponse.json(category);
}
