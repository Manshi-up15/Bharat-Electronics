import { getSettings, getProductById } from "../../../../lib/models";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";

export default async function ProductDetailsPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  
  if (!ObjectId.isValid(id)) {
    notFound();
  }
  const product = await getProductById(id);

  if (!product || !product.id) {
    notFound();
  }

  const settings = await getSettings();
  const phone = settings?.phone || "9119789307";
  const email = settings?.email || "amanmzm251316@gmail.com";
  const instagram = settings?.instagram || "@aman_saini____0001";

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_0.5fr]">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-800 p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {product.images && product.images.length > 0 ? (
                product.images.map((img, index) => (
                  <div key={index} className="relative h-80 rounded-3xl bg-slate-200 overflow-hidden">
                    <Image src={img.url} alt={product.name} fill className="object-cover" />
                  </div>
                ))
              ) : (
                <div className="h-80 rounded-3xl bg-slate-200" />
              )}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <h1 className="text-4xl font-semibold text-slate-900 dark:text-slate-50">{product.name}</h1>
            <p className="mt-3 text-sm uppercase tracking-[0.3em] text-amber-500">{product.categoryName}</p>
            {product.price !== undefined && product.price > 0 && (
              <p className="mt-4 text-3xl font-bold text-slate-900 dark:text-slate-50">
                {Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(product.price)}
              </p>
            )}
            <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-400 whitespace-pre-wrap">{product.description}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
              <span className="rounded-full bg-emerald-100 px-3 py-2 text-emerald-800">{product.availability}</span>
              <a href={`tel:${phone}`} className="rounded-full bg-slate-900 px-3 py-2 text-white">Call for details</a>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Contact Information</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <p><strong>Phone:</strong> {phone}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Instagram:</strong> {instagram}</p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
