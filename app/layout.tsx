import "./globals.css";
import type { Metadata } from "next";
import ToastProvider from "../components/ToastProvider";
import ErrorBoundary from "../components/ErrorBoundary";
import { getSettings } from "../lib/models";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const title = settings?.businessName || "Bharat Electronics";
  const description =
    settings?.aboutContent ||
    "Digital showroom for quality electrical and electronics products.";
  const metadataBase = new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  );

  return {
    title,
    description,
    metadataBase,
    openGraph: {
      title,
      description,
      type: "website"
    }
  };
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>{children}</ErrorBoundary>
        <ToastProvider />
      </body>
    </html>
  );
}
