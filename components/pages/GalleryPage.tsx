import { GalleryView } from "@/components/gallery/GalleryView";
import { getGalleryEvents } from "@/lib/gallery";
import type { Locale } from "@/lib/locale";

export function GalleryPage({ locale }: { locale: Locale }) {
  const events = getGalleryEvents(locale);
  return <GalleryView locale={locale} events={events} />;
}
