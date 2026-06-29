"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HtmlContent } from "@/components/HtmlContent";
import { HomeParallaxPhotos } from "./HomeParallaxPhotos";
import type { HomeYearSection } from "@/lib/home-content";
import type { Locale } from "@/lib/locale";

const MISSION_CONTENT_CLASS =
  "text-sm sm:text-base [&_.home-poem]:my-8 [&_.home-poem]:text-center [&_.home-poem-author]:mt-3 [&_.home-poem-author]:font-sans [&_.home-poem-author]:text-xs [&_.home-poem-author]:uppercase [&_.home-poem-author]:tracking-[0.18em] [&_.home-poem-author]:text-muted-foreground sm:[&_.home-poem-author]:text-sm [&_.home-poem-line]:block [&_.home-poem-line]:font-serif [&_.home-poem-line]:text-base [&_.home-poem-line]:italic [&_.home-poem-line]:leading-relaxed [&_.home-poem-line]:text-[#538b01] sm:[&_.home-poem-line]:text-lg [&_.home-poem-lines]:m-0 [&_.home-poem-lines]:border-0 [&_.home-poem-lines]:p-0 [&_.home-poem-note]:mt-2 [&_.home-poem-note]:text-xs [&_.home-poem-note]:text-muted-foreground [&_.pi]:mb-6 [&_.pi]:leading-relaxed [&_.pi]:last:mb-0 [&_img[src*='devider']]:hidden [&_img[src*='electronc']]:hidden";

export function HomeScrollLayout({
  locale,
  missionHtml,
  yearSections,
}: {
  locale: Locale;
  missionHtml: string;
  yearSections: HomeYearSection[];
}) {
  const defaultYear = yearSections[0]?.year ?? "2025";
  const [scrollProgress, setScrollProgress] = useState(0);
  const [displayYear, setDisplayYear] = useState(defaultYear);
  const missionRef = useRef<HTMLElement>(null);

  const updateScroll = useCallback(() => {
    const missionEl = missionRef.current;
    if (!missionEl || yearSections.length === 0) return;

    const rect = missionEl.getBoundingClientRect();
    const missionTop = window.scrollY + rect.top;
    const missionHeight = missionEl.offsetHeight;
    const viewportHeight = window.innerHeight;

    const start = missionTop - viewportHeight * 0.25;
    const end = missionTop + missionHeight - viewportHeight * 0.55;
    const progress = Math.max(
      0,
      Math.min(1, (window.scrollY - start) / Math.max(end - start, 1))
    );

    setScrollProgress((current) =>
      Math.abs(current - progress) < 0.002 ? current : progress
    );

    const index = Math.min(
      yearSections.length - 1,
      Math.floor(progress * yearSections.length)
    );
    const nextYear = yearSections[index]?.year ?? defaultYear;
    setDisplayYear((current) => (current === nextYear ? current : nextYear));
  }, [defaultYear, yearSections]);

  useEffect(() => {
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, [updateScroll]);

  return (
    <section className="mx-auto max-w-6xl overflow-visible px-5 pb-8 pt-8 sm:pt-10 lg:pb-12 lg:pt-12">
      <div className="overflow-visible lg:grid lg:grid-cols-[minmax(17rem,22rem)_minmax(0,1fr)] lg:items-start lg:gap-10 xl:grid-cols-[minmax(19rem,24rem)_minmax(0,1fr)] xl:gap-12">
        <aside className="sticky top-28 z-10 mb-10 hidden self-start overflow-visible lg:mb-0 lg:block">
          <HomeParallaxPhotos
            locale={locale}
            yearSections={yearSections}
            scrollProgress={scrollProgress}
            year={displayYear}
          />
        </aside>

        <div className="min-w-0">
          <article ref={missionRef} id="home-mission" className="scroll-mt-28">
            <HtmlContent html={missionHtml} className={MISSION_CONTENT_CLASS} />
          </article>

          <div className="mt-10 lg:hidden">
            <HomeParallaxPhotos
              locale={locale}
              yearSections={yearSections}
              scrollProgress={0}
              variant="stack"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
