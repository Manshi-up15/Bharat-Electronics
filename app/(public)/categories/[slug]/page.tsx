import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getProducts } from "../../../../lib/models";

export default async function CategoryPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category || !category.id) {
    notFound();
  }

  const allProducts = await getProducts();
  const products = allProducts.filter((p) => p.categoryId === category.id);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Category</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">{category.name}</h1>
        <p className="max-w-3xl text-sm leading-7 text-slate-600">Browse our collection of {category.name} products.</p>
      </div>
      
      {products.length === 0 ? (
        <div className="mt-10 py-12 text-center text-slate-500">
          No products found in this category.
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article key={product.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">
              {product.images && product.images.length > 0 ? (
                <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                  <Image src={product.images[0].url} alt={product.name} fill className="object-cover" />
                </div>
              ) : (
                <div className="h-64 bg-slate-100" />
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-slate-900">{product.name}</h2>
                <p className="mt-2 text-sm text-slate-600">Availability: {product.availability}</p>
                <Link href={`/products/${product.id}`} className="mt-5 inline-flex rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-400 transition">View Details</Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
