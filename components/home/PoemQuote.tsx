export function PoemQuote({
  lines,
  author,
  variant = "sidebar",
}: {
  lines: readonly string[];
  author: string;
  variant?: "sidebar" | "centered" | "hero" | "footer";
}) {
  if (variant === "hero") {
    return (
      <figure className="text-left">
        <blockquote className="font-serif text-lg italic leading-snug text-white drop-shadow-[0_1px_12px_rgba(0,0,0,0.45)] sm:text-xl sm:leading-relaxed lg:text-2xl">
          {lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </blockquote>
        <figcaption className="mt-3 font-sans text-[0.65rem] uppercase tracking-[0.22em] text-white/80 drop-shadow-sm sm:text-xs">
          {author}
        </figcaption>
      </figure>
    );
  }

  if (variant === "footer") {
    return (
      <figure className="text-left">
        <blockquote className="font-serif text-base italic leading-snug text-[#538b01] sm:text-lg">
          {lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </blockquote>
        <figcaption className="mt-1.5 font-sans text-xs uppercase tracking-[0.18em] text-muted-foreground sm:text-sm">
          {author}
        </figcaption>
      </figure>
    );
  }

  if (variant === "centered") {
    return (
      <figure className="my-8 text-center">
        <blockquote className="font-serif text-base italic leading-relaxed text-[#538b01] sm:text-lg">
          {lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </blockquote>
        <figcaption className="mt-3 font-sans text-xs uppercase tracking-[0.18em] text-muted-foreground sm:text-sm">
          {author}
        </figcaption>
      </figure>
    );
  }

  return (
    <figure>
      <blockquote className="border-l-2 border-primary/40 pl-4">
        <p className="font-serif text-base italic leading-relaxed text-foreground sm:text-lg">
          {lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </blockquote>
      <figcaption className="mt-2 pl-4 font-sans text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {author}
      </figcaption>
    </figure>
  );
}
