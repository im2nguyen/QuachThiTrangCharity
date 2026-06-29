import Link from "next/link";
import { PageTitle } from "@/components/PageTitle";
import { scholarshipYears } from "@/content";
import type { Locale } from "@/lib/locale";
import { cn } from "@/lib/utils";

type ScholarshipLayoutProps = {
  locale: Locale;
  activeYear?: string;
  children: React.ReactNode;
};

export function ScholarshipLayout({
  locale,
  activeYear,
  children,
}: ScholarshipLayoutProps) {
  const base = locale === "en" ? "/en/hoc-bong" : "/hoc-bong";
  const year = activeYear ?? String(scholarshipYears[0]);

  const title =
    locale === "en"
      ? `Quach Thi Trang Scholarship ${year}`
      : `Học Bổng Quách Thị Trang ${year}`;
  const description =
    locale === "en"
      ? "Annual scholarships for grade-11 students"
      : "Học bổng thường niên cho học sinh lớp 11";
  const filterLabel = locale === "en" ? "Filter by year:" : "Lọc theo năm:";

  return (
    <div className="mx-auto max-w-6xl px-5 pb-12 pt-16 sm:pt-20 lg:pt-24">
      <header className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <div className="max-w-2xl">
          <PageTitle className="lg:shrink-0 lg:whitespace-nowrap">{title}</PageTitle>
          <p className="mt-3 font-serif text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
        </div>

        <div className="shrink-0 lg:text-right">
          <p className="text-sm font-semibold text-foreground">{filterLabel}</p>
          <div
            className="mt-2 flex flex-wrap gap-x-6 gap-y-1 lg:justify-end"
            role="tablist"
            aria-label={locale === "en" ? "Ceremony year" : "Năm lễ trao học bổng"}
          >
            {scholarshipYears.map((y) => {
              const tabYear = String(y);
              const isSelected = activeYear === tabYear;
              return (
                <Link
                  key={tabYear}
                  href={`${base}/${tabYear}`}
                  role="tab"
                  aria-selected={isSelected}
                  className={cn(
                    "cursor-pointer border-b-2 pb-2 text-sm font-medium tabular-nums transition-[color,border-color] duration-200 ease-out sm:text-base",
                    isSelected
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tabYear}
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      <div className="mt-8 sm:mt-10">{children}</div>
    </div>
  );
}
