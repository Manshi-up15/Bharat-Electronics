import { ReactNode } from "react";
import { redirect } from "next/navigation";
import SiteHeader from "../../components/site-header";
import SiteFooter from "../../components/site-footer";
import LogoutButton from "../../components/logout-button";
import { verifyAuth } from "../../lib/auth";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const payload = verifyAuth();
  if (!payload) {
    redirect("/admin/login");
  }

  return (
    <html>
      <body>
        <SiteHeader />
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center justify-end">
            <LogoutButton />
          </div>
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
