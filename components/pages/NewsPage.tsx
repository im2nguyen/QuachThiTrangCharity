import Link from "next/link";
import { PageTitle } from "@/components/PageTitle";
import { getNewsArticles } from "@/lib/content";
import type { Locale } from "@/lib/locale";

const COPY = {
  vi: {
    title: "Tin Tức",
    description: "Tin học bổng và hoạt động của Quỹ Quách Thị Trang",
    scholarshipLink: "Xem trang học bổng",
  },
  en: {
    title: "News",
    description: "Scholarship news and foundation activities",
    scholarshipLink: "View scholarship page",
  },
} as const;

export function NewsPageView({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  const articles = getNewsArticles(locale);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:pt-20 lg:pt-24">
      <header className="max-w-2xl">
        <PageTitle>{copy.title}</PageTitle>
        <p className="mt-3 font-serif text-base leading-relaxed text-muted-foreground sm:text-lg">
          {copy.description}
        </p>
      </header>

      <div className="mt-10 max-w-3xl space-y-12 sm:mt-12">
        {articles.map((article, index) => (
          <article
            key={article.year}
            className={index > 0 ? "border-t border-border/60 pt-12" : undefined}
          >
            <h2 className="font-serif text-lg font-semibold italic text-foreground sm:text-xl">
              {article.title}
            </h2>
            <div className="mt-4 space-y-4">
              {article.body.split(/\n\n+/).map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="font-serif text-sm leading-relaxed text-foreground/90 sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <Link
                href={article.scholarshipHref}
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
              >
                {copy.scholarshipLink} {article.year} →
              </Link>
              {article.pdfHref && article.pdfLabel && (
                <a
                  href={article.pdfHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  {article.pdfLabel}
                </a>
              )}
              {article.pressHref && article.pressLabel && (
                <a
                  href={article.pressHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  {article.pressLabel}
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
