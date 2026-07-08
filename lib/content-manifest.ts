import galleryData from "@/content/data/gallery.json";
import scholarshipYearsData from "@/content/data/scholarship-years.json";
import scholarshipImagesData from "@/content/data/scholarship-images.json";
import scholarshipSummariesData from "@/content/data/scholarship-summaries.json";
import type { Locale } from "@/lib/locale";

/** Client-safe static content manifests (no filesystem access). */
export const galleryByYear = galleryData as Record<string, string[]>;
export const scholarshipYears = scholarshipYearsData as number[];

export function getScholarshipImages(year: string | number): string[] {
  return (scholarshipImagesData as Record<string, string[]>)[String(year)] ?? [];
}

export function getScholarshipSummaries(locale: Locale): Record<
  number,
  { title: string; blurb: string }
> {
  return (scholarshipSummariesData as Record<Locale, Record<number, { title: string; blurb: string }>>)[
    locale
  ];
}
