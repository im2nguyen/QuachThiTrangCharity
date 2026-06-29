import { galleryByYear } from "@/content";
import type { Locale } from "@/lib/locale";

export type GalleryEvent = {
  year: string;
  title: string;
  images: string[];
  cover: string;
  hocBongHref: string;
};

function isCeremonyPhoto(src: string) {
  return (
    !src.includes("/icons/") &&
    !src.includes("devider") &&
    !src.includes("logo1")
  );
}

export function filterGalleryImages(images: string[]) {
  return images.filter(isCeremonyPhoto);
}

export function getGallerySectionTitle(locale: Locale) {
  return locale === "en" ? "Award Ceremony" : "Lễ Trao Học Bổng";
}

export function getGalleryEventTitle(year: string, locale: Locale) {
  return `${getGallerySectionTitle(locale)} ${year}`;
}

export function getGalleryEvents(locale: Locale): GalleryEvent[] {
  const prefix = locale === "en" ? "/en/hoc-bong" : "/hoc-bong";

  return Object.keys(galleryByYear)
    .sort((a, b) => Number(b) - Number(a))
    .map((year) => {
      const images = filterGalleryImages(galleryByYear[year] || []);
      return {
        year,
        title: getGalleryEventTitle(year, locale),
        images,
        cover: images[0] ?? "",
        hocBongHref: `${prefix}/${year}`,
      };
    })
    .filter((event) => event.images.length > 0);
}
