import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Admin Dashboard</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Owner control panel</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">Securely manage products, categories, gallery, and website content from a protected admin page.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/admin/products" className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center transition hover:bg-slate-100">Products</Link>
          <Link href="/admin/categories" className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center transition hover:bg-slate-100">Categories</Link>
          <Link href="/admin/gallery" className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center transition hover:bg-slate-100">Gallery</Link>
          <Link href="/admin/settings" className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center transition hover:bg-slate-100">Settings</Link>
        </div>
      </div>
    </main>
  );
}
