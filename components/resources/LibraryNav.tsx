"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, ExternalLink, FileText } from "lucide-react";
import { getLibrarySections, type LibrarySection } from "@/lib/navigation";
import { getResourcesTitle } from "@/lib/resources";
import {
  isExternalResourceLink,
  resolveResourceLinkHref,
} from "@/lib/resource-link";
import {
  getResourceSectionShortLabels,
  isResourcesHubPath,
} from "@/lib/resource-sections";
import type { ResourceType } from "@/lib/resource-types";
import { RESOURCE_TYPES } from "@/lib/resource-types";
import type { Locale } from "@/lib/locale";
import { cn } from "@/lib/utils";

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname === `${href}/`;
}

function isPdfLink(href: string) {
  return href.endsWith(".pdf");
}

function getActiveSectionId(
  pathname: string,
  locale: Locale
): ResourceType | null {
  if (isResourcesHubPath(pathname, locale)) return null;

  for (const section of getLibrarySections(locale)) {
    for (const link of section.links) {
      if (link.external) continue;
      const href = resolveResourceLinkHref(link, locale);
      if (href && isActivePath(pathname, href)) {
        return section.id as ResourceType;
      }
    }
  }
  return null;
}

function getSinglePageHref(
  section: LibrarySection,
  locale: Locale
): string | null {
  if (section.links.length !== 1) return null;

  const link = section.links[0];
  if (link.external) return null;

  const href = resolveResourceLinkHref(link, locale);
  if (!href || isExternalResourceLink(href)) return null;

  return href;
}

function NavLinkContent({
  label,
  external,
  href,
}: {
  label: string;
  external: boolean;
  href: string;
}) {
  const showExternalIcon = external && isExternalResourceLink(href);
  const showPdfIcon = external && isPdfLink(href);

  return (
    <span className="flex items-start gap-1.5">
      <span className="min-w-0 flex-1">{label}</span>
      {showExternalIcon && (
        <ExternalLink
          className="mt-0.5 size-3.5 shrink-0 text-muted-foreground/70"
          aria-hidden
        />
      )}
      {showPdfIcon && !showExternalIcon && (
        <FileText
          className="mt-0.5 size-3.5 shrink-0 text-muted-foreground/70"
          aria-hidden
        />
      )}
    </span>
  );
}

function linkClassName(active: boolean, mobile = false) {
  return cn(
    "block rounded-md transition-colors",
    mobile
      ? "min-h-11 px-3 py-3 text-[0.9375rem] leading-snug"
      : "px-2 py-1 text-sm leading-snug",
    active
      ? "bg-primary/5 font-medium text-foreground"
      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
  );
}

function sectionHeaderClassName(active: boolean) {
  return cn(
    "flex w-full items-center py-2.5 text-sm font-semibold transition-colors",
    active
      ? "rounded-md bg-primary/5 px-2 text-foreground"
      : "text-foreground/90 hover:text-foreground"
  );
}

function mobilePillClassName(active: boolean) {
  return cn(
    "inline-flex min-h-11 shrink-0 snap-start items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
    active
      ? "border-primary bg-primary text-primary-foreground shadow-sm"
      : "border-border bg-background text-foreground/90 active:bg-muted"
  );
}

