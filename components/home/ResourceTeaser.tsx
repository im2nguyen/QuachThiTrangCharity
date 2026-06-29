import Link from "next/link";
import type { Locale } from "@/lib/locale";
import { getFeaturedResources } from "@/lib/home-content";

export function ResourceTeaser({ locale }: { locale: Locale }) {
  const groups = getFeaturedResources(locale);
  const hub = locale === "en" ? "/en/tai-lieu" : "/tai-lieu";

  return (
    <section className="mt-14 border-t border-border/60 pt-14">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
        <h2 className="font-serif text-xl font-semibold">
          {locale === "en" ? "Featured resources" : "Tài liệu nổi bật"}
        </h2>
        <Link href={hub} className="text-sm text-primary underline-offset-2 hover:underline">
          {locale === "en" ? "Full library →" : "Xem toàn bộ tài liệu →"}
        </Link>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {group.title}
            </h3>
            <ul className="space-y-2">
              {group.links.map((link) => (
                <li key={link.href + link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary underline-offset-2 hover:underline"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-primary underline-offset-2 hover:underline"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
