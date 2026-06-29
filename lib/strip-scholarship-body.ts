import { stripDuplicateTitle } from "./strip-duplicate-title";
import { normalizeSplitSchoolTables } from "./normalize-school-tables";
import { normalizeScholarshipIntro } from "./normalize-scholarship-paragraphs";

// Legacy pages often end with a "return to home" footer.
// It appears in a few variants (H5, mixed case, sometimes without the exact "Return to QTT").
const FOOTER_RE =
  /<center>\s*<h5>[\s\S]*?(?:Trở\s*Về|Return\s*to\s*QTT)[\s\S]*?<\/h5>\s*/gi;

const FOOTER_RE_2 =
  /<center>\s*(?:<h\d\b[^>]*>\s*)?[\s\S]*?(?:Trở\s*Về\s*Trang\s*Nhà\s*Thiện\s*Nguyện\s*QTT|Return\s*to\s*QTT\s*Charity\s*Home\s*Page)[\s\S]*?(?:<\/h\d>)?\s*<\/center>\s*/gi;

const GALLERY_MARKER =
  /Hình\s+ảnh\s+buổi\s+lễ[\s\S]{0,160}Scholarship\s+Ceremony\s+Pictures/i;

/** Remove HTML comments, including legacy pages with unclosed comment blocks. */
function stripHtmlComments(html: string): string {
  let result = html.replace(/<!--[\s\S]*?-->/g, "");
  result = result.replace(/<!--[\s\S]*/g, "");
  return result.replace(/<!--|-->/g, "");
}

function findGallerySectionStart(html: string, markerIndex: number): number {
  const lookback = html.slice(Math.max(0, markerIndex - 600), markerIndex);

  const deviderMatch = lookback.match(
    /(?:<div[^>]*>\s*)?<img[^>]*devider[^>]*>[\s\S]*?(?:<\/div>\s*)?(?:<br\s*\/?>\s*)*$/i
  );

  const hMatch = lookback.match(/<h\s+class=["']h[abc]["'][^>]*>\s*$/i);

  let start = markerIndex;
  if (hMatch?.index !== undefined) {
    start = markerIndex - (lookback.length - hMatch.index);
  } else {
    const tagStart = lookback.lastIndexOf("<h");
    if (tagStart !== -1) {
      start = markerIndex - (lookback.length - tagStart);
    }
  }

  if (deviderMatch) {
    const divStart = html.lastIndexOf("<div", markerIndex);
    if (divStart !== -1 && markerIndex - divStart < 300) {
      start = Math.min(start, divStart);
    }
  }

  return Math.max(0, start);
}

/** Remove visible text from HTML for emptiness checks. */
export function htmlToPlainText(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Strips duplicate page titles, embedded legacy ceremony photo blocks, and
 * return-to-home footers from scholarship year HTML. Photos are shown via GalleryGrid.
 */
export function stripScholarshipBodyHtml(html: string, pageTitle: string): string {
  let result = stripDuplicateTitle(html, pageTitle);
  result = result.replace(FOOTER_RE, "").replace(FOOTER_RE_2, "");
  result = stripHtmlComments(result);

  const marker = result.match(GALLERY_MARKER);
  if (!marker || marker.index === undefined) {
    return normalizeSplitSchoolTables(
      normalizeScholarshipIntro(
        result.replace(/(?:<br\s*\/?>\s*){3,}/gi, "<br><br>").trim()
      )
    );
  }

  const start = findGallerySectionStart(result, marker.index);
  const tail = result.slice(start);

  // Prefer cutting only the photo block, keeping any recipients / narrative
  // that appears after the ceremony images.
  const recipientsInTail =
    tail.search(/<h1\b[^>]*>[\s\S]{0,240}Danh\s*Sách[\s\S]*?<\/h1>/i) !== -1
      ? tail.search(/<h1\b[^>]*>[\s\S]{0,240}Danh\s*Sách/i)
      : tail.search(/<a\b[^>]*href=["'][^"']*recipients/i);

  const footerInTail = tail.search(/<center>\s*<h5>/i);

  const cutEnd =
    recipientsInTail !== -1
      ? start + recipientsInTail
      : footerInTail !== -1
        ? start + footerInTail
        : result.length;

  result = (result.slice(0, start) + result.slice(cutEnd))
    .replace(/(?:<br\s*\/?>\s*){3,}/gi, "<br><br>")
    .trim();

  return normalizeSplitSchoolTables(normalizeScholarshipIntro(result));
}
