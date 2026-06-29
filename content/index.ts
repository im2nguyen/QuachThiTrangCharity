import type { Locale } from "@/lib/locale";

export type LibraryPage = {
  slug: string;
  locale: Locale;
  legacyFile: string;
  title: string;
  bodyHtml: string;
  pdf?: string;
};

export type ScholarshipYear = {
  year: number;
  legacyFile: string;
  title: string;
  bodyHtml: string;
  images: string[];
  pdfs: { label: string; href: string }[];
};

import libraryData from "./library.json";
import scholarshipsData from "./scholarships.json";
import galleryData from "./gallery.json";
import homeData from "./home.json";

export const libraryPages = libraryData as LibraryPage[];
export const scholarships = scholarshipsData as Record<string, ScholarshipYear>;
export const galleryByYear = galleryData as Record<string, string[]>;
export const homeContent = homeData as {
  vi: { title: string; bodyHtml: string; missionHtml: string };
  en: { title: string; bodyHtml: string; missionHtml: string };
};

export function getLibraryPage(slug: string, locale: Locale): LibraryPage | undefined {
  return libraryPages.find((p) => p.slug === slug && p.locale === locale);
}

export function getLibrarySlugs(locale: Locale): string[] {
  return Array.from(new Set(libraryPages.filter((p) => p.locale === locale).map((p) => p.slug)));
}

export function getScholarshipYear(year: string): ScholarshipYear | undefined {
  return scholarships[year];
}

export const scholarshipYears = Object.keys(scholarships)
  .map(Number)
  .sort((a, b) => b - a);
