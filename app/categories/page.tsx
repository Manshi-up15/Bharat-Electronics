import Link from "next/link";

const categories = [
  { name: "Electrical Wires", slug: "wires" },
  { name: "Switch Boards", slug: "switch-boards" },
  { name: "LED Bulbs", slug: "led-bulbs" },
  { name: "Coolers", slug: "coolers" },
  { name: "Pipes & Fittings", slug: "pipes-fittings" },
  { name: "Fans", slug: "fans" },
  { name: "Electrical Accessories", slug: "accessories" }
];

export default function CategoriesPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Categories</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Explore product categories</h1>
        <p className="max-w-2xl text-sm leading-7 text-slate-600">Browse categories and open dedicated product collections for every electrical need.</p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.slug} href={`/categories/${category.slug}`} className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="h-48 rounded-3xl bg-slate-100"></div>
            <h2 className="mt-6 text-2xl font-semibold text-slate-900">{category.name}</h2>
          </Link>
        ))}
      </div>
    </main>
  );
}
