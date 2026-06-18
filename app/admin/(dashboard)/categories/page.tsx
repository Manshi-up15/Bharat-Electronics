"use client";
import React, { useEffect, useMemo, useState } from "react";
import Loading from "@/components/Loading";
import EmptyState from "../../../../components/EmptyState";
import toast from "react-hot-toast";
import Link from "next/link";
import type { Category } from "../../../../lib/types";

function getCsrf() { const m = document.cookie.match(/(^|;)\s*csrfToken=([^;]+)/); return m ? decodeURIComponent(m[2]) : null; }

export default function AdminCategoriesPage() {
  const [items, setItems] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setItems(data || []);
    } catch {
      toast.error("Failed to load categories");
      setItems([]);
    } finally { setLoading(false); }
  }

  const filtered = useMemo(() => {
    if (!items) return [];
    return items.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));
  }, [items, query]);

  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  async function handleDelete(slug: string) {
    if (!confirm("Delete this category?")) return;
    const prev = items || [];
    setItems(prev.filter((c) => c.slug !== slug));
    try {
      const res = await fetch(`/api/categories/${slug}`, { method: "DELETE", headers: { "x-csrf-token": String(getCsrf()) } });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Category deleted");
    } catch (e) {
      setItems(prev);
      const message = e instanceof Error ? e.message : "Delete failed";
      toast.error(message);
    }
  }

  if (loading) return <Loading />;
  if (!items || items.length === 0) return <EmptyState message="No categories yet." />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Categories</h1>
        <Link href="/admin/categories/create" className="rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-slate-950 dark:text-slate-50 hover:bg-amber-400 transition">Add Category</Link>
      </div>

      <div className="flex gap-3">
        <input placeholder="Search categories" value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-amber-400" />
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <table className="w-full table-auto text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
            <tr className="text-left text-slate-600 dark:text-slate-400">
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Slug</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((c) => (
              <tr key={c.id} className="border-t border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">{c.name}</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{c.slug}</td>
                <td className="px-4 py-3 text-right flex gap-3 justify-end">
                  <Link href={`/admin/categories/${c.slug}/edit`} className="text-amber-600 font-medium hover:underline">Edit</Link>
                  <button onClick={() => handleDelete(c.slug)} className="text-red-600 font-medium hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
        <div>Page {page} / {totalPages}</div>
        <div className="flex gap-2">
          <button onClick={() => setPage((s) => Math.max(1, s - 1))} disabled={page === 1} className="rounded-lg border border-slate-200 dark:border-slate-800 px-3 py-1 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition">Prev</button>
          <button onClick={() => setPage((s) => Math.min(totalPages, s + 1))} disabled={page === totalPages} className="rounded-lg border border-slate-200 dark:border-slate-800 px-3 py-1 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition">Next</button>
        </div>
      </div>
    </div>
  );
}
