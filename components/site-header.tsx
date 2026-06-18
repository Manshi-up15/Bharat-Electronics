import Link from "next/link";
import type { Settings } from "../lib/types";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

interface SiteHeaderProps {
  settings?: Settings | null;
}

export default function SiteHeader({ settings }: SiteHeaderProps) {
  const title = settings?.businessName || "Bharat Electronics";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold text-slate-900 dark:text-slate-50">{title}</Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-600 dark:text-slate-300 transition hover:text-slate-900 dark:hover:text-slate-50">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/admin/login" className="rounded-full bg-amber-500 hover:bg-amber-600 transition-colors px-4 py-2 text-sm font-semibold text-slate-950">Admin</Link>
        </div>
      </div>
    </header>
  );
}
