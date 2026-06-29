import type { Locale } from "@/lib/locale";
import type { ResourceType } from "@/lib/resource-types";

export function getResourceSectionShortLabels(
  locale: Locale
): Record<ResourceType, string> {
  if (locale === "en") {
    return {
      I: "Poetry & Music",
      II: "Collection",
      III: "Essays",
      IV: "Places",
      VI: "Video",
      VII: "Karaoke",
    };
  }
  return {
    I: "Thơ Nhạc",
    II: "Toàn Tập",
    III: "Khảo Luận",
    IV: "Địa Danh",
    VI: "Video",
    VII: "Karaoke",
  };
}

export function isResourcesHubPath(pathname: string, locale: Locale) {
  const hub = locale === "en" ? "/en/tai-lieu" : "/tai-lieu";
  return pathname === hub || pathname === `${hub}/`;
}
