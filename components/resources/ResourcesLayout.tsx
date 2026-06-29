import type { Locale } from "@/lib/locale";
import { PageTitle } from "@/components/PageTitle";
import { getResourcesIntro, getResourcesTitle } from "@/lib/resources";
import { LibraryNav } from "./LibraryNav";

export function ResourcesLayout({
  locale,
  showSubtitle = true,
  children,
}: {
  locale: Locale;
  showSubtitle?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-12 pt-16 sm:pt-20 lg:pt-24">
      <header className="max-w-2xl">
        <PageTitle>{getResourcesTitle(locale)}</PageTitle>
        {showSubtitle && (
          <p className="mt-3 font-serif text-base leading-relaxed text-muted-foreground sm:text-lg">
            {getResourcesIntro(locale)}
          </p>
        )}
      </header>

      <div className="mt-8 grid gap-8 sm:mt-10 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-24 lg:self-start lg:border-r lg:border-border/50 lg:pr-8">
          <LibraryNav locale={locale} />
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
