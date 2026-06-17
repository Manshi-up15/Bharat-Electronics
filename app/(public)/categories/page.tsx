import Link from "next/link";
import Image from "next/image";
import { getCategories } from "../../../lib/models";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Categories</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Explore product categories</h1>
        <p className="max-w-2xl text-sm leading-7 text-slate-600">Browse categories and open dedicated product collections for every electrical need.</p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.slug} href={`/categories/${category.slug}`} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
            {category.image ? (
              <div className="relative h-48 w-full overflow-hidden rounded-3xl">
                <Image src={category.image.url} alt={category.name} fill className="object-cover transition group-hover:scale-105" />
              </div>
            ) : (
              <div className="h-48 rounded-3xl bg-slate-100"></div>
            )}
            <h2 className="mt-6 text-2xl font-semibold text-slate-900 group-hover:text-amber-600">{category.name}</h2>
          </Link>
        ))}
      </div>
    </main>
  );
}
