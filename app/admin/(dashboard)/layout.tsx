import { ReactNode } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "../../../components/logout-button";
import { verifyAuth } from "../../../lib/auth";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const payload = await verifyAuth();
  if (!payload) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800/50">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              Bharat Electronics
            </Link>
            <span className="text-xs font-medium text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
              Admin
            </span>
          </div>
          <nav className="hidden items-center gap-4 md:flex text-sm font-medium text-slate-600 dark:text-slate-400">
            <Link href="/admin" className="hover:text-slate-900 dark:text-slate-50 transition">Dashboard</Link>
            <Link href="/admin/products" className="hover:text-slate-900 dark:text-slate-50 transition">Products</Link>
            <Link href="/admin/categories" className="hover:text-slate-900 dark:text-slate-50 transition">Categories</Link>
            <Link href="/admin/gallery" className="hover:text-slate-900 dark:text-slate-50 transition">Gallery</Link>
            <Link href="/admin/settings" className="hover:text-slate-900 dark:text-slate-50 transition">Settings</Link>
          </nav>
          <LogoutButton />
        </div>
      </header>

      {/* Admin Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {children}
      </main>
    </div>
  );
}
