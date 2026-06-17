import { ReactNode } from "react";
import { redirect } from "next/navigation";
import LogoutButton from "../../components/logout-button";
import { verifyAuth } from "../../lib/auth";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const payload = await verifyAuth();
  if (!payload) {
    redirect("/admin/login");
  }

  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex items-center justify-end">
          <LogoutButton />
        </div>
        {children}
      </div>
    </div>
  );
}
