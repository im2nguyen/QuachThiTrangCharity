import { homeContent } from "@/content";
import { getHomeYearSections } from "@/lib/home-content";
import { normalizeHomeMissionHtml } from "@/lib/normalize-home-mission";
import type { Locale } from "@/lib/locale";
import { HomeHero } from "./HomeHero";
import { HomeScrollLayout } from "./HomeScrollLayout";

const SHOW_HOME_HERO = true;

export function HomePage({ locale }: { locale: Locale }) {
  const missionHtml = normalizeHomeMissionHtml(homeContent[locale].missionHtml);
  const yearSections = getHomeYearSections(locale);

  return (
    <>
      <h1 className="sr-only">Quách Thị Trang Foundation</h1>
      {SHOW_HOME_HERO && <HomeHero locale={locale} />}
      <HomeScrollLayout
        locale={locale}
        missionHtml={missionHtml}
        yearSections={yearSections}
      />
    </>
  );
}
