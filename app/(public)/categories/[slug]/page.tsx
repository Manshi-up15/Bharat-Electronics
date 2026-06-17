import Link from "next/link";

interface CategoryData {
  slug: string;
  title: string;
  description: string;
}

const category: CategoryData = {
  slug: "wires",
  title: "Electrical Wires",
  description: "High-quality electrical wires for residential and commercial installations."
};

const products = [
  { id: "1", name: "Premium Electrical Wire", availability: "In Stock" },
  { id: "2", name: "Flexible Copper Wire", availability: "In Stock" }
];

export default function CategoryPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Category</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">{category.title}</h1>
        <p className="max-w-3xl text-sm leading-7 text-slate-600">{category.description}</p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article key={product.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="h-44 rounded-3xl bg-slate-100" />
            <h2 className="mt-5 text-xl font-semibold text-slate-900">{product.name}</h2>
            <p className="mt-3 text-sm text-slate-600">Availability: {product.availability}</p>
            <Link href={`/products/${product.id}`} className="mt-5 inline-flex rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950">View Details</Link>
          </article>
        ))}
      </div>
    </main>
  );
}
