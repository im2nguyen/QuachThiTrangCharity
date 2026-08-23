import type { Locale } from "@/lib/locale";
import { getGalleryEvents } from "@/lib/gallery";
import { libraryHref } from "@/lib/navigation";
import {
  scholarshipYears,
  getScholarshipImages,
  getScholarshipSummaries,
} from "@/lib/content-manifest";

export type HomeYearSection = {
  year: string;
  title: string;
  blurb: string;
  href: string;
  images: string[];
};

export function getHomeYearSections(locale: Locale, limit = 6): HomeYearSection[] {
  const summaries = getScholarshipSummaries(locale);
  return getGalleryEvents(locale)
    .slice(0, limit)
    .map((event) => ({
      year: event.year,
      title: event.title,
      blurb: summaries[Number(event.year)]?.blurb ?? "",
      href: event.hocBongHref,
      images: event.images,
    }));
}

export type NewsTeaser = {
  year: number;
  title: string;
  blurb: string;
  image: string;
  href: string;
};

export type ScholarshipYearLink = {
  year: number;
  image?: string;
  href: string;
};

export type FeaturedResourceGroup = {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
};

function normalizeImageSrc(src: string): string {
  return src.replace(/^-\s+/, "").trim();
}

function isCeremonyImageSrc(src: string): boolean {
  return (
    src.startsWith("/") &&
    !src.includes("/icons/") &&
    !src.includes("devider") &&
    !src.includes("danhsach")
  );
}

export function ceremonyImage(images: string[]): string | undefined {
  return images.map(normalizeImageSrc).find(isCeremonyImageSrc);
}

export function getHeroCeremonyImages(year = 2025, limit = 4): string[] {
  return getScholarshipImages(year)
    .map(normalizeImageSrc)
    .filter(isCeremonyImageSrc)
    .slice(0, limit);
}

export function getNewsTeasers(locale: Locale, years = [2026, 2025, 2024, 2023]): NewsTeaser[] {
  const summaries = getScholarshipSummaries(locale);
  const base = locale === "en" ? "/en/hoc-bong" : "/hoc-bong";
  return years
    .map((year) => {
      const copy = summaries[year];
      const images = getScholarshipImages(year);
      const image = ceremonyImage(images);
      if (!copy || !image) return null;
      return {
        year,
        title: copy.title,
        blurb: copy.blurb,
        image,
        href: `${base}/${year}`,
      };
    })
    .filter((t): t is NewsTeaser => t !== null);
}

export function getScholarshipHubCards(locale: Locale) {
  const summaries = getScholarshipSummaries(locale);
  const links = getScholarshipYearLinks(locale);
  return links.map(({ year, image, href }) => {
    const copy = summaries[year];
    return {
      year,
      image,
      href,
      title:
        copy?.title ??
        (locale === "en"
          ? `Quach Thi Trang Scholarship Ceremony ${year}`
          : `Lễ trao học bổng Quách Thị Trang năm ${year}`),
      blurb: copy?.blurb,
    };
  });
}

export function getScholarshipYearLinks(locale: Locale): ScholarshipYearLink[] {
  const base = locale === "en" ? "/en/hoc-bong" : "/hoc-bong";
  return scholarshipYears.map((year) => {
    const images = getScholarshipImages(year);
    return {
      year,
      image: ceremonyImage(images),
      href: `${base}/${year}`,
    };
  });
}

export function getFeaturedResources(locale: Locale): FeaturedResourceGroup[] {
  const p = locale === "en" ? "/en" : "";
  return [
    {
      title:
        locale === "en"
          ? "Poetry & music in memory of Quach Thi Trang"
          : "Thơ nhạc tưởng niệm",
      links: [
        { label: locale === "en" ? "Remembering Trang" : "Nhớ Trang", href: libraryHref("nho-trang", locale === "en" ? "en" : "vi") },
        { label: locale === "en" ? "A Small Star" : "Một vì sao nhỏ", href: libraryHref("mot-vi-sao-nho", locale) },
        { label: "EM CÒN SỐNG MÃI", href: libraryHref("em-con-song-mai", locale) },
        { label: locale === "en" ? "Em Là Vì Sao Sáng (music)" : "Nhạc EM LÀ VÌ SAO SÁNG", href: libraryHref("nhac-em-la-vi-sao-sang", locale) },
        { label: "QUÁCH THỊ TRANG", href: libraryHref("quach-thi-trang", locale) },
      ],
    },
    {
      title: locale === "en" ? "Essays & poetry collections" : "Khảo luận & tập thơ",
      links: [
        {
          label: locale === "en" ? "Reading Em Là Vì Sao Sáng" : "Đọc tập thơ EM LÀ VÌ SAO SÁNG",
          href: libraryHref("doc-tho-em-la-vi-sao-sang", locale),
        },
        {
          label: locale === "en" ? "Poetry collection (3rd ed.)" : "Toàn tập thơ (tái bản lần 3)",
          href: libraryHref("tap-tho-qtt-2024", locale),
        },
        {
          label: locale === "en" ? "Flip book — poetry pages" : "Tập thơ (Flip Book)",
          href: "https://online.fliphtml5.com/hywuc/azpp/",
          external: true,
        },
      ],
    },
    {
      title: locale === "en" ? "Also visit" : "Khám phá thêm",
      links: [
        { label: locale === "en" ? "Gallery" : "Hình Ảnh", href: `${p}/hinh-anh` },
        { label: locale === "en" ? "Resources" : "Tư liệu", href: `${p}/tai-lieu` },
        { label: locale === "en" ? "Donate" : "Ủng hộ", href: `${p}/donate` },
        { label: locale === "en" ? "Contact" : "Liên Lạc", href: `${p}/contact` },
      ],
    },
  ];
}
