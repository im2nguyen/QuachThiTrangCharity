import { getResourcesIntroContent } from "@/lib/content";
import type { Locale } from "@/lib/locale";

const bodyTextClassName =
  "font-serif text-base leading-relaxed text-foreground/90";
const forewordHeadingClassName =
  "font-sans text-xl font-semibold uppercase tracking-tight text-foreground sm:text-2xl";

export function ResourcesIntroBlurb({ locale }: { locale: Locale }) {
  const content = getResourcesIntroContent(locale);

  return (
    <section className="space-y-6 border-b border-border/60 pb-10">
      <p className={bodyTextClassName}>{content.intro}</p>

      <div className="space-y-4">
        <p className={bodyTextClassName}>{content.forewordLeadIn}</p>

        <h2 className={forewordHeadingClassName}>{content.forewordTitle}</h2>

        <div className={`space-y-4 ${bodyTextClassName}`}>
          {content.forewordParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>

        <div className={`space-y-1 ${bodyTextClassName}`}>
          {content.forewordClosing.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
