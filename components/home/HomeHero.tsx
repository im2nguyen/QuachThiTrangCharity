import Image from "next/image";
import { PoemQuote } from "./PoemQuote";
import { HOME_HERO_QUOTE } from "@/lib/home-quote";
import type { Locale } from "@/lib/locale";

export function HomeHero({ locale }: { locale: Locale }) {
  const quote = HOME_HERO_QUOTE[locale];

  return (
    <section className="mx-auto max-w-6xl px-5 pt-6 sm:pt-8 lg:pt-10">
      <div className="relative overflow-hidden rounded-2xl bg-lam-900">
        <Image
          src="/images/hero.png"
          alt={
            locale === "en"
              ? "Scholarship recipients at the Quach Thi Trang memorial ceremony"
              : "Học sinh nhận học bổng tại lễ tưởng niệm Quách Thị Trang"
          }
          width={770}
          height={341}
          priority
          className="h-auto w-full"
          sizes="(max-width: 1152px) 100vw, 1152px"
        />

        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent sm:from-black/60 sm:via-black/15"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/20"
        />

        <div className="absolute inset-0 flex items-start justify-start p-5 sm:p-7 lg:p-8">
          <div className="max-w-[18rem] sm:max-w-sm lg:max-w-md">
            <PoemQuote
              lines={quote.lines}
              author={quote.attribution}
              variant="hero"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
