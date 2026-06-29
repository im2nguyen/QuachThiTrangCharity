"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import type { Locale } from "@/lib/locale";

type PhotoItem = { src: string; year: string };

export function HomeParallaxPhotos({
  locale,
  yearSections,
  scrollProgress,
  year,
  variant = "parallax",
}: {
  locale: Locale;
  yearSections: { year: string; images: string[] }[];
  scrollProgress: number;
  year?: string;
  variant?: "parallax" | "stack";
}) {
  const isStack = variant === "stack";
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const photos = useMemo<PhotoItem[]>(
    () =>
      yearSections.flatMap((section) => {
        const images = isStack
          ? section.images.slice(0, 1)
          : section.images.slice(0, 3);
        return images.map((src) => ({ src, year: section.year }));
      }),
    [isStack, yearSections]
  );

  const measure = useCallback(() => {
    if (isStack) {
      setTranslateY(0);
      return;
    }
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const maxOffset = Math.max(track.scrollHeight - viewport.clientHeight, 0);
    setTranslateY(scrollProgress * maxOffset);
  }, [isStack, scrollProgress]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure, photos.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const frame = requestAnimationFrame(() => setLightboxOpen(true));
    return () => cancelAnimationFrame(frame);
  }, [lightboxIndex]);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    window.setTimeout(() => setLightboxIndex(null), 280);
  }, []);

  if (photos.length === 0) return null;

  const lightboxImages = photos.map((photo) => photo.src);

  return (
    <>
      <div className="relative overflow-visible">
        {year && !isStack && (
          <>
            <p
              className="pointer-events-none absolute top-3 right-full mr-2 hidden select-none whitespace-nowrap font-sans text-[2.75rem] font-bold leading-none tabular-nums tracking-tight text-foreground/15 lg:block xl:mr-2.5 xl:text-[3.25rem]"
              aria-hidden
            >
              {year}
            </p>
            <p
              className="pointer-events-none absolute left-3 top-3 z-10 select-none font-sans text-[2rem] font-bold leading-none tabular-nums tracking-tight text-foreground/20 lg:hidden"
              aria-hidden
            >
              {year}
            </p>
          </>
        )}

        <div
          ref={viewportRef}
          className={
            isStack
              ? "relative w-full"
              : "relative h-[min(52vh,28rem)] w-full overflow-hidden lg:h-[calc(100svh-8rem)]"
          }
        >
          <div
            ref={trackRef}
            className={
              isStack
                ? "flex flex-col gap-3"
                : "flex flex-col gap-3 will-change-transform"
            }
            style={
              isStack
                ? undefined
                : { transform: `translate3d(0, -${translateY}px, 0)` }
            }
          >
            {photos.map((photo, i) => (
              <button
                key={`${photo.year}-${photo.src}`}
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="block w-full cursor-pointer overflow-hidden rounded-2xl bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Image
                  src={photo.src}
                  alt={
                    locale === "en"
                      ? `${photo.year} award ceremony photo`
                      : `Ảnh lễ trao học bổng ${photo.year}`
                  }
                  width={800}
                  height={600}
                  className="h-auto w-full transition duration-300 ease-out hover:brightness-[0.92]"
                  sizes="(max-width: 1024px) 100vw, 24rem"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <GalleryLightbox
          images={lightboxImages}
          index={lightboxIndex}
          year={photos[lightboxIndex]?.year ?? ""}
          locale={locale}
          open={lightboxOpen}
          onClose={closeLightbox}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
