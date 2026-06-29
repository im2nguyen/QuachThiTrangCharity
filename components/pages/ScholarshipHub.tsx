import Image from "next/image";
import Link from "next/link";
import { ScholarshipLayout } from "@/components/scholarship/ScholarshipLayout";
import { getScholarshipHubCards } from "@/lib/home-content";
import type { Locale } from "@/lib/locale";

export function ScholarshipHub({ locale }: { locale: Locale }) {
  const cards = getScholarshipHubCards(locale);

  return (
    <ScholarshipLayout locale={locale}>
      <div className="space-y-6">
        {cards.map((item) => (
          <Link
            key={item.year}
            href={item.href}
            className="group grid overflow-hidden rounded-2xl bg-muted/30 transition-colors duration-200 hover:bg-muted/50 sm:grid-cols-[minmax(0,11rem)_1fr]"
          >
            {item.image && (
              <div className="relative aspect-[4/3] bg-muted sm:aspect-auto sm:min-h-[8rem]">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover transition duration-300 group-hover:brightness-[0.92]"
                  sizes="176px"
                />
              </div>
            )}
            <div className="flex flex-col justify-center p-4 sm:p-5">
              <p className="font-serif text-lg font-medium">{item.title}</p>
              {item.blurb && (
                <p className="mt-1 text-muted-foreground">{item.blurb}</p>
              )}
            </div>
          </Link>
        ))}
        {locale === "en" && (
          <Link
            href="/en/hoc-bong/2024/hue-recipients"
            className="inline-block text-sm text-primary underline-offset-2 hover:underline"
          >
            Hue Scholarship Recipients 2024
          </Link>
        )}
      </div>
    </ScholarshipLayout>
  );
}
