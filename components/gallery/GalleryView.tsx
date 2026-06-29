"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/PageTitle";
import { getGallerySectionTitle, type GalleryEvent } from "@/lib/gallery";
import type { Locale } from "@/lib/locale";
import { cn } from "@/lib/utils";
import { GalleryGrid } from "./GalleryGrid";

export function GalleryView({
  locale,
  events,
}: {
  locale: Locale;
  events: GalleryEvent[];
}) {
  const [selectedYear, setSelectedYear] = useState(events[0]?.year ?? "");
  const [gridVisible, setGridVisible] = useState(true);
  const selected =
    events.find((event) => event.year === selectedYear) ?? events[0];
  const sectionTitle = getGallerySectionTitle(locale);

  const title = locale === "en" ? "Photo Gallery" : "Hình Ảnh";
  const filterLabel = locale === "en" ? "Filter by year:" : "Lọc theo năm:";

  const handleYearChange = (year: string) => {
    if (year === selectedYear) return;
    setGridVisible(false);
    window.setTimeout(() => {
      setSelectedYear(year);
      setGridVisible(true);
    }, 220);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-12 pt-16 sm:pt-20 lg:pt-24">
      <header className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <div className="max-w-2xl">
          <PageTitle>{title}</PageTitle>
          <p className="mt-3 font-serif text-base leading-relaxed text-muted-foreground sm:text-lg">
            {locale === "en" ? (
              <>
                Scholarship award ceremonies,{" "}
                <span className="whitespace-nowrap">2019–2025</span>
              </>
            ) : (
              <>
                Các buổi lễ trao học bổng Quách Thị Trang,{" "}
                <span className="whitespace-nowrap">2019–2025</span>
              </>
            )}
          </p>
        </div>

        <div className="shrink-0 lg:text-right">
          <p className="text-sm font-semibold text-foreground">{filterLabel}</p>
          <div
            className="mt-2 flex flex-wrap gap-x-6 gap-y-1 lg:justify-end"
            role="tablist"
            aria-label={locale === "en" ? "Ceremony year" : "Năm lễ trao học bổng"}
          >
            {events.map((event) => {
              const isSelected = event.year === selected?.year;
              return (
                <button
                  key={event.year}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleYearChange(event.year)}
                  className={cn(
                    "cursor-pointer border-b-2 pb-2 text-sm font-medium tabular-nums transition-[color,border-color] duration-200 ease-out sm:text-base",
                    isSelected
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {event.year}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {selected && (
        <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-serif text-lg font-semibold text-foreground">
            {locale === "en"
              ? `Quach Thi Trang Scholarship ${selected.year}`
              : `Học Bổng Quách Thị Trang ${selected.year}`}
          </h2>

          <Button asChild size="sm" className="h-10 shrink-0 px-5 font-medium">
            <Link href={selected.hocBongHref} className="group inline-flex items-center">
              {locale === "en" ? "Ceremony details" : "Chi tiết buổi lễ"}
              <span
                aria-hidden
                className="ml-1 inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </Button>
        </div>
      )}

      {selected && (
        <section
          className={cn(
            "mt-6 transition-opacity duration-300 ease-out sm:mt-8",
            gridVisible ? "opacity-100" : "opacity-0"
          )}
          role="tabpanel"
          aria-label={`${sectionTitle} ${selected.year}`}
        >
          <GalleryGrid
            images={selected.images}
            year={selected.year}
            locale={locale}
          />
        </section>
      )}
    </div>
  );
}
