import { getGalleryItems, getSettings } from "../../../lib/models";
import type { GalleryItem } from "../../../lib/types";
import Image from "next/image";

export default async function GalleryPage() {
    const [galleryItems, settings] = await Promise.all([
  getGalleryItems(),
  getSettings(),
]);

const items = galleryItems as GalleryItem[];
    const businessName = settings?.businessName || "Bharat Electronics";

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Gallery</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">Real shop & product photos</h1>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">Explore installations, product displays, and real work examples from {businessName}.</p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-slate-50 dark:bg-slate-800/50 p-10 text-center text-slate-600 dark:text-slate-400">
            No gallery photos have been added yet.
          </div>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
                <article key={item.id} className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <Image src={item.imageUrl} alt={item.title || "Gallery image"} width={500} height={350} className="h-72 w-full object-cover" />
                <div className="space-y-2 p-4">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{item.title || "Untitled photo"}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.uploadedAt ? new Date(item.uploadedAt).toLocaleDateString() : "Published recently"}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
