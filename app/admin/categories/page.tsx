"use client";
import React, { useEffect, useMemo, useState } from "react";
import Loading from "../../../components/Loading";
import EmptyState from "../../../components/EmptyState";
import Link from "next/link";
import toast from "react-hot-toast";

function getCsrf() { const m = document.cookie.match(/(^|;)\s*csrfToken=([^;]+)/); return m ? decodeURIComponent(m[2]) : null; }

export default function AdminCategoriesPage() {
  const [items, setItems] = useState<any[] | null>(null);
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
    } catch (e) {
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
    } catch (e: any) {
      setItems(prev);
      toast.error(e.message || "Delete failed");
    }
  }

  if (loading) return <Loading />;
  if (!items || items.length === 0) return <EmptyState message="No categories yet." />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <Link href="/admin/categories/create" className="rounded bg-amber-500 px-4 py-2 text-white">Add Category</Link>
      </div>

      <div className="flex gap-3">
        <input placeholder="Search categories" value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} className="rounded border px-3 py-2" />
      </div>

      <table className="w-full table-auto">
        <thead>
          <tr className="text-left"><th>Name</th><th>Slug</th><th></th></tr>
        </thead>
        <tbody>
          {pageItems.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="py-3">{c.name}</td>
              <td>{c.slug}</td>
              <td className="text-right">
                <Link href={`/admin/categories/${c.slug}/edit`} className="mr-2 text-amber-600">Edit</Link>
                <button onClick={() => handleDelete(c.slug)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between">
        <div>Page {page} / {totalPages}</div>
        <div className="flex gap-2">
          <button onClick={() => setPage((s) => Math.max(1, s - 1))} disabled={page === 1} className="rounded border px-3 py-1">Prev</button>
          <button onClick={() => setPage((s) => Math.min(totalPages, s + 1))} disabled={page === totalPages} className="rounded border px-3 py-1">Next</button>
        </div>
      </div>
    </div>
  );
}
