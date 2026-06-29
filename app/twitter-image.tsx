import {
  createOgBrandImage,
  ogImageAlt,
  ogImageContentType,
  ogImageSize,
} from "@/lib/og-brand-image";

export const runtime = "nodejs";

export const alt = ogImageAlt;
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default createOgBrandImage;
