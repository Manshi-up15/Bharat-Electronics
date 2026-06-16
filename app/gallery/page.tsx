import { getGalleryItems, getSettings } from "../../lib/models";
import type { GalleryItem } from "../../lib/types";

export default async function GalleryPage() {
  const [items, settings] = await Promise.all([getGalleryItems(), getSettings()]);
  const businessName = settings?.businessName || "Bharat Electronics";

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Gallery</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Real shop & product photos</h1>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">Explore installations, product displays, and real work examples from {businessName}.</p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600">
            No gallery photos have been added yet.
          </div>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item: GalleryItem) => (
              <article key={item.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <img src={item.imageUrl} alt={item.title || "Gallery image"} className="h-72 w-full object-cover" />
                <div className="space-y-2 p-4">
                  <h2 className="text-lg font-semibold text-slate-900">{item.title || "Untitled photo"}</h2>
                  <p className="text-sm text-slate-500">{item.uploadedAt ? new Date(item.uploadedAt).toLocaleDateString() : "Published recently"}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
