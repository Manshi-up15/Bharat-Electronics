import Link from "next/link";

const products = [
  { id: "1", name: "Premium Electrical Wire", category: "Electrical Wires", availability: "In Stock" },
  { id: "2", name: "Smart LED Bulb", category: "LED Bulbs", availability: "In Stock" }
];

export default function AdminProductsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Product Management</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Manage your products</h1>
        </div>
        <Link href="/admin/products/new" className="rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950">Add Product</Link>
      </div>
      <div className="mt-8 space-y-4">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">{product.name}</h2>
              <p className="text-sm text-slate-600">Category: {product.category}</p>
              <p className="text-sm text-slate-600">Availability: {product.availability}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={`/admin/products/${product.id}`} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-900">Edit</Link>
              <button className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
