import { SiteIcon } from "./SiteIcon";
import { PageTitle } from "./PageTitle";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  subtitle,
  children,
  className,
  showIcon = false,
  align = "start",
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
  showIcon?: boolean;
  align?: "start" | "center";
}) {
  return (
    <header
      className={cn(
        align === "center" && "text-center",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-6xl px-5 pt-16 pb-2 sm:pt-20 lg:pt-24",
          align === "center" && "flex flex-col items-center"
        )}
      >
        {showIcon && <SiteIcon className="mb-5 h-10 w-auto opacity-90" />}
        <PageTitle>{title}</PageTitle>
        {subtitle && (
          <p
            className={cn(
              "mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg",
              align === "center" ? "max-w-2xl" : "max-w-3xl"
            )}
          >
            {subtitle}
          </p>
        )}
        {children && <div className="mt-6 w-full">{children}</div>}
      </div>
    </header>
  );
}
