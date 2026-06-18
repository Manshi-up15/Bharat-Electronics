import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="space-y-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 shadow-sm">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Admin Dashboard</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">Owner control panel</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">Securely manage products, categories, gallery, and website content from a protected admin page.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/admin/products" className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-6 text-center transition hover:bg-slate-100 dark:bg-slate-800">Products</Link>
          <Link href="/admin/categories" className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-6 text-center transition hover:bg-slate-100 dark:bg-slate-800">Categories</Link>
          <Link href="/admin/gallery" className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-6 text-center transition hover:bg-slate-100 dark:bg-slate-800">Gallery</Link>
          <Link href="/admin/settings" className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-6 text-center transition hover:bg-slate-100 dark:bg-slate-800">Settings</Link>
        </div>
      </div>
    </main>
  );
}
