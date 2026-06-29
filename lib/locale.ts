export type Locale = "vi" | "en";

export function getLocaleFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "vi";
}

export function prefixPath(path: string, locale: Locale): string {
  if (locale === "en") {
    return path === "/" ? "/en" : `/en${path}`;
  }
  return path;
}

export function toggleLocalePath(pathname: string): string {
  if (pathname === "/tin-tuc") return "/en/news";
  if (pathname === "/en/news") return "/tin-tuc";

  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  const rest = isEn ? pathname.replace(/^\/en/, "") || "/" : pathname;
  if (isEn) return rest === "/" ? "/" : rest;
  return rest === "/" ? "/en" : `/en${rest}`;
}
