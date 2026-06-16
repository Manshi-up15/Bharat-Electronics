export default function AdminSettingsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Website Content</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Update business information</h1>
          <p className="text-sm leading-7 text-slate-600">Manage shop name, contact details, hero copy, and about section from one place.</p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-semibold text-slate-700">
              Shop Name
              <input type="text" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" />
            </label>
            <label className="space-y-2 text-sm font-semibold text-slate-700">
              Owner Name
              <input type="text" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-semibold text-slate-700">
              Phone Number
              <input type="tel" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" />
            </label>
            <label className="space-y-2 text-sm font-semibold text-slate-700">
              Email Address
              <input type="email" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" />
            </label>
          </div>
          <label className="space-y-2 text-sm font-semibold text-slate-700">
            Instagram Handle
            <input type="text" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" />
          </label>
          <label className="space-y-2 text-sm font-semibold text-slate-700">
            Hero Title
            <input type="text" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" />
          </label>
          <label className="space-y-2 text-sm font-semibold text-slate-700">
            Hero Subtitle
            <textarea rows={3} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" />
          </label>
          <label className="space-y-2 text-sm font-semibold text-slate-700">
            About Section
            <textarea rows={4} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" />
          </label>
          <button type="submit" className="rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950">Save Settings</button>
        </form>
      </div>
    </main>
  );
}
