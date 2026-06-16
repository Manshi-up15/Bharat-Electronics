import Link from "next/link";
import { getSettings } from "../lib/models";

const categories = [
  { name: "Electrical Wires", href: "/categories/wires" },
  { name: "Switch Boards", href: "/categories/switch-boards" },
  { name: "LED Bulbs", href: "/categories/led-bulbs" },
  { name: "Coolers", href: "/categories/coolers" },
  { name: "Pipes & Fittings", href: "/categories/pipes-fittings" },
  { name: "Fans", href: "/categories/fans" },
  { name: "Electrical Accessories", href: "/categories/accessories" }
];

const featuredProducts = [
  { id: "1", name: "Premium Electrical Wire", category: "Electrical Wires", image: "/placeholder-product.jpg" },
  { id: "2", name: "Smart LED Bulb", category: "LED Bulbs", image: "/placeholder-product.jpg" },
  { id: "3", name: "Modern Switch Board", category: "Switch Boards", image: "/placeholder-product.jpg" }
];

export default async function HomePage() {
  const settings = await getSettings();
  const businessName = settings?.businessName || "Bharat Electronics";
  const heroTitle = settings?.heroTitle || "Complete Electrical & Electronics Solutions Under One Roof";
  const heroSubtitle = settings?.heroSubtitle || "Browse products, explore categories, and contact us instantly from a fast mobile-friendly store.";
  const phone = settings?.phone || "9119789307";
  const email = settings?.email || "amanmzm251316@gmail.com";
  const instagram = settings?.instagram || "@aman_saini____0001";
  const address = settings?.address || "Local shop in your area";
  const contactLink = settings?.whatsappNumber ? `https://wa.me/${settings.whatsappNumber.replace(/\D/g, "")}` : `tel:${phone}`;

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-500">{businessName}</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">{heroTitle}</h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">{heroSubtitle}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/products" className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">View Products</Link>
            <a href="#contact" className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300">Contact Us</a>
            <a href={contactLink} className="rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-400">Call Now</a>
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-xl sm:p-12">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Why Choose Us</p>
            <ul className="grid gap-3 text-sm leading-7 text-slate-100 sm:grid-cols-2">
              <li>Genuine Products</li>
              <li>Affordable Pricing</li>
              <li>Large Product Range</li>
              <li>Trusted Local Store</li>
              <li>Fast Customer Support</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Featured Categories</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Shop by category</h2>
          </div>
          <Link href="/categories" className="text-sm font-semibold text-amber-600 hover:text-amber-500">View all categories</Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link key={category.name} href={category.href} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="h-40 rounded-3xl bg-slate-100"></div>
              <p className="mt-5 text-lg font-semibold text-slate-900 group-hover:text-amber-600">{category.name}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Featured Products</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Best selling items</h2>
          </div>
          <Link href="/products" className="text-sm font-semibold text-amber-600 hover:text-amber-500">Browse all products</Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <article key={product.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">
              <div className="h-64 bg-slate-100" />
              <div className="space-y-3 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-amber-500">{product.category}</p>
                <h3 className="text-xl font-semibold text-slate-900">{product.name}</h3>
                <Link href={`/products/${product.id}`} className="inline-flex items-center text-sm font-semibold text-amber-600 hover:text-amber-500">View Details</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="mt-20 rounded-[2rem] bg-slate-950 px-8 py-12 text-white sm:px-14">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-400">Contact Preview</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">Get in touch with {businessName}</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">Call, email, or message us on Instagram. Visit our store for fast local service and reliable products.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Phone</p>
              <p className="mt-3 text-lg font-semibold">{phone}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Email</p>
              <p className="mt-3 text-lg font-semibold">{email}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Instagram</p>
              <p className="mt-3 text-lg font-semibold">{instagram}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Location</p>
              <p className="mt-3 text-lg font-semibold">{address}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
