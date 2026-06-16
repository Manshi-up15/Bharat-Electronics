export default function AdminNewProductPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Add a new product</h1>
        <form className="mt-8 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-semibold text-slate-700">
              Product Name
              <input type="text" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" />
            </label>
            <label className="space-y-2 text-sm font-semibold text-slate-700">
              Category
              <input type="text" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" />
            </label>
          </div>
          <label className="space-y-2 text-sm font-semibold text-slate-700">
            Description
            <textarea rows={4} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-semibold text-slate-700">
              Availability
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900">
                <option>In Stock</option>
                <option>Out of Stock</option>
              </select>
            </label>
            <label className="space-y-2 text-sm font-semibold text-slate-700">
              Featured
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900">
                <option>No</option>
                <option>Yes</option>
              </select>
            </label>
          </div>
          <label className="space-y-2 text-sm font-semibold text-slate-700">
            Product Images
            <input type="file" multiple accept="image/png, image/jpeg, image/webp" className="w-full text-sm text-slate-900" />
          </label>
          <button type="submit" className="rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950">Save Product</button>
        </form>
      </div>
    </main>
  );
}
