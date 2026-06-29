import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/locale";
import { getNewsTeasers } from "@/lib/home-content";
import { Card, CardContent } from "@/components/ui/card";

export function NewsTeaserGrid({ locale }: { locale: Locale }) {
  const teasers = getNewsTeasers(locale);
  const hub = locale === "en" ? "/en/news" : "/tin-tuc";

  return (
    <section className="mt-14 border-t border-border/60 pt-14">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
        <h2 className="font-serif text-xl font-semibold">
          {locale === "en" ? "News & activities" : "Tin tức sinh hoạt"}
        </h2>
        <Link href={hub} className="text-sm text-primary underline-offset-2 hover:underline">
          {locale === "en" ? "All news →" : "Tất cả tin tức →"}
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {teasers.map((item) => (
          <Link key={item.year} href={item.href} className="group">
            <Card className="overflow-hidden transition hover:border-primary/50">
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover transition group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <CardContent className="space-y-1 p-4">
                <p className="font-serif font-medium leading-snug group-hover:text-primary">
                  {item.title}
                </p>
                <p className="text-sm text-muted-foreground">{item.blurb}</p>
                <p className="text-sm text-primary">
                  {locale === "en" ? "Read more →" : "Xem tiếp →"}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
