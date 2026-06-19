"use client";
import React, { useEffect, useMemo, useState } from "react";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import Link from "next/link";
import type { Product, Category } from "../../../../lib/types";

export default function AdminProductsPage() {
  const [items, setItems] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load products");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch {
      setCategories([]);
    }
  }

  const filtered = useMemo(() => {
    if (!items) return [];
    return items.filter((p) => {
      if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
      if (category && p.categoryId !== category) return false;
      return true;
    });
  }, [items, query, category]);

  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  async function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return;
    const prev = items || [];
    setItems(prev.filter((p) => p.id !== id));
    toast.promise(
      fetch(`/api/products/${id}`, { method: "DELETE" }).then((r) => r.json()),
      {
        loading: "Deleting...",
        success: "Product deleted",
        error: "Delete failed"
      }
    ).catch(() => {
      setItems(prev);
    });
  }

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Products</h1>
        <Link
          href="/admin/products/create"
          className="rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-slate-950 dark:text-slate-50 hover:bg-amber-400 transition"
        >
          + Add Product
        </Link>
      </div>

      {items && items.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-12 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">No products yet. Start by adding your first product.</p>
          <Link
            href="/admin/products/create"
            className="rounded-full bg-amber-500 px-6 py-2 text-sm font-semibold text-slate-950 dark:text-slate-50 hover:bg-amber-400 transition"
          >
            + Add First Product
          </Link>
        </div>
      ) : (
        <>
          <div className="flex gap-3">
            <input
              placeholder="Search products..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 px-3 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value); setPage(1); }}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <tr className="text-left text-slate-600 dark:text-slate-400">
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Price (₹)</th>
                  <th className="px-4 py-3 font-semibold">Availability</th>
                  <th className="px-4 py-3 font-semibold">Featured</th>
                  <th className="px-4 py-3 font-semibold">New</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((p) => (
                  <tr key={p.id} className="border-t border-slate-100 hover:bg-slate-50 dark:bg-slate-800/50">
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">{p.name}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{p.categoryName || "—"}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{p.price ?? 0}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                        p.availability === "In Stock"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}>
                        {p.availability || "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-amber-500">{p.featured ? "★" : ""}</td>
                    <td className="px-4 py-3">{p.isNewArrival ? <span className="inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">New</span> : ""}</td>
                    <td className="px-4 py-3 text-right flex gap-3 justify-end">
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="text-amber-600 font-medium hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id || "")}
                        className="text-red-600 font-medium hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
            <div>Page {page} / {totalPages}</div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((s) => Math.max(1, s - 1))}
                disabled={page === 1}
                className="rounded-lg border border-slate-200 dark:border-slate-800 px-3 py-1 disabled:opacity-40"
              >
                Prev
              </button>
              <button
                onClick={() => setPage((s) => Math.min(totalPages, s + 1))}
                disabled={page === totalPages}
                className="rounded-lg border border-slate-200 dark:border-slate-800 px-3 py-1 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
