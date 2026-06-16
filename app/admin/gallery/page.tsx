"use client";

import React, { useEffect, useMemo, useState } from "react";
import Loading from "../../../components/Loading";
import EmptyState from "../../../components/EmptyState";
import toast from "react-hot-toast";
import { GalleryItem } from "../../../lib/types";

function getCsrf() {
  const m = document.cookie.match(/(^|;)\s*csrfToken=([^;]+)/);
  return m ? decodeURIComponent(m[2]) : null;
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [previewItem, setPreviewItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  async function fetchGallery() {
    setLoading(true);
    try {
      const res = await fetch("/api/gallery", { cache: "no-store" });
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Failed to load gallery");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  const filteredItems = useMemo(() => {
    if (!items) return [];
    return items.filter((item) => {
      if (query && !item.title?.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [items, query]);

  const pageSize = 12;
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const pageItems = filteredItems.slice((page - 1) * pageSize, page * pageSize);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedFiles || selectedFiles.length === 0) {
      toast.error("Choose one or more photos to upload.");
      return;
    }

    setUploading(true);
    try {
      const form = new FormData();
      Array.from(selectedFiles).forEach((file) => form.append("file", file));
      form.append("folder", "bharat-electronics/gallery");
      if (title) form.append("title", title);

      const res = await fetch("/api/uploads/gallery", {
        method: "POST",
        headers: {
          "x-csrf-token": String(getCsrf())
        },
        body: form
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Upload failed");
      }

      const created = await res.json();
      const createdItems = Array.isArray(created) ? created : [created];
      setItems((current) => ([...createdItems, ...(current || [])].sort((a, b) => new Date(b.uploadedAt || "").getTime() - new Date(a.uploadedAt || "").getTime())));
      setSelectedFiles(null);
      setTitle("");
      setShowUpload(false);
      toast.success(`Uploaded ${createdItems.length} photo${createdItems.length === 1 ? "" : "s"}`);
    } catch (err: any) {
      toast.error(err.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(item: GalleryItem) {
    if (!confirm("Delete this gallery photo?")) return;
    const prevItems = items || [];
    setItems(prevItems.filter((current) => current.id !== item.id));

    try {
      const res = await fetch("/api/uploads/image-delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": String(getCsrf())
        },
        body: JSON.stringify({ publicId: item.publicId, galleryId: item.id })
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Delete failed");
      }
      toast.success("Photo deleted");
    } catch (err: any) {
      setItems(prevItems);
      toast.error(err.message || "Delete failed");
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Gallery Management</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Manage gallery photos</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">Upload, preview, and remove images from your public gallery.</p>
          </div>
          <button type="button" onClick={() => setShowUpload((open) => !open)} className="rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950">
            {showUpload ? "Hide upload" : "Upload photo"}
          </button>
        </div>

        {showUpload && (
          <form onSubmit={handleUpload} className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-slate-900">Photo title</span>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Optional title for uploaded photos" className="mt-2 w-full rounded border border-slate-200 bg-white px-3 py-2" />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-900">Select files</span>
                <input type="file" multiple accept="image/*" onChange={(e) => setSelectedFiles(e.target.files)} className="mt-2 w-full rounded border border-slate-200 bg-white px-3 py-2" />
              </label>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <button type="submit" disabled={uploading} className="rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 disabled:opacity-50">
                {uploading ? "Uploading..." : "Upload photos"}
              </button>
              <button type="button" onClick={() => { setShowUpload(false); setSelectedFiles(null); setTitle(""); }} className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900">
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Gallery photos</h2>
            <p className="text-sm text-slate-600">{filteredItems.length} photo{filteredItems.length === 1 ? "" : "s"}</p>
          </div>
          <input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} placeholder="Search by title" className="w-full rounded border border-slate-200 bg-white px-4 py-3 shadow-sm sm:w-80" />
        </div>

        {filteredItems.length === 0 ? (
          <div className="mt-8">
            <EmptyState message="No gallery photos yet." />
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pageItems.map((item) => (
              <div key={item.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
                <button type="button" onClick={() => setPreviewItem(item)} className="group block overflow-hidden">
                  <img src={item.imageUrl} alt={item.title || "Gallery photo"} className="h-64 w-full object-cover transition duration-200 group-hover:scale-105" />
                </button>
                <div className="space-y-3 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{item.title || "Untitled photo"}</p>
                      <p className="text-sm text-slate-500">{item.uploadedAt ? new Date(item.uploadedAt).toLocaleDateString() : "Uploaded recently"}</p>
                    </div>
                    <button type="button" onClick={() => handleDelete(item)} className="rounded-full bg-red-500 px-3 py-2 text-xs font-semibold text-white">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex items-center justify-between">
          <div>
            Page {page} of {totalPages}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1} className="rounded border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 disabled:opacity-50">
              Prev
            </button>
            <button onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page === totalPages} className="rounded border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      </div>

      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4">
          <div className="relative max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <button type="button" onClick={() => setPreviewItem(null)} className="absolute right-4 top-4 rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">Close</button>
            <img src={previewItem.imageUrl} alt={previewItem.title || "Gallery preview"} className="h-[70vh] w-full object-contain bg-slate-900" />
            <div className="space-y-2 p-6">
              <h3 className="text-xl font-semibold text-slate-900">{previewItem.title || "Untitled photo"}</h3>
              <p className="text-sm text-slate-600">{previewItem.uploadedAt ? new Date(previewItem.uploadedAt).toLocaleString() : "Uploaded recently"}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
