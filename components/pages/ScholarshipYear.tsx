import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MarkdownContent } from "@/components/MarkdownContent";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { ScholarshipLayout } from "@/components/scholarship/ScholarshipLayout";
import { getScholarshipYear, getRecipients2025 } from "@/lib/content";
import { filterGalleryImages } from "@/lib/gallery";
import { RecipientsTable } from "@/components/scholarship/RecipientsTable";
import type { Locale } from "@/lib/locale";

export function ScholarshipYearPage({ year, locale }: { year: string; locale: Locale }) {
  const data = getScholarshipYear(year);
  if (!data) notFound();

  const images = filterGalleryImages(data.images);
  const pageTitle =
    locale === "en"
      ? `Quach Thi Trang Scholarship ${year}`
      : `Học Bổng Quách Thị Trang ${year}`;
  const recipients2025 = data.recipientsTable ? getRecipients2025() : null;

  return (
    <ScholarshipLayout locale={locale} activeYear={year}>
      <div
        className={
          images.length > 0
            ? "grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]"
            : "space-y-8"
        }
      >
        <div className="min-w-0 space-y-8">
          <MarkdownContent content={data.body} />

          {data.pdfs.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {data.pdfs.map((p) => (
                <Button key={p.href} asChild>
                  <Link href={p.href}>{p.label.replace(/^\*\s*/, "")}</Link>
                </Button>
              ))}
            </div>
          )}

          {data.pressHref && data.pressLabel ? (
            <p>
              <a
                href={data.pressHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
              >
                {data.pressLabel}
              </a>
            </p>
          ) : null}

          {recipients2025 && recipients2025.length > 0 ? (
            <RecipientsTable
              rows={recipients2025}
              locale={locale === "en" ? "en" : "vi"}
            />
          ) : null}
        </div>

        {images.length > 0 && (
          <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            <GalleryGrid
              images={images}
              year={year}
              locale={locale}
              layout="sidebar"
            />
          </aside>
        )}
      </div>
    </ScholarshipLayout>
  );
}
