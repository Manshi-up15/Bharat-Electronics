import "./globals.css";
import type { Metadata } from "next";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import ToastProvider from "../components/ToastProvider";
import ErrorBoundary from "../components/ErrorBoundary";

export const metadata: Metadata = {
  title: "Bharat Electronics",
  description: "Digital showroom for quality electrical and electronics products.",
  metadataBase: new URL("https://www.bharatelectronics.example"),
  openGraph: {
    title: "Bharat Electronics",
    description: "Complete electrical and electronics solutions under one roof.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <SiteFooter />
        <ToastProvider />
      </body>
    </html>
  );
}
