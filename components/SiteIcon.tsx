import Image from "next/image";
import { cn } from "@/lib/utils";

type SiteIconProps = {
  className?: string;
  priority?: boolean;
};

export function SiteIcon({ className, priority = false }: SiteIconProps) {
  return (
    <Image
      src="/images/quach-thi-trang.png"
      alt="Quách Thị Trang"
      width={420}
      height={400}
      priority={priority}
      className={cn("h-auto w-auto object-contain object-top", className)}
    />
  );
}
