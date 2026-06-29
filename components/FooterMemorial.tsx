import Image from "next/image";
import { PoemQuote } from "@/components/home/PoemQuote";
import { MEMORIAL_QUOTE } from "@/lib/memorial-quote";
import type { Locale } from "@/lib/locale";

const CONTACT_EMAIL = "admin@quachthitrangcharity.com";

export function FooterMemorial({ locale }: { locale: Locale }) {
  const quote = MEMORIAL_QUOTE[locale];

  return (
    <section className="relative bg-background">
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-4 px-5 pt-4 pb-3 sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:pt-5 sm:pb-4">
        <div className="min-w-0">
          <PoemQuote
            lines={quote.lines}
            author={quote.attribution}
            variant="footer"
          />
          {quote.translationNote && (
            <p className="mt-1 text-left text-xs text-muted-foreground">
              {quote.translationNote}
            </p>
          )}
        </div>

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="shrink-0 text-sm text-muted-foreground transition-colors hover:text-foreground sm:text-right"
        >
          {CONTACT_EMAIL}
        </a>
      </div>

      <figure className="relative -mt-1 aspect-[21/9] max-h-[16rem] w-full overflow-hidden bg-background sm:-mt-2 sm:max-h-[20rem] lg:max-h-[24rem]">
        <Image
          src="/images/QuachThTrang2020.jpg"
          alt={
            locale === "en"
              ? "Quach Thi Trang memorial statue in Bach Tung Diep park"
              : "Tượng đài Quách Thị Trang tại công viên Bách Tùng Diệp"
          }
          fill
          className="object-cover object-center [mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.15)_18%,rgba(0,0,0,0.45)_32%,rgba(0,0,0,0.78)_44%,black_58%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.15)_18%,rgba(0,0,0,0.45)_32%,rgba(0,0,0,0.78)_44%,black_58%)]"
          sizes="100vw"
        />
      </figure>
    </section>
  );
}
