import { getSettings } from "../../../lib/models";
import { MapPin } from "lucide-react";

export default async function ContactPage() {
  const settings = await getSettings();
  const phone = settings?.phone || "9119789307";
  const email = settings?.email || "amanmzn251316@gmail.com";
  const instagram = settings?.instagram || "@aman_saini____0001";
  const address = settings?.address || "Petrol Pump ke samne , bahupura road, morna, UP";
  const googleMapsUrl = settings?.googleMapsUrl || "https://maps.app.goo.gl/fadZjypYkkhuhC9G6";

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Contact</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">Contact {settings?.businessName || "Bharat Electronics"}</h1>
        <p className="max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-400">Send us a message with your product inquiry and we will respond promptly.</p>
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_0.7fr]">
        <form className="space-y-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Name</span>
              <input type="text" className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm text-slate-900 dark:text-slate-50" placeholder="Your name" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Phone</span>
              <input type="tel" className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm text-slate-900 dark:text-slate-50" placeholder={phone} />
            </label>
          </div>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Email</span>
            <input type="email" className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm text-slate-900 dark:text-slate-50" placeholder={email} />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Message</span>
            <textarea rows={5} className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm text-slate-900 dark:text-slate-50" placeholder="How can we help?" />
          </label>
          <button type="submit" className="rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 dark:text-slate-50">Submit Message</button>
        </form>

          <div className="space-y-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Business Information</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-50">Get in touch</h2>
            </div>
            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-50">Phone</p>
                <p>{phone}</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-50">Email</p>
                <p className="break-all">{email}</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-50">Instagram</p>
                <p>{instagram}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Find Us</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-50">Visit Our Store</h2>
            </div>
            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-50">Address</p>
                <p className="leading-6">{address}</p>
              </div>
            </div>
            <a 
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm font-semibold text-slate-900 dark:text-slate-50 transition hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <MapPin className="h-4 w-4 text-amber-500" />
              Open in Google Maps
            </a>
          </div>
        </div>
    </main>
  );
}