function SectionLinksList({
  section,
  locale,
  pathname,
  mobile = false,
}: {
  section: LibrarySection;
  locale: Locale;
  pathname: string;
  mobile?: boolean;
}) {
  return (
    <ul className={mobile ? "space-y-1" : "space-y-0.5"}>
      {section.links.map((link, i) => {
        const href = resolveResourceLinkHref(link, locale);
        if (!href) return null;

        const isAssetOrExternal = Boolean(link.external);
        const openInNewTab = isExternalResourceLink(href);
        const active = !isAssetOrExternal && isActivePath(pathname, href);
        const className = linkClassName(active, mobile);

        return (
          <li key={`${link.slug ?? link.path ?? link.external}-${i}`}>
            {isAssetOrExternal ? (
              <a
                href={href}
                className={className}
                {...(openInNewTab
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <NavLinkContent
                  label={link.label}
                  external={openInNewTab}
                  href={href}
                />
              </a>
            ) : (
              <Link href={href} className={className}>
                <NavLinkContent
                  label={link.label}
                  external={false}
                  href={href}
                />
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function MobileLibraryNav({
  locale,
  sections,
  sectionLabels,
  pathname,
  activeSectionId,
}: {
  locale: Locale;
  sections: LibrarySection[];
  sectionLabels: Record<ResourceType, string>;
  pathname: string;
  activeSectionId: ResourceType | null;
}) {
  const [mobileSection, setMobileSection] = useState<ResourceType | null>(
    activeSectionId
  );

  useEffect(() => {
    setMobileSection(activeSectionId);
  }, [activeSectionId]);

  const openSection = mobileSection
    ? sections.find((section) => section.id === mobileSection)
    : null;

  return (
    <div className="space-y-3">
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {RESOURCE_TYPES.map((type) => {
          const section = sections.find((s) => s.id === type);
          if (!section) return null;

          const directHref = getSinglePageHref(section, locale);
          const isSelected = mobileSection === type;
          const label = sectionLabels[type];

          if (directHref) {
            const active = isActivePath(pathname, directHref);
            return (
              <Link
                key={type}
                href={directHref}
                className={mobilePillClassName(active)}
              >
                {label}
              </Link>
            );
          }

          return (
            <button
              key={type}
              type="button"
              aria-expanded={isSelected}
              aria-controls={`library-mobile-${type}`}
              onClick={() =>
                setMobileSection((current) => (current === type ? null : type))
              }
              className={mobilePillClassName(isSelected)}
            >
              {label}
            </button>
          );
        })}
      </div>

      {openSection && !getSinglePageHref(openSection, locale) && (
        <div
          id={`library-mobile-${openSection.id}`}
          className="max-h-[min(50vh,24rem)] overflow-y-auto rounded-xl border border-border/70 bg-muted/20 p-2"
        >
          <SectionLinksList
            section={openSection}
            locale={locale}
            pathname={pathname}
            mobile
          />
        </div>
      )}
    </div>
  );
}

function DesktopLibraryNav({
  locale,
  sections,
  sectionLabels,
  pathname,
  activeSectionId,
}: {
  locale: Locale;
  sections: LibrarySection[];
  sectionLabels: Record<ResourceType, string>;
  pathname: string;
  activeSectionId: ResourceType | null;
}) {
  const [expanded, setExpanded] = useState<Partial<Record<ResourceType, boolean>>>(
    {}
  );

  useEffect(() => {
    if (activeSectionId) {
      setExpanded((prev) => ({ ...prev, [activeSectionId]: true }));
    }
  }, [activeSectionId]);

  function toggleSection(type: ResourceType) {
    setExpanded((prev) => ({ ...prev, [type]: !prev[type] }));
  }

  return (
    <>
      {RESOURCE_TYPES.map((type) => {
        const section = sections.find((s) => s.id === type);
        if (!section) return null;

        const isOpen = Boolean(expanded[type]);
        const panelId = `library-section-${type}`;
        const directHref = getSinglePageHref(section, locale);

        if (directHref) {
          const active = isActivePath(pathname, directHref);

          return (
            <div key={type} className="border-b border-border/50 last:border-0">
              <Link href={directHref} className={sectionHeaderClassName(active)}>
                {sectionLabels[type]}
              </Link>
            </div>
          );
        }

        return (
          <div key={type} className="border-b border-border/50 last:border-0">
            <button
              type="button"
              onClick={() => toggleSection(type)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className={cn(
                "flex w-full cursor-pointer items-center justify-between gap-2 py-2.5 text-left text-sm font-semibold transition-colors",
                isOpen ? "text-foreground" : "text-foreground/90 hover:text-foreground"
              )}
            >
              <span>{sectionLabels[type]}</span>
              <ChevronDown
                className={cn(
                  "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
                aria-hidden
              />
            </button>

            {isOpen && (
              <div
                id={panelId}
                className="mb-2 ml-2.5 border-l border-border/50 pb-3.5 pl-3 pt-1"
              >
                <SectionLinksList
                  section={section}
                  locale={locale}
                  pathname={pathname}
                />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

export function LibraryNav({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";
  const sections = getLibrarySections(locale);
  const sectionLabels = getResourceSectionShortLabels(locale);
  const activeSectionId = getActiveSectionId(pathname, locale);

  return (
    <>
      <div className="lg:hidden">
        <MobileLibraryNav
          locale={locale}
          sections={sections}
          sectionLabels={sectionLabels}
          pathname={pathname}
          activeSectionId={activeSectionId}
        />
      </div>

      <nav
        aria-label={getResourcesTitle(locale)}
        className="hidden space-y-1 lg:block"
      >
        <DesktopLibraryNav
          locale={locale}
          sections={sections}
          sectionLabels={sectionLabels}
          pathname={pathname}
          activeSectionId={activeSectionId}
        />
      </nav>
    </>
  );
}
