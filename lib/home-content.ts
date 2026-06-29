import type { Locale } from "@/lib/locale";
import { getGalleryEvents } from "@/lib/gallery";
import { libraryHref } from "@/lib/navigation";
import { scholarships, scholarshipYears } from "@/content";

export type HomeYearSection = {
  year: string;
  title: string;
  blurb: string;
  href: string;
  images: string[];
};

export function getHomeYearSections(locale: Locale, limit = 6): HomeYearSection[] {
  return getGalleryEvents(locale)
    .slice(0, limit)
    .map((event) => ({
      year: event.year,
      title: event.title,
      blurb: NEWS_COPY[locale][Number(event.year)]?.blurb ?? "",
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

const NEWS_COPY: Record<Locale, Record<number, { title: string; blurb: string }>> = {
  vi: {
    2025: {
      title: "Lễ trao học bổng Quách Thị Trang năm 2025",
      blurb: "Trao học bổng lần 12 — 123 suất.",
    },
    2024: {
      title: "Lễ trao học bổng Quách Thị Trang năm 2024",
      blurb: "Trao học bổng lần thứ 11 — 129 nữ sinh.",
    },
    2023: {
      title: "Lễ trao học bổng Quách Thị Trang năm 2023",
      blurb: "94 nữ sinh nhận học bổng lần 10.",
    },
    2022: {
      title: "Lễ trao học bổng Quách Thị Trang năm 2022",
      blurb: "109 nữ sinh nhận học bổng lần 9.",
    },
    2021: {
      title: "Lễ trao học bổng Quách Thị Trang năm 2021",
      blurb: "56 nữ sinh nhận học bổng lần 8.",
    },
    2020: {
      title: "Lễ trao học bổng Quách Thị Trang năm 2020",
      blurb: "26 học sinh nhận học bổng lần 7.",
    },
  },
  en: {
    2025: {
      title: "Quach Thi Trang Scholarship Ceremony 2025",
      blurb: "12th annual awards — 123 scholarships.",
    },
    2024: {
      title: "Quach Thi Trang Scholarship Ceremony 2024",
      blurb: "11th annual awards — 129 recipients.",
    },
    2023: {
      title: "Quach Thi Trang Scholarship Ceremony 2023",
      blurb: "94 recipients received the 10th annual awards.",
    },
    2022: {
      title: "Quach Thi Trang Scholarship Ceremony 2022",
      blurb: "109 recipients received the 9th annual awards.",
    },
    2021: {
      title: "Quach Thi Trang Scholarship Ceremony 2021",
      blurb: "56 recipients received the 8th annual awards.",
    },
    2020: {
      title: "Quach Thi Trang Scholarship Ceremony 2020",
      blurb: "26 recipients received the 7th annual awards.",
    },
  },
};

export function ceremonyImage(images: string[]): string | undefined {
  return images.find(
    (src) =>
      !src.includes("/icons/") &&
      !src.includes("devider") &&
      !src.includes("danhsach")
  );
}

export function getHeroCeremonyImages(year = 2025, limit = 4): string[] {
  const data = scholarships[String(year)];
  if (!data) return [];
  return data.images
    .filter(
      (src) =>
        !src.includes("/icons/") &&
        !src.includes("devider") &&
        !src.includes("danhsach")
    )
    .slice(0, limit);
}

export function getNewsTeasers(locale: Locale, years = [2025, 2024, 2023, 2022]): NewsTeaser[] {
  const base = locale === "en" ? "/en/hoc-bong" : "/hoc-bong";
  return years
    .map((year) => {
      const copy = NEWS_COPY[locale][year];
      const data = scholarships[String(year)];
      const image = data ? ceremonyImage(data.images) : undefined;
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
  const links = getScholarshipYearLinks(locale);
  return links.map(({ year, image, href }) => {
    const copy = NEWS_COPY[locale][year];
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
    const data = scholarships[String(year)];
    return {
      year,
      image: data ? ceremonyImage(data.images) : undefined,
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
        { label: locale === "en" ? "Contact" : "Liên lạc", href: `${p}/contact` },
      ],
    },
  ];
}
