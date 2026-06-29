"use client";

import { usePathname } from "next/navigation";
import { FooterMemorial } from "./FooterMemorial";
import { getLocaleFromPath } from "@/lib/locale";

export function Footer() {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPath(pathname);

  return (
    <footer className="mt-24">
      <FooterMemorial locale={locale} />
    </footer>
  );
}
