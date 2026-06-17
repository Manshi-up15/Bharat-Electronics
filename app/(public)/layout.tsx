import { ReactNode } from "react";
import SiteHeader from "../../components/site-header";
import SiteFooter from "../../components/site-footer";
import { getSettings } from "../../lib/models";

export default async function PublicLayout({ children }: { children: ReactNode }) {
  const settings = await getSettings();
  return (
    <>
      <SiteHeader settings={settings} />
      {children}
      <SiteFooter settings={settings} />
    </>
  );
}
