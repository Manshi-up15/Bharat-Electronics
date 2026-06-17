"use client";
import React, { useEffect, useMemo, useState } from "react";
import Loading from "@/components/Loading";
import EmptyState from "../../../components/EmptyState";
import toast from "react-hot-toast";
import Link from "next/link";

function getCsrf() {
  const m = document.cookie.match(/(^|;)\s*csrfToken=([^;]+)/);
  return m ? decodeURIComponent(m[2]) : null;
}

export default function AdminProductsPage() {
  const [items, setItems] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setItems(data || []);
    } catch (e: any) {
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
      setCategories(data || []);
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
    // optimistic
    const prev = items || [];
    setItems(prev.filter((p) => p.id !== id));
    toast.promise(
      fetch(`/api/products/${id}`, { method: "DELETE", headers: { "x-csrf-token": String(getCsrf()) } }).then((r) => r.json()),
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

  if (!items || items.length === 0) return <EmptyState message="No products yet." />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Link href="/admin/products/create" className="rounded bg-amber-500 px-4 py-2 text-white">Add Product</Link>
      </div>

      <div className="flex gap-3">
        <input placeholder="Search" value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} className="rounded border px-3 py-2" />
        <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }} className="rounded border px-3 py-2">
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <table className="w-full table-auto">
        <thead>
          <tr className="text-left">
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Available</th>
            <th>Featured</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {pageItems.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="py-3">{p.name}</td>
              <td>{p.categoryName || "—"}</td>
              <td>{p.price}</td>
              <td>{p.available ? "Yes" : "No"}</td>
              <td>{p.featured ? "★" : ""}</td>
              <td className="text-right">
                <Link href={`/admin/products/${p.id}/edit`} className="mr-2 text-amber-600">Edit</Link>
                <button onClick={() => handleDelete(p.id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between">
        <div>
          Page {page} / {totalPages}
        </div>
        <div className="flex gap-2">
          <button onClick={() => setPage((s) => Math.max(1, s - 1))} disabled={page === 1} className="rounded border px-3 py-1">Prev</button>
          <button onClick={() => setPage((s) => Math.min(totalPages, s + 1))} disabled={page === totalPages} className="rounded border px-3 py-1">Next</button>
        </div>
      </div>
    </div>
  );
}
