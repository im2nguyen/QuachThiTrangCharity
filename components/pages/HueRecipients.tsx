import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/MarkdownContent";
import { ScholarshipLayout } from "@/components/scholarship/ScholarshipLayout";
import { getHueRecipientsPage } from "@/lib/content";
import type { Locale } from "@/lib/locale";

const HUE_YEARS = new Set(["2020", "2024"]);

export function HueRecipientsView({
  year,
  locale = "vi",
}: {
  year: string;
  locale?: Locale;
}) {
  if (!HUE_YEARS.has(year)) notFound();
  const page = getHueRecipientsPage(year);
  if (!page) notFound();

  return (
    <ScholarshipLayout locale={locale} activeYear={year}>
      <MarkdownContent content={page.body} />
    </ScholarshipLayout>
  );
}
