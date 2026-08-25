import type { Locale } from "@/lib/locale";

export type ContentVariant = "default" | "poetry" | "places" | "mission" | "pdf";

export type LibraryPage = {
  slug: string;
  locale: Locale;
  title: string;
  section: string;
  variant: ContentVariant;
  body: string;
  pdf?: string;
};

export type ScholarshipYear = {
  year: number;
  title: string;
  body: string;
  images: string[];
  pdfs: { label: string; href: string }[];
  pressHref?: string;
  pressLabel?: string;
  recipientsTable?: boolean;
};

export type NewsArticle = {
  year: number;
  title: string;
  body: string;
  scholarshipHref: string;
  pdfHref?: string;
  pdfLabel?: string;
  pressHref?: string;
  pressLabel?: string;
};

export type HueRecipientsPage = {
  year: number;
  title: string;
  body: string;
};

export type ResourcesIntroContent = {
  intro: string;
  forewordLeadIn: string;
  forewordTitle: string;
  forewordParagraphs: string[];
  forewordClosing: string[];
};

export type RecipientRow = {
  type: "special" | "standard";
  school: string;
  student: string;
};

export type RecipientType = RecipientRow["type"];
