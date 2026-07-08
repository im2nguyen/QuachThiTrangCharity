import type { Locale } from "@/lib/locale";
import libraryNav from "@/content/navigation/library.json";

export type NavLink = { href: string; label: string };

export function getNavLinks(locale: Locale): NavLink[] {
  const p = locale === "en" ? "/en" : "";
  return [
    {
      href: locale === "en" ? "/en/news" : "/tin-tuc",
      label: locale === "en" ? "News" : "Tin Tức",
    },
    {
      href: `${p}/hoc-bong`,
      label: locale === "en" ? "Scholarship" : "Học Bổng",
    },
    { href: `${p}/hinh-anh`, label: locale === "en" ? "Gallery" : "Hình Ảnh" },
    { href: `${p}/tai-lieu`, label: locale === "en" ? "Resources" : "Tư Liệu" },
    { href: `${p}/contact`, label: locale === "en" ? "Contact" : "Liên Lạc" },
  ];
}

export type LibrarySection = {
  id: string;
  title: string;
  description: string;
  links: {
    slug?: string;
    label: string;
    locale?: Locale;
    external?: string;
    path?: string;
  }[];
};

const enDescriptions: Record<string, string> = {
  I: "Poetry and music written in memory of Quách Thị Trang — from memorial poems to musical works bearing her name.",
  II: "The complete poetry and music collection commemorating Quách Thị Trang — PDF editions and an online flipbook.",
  III: "Essays, dissertations, and writings about Quách Thị Trang and the student movement.",
  IV: "Places named for Quách Thị Trang across Vietnam — squares, markets, and streets in Saigon, Đà Nẵng, Quảng Nam, Bình Định, An Giang, and more.",
  VI: "Memorial videos and performances of Em Là Vì Sao Sáng.",
  VII: "Karaoke and sheet music for Em Là Vì Sao Sáng.",
};

const enTitles: Record<string, string> = {
  I: "Poetry & Music in Memory of Quách Thị Trang",
  II: "Complete Poetry & Music Collection (PDF & Flipbook)",
  III: "Essays & Scholarship",
  IV: "Historical Places",
  VI: "Video",
  VII: "Karaoke",
};

export function getLibrarySections(locale: Locale): LibrarySection[] {
  const sections = libraryNav as LibrarySection[];
  if (locale === "en") {
    return sections.map((s) => ({
      ...s,
      title: enTitles[s.id] ?? s.title,
      description: enDescriptions[s.id] ?? s.description,
      links: s.links.map((l) =>
        l.slug === "nho-trang"
          ? { ...l, slug: "nho-trang", locale: "en" as Locale }
          : l.slug === "qtt-wikiand"
            ? { ...l, slug: "qtt-wikiand", locale: "en" as Locale }
            : l
      ),
    }));
  }
  return sections;
}

export function libraryHref(slug: string, locale: Locale): string {
  const base = locale === "en" ? "/en/tai-lieu" : "/tai-lieu";
  return `${base}/${slug}`;
}
