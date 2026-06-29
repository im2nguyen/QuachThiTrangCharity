import { normalizeBrToParagraphs } from "./normalize-scholarship-paragraphs";

function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function poemFigure(lines: string[], author: string | null, note?: string): string {
  const poem = lines
    .map((line) => `<span class="home-poem-line">${line}</span>`)
    .join("");
  const authorHtml = author
    ? `<figcaption class="home-poem-author">${author.toUpperCase()}</figcaption>`
    : "";
  const noteHtml = note ? `<p class="home-poem-note">${note}</p>` : "";

  return `<figure class="home-poem"><blockquote class="home-poem-lines">${poem}</blockquote>${authorHtml}${noteHtml}</figure>`;
}

function parsePoemInner(inner: string): string {
  const rawLines = inner
    .split(/<br\s*\/?>/gi)
    .map((line) => stripTags(line))
    .filter(Boolean);

  const lines: string[] = [];
  let author: string | null = null;
  let note: string | undefined;

  for (const line of rawLines) {
    const parenMatch = line.match(/^\(([^)]+)\)$/);
    if (parenMatch) {
      const label = parenMatch[1].trim();
      if (/translation from vietnamese/i.test(label)) {
        note = label;
      } else {
        author = label;
      }
      continue;
    }
    lines.push(line.replace(/^["“]|["”]$/g, "").trim());
  }

  if (lines.length === 0) return inner;
  return poemFigure(lines, author, note);
}

const POEM_CENTER_RE =
  /<center>\s*<font[^>]*>\s*<i>([\s\S]*?)<\/i>\s*<\/font>\s*<\/center>/gi;

/** Split legacy <br> inside `.pi` blocks and restyle embedded poems. */
export function normalizeHomeMissionHtml(html: string): string {
  let result = html
    .replace(/<p style="font-size:20px[^"]*">\s*/gi, "")
    .replace(/<div[^>]*>\s*<img[^>]*electronc[^>]*\/?>\s*<\/div>/gi, "")
    .replace(/<div[^>]*>\s*<img[^>]*devider[^>]*\/?>\s*<\/div>\s*(?:<br\s*\/?>\s*)*/gi, "")
    .replace(/(?:<br\s*\/?>\s*){2,}/gi, "<br><br>");

  // Extract each centered poem before `.pi` normalization.
  result = result.replace(POEM_CENTER_RE, (_, inner) => parsePoemInner(inner));

  // Legacy block: two poems in one <p> with indented "Và tích cực hơn:" bridge line.
  result = result.replace(
    /<p>\s*(<figure class="home-poem">[\s\S]*?<\/figure>)\s*(?:<br\s*\/?>\s*)+(?:&nbsp;|\u00a0|\s)*Và tích cực hơn:\s*(?:<br\s*\/?>\s*)+(<figure class="home-poem">[\s\S]*?<\/figure>)\s*<\/p>/gi,
    '$1<p class="pi">Và tích cực hơn:</p>$2'
  );

  result = result.replace(
    /(?:<br\s*\/?>\s*)+(?:&nbsp;|\u00a0|\s)*Và tích cực hơn:\s*(?:<br\s*\/?>\s*)+/gi,
    '<p class="pi">Và tích cực hơn:</p>'
  );

  result = result.replace(/(<\/figure>)\s*(?:<br\s*\/?>\s*)+/gi, "$1");

  result = result.replace(/<P class="pi">([\s\S]*?)<\/pi>/gi, (_, inner) => {
    const normalized = normalizeBrToParagraphs(`<p>${inner}</p>`);
    return normalized.replace(/<p>/gi, '<p class="pi">');
  });

  return result
    .replace(/<p>\s*<\/p>/gi, "")
    .replace(/<p>\s*(?:<br\s*\/?>\s*)+/gi, "<p>")
    .replace(/<p>\s*&nbsp;[\s\S]*?<\/p>/gi, (block) => {
      const text = stripTags(block);
      return text.length > 0 ? `<p class="pi">${text}</p>` : "";
    })
    .replace(/^(?:\s|<br\s*\/?>)+/i, "")
    .trim();
}
