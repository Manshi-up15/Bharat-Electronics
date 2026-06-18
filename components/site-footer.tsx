import type { Settings } from "../lib/types";
import { MapPin } from "lucide-react";

interface SiteFooterProps {
  settings?: Settings | null;
}

export default function SiteFooter({ settings }: SiteFooterProps) {
  const title = settings?.businessName || "Bharat Electronics";
  const phone = settings?.phone || "9119789307";
  const email = settings?.email || "amanmzn251316@gmail.com";
  const instagram = settings?.instagram || "@aman_saini____0001";
  const address = settings?.address || "Petrol Pump ke samne , bahupura road, morna, UP";
  const googleMapsUrl = settings?.googleMapsUrl || "https://maps.app.goo.gl/fadZjypYkkhuhC9G6";

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 lg:flex-row lg:justify-between">
        <div className="max-w-sm">
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="mt-2 text-sm">Quality electrical and electronics solutions for local customers.</p>
          <div className="mt-6">
            <a 
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
            >
              <MapPin className="h-4 w-4 text-amber-500" />
              Visit Our Store
            </a>
            <p className="mt-3 text-sm leading-6 text-slate-400">{address}</p>
          </div>
        </div>
        <div className="space-y-2 text-sm lg:text-right">
          <p>Phone: {phone}</p>
          <p>Email: {email}</p>
          <p>Instagram: {instagram}</p>
        </div>
      </div>
    </footer>
  );
}
