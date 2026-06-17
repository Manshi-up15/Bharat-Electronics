import Link from "next/link";
import Image from "next/image";
import { getSettings, getProducts } from "../../../lib/models";

export default async function ProductsPage() {
  const settings = await getSettings();
  const phone = settings?.phone || "9119789307";
  const products = await getProducts();

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Products</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Browse our collection</h1>
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article key={product.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">
            {product.images && product.images.length > 0 ? (
              <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                <Image src={product.images[0].url} alt={product.name} fill className="object-cover" />
              </div>
            ) : (
              <div className="h-60 bg-slate-100" />
            )}
            <div className="space-y-4 p-6">
              <div className="flex items-center justify-between text-sm uppercase tracking-[0.3em] text-amber-500">
                <span>{product.categoryName || "Product"}</span>
                <span>{product.availability}</span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">{product.name}</h2>
                {product.price !== undefined && product.price > 0 && (
                  <p className="mt-2 text-lg font-bold text-slate-900">
                    {Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(product.price)}
                  </p>
                )}
                <p className="mt-3 text-sm leading-7 text-slate-600 line-clamp-2">{product.description}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={`/products/${product.id}`} className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-400">View Details</Link>
                <a href={`tel:${phone}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">Contact for Price</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
