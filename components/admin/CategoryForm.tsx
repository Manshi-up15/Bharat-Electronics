"use client";
import React, { useEffect, useState } from "react";
import { categorySchema } from "../../lib/validation";
import { sanitizeObject } from "../../lib/sanitize";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

function getCsrf() { const m = document.cookie.match(/(^|;)\s*csrfToken=([^;]+)/); return m ? decodeURIComponent(m[2]) : null; }

export default function CategoryForm({ category }: { category?: any }) {
  const [name, setName] = useState(category?.name || "");
  const [slug, setSlug] = useState(category?.slug || "");
  const router = useRouter();

  useEffect(() => { if (!category) setSlug(slugify(name)); }, [name]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const bodyRaw = { name, slug };
    const body = sanitizeObject(bodyRaw);
    const parsed = categorySchema.safeParse(body);
    if (!parsed.success) { toast.error("Validation failed"); return; }

    try {
      if (category && category.slug) {
        const res = await fetch(`/api/categories/${category.slug}`, { method: "PUT", headers: { "Content-Type": "application/json", "x-csrf-token": String(getCsrf()) }, body: JSON.stringify(parsed.data) });
        if (!res.ok) throw new Error("Update failed");
        toast.success("Category updated");
        router.push("/admin/categories");
      } else {
        const res = await fetch(`/api/categories`, { method: "POST", headers: { "Content-Type": "application/json", "x-csrf-token": String(getCsrf()) }, body: JSON.stringify(parsed.data) });
        if (!res.ok) throw new Error("Create failed");
        const created = await res.json();
        toast.success("Category created");
        // optimistic navigation to edit
        router.push(`/admin/categories/${created.slug}/edit`);
      }
    } catch (e: any) {
      toast.error(e.message || "Save failed");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">Name<input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded border px-3 py-2" /></label>
      <label className="block">Slug<input value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full rounded border px-3 py-2" /></label>
      <div className="flex gap-2">
        <button type="submit" className="rounded bg-amber-500 px-4 py-2 text-white">Save</button>
        <button type="button" onClick={() => history.back()} className="rounded border px-4 py-2">Cancel</button>
      </div>
    </form>
  );
}
