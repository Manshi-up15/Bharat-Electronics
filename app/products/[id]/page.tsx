import { getSettings } from "../../../lib/models";

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  availability: string;
  images: string[];
}

const product: Product = {
  id: "1",
  name: "Premium Electrical Wire",
  category: "Electrical Wires",
  description: "Durable copper wire for residential and commercial installations.",
  availability: "In Stock",
  images: ["/placeholder-product.jpg", "/placeholder-product.jpg"]
};

export default async function ProductDetailsPage() {
  const settings = await getSettings();
  const phone = settings?.phone || "9119789307";
  const email = settings?.email || "amanmzm251316@gmail.com";
  const instagram = settings?.instagram || "@aman_saini____0001";

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_0.5fr]">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl bg-slate-100 p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {product.images.map((src, index) => (
                <div key={index} className="h-80 rounded-3xl bg-slate-200" />
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h1 className="text-4xl font-semibold text-slate-900">{product.name}</h1>
            <p className="mt-3 text-sm uppercase tracking-[0.3em] text-amber-500">{product.category}</p>
            <p className="mt-6 text-base leading-8 text-slate-600">{product.description}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
              <span className="rounded-full bg-emerald-100 px-3 py-2 text-emerald-800">{product.availability}</span>
              <a href={`tel:${phone}`} className="rounded-full bg-slate-900 px-3 py-2 text-white">Call for details</a>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Contact Information</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p><strong>Phone:</strong> {phone}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Instagram:</strong> {instagram}</p>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Need help?</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">Message us for pricing and availability on bulk orders or fast delivery inquiries.</p>
          </div>
        </aside>
      </div>
      <div className="mt-12 rounded-3xl bg-slate-950 p-8 text-white">
        <h2 className="text-2xl font-semibold">Image lightbox demo</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">Click images to view a larger preview in the finished site experience.</p>
      </div>
    </main>
  );
}
