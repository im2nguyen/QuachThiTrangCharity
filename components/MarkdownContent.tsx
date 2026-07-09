import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import type { ContentVariant } from "@/lib/content";

const variantClasses: Record<ContentVariant, string> = {
  default: "font-serif leading-relaxed [&_p]:mb-6 [&_p]:last:mb-0",
  poetry: [
    "max-w-prose font-serif text-[1.05rem] leading-[1.85]",
    "[&_p]:mb-6 [&_p]:text-center [&_p]:last:mb-0",
    "[&_em]:text-muted-foreground [&_em]:not-italic",
    "[&_blockquote]:mx-auto [&_blockquote]:max-w-md [&_blockquote]:border-0 [&_blockquote]:p-0",
    "[&_blockquote_p]:text-center [&_blockquote_p]:italic [&_blockquote_p]:text-[#538b01]",
  ].join(" "),
  places: [
    "font-serif leading-relaxed",
    "[&_ul]:list-none [&_ul]:space-y-10 [&_ul]:pl-0",
    "[&_li]:overflow-hidden [&_li]:border-b [&_li]:border-border/40 [&_li]:pb-8 [&_li]:last:border-0",
    "[&_img]:mb-3 [&_img]:max-h-56 [&_img]:w-auto [&_img]:rounded-md [&_img]:shadow-sm",
    "[&_p]:mb-4 [&_p]:last:mb-0",
  ].join(" "),
  mission: [
    "font-serif text-sm sm:text-base",
    "[&_p]:mb-6 [&_p]:leading-relaxed [&_p]:last:mb-0",
    "[&_blockquote]:my-8 [&_blockquote]:border-0 [&_blockquote]:p-0",
    "[&_blockquote_p]:text-center [&_blockquote_p]:font-serif [&_blockquote_p]:text-base [&_blockquote_p]:italic [&_blockquote_p]:leading-relaxed [&_blockquote_p]:text-[#538b01] sm:[&_blockquote_p]:text-lg",
    "[&_blockquote_em]:block [&_blockquote_em]:mt-3 [&_blockquote_em]:font-sans [&_blockquote_em]:text-xs [&_blockquote_em]:uppercase [&_blockquote_em]:tracking-[0.18em] [&_blockquote_em]:text-muted-foreground sm:[&_blockquote_em]:text-sm [&_blockquote_em]:not-italic",
  ].join(" "),
  pdf: "",
};

export function MarkdownContent({
  content,
  className,
  variant = "default",
}: {
  content: string;
  className?: string;
  variant?: ContentVariant;
}) {
  return (
    <div
      className={cn(
        "prose-content text-foreground/90",
        variantClasses[variant],
        "[&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-center",
        "[&_table]:w-full [&_table]:border-collapse [&_table]:text-sm",
        "[&_th]:border [&_th]:border-border [&_th]:bg-muted/70 [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:font-sans [&_th]:text-xs [&_th]:font-semibold [&_th]:uppercase",
        "[&_td]:border [&_td]:border-border [&_td]:px-4 [&_td]:py-2.5",
        "[&_tr:nth-child(even)]:bg-muted/25",
        "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2",
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ src, alt }) => {
            if (!src || typeof src !== "string") return null;
            if (src.includes("devider") || src.includes("electronc")) return null;
            return (
              <Image
                src={src}
                alt={alt ?? ""}
                width={800}
                height={600}
                className="mx-auto max-w-full rounded-md"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            );
          },
          a: ({ href, children }) => (
            <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}>
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
