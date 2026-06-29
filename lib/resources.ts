import type { Locale } from "@/lib/locale";

export function getResourcesTitle(locale: Locale) {
  return locale === "en"
    ? "Memorial Resources for Quách Thị Trang"
    : "Tư Liệu Tưởng Niệm Quách Thị Trang";
}

export function getResourcesIntro(locale: Locale) {
  return locale === "en"
    ? "Poetry, music, and memorial materials for Quách Thị Trang"
    : "Thơ nhạc và tài liệu tưởng niệm Quách Thị Trang";
}

export function getResourcesFeaturedQuote(locale: Locale) {
  return locale === "en"
    ? {
        line: "Remembering Trang forever in her white áo dài…",
        source: "Nhớ Trang",
        href: "/en/tai-lieu/nho-trang",
      }
    : {
        line: "Nhớ mãi Trang trong tà áo trắng…",
        source: "Nhớ Trang",
        href: "/tai-lieu/nho-trang",
      };
}

export function getSectionItemCount(
  links: { slug?: string; external?: string; path?: string }[]
): number {
  return links.length;
}
