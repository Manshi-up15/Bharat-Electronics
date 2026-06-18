"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Product, Category, ImageResource } from "../../lib/types";

export default function ProductForm({ product }: { product?: Product }) {
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price ?? 0);
  const [categoryId, setCategoryId] = useState(product?.categoryId || "");
  const [available, setAvailable] = useState<boolean>(
    product
      ? product.availability === "In Stock" ||
          product.availability === "true" ||
          product.availability === "available"
      : true
  );
  const [featured, setFeatured] = useState(product?.featured ?? false);
  const [images, setImages] = useState<ImageResource[]>(product?.images || []);
  const [newFiles, setNewFiles] = useState<FileList | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch {
      setCategories([]);
    }
  }

  async function uploadFiles(): Promise<ImageResource[]> {
    if (!newFiles || newFiles.length === 0) return [];
    const form = new FormData();
    for (const file of Array.from(newFiles)) form.append("file", file);
    const res = await fetch("/api/uploads/product-images", { method: "POST", body: form });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Image upload failed");
    }
    return res.json();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Product name is required");
      return;
    }
    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }

    setSaving(true);
    try {
      let uploads: ImageResource[] = [];
      if (newFiles && newFiles.length > 0) {
        uploads = await uploadFiles();
      }
      const imageObjs = [...uploads, ...images];

      const payload = {
        name: name.trim(),
        description: description.trim(),
        price: Number(price) || 0,
        categoryId,
        availability: available ? "In Stock" : "Out of Stock",
        featured,
        images: imageObjs
      };

      const url = product?.id ? `/api/products/${product.id}` : `/api/products`;
      const method = product?.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Request failed with status ${res.status}`);
      }

      toast.success(product?.id ? "Product updated successfully!" : "Product created successfully!");
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Save failed";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  async function handleRemoveImage(publicId: string) {
    const prev = images.slice();
    setImages(images.filter((i) => i.publicId !== publicId));
    try {
      const res = await fetch("/api/uploads/image-delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId })
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Image removed");
    } catch {
      setImages(prev);
      toast.error("Failed to remove image");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Product Name <span className="text-red-500">*</span>
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          placeholder="Enter product name"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          <option value="">-- Select a category --</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          placeholder="Enter product description"
        />
      </div>

      <div className="flex gap-4 flex-wrap">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Price (₹)</label>
          <input
            type="number"
            min={0}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="rounded border border-slate-300 px-3 py-2 text-sm w-36 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Availability</label>
          <select
            value={String(available)}
            onChange={(e) => setAvailable(e.target.value === "true")}
            className="rounded border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <option value="true">In Stock</option>
            <option value="false">Out of Stock</option>
          </select>
        </div>
        <div className="flex items-end pb-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 accent-amber-500"
            />
            Featured Product
          </label>
        </div>
      </div>

      {images.length > 0 && (
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Current Images</label>
          <div className="flex gap-3 flex-wrap">
            {images.map((img) => (
              <div key={img.publicId || img.url} className="relative w-24">
                <Image
                  src={img.url}
                  alt="Product image"
                  width={96}
                  height={64}
                  className="h-16 w-full object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(img.publicId)}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Upload Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setNewFiles(e.target.files)}
          className="block text-sm text-slate-600 dark:text-slate-400"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-amber-500 px-6 py-2 text-sm font-semibold text-slate-950 dark:text-slate-50 disabled:opacity-60"
        >
          {saving ? "Saving..." : product?.id ? "Update Product" : "Create Product"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-full border border-slate-300 px-6 py-2 text-sm font-semibold text-slate-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
