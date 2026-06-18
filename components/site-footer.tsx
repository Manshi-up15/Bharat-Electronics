import type { Settings } from "../lib/types";

interface SiteFooterProps {
  settings?: Settings | null;
}

export default function SiteFooter({ settings }: SiteFooterProps) {
  const title = settings?.businessName || "Bharat Electronics";
  const phone = settings?.phone || "9119789307";
  const email = settings?.email || "amanmzn251316@gmail.com";
  const instagram = settings?.instagram || "@aman_saini____0001";

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="mt-2 text-sm">Quality electrical and electronics solutions for local customers.</p>
        </div>
        <div className="space-y-2 text-sm">
          <p>Phone: {phone}</p>
          <p>Email: {email}</p>
          <p>Instagram: {instagram}</p>
        </div>
      </div>
    </footer>
  );
}
