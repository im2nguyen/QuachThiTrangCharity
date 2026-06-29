import { cn } from "@/lib/utils";

/** Primary page heading — Oswald, uppercase, shared scale site-wide. */
export const pageTitleClassName =
  "text-4xl font-bold uppercase tracking-tight text-foreground sm:text-4xl lg:text-4xl lg:leading-none";

export function PageTitle({
  children,
  className,
  as: Tag = "h1",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  return <Tag className={cn(pageTitleClassName, className)}>{children}</Tag>;
}
