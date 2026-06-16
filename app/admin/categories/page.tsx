export default function AdminCategoriesPage() {
  const categories = [
    { id: "1", name: "Electrical Wires" },
    { id: "2", name: "LED Bulbs" }
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Category Management</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Manage categories</h1>
          </div>
          <button className="rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950">Add Category</button>
        </div>
        <div className="mt-8 space-y-4">
          {categories.map((category) => (
            <div key={category.id} className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-lg font-semibold text-slate-900">{category.name}</p>
              <div className="flex gap-3">
                <button className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900">Edit</button>
                <button className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
