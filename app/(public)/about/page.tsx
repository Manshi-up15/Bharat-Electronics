import { getSettings } from "../../../lib/models";

export default async function AboutPage() {
  const settings = await getSettings();
  const businessName = settings?.businessName || "Bharat Electronics";
  const ownerName = settings?.ownerName || "Aman Saini";
  const aboutContent = settings?.aboutContent || "Bharat Electronics provides quality electrical and electronics products including wires, switches, bulbs, coolers, fans, pipes, and accessories at competitive prices.";

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-amber-500">About Us</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">{businessName}</h1>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="text-lg leading-8 text-slate-600">{aboutContent}</p>
            <p className="text-sm text-slate-500">Mission: Provide reliable and affordable electrical solutions.</p>
            <p className="text-sm text-slate-500">Vision: Become the most trusted electronics store in the region.</p>
          </div>
          <div className="rounded-3xl bg-slate-950 p-8 text-white">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-400">Owner</p>
            <h2 className="mt-3 text-3xl font-semibold">{ownerName}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">A local business owner committed to fast support, honest pricing, and dependable electrical solutions.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
