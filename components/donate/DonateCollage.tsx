import Image from "next/image";
import type { Locale } from "@/lib/locale";

const ALT = {
  vi: "Lễ trao học bổng Quách Thị Trang 2025",
  en: "2025 Quach Thi Trang scholarship ceremony",
} as const;

export function DonateCollage({ locale }: { locale: Locale }) {
  return (
    <figure className="overflow-hidden rounded-lg border border-border/60 shadow-sm">
      <Image
        src="/images/2025-1.jpg"
        alt={ALT[locale]}
        width={645}
        height={381}
        className="h-auto w-full object-cover"
        sizes="(max-width: 1024px) 100vw, 28rem"
      />
    </figure>
  );
}
