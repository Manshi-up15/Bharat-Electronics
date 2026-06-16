export default function AdminGalleryPage() {
  const items = Array.from({ length: 6 }, (_, index) => ({ id: index + 1, title: `Gallery Photo ${index + 1}` }));

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Gallery Management</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Manage gallery photos</h1>
          </div>
          <button className="rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950">Upload Photo</button>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="h-48 rounded-3xl bg-slate-100" />
              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="font-semibold text-slate-900">{item.title}</p>
                <div className="flex gap-2">
                  <button className="rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900">Edit</button>
                  <button className="rounded-full bg-red-500 px-3 py-2 text-xs font-semibold text-white">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
