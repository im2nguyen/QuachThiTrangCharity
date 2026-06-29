"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getLocaleFromPath, toggleLocalePath } from "@/lib/locale";

const itemClass =
  "px-0.5 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 rounded-sm";

export function LocaleToggle({ className }: { className?: string }) {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPath(pathname);
  const otherHref = toggleLocalePath(pathname);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground",
        className
      )}
      role="group"
      aria-label={locale === "en" ? "Language" : "Ngôn ngữ"}
    >
      {locale === "vi" ? (
        <span className={cn(itemClass, "text-foreground")} aria-current="page">
          VI
        </span>
      ) : (
        <Link href={otherHref} className={itemClass}>
          VI
        </Link>
      )}
      <span className="text-border/80" aria-hidden>
        |
      </span>
      {locale === "en" ? (
        <span className={cn(itemClass, "text-foreground")} aria-current="page">
          EN
        </span>
      ) : (
        <Link href={otherHref} className={itemClass}>
          EN
        </Link>
      )}
    </div>
  );
}
