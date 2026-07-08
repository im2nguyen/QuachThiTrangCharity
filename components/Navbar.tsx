"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { SiteIcon } from "./SiteIcon";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { getNavLinks } from "@/lib/navigation";
import { getLocaleFromPath } from "@/lib/locale";
import { LocaleToggle } from "./LocaleToggle";
import { scholarshipYears, galleryByYear } from "@/lib/content-manifest";
import { filterGalleryImages } from "@/lib/gallery";
import {
  NavigationMenuContent,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const locale = getLocaleFromPath(pathname);
  const links = getNavLinks(locale);
  const home = locale === "en" ? "/en" : "/";
  const donateHref = locale === "en" ? "/en/donate" : "/donate";
  const hocBongBase = locale === "en" ? "/en/hoc-bong" : "/hoc-bong";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === home ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  const navLinkClass = cn(
    "bg-transparent px-3 py-2 text-base font-medium text-muted-foreground transition-colors",
    "hover:bg-transparent hover:text-foreground",
    "data-active:bg-transparent data-active:text-foreground data-active:font-semibold"
  );

  const navTriggerClass = cn(
    "h-10 bg-transparent px-3 text-base font-medium text-muted-foreground",
    "hover:bg-transparent hover:text-foreground",
    "data-open:bg-transparent data-open:text-foreground"
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-background transition-shadow",
        scrolled && "shadow-sm"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-5 sm:py-6">
        <Link
          href={home}
          className="inline-flex shrink-0 items-center gap-3 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <SiteIcon className="h-11 w-auto sm:h-12" priority />
          <span className="flex flex-col text-left leading-none">
            <span className="font-serif text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Quách Thị Trang
            </span>
            <span className="-mt-1 pl-1 text-xs uppercase tracking-[0.2em] text-muted-foreground sm:pl-1.5 sm:text-sm">
              Foundation
            </span>
          </span>
        </Link>

        <div className="hidden flex-col items-end gap-1.5 lg:flex">
          <LocaleToggle />
          <div className="flex items-center gap-3">
            <NavigationMenu viewport={false} className="max-w-max flex-none">
              <NavigationMenuList className="gap-1">
                {links.map((l) =>
                  l.href.includes("hoc-bong") ? (
                    <NavigationMenuItem key={l.href}>
                      <NavigationMenuTrigger className={navTriggerClass}>
                        {l.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ScholarshipYearMenu
                          locale={locale}
                          hocBongBase={hocBongBase}
                        />
                      </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                    <NavigationMenuItem key={l.href}>
                      <NavigationMenuLink
                        asChild
                        active={isActive(l.href)}
                        className={navLinkClass}
                      >
                        <Link
                          href={l.href}
                          onClick={() => {
                            if (isActive(l.href)) {
                              window.scrollTo({ top: 0, left: 0 });
                            }
                          }}
                        >
                          {l.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>
            <Button asChild size="sm" className="h-10 px-5 font-medium uppercase tracking-wide">
              <Link href={donateHref}>
                {locale === "en" ? "Donate" : "Ủng hộ"}
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LocaleToggle />
          <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-xs">
            <SheetHeader>
              <SheetTitle className="font-serif">Quách Thị Trang</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-1 px-4">
              {links.map((l) => (
                <Button
                  key={l.href}
                  asChild
                  variant={isActive(l.href) ? "secondary" : "ghost"}
                  className="justify-start text-base font-medium"
                >
                  <Link
                    href={l.href}
                    onClick={() => {
                      setOpen(false);
                      if (isActive(l.href)) {
                        window.scrollTo({ top: 0, left: 0 });
                      }
                    }}
                  >
                    {l.label}
                  </Link>
                </Button>
              ))}
              <Separator className="my-2" />
              <Button asChild className="font-medium uppercase tracking-wide">
                <Link href={donateHref} onClick={() => setOpen(false)}>
                  {locale === "en" ? "Donate" : "Ủng hộ"}
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
        </div>
      </nav>
    </header>
  );
}

function getYearCover(year: number): string | null {
  const imgs = filterGalleryImages(galleryByYear[String(year)] ?? []);
  // Some years share the same first asset; prefer a later image when available.
  return imgs[2] ?? imgs[1] ?? imgs[0] ?? null;
}

function ScholarshipYearMenu({
  locale,
  hocBongBase,
}: {
  locale: "vi" | "en";
  hocBongBase: string;
}) {
  const latestYear = scholarshipYears[0];
  const [previewYear, setPreviewYear] = useState<number>(latestYear);
  const previewSrc = getYearCover(previewYear);

  return (
    <div className="grid w-[36rem] grid-cols-[5.25rem_1fr] gap-2 p-2">
      <ul className="grid gap-0.5">
        {scholarshipYears.map((y) => (
          <li key={y}>
            <NavigationMenuLink asChild>
              <Link
                href={`${hocBongBase}/${y}`}
                onMouseEnter={() => setPreviewYear(y)}
                className={cn(
                  "block rounded-md px-2 py-1.5 text-sm font-medium tabular-nums transition-colors",
                  previewYear === y
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {y}
              </Link>
            </NavigationMenuLink>
          </li>
        ))}
      </ul>

      <NavigationMenuLink asChild>
        <Link
          href={`${hocBongBase}/${previewYear}`}
          aria-label={
            locale === "en"
              ? `Open scholarship ${previewYear}`
              : `Mở học bổng ${previewYear}`
          }
          className="group relative block overflow-hidden rounded-2xl p-0 hover:bg-transparent focus:bg-transparent data-active:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
            {previewSrc ? (
              <Image
                key={previewSrc}
                src={previewSrc}
                alt={
                  locale === "en"
                    ? `Scholarship ceremony ${previewYear}`
                    : `Lễ trao học bổng ${previewYear}`
                }
                fill
                sizes="480px"
                className="rounded-2xl object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                {previewYear}
              </div>
            )}
          </div>
        </Link>
      </NavigationMenuLink>
    </div>
  );
}
