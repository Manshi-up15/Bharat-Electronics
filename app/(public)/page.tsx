import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { getSettings, getCategories, getProducts } from "../../lib/models";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const settings = await getSettings();
  const businessName = settings?.businessName || "Bharat Electronics";
  const heroTitle = settings?.heroTitle || "Complete Electrical & Electronics Solutions Under One Roof";
  const heroSubtitle = settings?.heroSubtitle || "Browse products, explore categories, and contact us instantly from a fast mobile-friendly store.";
  const phone = settings?.phone || "9119789307";
  const email = settings?.email || "amanmzn251316@gmail.com";
  const instagram = settings?.instagram || "@aman_saini____0001";
  const address = settings?.address || "Petrol Pump ke samne , bahupura road, morna, UP";
  const googleMapsUrl = settings?.googleMapsUrl || "https://maps.app.goo.gl/fadZjypYkkhuhC9G6";
  const contactLink = settings?.whatsappNumber ? `https://wa.me/${settings.whatsappNumber.replace(/\D/g, "")}` : `tel:${phone}`;

  const categories = await getCategories();
  const allProducts = await getProducts();
  const featuredProducts = allProducts.filter(p => p.featured).slice(0, 3);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-500">{businessName}</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl">{heroTitle}</h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">{heroSubtitle}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/products" className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">View Products</Link>
            <a href="#contact" className="rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-900 dark:text-slate-50 transition hover:border-slate-300">Contact Us</a>
            <a href={contactLink} className="rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-900 dark:text-slate-50 transition hover:bg-amber-400">Call Now</a>
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
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">Shop by category</h2>
          </div>
          <Link href="/categories" className="text-sm font-semibold text-amber-600 hover:text-amber-500">View all categories</Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.slice(0, 4).map((category) => (
            <Link key={category.slug} href={`/categories/${category.slug}`} className="group overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 transition hover:-translate-y-1 hover:shadow-lg">
              {category.image ? (
                <div className="relative h-40 w-full overflow-hidden rounded-3xl">
                  <Image src={category.image.url} alt={category.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition group-hover:scale-105" />
                </div>
              ) : (
                <div className="h-40 rounded-3xl bg-slate-100 dark:bg-slate-800"></div>
              )}
              <p className="mt-5 text-lg font-semibold text-slate-900 dark:text-slate-50 group-hover:text-amber-600">{category.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section className="mt-16">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Featured Products</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">Best selling items</h2>
            </div>
            <Link href="/products" className="text-sm font-semibold text-amber-600 hover:text-amber-500">Browse all products</Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <article key={product.id} className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition hover:shadow-lg">
                {product.images && product.images[0] ? (
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image src={product.images[0].url} alt={product.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
                  </div>
                ) : (
                  <div className="h-64 bg-slate-100 dark:bg-slate-800" />
                )}
                <div className="space-y-3 p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-amber-500">{product.categoryName || "Product"}</p>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">{product.name}</h3>
                  {product.price !== undefined && product.price > 0 && (
                    <p className="text-lg font-bold text-slate-900 dark:text-slate-50">
                      {Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(product.price)}
                    </p>
                  )}
                  <Link href={`/products/${product.id}`} className="inline-flex items-center text-sm font-semibold text-amber-600 hover:text-amber-500">View Details</Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

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
              <p className="mt-3 text-lg font-semibold break-all">{email}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Instagram</p>
              <p className="mt-3 text-lg font-semibold">{instagram}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Location</p>
              <p className="mt-3 text-lg font-semibold">{address}</p>
              <a 
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-400 transition hover:text-amber-300"
              >
                <MapPin className="h-4 w-4" />
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
