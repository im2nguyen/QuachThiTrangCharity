"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/locale";

type GalleryLightboxProps = {
  images: string[];
  index: number;
  year: string;
  locale: Locale;
  open: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function GalleryLightbox({
  images,
  index,
  year,
  locale,
  open,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const src = images[index];
  const hasPrev = index > 0;
  const hasNext = index < images.length - 1;
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onNavigate(index - 1);
      if (e.key === "ArrowRight" && hasNext) onNavigate(index + 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, index, hasPrev, hasNext, onClose, onNavigate]);

  if (!src) return null;

  const alt =
    locale === "en"
      ? `${year} award ceremony, photo ${index + 1}`
      : `Lễ trao học bổng ${year}, ảnh ${index + 1}`;

  if (!mounted) return null;

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-[200] flex items-center justify-center transition-opacity duration-300 ease-out",
        open ? "opacity-100" : "pointer-events-none opacity-0"
      )}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      aria-hidden={!open}
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-black/90"
        onClick={onClose}
        aria-label={locale === "en" ? "Close gallery" : "Đóng ảnh"}
      />

      {hasPrev && (
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 z-10 size-10 -translate-y-1/2 cursor-pointer rounded-full border-0 bg-white/10 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20"
          onClick={() => onNavigate(index - 1)}
          aria-label={locale === "en" ? "Previous photo" : "Ảnh trước"}
        >
          <ChevronLeft className="size-6" />
        </Button>
      )}

      {hasNext && (
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 z-10 size-10 -translate-y-1/2 cursor-pointer rounded-full border-0 bg-white/10 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20"
          onClick={() => onNavigate(index + 1)}
          aria-label={locale === "en" ? "Next photo" : "Ảnh sau"}
        >
          <ChevronRight className="size-6" />
        </Button>
      )}

      <div className="relative z-[1] flex max-h-[90vh] max-w-[94vw] items-center justify-center p-4">
        <Image
          key={src}
          src={src}
          alt={alt}
          width={1920}
          height={1280}
          className={cn(
            "h-auto max-h-[min(90vh,1280px)] w-auto max-w-full cursor-default object-contain shadow-2xl transition-all duration-300 ease-out animate-in fade-in-0 zoom-in-95",
            open ? "scale-100 opacity-100" : "scale-[0.97] opacity-0"
          )}
          sizes="94vw"
          priority
          style={{ width: "min(94vw, 1200px)", height: "auto" }}
        />
      </div>
    </div>,
    document.body
  );
}
