import { cn } from "@/lib/utils";

/** Renders preserved HTML from the original site with scoped typography. */
export function HtmlContent({
  html,
  className,
  variant = "default",
}: {
  html: string;
  className?: string;
  variant?: "default" | "poetry" | "places";
}) {
  return (
    <div
      className={cn(
        "prose-content text-foreground/90",
        variant === "poetry" && [
          "max-w-prose",
          "font-serif text-[1.05rem] leading-[1.85]",
          "[&_.pa]:text-center [&_.pb]:text-center",
          "[&_p]:mb-6 [&_p]:last:mb-0",
          "[&_i]:text-muted-foreground [&_i]:not-italic",
        ],
        variant === "default" && [
          "font-serif leading-relaxed",
          "[&_p]:mb-6 [&_p]:last:mb-0",
        ],
        variant === "places" && [
          "font-serif leading-relaxed",
          "[&_ul]:list-none [&_ul]:space-y-10 [&_ul]:pl-0",
          "[&_li]:overflow-hidden [&_li]:border-b [&_li]:border-border/40 [&_li]:pb-8 [&_li]:last:border-0",
          "[&_img]:mb-3 [&_img]:max-h-56 [&_img]:w-auto [&_img]:rounded-md [&_img]:shadow-sm",
          "[&_p]:mb-4 [&_p]:last:mb-0",
        ],
        "[&_h]:font-serif [&_h]:text-2xl [&_h]:font-semibold [&_h]:text-center",
        "[&_p]:leading-relaxed",
        "[&_table]:w-full [&_table]:border-collapse",
        "[&_.scholarship-table-wrap]:my-6 [&_.scholarship-table-wrap]:overflow-x-auto [&_.scholarship-table-wrap]:rounded-xl [&_.scholarship-table-wrap]:border [&_.scholarship-table-wrap]:border-border/70 [&_.scholarship-table-wrap]:shadow-sm",
        "[&_.scholarship-school-table]:w-full [&_.scholarship-school-table]:text-sm",
        "[&_.scholarship-school-table_thead_th]:border-b [&_.scholarship-school-table_thead_th]:border-border [&_.scholarship-school-table_thead_th]:bg-muted/70 [&_.scholarship-school-table_thead_th]:px-4 [&_.scholarship-school-table_thead_th]:py-3 [&_.scholarship-school-table_thead_th]:text-left [&_.scholarship-school-table_thead_th]:font-sans [&_.scholarship-school-table_thead_th]:text-xs [&_.scholarship-school-table_thead_th]:font-semibold [&_.scholarship-school-table_thead_th]:uppercase [&_.scholarship-school-table_thead_th]:tracking-wide [&_.scholarship-school-table_thead_th]:text-foreground/80",
        "[&_.scholarship-school-table_tbody_tr]:border-b [&_.scholarship-school-table_tbody_tr]:border-border/50 [&_.scholarship-school-table_tbody_tr:last-child]:border-0",
        "[&_.scholarship-school-table_tbody_tr:nth-child(even)]:bg-muted/25",
        "[&_.scholarship-school-table_td]:border-0 [&_.scholarship-school-table_th]:border-0",
        "[&_.scholarship-school-table_td:first-child]:w-16 [&_.scholarship-school-table_td:first-child]:whitespace-nowrap [&_.scholarship-school-table_td:first-child]:px-4 [&_.scholarship-school-table_td:first-child]:py-2.5 [&_.scholarship-school-table_td:first-child]:text-center [&_.scholarship-school-table_td:first-child]:font-medium [&_.scholarship-school-table_td:first-child]:tabular-nums [&_.scholarship-school-table_td:first-child]:text-muted-foreground",
        "[&_.scholarship-school-table_td:last-child]:px-4 [&_.scholarship-school-table_td:last-child]:py-2.5 [&_.scholarship-school-table_td:last-child]:font-serif [&_.scholarship-school-table_td:last-child]:leading-snug",
        "[&_td]:border [&_td]:border-border [&_td]:p-2 [&_th]:border [&_th]:border-border [&_th]:p-2 [&_th]:bg-muted",
        "[&_img]:mx-auto [&_img]:max-w-full [&_img]:rounded-md",
        "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2",
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
