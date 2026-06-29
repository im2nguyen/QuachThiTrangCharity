"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Locale } from "@/lib/locale";
import { cn } from "@/lib/utils";
import { GalleryLightbox } from "./GalleryLightbox";

type GalleryGridProps = {
  images: string[];
  year: string;
  locale: Locale;
  /** `page` = masonry grid; `sidebar` = single vertical column */
  layout?: "page" | "sidebar";
  className?: string;
};

export function GalleryGrid({
  images,
  year,
  locale,
  layout = "page",
  className,
}: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    setLightboxOpen(false);
    setLightboxIndex(null);
  }, [images]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const frame = requestAnimationFrame(() => setLightboxOpen(true));
    return () => cancelAnimationFrame(frame);
  }, [lightboxIndex]);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    window.setTimeout(() => setLightboxIndex(null), 280);
  }, []);

  if (images.length === 0) return null;

  const gridClass =
    layout === "sidebar"
      ? "flex flex-col gap-4"
      : "columns-2 gap-4 lg:columns-3";
  const imageSizes =
    layout === "sidebar"
      ? "(max-width: 1024px) 100vw, 416px"
      : className?.includes("columns-2") && !className.includes("lg:columns-3")
        ? "(max-width: 1024px) 50vw, 200px"
        : "(max-width: 1024px) 50vw, 33vw";

  return (
    <>
      <div className={cn(gridClass, className)}>
        {images.map((src, i) => {
          const alt =
            locale === "en"
              ? `${year} award ceremony, photo ${i + 1}`
              : `Lễ trao học bổng ${year}, ảnh ${i + 1}`;

          return (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => openLightbox(i)}
              className={cn(
                "group block w-full cursor-pointer overflow-hidden rounded-2xl bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                layout === "page" && "mb-4 break-inside-avoid"
              )}
            >
              <Image
                src={src}
                alt={alt}
                width={800}
                height={600}
                className="h-auto w-full transition duration-300 ease-out group-hover:scale-[1.02] group-hover:brightness-[0.92]"
                sizes={imageSizes}
              />
            </button>
          );
        })}
      </div>

      {lightboxIndex !== null && (
        <GalleryLightbox
          images={images}
          index={lightboxIndex}
          year={year}
          locale={locale}
          open={lightboxOpen}
          onClose={closeLightbox}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
