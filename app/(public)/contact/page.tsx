import { getSettings } from "../../../lib/models";

export default async function ContactPage() {
  const settings = await getSettings();
  const phone = settings?.phone || "9119789307";
  const email = settings?.email || "amanmzm251316@gmail.com";
  const instagram = settings?.instagram || "@aman_saini____0001";

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Contact</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Contact {settings?.businessName || "Bharat Electronics"}</h1>
        <p className="max-w-3xl text-sm leading-7 text-slate-600">Send us a message with your product inquiry and we will respond promptly.</p>
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_0.7fr]">
        <form className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Name</span>
              <input type="text" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" placeholder="Your name" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Phone</span>
              <input type="tel" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" placeholder={phone} />
            </label>
          </div>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Email</span>
            <input type="email" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" placeholder={email} />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Message</span>
            <textarea rows={5} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" placeholder="How can we help?" />
          </label>
          <button type="submit" className="rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950">Submit Message</button>
        </form>

        <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Business Information</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Get in touch</h2>
          </div>
          <div className="space-y-4 text-sm text-slate-600">
            <div>
              <p className="font-semibold text-slate-900">Phone</p>
              <p>{phone}</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Email</p>
              <p>{email}</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Instagram</p>
              <p>{instagram}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
