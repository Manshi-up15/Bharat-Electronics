import { getProducts, getCategories } from "../../lib/models";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await getProducts();
  const categories = await getCategories();
  const baseUrl = process.env.SITE_URL || "http://localhost:3000";

  const urls = [
    "",
    "products",
    "gallery",
    "contact"
  ].map((p) => `${baseUrl}/${p}`);

  const productUrls = products.map((p) => `${baseUrl}/products/${p.id}`);
  const categoryUrls = categories.map((c) => `${baseUrl}/categories/${c.slug}`);

  const all = [...urls, ...productUrls, ...categoryUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${all
      .map(
        (url) =>
          `<url><loc>${url}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`
      )
      .join("\n")}
  </urlset>`;

  return new NextResponse(xml, { headers: { "Content-Type": "application/xml" } });
}
