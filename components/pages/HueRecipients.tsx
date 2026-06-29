import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { HtmlContent } from "@/components/HtmlContent";
import { ScholarshipLayout } from "@/components/scholarship/ScholarshipLayout";
import type { Locale } from "@/lib/locale";

const FILES: Record<string, string> = {
  "2024": "recipients2024.htm",
  "2020": "recipients2020.htm",
};

export function HueRecipientsView({
  year,
  locale = "vi",
}: {
  year: string;
  locale?: Locale;
}) {
  const file = FILES[year];
  if (!file) notFound();
  const fp = path.join(process.cwd(), "..", "Original-QuachThiTrangCharity", file);
  if (!fs.existsSync(fp)) notFound();
  const html = fs.readFileSync(fp, "utf8");

  return (
    <ScholarshipLayout locale={locale} activeYear={year}>
      <HtmlContent html={html} />
    </ScholarshipLayout>
  );
}
