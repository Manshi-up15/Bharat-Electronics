"use client";
import React, { useEffect, useState } from "react";
import { categorySchema } from "../../lib/validation";
import { sanitizeObject } from "../../lib/sanitize";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Category, ImageResource } from "../../lib/types";

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

export default function CategoryForm({ category }: { category?: Category }) {
  const [name, setName] = useState(category?.name || "");
  const [slug, setSlug] = useState(category?.slug || "");
  const [image, setImage] = useState<ImageResource | null>(category?.image || null);
  const [newFile, setNewFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => { if (!category) setSlug(slugify(name)); }, [name, category]);

  async function uploadFile(): Promise<ImageResource | null> {
    if (!newFile) return null;
    const form = new FormData();
    form.append("file", newFile);
    form.append("folder", "bharat-electronics/categories");
    const res = await fetch("/api/uploads/product-images", { method: "POST", body: form });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Image upload failed");
    }
    const data = await res.json();
    return data[0] || null;
  }

  async function handleRemoveImage() {
    if (!image?.publicId) return setImage(null);
    try {
      const res = await fetch("/api/uploads/image-delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId: image.publicId })
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Image removed");
      setImage(null);
    } catch {
      toast.error("Failed to remove image");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    
    try {
      let uploadedImage = image;
      if (newFile) {
        const uploaded = await uploadFile();
        if (uploaded) uploadedImage = uploaded;
      }

      const bodyRaw = { name, slug, image: uploadedImage || undefined };
      const body = sanitizeObject(bodyRaw);
      const parsed = categorySchema.safeParse(body);
      if (!parsed.success) { 
        throw new Error("Validation failed: " + parsed.error.issues.map(i => i.message).join(", "));
      }

      if (category && category.slug) {
        const res = await fetch(`/api/categories/${category.slug}`, { 
          method: "PUT", 
          headers: { "Content-Type": "application/json" }, 
          body: JSON.stringify(parsed.data) 
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Update failed");
        }
        toast.success("Category updated");
        router.push("/admin/categories");
      } else {
        const res = await fetch(`/api/categories`, { 
          method: "POST", 
          headers: { "Content-Type": "application/json" }, 
          body: JSON.stringify(parsed.data) 
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Create failed");
        }
        const created = await res.json();
        toast.success("Category created");
        router.push(`/admin/categories/${created.slug}/edit`);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Save failed";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block text-sm font-semibold text-slate-700">Name
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded border px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-amber-400" />
      </label>
      <label className="block text-sm font-semibold text-slate-700">Slug
        <input value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full rounded border px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-amber-400" />
      </label>
      
      {image && (
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Current Image</label>
          <div className="relative w-32">
            <Image
              src={image.url}
              alt="Category image"
              width={128}
              height={128}
              className="h-32 w-full object-cover rounded border"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewFile(e.target.files?.[0] || null)}
          className="block text-sm text-slate-600 dark:text-slate-400"
        />
      </div>

      <div className="flex gap-2 pt-4">
        <button type="submit" disabled={saving} className="rounded bg-amber-500 px-4 py-2 text-white font-semibold disabled:opacity-50">
          {saving ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={() => router.back()} className="rounded border px-4 py-2 font-semibold">Cancel</button>
      </div>
    </form>
  );
}
