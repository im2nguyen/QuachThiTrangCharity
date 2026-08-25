import fs from "fs";
import path from "path";
import matter from "gray-matter";
import "server-only";
import type { Locale } from "@/lib/locale";
import { scholarshipYears as manifestYears } from "@/lib/content-manifest";
import type {
  ContentVariant,
  HueRecipientsPage,
  LibraryPage,
  NewsArticle,
  RecipientRow,
  ResourcesIntroContent,
  ScholarshipYear,
} from "@/lib/content-types";

export type {
  ContentVariant,
  HueRecipientsPage,
  LibraryPage,
  NewsArticle,
  RecipientRow,
  RecipientType,
  ResourcesIntroContent,
  ScholarshipYear,
} from "@/lib/content-types";

const CONTENT = path.join(process.cwd(), "content");

function readMd<T extends Record<string, unknown>>(filePath: string) {
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { data: data as T, content: content.trim() };
}

function listMdFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => path.join(dir, f));
}

export function getLibraryPage(slug: string, locale: Locale): LibraryPage | undefined {
  const parsed = readMd<{
    title: string;
    section?: string;
    variant?: ContentVariant;
    pdf?: string;
  }>(path.join(CONTENT, "library", locale, `${slug}.md`));
  if (!parsed) return undefined;
  return {
    slug,
    locale,
    title: parsed.data.title,
    section: parsed.data.section ?? "I",
    variant: parsed.data.variant ?? "poetry",
    body: parsed.content,
    pdf: parsed.data.pdf,
  };
}

export function getLibrarySlugs(locale: Locale): string[] {
  return listMdFiles(path.join(CONTENT, "library", locale)).map(
    (f) => path.basename(f, ".md")
  );
}

export function getScholarshipYear(year: string): ScholarshipYear | undefined {
  const parsed = readMd<{
    year: number;
    title: string;
    images?: string[];
    pdfs?: { label: string; href: string }[];
    recipientsTable?: boolean;
  }>(path.join(CONTENT, "scholarships", `${year}.md`));
  if (!parsed) return undefined;
  return {
    year: parsed.data.year,
    title: parsed.data.title,
    body: parsed.content,
    images: parsed.data.images ?? [],
    pdfs: parsed.data.pdfs ?? [],
    recipientsTable: parsed.data.recipientsTable,
  };
}

export function getHomeMission(locale: Locale): { body: string; variant: ContentVariant } {
  const parsed = readMd<{ variant?: ContentVariant }>(
    path.join(CONTENT, "home", locale, "mission.md")
  );
  return {
    body: parsed?.content ?? "",
    variant: parsed?.data.variant ?? "mission",
  };
}

export function getNewsArticles(locale: Locale): NewsArticle[] {
  const dir = path.join(CONTENT, "news", locale);
  const articles: NewsArticle[] = [];
  for (const file of listMdFiles(dir)) {
    const parsed = readMd<{
      year: number;
      title: string;
      scholarshipHref: string;
      pdfHref?: string;
      pdfLabel?: string;
      pressHref?: string;
      pressLabel?: string;
    }>(file);
    if (!parsed) continue;
    articles.push({
      year: parsed.data.year,
      title: parsed.data.title,
      body: parsed.content,
      scholarshipHref: parsed.data.scholarshipHref,
      pdfHref: parsed.data.pdfHref,
      pdfLabel: parsed.data.pdfLabel,
      pressHref: parsed.data.pressHref,
      pressLabel: parsed.data.pressLabel,
    });
  }
  return articles.sort((a, b) => b.year - a.year);
}

export function getHueRecipientsPage(year: string): HueRecipientsPage | undefined {
  const parsed = readMd<{ year: number; title: string }>(
    path.join(CONTENT, "hue-recipients", `${year}.md`)
  );
  if (!parsed) return undefined;
  return {
    year: parsed.data.year,
    title: parsed.data.title,
    body: parsed.content,
  };
}

export function getResourcesIntroContent(locale: Locale): ResourcesIntroContent {
  const parsed = readMd<ResourcesIntroContent>(
    path.join(CONTENT, "pages", locale, "resources-intro.md")
  );
  if (!parsed) {
    return {
      intro: "",
      forewordLeadIn: "",
      forewordTitle: "",
      forewordClosing: [],
      forewordParagraphs: [],
    };
  }
  return parsed.data;
}

export function getRecipients2025(): RecipientRow[] {
  const file = path.join(CONTENT, "data", "recipients-2025.json");
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export function listScholarshipYears(): number[] {
  return manifestYears;
}
