export default function GalleryPage() {
  const items = Array.from({ length: 8 }, (_, index) => ({ id: index + 1, title: `Gallery image ${index + 1}` }));

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Gallery</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Real shop & product photos</h1>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="h-52 bg-slate-100" />
            <div className="p-4">
              <p className="text-sm font-semibold text-slate-900">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
