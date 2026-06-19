"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "../lib/types";
import { getSettings } from "../lib/api";
import Link from "next/link";
import WhatsAppButton from "./whatsapp-button";

interface ProductBrowserProps {
  products: Product[];
}

export default function ProductBrowser({ products }: ProductBrowserProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [availability, setAvailability] = useState("All");
  const [phone, setPhone] = useState("9119789307");
  const [whatsappNumber, setWhatsappNumber] = useState<string | null>(null);

  useEffect(() => {
    getSettings().then((settings) => {
      if (settings?.phone) {
        setPhone(settings.phone);
      }
      if (settings?.whatsappNumber) {
        setWhatsappNumber(settings.whatsappNumber);
      }
    });
  }, []);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase()) || product.categoryName?.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || product.categoryName === category;
      const matchesAvailability = availability === "All" || product.availability === availability;
      return matchesQuery && matchesCategory && matchesAvailability;
    });
  }, [products, query, category, availability]);

  const categories = Array.from(new Set(products.map((product) => product.categoryName || "Uncategorized")));

  const productsWithId = filtered.map((product, index) => ({
    product,
    id: product.id ?? product._id?.toString() ?? `product-${index}`
  }));

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-[1.5fr_1fr_1fr]">
        <label className="space-y-2 text-sm font-semibold text-slate-700">
          Search Products
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name or category" className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm text-slate-900 dark:text-slate-50" />
        </label>
        <label className="space-y-2 text-sm font-semibold text-slate-700">
          Category
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm text-slate-900 dark:text-slate-50">
            <option>All</option>
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="space-y-2 text-sm font-semibold text-slate-700">
          Availability
          <select value={availability} onChange={(event) => setAvailability(event.target.value)} className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm text-slate-900 dark:text-slate-50">
            <option>All</option>
            <option>In Stock</option>
            <option>Out of Stock</option>
          </select>
        </label>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {productsWithId.map(({ product, id }) => (
          <article key={id} className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition hover:shadow-lg">
            <div className="h-64 bg-slate-100 dark:bg-slate-800" />
            <div className="space-y-4 p-6">
              <div className="flex items-center justify-between text-sm uppercase tracking-[0.3em] text-amber-500">
                <span>{product.categoryName}</span>
                <span>{product.availability}</span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">{product.name}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">{product.description}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={`/products/${id}`} className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 dark:text-slate-50">View Details</Link>
                <a href={`tel:${phone}`} className="rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-900 dark:text-slate-50">Contact for Price</a>
                <WhatsAppButton whatsappNumber={whatsappNumber} productName={product.name} compact />
              </div>
            </div>
          </article>
        ))}
        {productsWithId.length === 0 && (
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 text-center text-slate-600 dark:text-slate-400 shadow-sm">No products match your search criteria.</div>
        )}
      </div>
    </div>
  );
}
