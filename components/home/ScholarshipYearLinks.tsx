import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/locale";
import { getScholarshipYearLinks } from "@/lib/home-content";

export function ScholarshipYearLinks({ locale }: { locale: Locale }) {
  const years = getScholarshipYearLinks(locale);
  const hub = locale === "en" ? "/en/hoc-bong" : "/hoc-bong";

  return (
    <section className="mt-10 border-t border-border/60 pt-10">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <h2 className="font-serif text-xl font-semibold">
          {locale === "en" ? "Quach Thi Trang Scholarships" : "Học Bổng Quách Thị Trang"}
        </h2>
        <Link href={hub} className="text-sm text-primary underline-offset-2 hover:underline">
          {locale === "en" ? "View all →" : "Xem tất cả →"}
        </Link>
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {years.map(({ year, image, href }) => (
          <li key={year}>
            <Link
              href={href}
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition hover:border-primary/50 hover:shadow-sm"
            >
              {image && (
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={image}
                    alt=""
                    fill
                    className="object-cover transition group-hover:scale-[1.02]"
                    sizes="120px"
                  />
                </div>
              )}
              <span className="px-2 py-2 text-center font-medium tabular-nums">{year}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
