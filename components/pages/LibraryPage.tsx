import { notFound } from "next/navigation";
import { ResourcesLayout } from "@/components/resources/ResourcesLayout";
import { PdfViewer } from "@/components/resources/PdfViewer";
import { HtmlContent } from "@/components/HtmlContent";
import { getLibraryPage } from "@/content";
import { getLibrarySections } from "@/lib/navigation";
import { stripDuplicateTitle } from "@/lib/strip-duplicate-title";
import type { Locale } from "@/lib/locale";

function isEssaySlug(slug: string, locale: Locale) {
  const essaySection = getLibrarySections(locale).find((s) => s.id === "III");
  return essaySection?.links.some((l) => l.slug === slug) ?? false;
}

function isPlacesSlug(slug: string) {
  return slug === "dia-danh";
}

export function LibraryPageView({ slug, locale }: { slug: string; locale: Locale }) {
  const page = getLibraryPage(slug, locale);
  if (!page) notFound();

  const bodyHtml = page.pdf ? page.bodyHtml : stripDuplicateTitle(page.bodyHtml, page.title);
  const contentVariant = isPlacesSlug(slug)
    ? "places"
    : isEssaySlug(slug, locale)
      ? "default"
      : "poetry";

  return (
    <ResourcesLayout locale={locale}>
      <article>
        <header className="mb-8">
          <h2 className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
            {page.title}
          </h2>
        </header>
        {page.pdf ? (
          <PdfViewer src={page.pdf} title={page.title} />
        ) : (
          <HtmlContent html={bodyHtml} variant={contentVariant} />
        )}
      </article>
    </ResourcesLayout>
  );
}
