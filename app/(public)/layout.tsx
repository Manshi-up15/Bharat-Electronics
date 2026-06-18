import { ReactNode } from "react";
import SiteHeader from "../../components/site-header";
import SiteFooter from "../../components/site-footer";
import { getSettings } from "../../lib/models";

export const dynamic = "force-dynamic";

export default async function PublicLayout({ children }: { children: ReactNode }) {
  const settings = await getSettings();
  const businessName = settings?.businessName || "Bharat Electronics";
  const phone = settings?.phone || "9119789307";
  const address = settings?.address || "Petrol Pump ke samne , bahupura road, morna, UP";
  const googleMapsUrl = settings?.googleMapsUrl || "https://maps.app.goo.gl/fadZjypYkkhuhC9G6";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": businessName,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address
    },
    "telephone": phone,
    "hasMap": googleMapsUrl
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader settings={settings} />
      {children}
      <SiteFooter settings={settings} />
    </>
  );
}
