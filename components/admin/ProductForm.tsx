"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Product, Category, ImageResource } from "../../lib/types";

function getCsrf() {
  const m = document.cookie.match(/(^|;)\s*csrfToken=([^;]+)/);
  return m ? decodeURIComponent(m[2]) : null;
}

export default function ProductForm({ product }: { product?: Product }) {
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(0); // Price from schema if exists or keep visual default
  const [categoryId, setCategoryId] = useState(product?.categoryId || "");
  const [available, setAvailable] = useState<boolean>(product ? (product.availability === "In Stock" || product.availability === "true" || product.availability === "available") : true);
  const [featured, setFeatured] = useState(product?.featured ?? false);
  const [images, setImages] = useState<ImageResource[]>(product?.images || []);
  const [newFiles, setNewFiles] = useState<FileList | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => { fetchCategories(); }, []);

  async function fetchCategories() {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data || []);
  }

  async function uploadFiles(): Promise<ImageResource[]> {
    if (!newFiles || newFiles.length === 0) return [];
    const form = new FormData();
    for (const file of Array.from(newFiles)) form.append("file", file);
    const res = await fetch("/api/uploads/product-images", { method: "POST", body: form });
    return res.json();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !categoryId) {
      toast.error("Name and category required");
      return;
    }

    try {
      const uploads = await uploadFiles();
      const imageObjs = Array.isArray(uploads) ? uploads.concat(images) : images;

      const payload = {
        name,
        description,
        categoryId,
        availability: available ? "In Stock" : "Out of Stock",
        featured,
        images: imageObjs
      };

      if (product && product.id) {
        // optimistic UI handled by parent list page if needed
        const res = await fetch(`/api/products/${product.id}`, { method: "PUT", headers: { "Content-Type": "application/json", "x-csrf-token": String(getCsrf()) }, body: JSON.stringify(payload) });
        if (!res.ok) throw new Error("Update failed");
        toast.success("Product updated");
        router.push("/admin/products");
      } else {
        const res = await fetch(`/api/products`, { method: "POST", headers: { "Content-Type": "application/json", "x-csrf-token": String(getCsrf()) }, body: JSON.stringify(payload) });
        if (!res.ok) throw new Error("Create failed");
        toast.success("Product created");
        router.push("/admin/products");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Save failed";
      toast.error(message);
    }
  }

  async function handleRemoveImage(publicId: string) {
    // optimistic
    const prev = images.slice();
    setImages(images.filter((i) => i.publicId !== publicId));
    try {
      await fetch("/api/uploads/image-delete", { method: "DELETE", headers: { "Content-Type": "application/json", "x-csrf-token": String(getCsrf()) }, body: JSON.stringify({ publicId }) });
      toast.success("Image removed");
    } catch {
      setImages(prev);
      toast.error("Failed to remove image");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">Name<input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded border px-3 py-2" /></label>
      <label className="block">Category<select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full rounded border px-3 py-2">
        <option value="">Select</option>
        {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select></label>
      <label className="block">Description<textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded border px-3 py-2" /></label>
      <div className="flex gap-3">
        <label className="block">Price<input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="rounded border px-3 py-2" /></label>
        <label className="block">Available<select value={String(available)} onChange={(e) => setAvailable(e.target.value === "true")} className="rounded border px-3 py-2"><option value="true">Yes</option><option value="false">No</option></select></label>
        <label className="block">Featured<input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="ml-2" /></label>
      </div>

      <div>
        <label className="block">Existing Images</label>
        <div className="flex gap-2">
          {images.map((img) => (
            <div key={img.publicId || img.url} className="w-24">
              <Image src={img.url} alt="Product image preview" width={96} height={64} className="h-16 w-full object-cover" />
              <button type="button" onClick={() => handleRemoveImage(img.publicId)} className="text-sm text-red-600">Remove</button>
            </div>
          ))}
        </div>
      </div>

      <label>Upload Images<input type="file" multiple onChange={(e) => setNewFiles(e.target.files)} className="block" /></label>

      <div className="flex gap-2">
        <button type="submit" className="rounded bg-amber-500 px-4 py-2 text-white">Save</button>
        <button type="button" onClick={() => history.back()} className="rounded border px-4 py-2">Cancel</button>
      </div>
    </form>
  );
}
