import "./globals.css";
import type { Metadata } from "next";
import ToastProvider from "../components/ToastProvider";
import ErrorBoundary from "../components/ErrorBoundary";
import { getSettings } from "../lib/models";
import { ThemeProvider } from "../components/theme-provider";
import Script from "next/script";

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
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ErrorBoundary>{children}</ErrorBoundary>
          <ToastProvider />
        </ThemeProvider>
        <div id="google_translate_element" style={{ display: 'none' }}></div>
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'hi,en',
                autoDisplay: false
              }, 'google_translate_element');
            }
          `}
        </Script>
      </body>
    </html>
  );
}
