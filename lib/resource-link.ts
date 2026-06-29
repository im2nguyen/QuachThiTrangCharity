import type { Locale } from "@/lib/locale";
import { libraryHref, type LibrarySection } from "@/lib/navigation";
import type { ResourceType } from "@/lib/resource-types";
import { getLibrarySections } from "@/lib/navigation";

export type ResourceLink = LibrarySection["links"][number];

export function resolveResourceLinkHref(
  link: ResourceLink,
  locale: Locale
): string | null {
  if (link.external) return link.external;
  if (link.path) return locale === "en" ? `/en/${link.path}` : `/${link.path}`;
  if (link.slug) return libraryHref(link.slug, link.locale ?? locale);
  return null;
}

export function isExternalResourceLink(href: string) {
  return href.startsWith("http");
}

export function getFirstSectionLink(
  section: LibrarySection,
  locale: Locale
): { href: string; openInNewTab: boolean } | null {
  for (const link of section.links) {
    const href = resolveResourceLinkHref(link, locale);
    if (!href) continue;
    return {
      href,
      openInNewTab: isExternalResourceLink(href),
    };
  }
  return null;
}

export function getFirstSectionLinkById(type: ResourceType, locale: Locale) {
  const section = getLibrarySections(locale).find((s) => s.id === type);
  if (!section) return null;
  return getFirstSectionLink(section, locale);
}
