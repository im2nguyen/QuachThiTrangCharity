import { cn } from "@/lib/utils";

export function ContentSection({
  children,
  className,
  variant = "default",
  width = "lg",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "muted";
  width?: "sm" | "md" | "lg" | "full";
}) {
  const maxWidth = {
    sm: "max-w-xl",
    md: "max-w-3xl",
    lg: "max-w-6xl",
    full: "max-w-6xl",
  }[width];

  return (
    <section
      className={cn("px-5 pb-12 pt-4", variant === "muted" && "bg-muted/60", className)}
    >
      <div className={cn("mx-auto", maxWidth)}>{children}</div>
    </section>
  );
}
