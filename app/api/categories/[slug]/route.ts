import { NextResponse } from "next/server";
import { getCategoryBySlug, getProducts } from "../../../../lib/models";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const category = await getCategoryBySlug(params.slug);
  if (!category) {
    return NextResponse.json({ error: "Category not found." }, { status: 404 });
  }
  const products = await getProducts();
  const filtered = products.filter((product) => product.categoryId === category.id);
  return NextResponse.json({ ...category, products: filtered });
}
