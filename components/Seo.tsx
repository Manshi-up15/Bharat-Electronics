import React from "react";

type Props = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
};

export default function Seo({ title, description, image, url }: Props) {
  const siteTitle = title || process.env.SITE_TITLE || "Bharat Electronics";
  const siteDesc = description || process.env.SITE_DESCRIPTION || "Quality electronics and solutions.";
  const siteUrl = url || process.env.SITE_URL || "http://localhost:3000";
  const imageUrl = image || `${siteUrl}/og-image.png`;

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteTitle,
    url: siteUrl,
    description: siteDesc
  };

  return (
    <>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDesc} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDesc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
    </>
  );
}
