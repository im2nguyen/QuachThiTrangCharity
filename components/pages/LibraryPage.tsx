import { notFound } from "next/navigation";
import { ResourcesLayout } from "@/components/resources/ResourcesLayout";
import { PdfViewer } from "@/components/resources/PdfViewer";
import { MarkdownContent } from "@/components/MarkdownContent";
import { getLibraryPage } from "@/lib/content";
import type { Locale } from "@/lib/locale";

export function LibraryPageView({ slug, locale }: { slug: string; locale: Locale }) {
  const page = getLibraryPage(slug, locale);
  if (!page) notFound();

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
          <MarkdownContent content={page.body} variant={page.variant} />
        )}
      </article>
    </ResourcesLayout>
  );
}
