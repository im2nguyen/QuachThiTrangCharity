/** Strip HTML tags and collapse whitespace for title comparison. */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function foldDiacritics(s: string): string {
  return s.normalize("NFD").replace(/\p{M}/gu, "");
}

function normalizeForTitleCompare(s: string): string {
  return foldDiacritics(s)
    .toLowerCase()
    .replace(/[-–—]/g, " ")
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function titlesMatch(heading: string, pageTitle: string): boolean {
  const h = normalizeForTitleCompare(heading);
  const t = normalizeForTitleCompare(pageTitle);
  if (!h || h.length < 2) return false;
  if (h === t) return true;
  if (h.length >= 5 && (t.startsWith(h) || h.startsWith(t))) return true;
  return false;
}

function isSkippablePrefix(html: string): { skip: string } | null {
  const trimmed = html.trimStart();

  const comment = trimmed.match(/^<!--[\s\S]*?-->\s*/);
  if (comment) return { skip: comment[0] };

  const breaks = trimmed.match(/^(?:<br\s*\/?>\s*)+/i);
  if (breaks) return { skip: breaks[0] };

  const heading = trimmed.match(/^<h[\w]*\b[^>]*>[\s\S]*?<\/h[\w]*>\s*/i);
  if (heading) return { skip: heading[0] };

  const center = trimmed.match(/^<center\b[^>]*>[\s\S]*?<\/center>\s*/i);
  if (center) return { skip: center[0] };

  const emptyP = trimmed.match(
    /^<p[^>]*>(?:\s|<br\s*\/?>|<span[^>]*>\s*<\/span>)*<\/p>\s*/i
  );
  if (emptyP) return { skip: emptyP[0] };

  return null;
}

/**
 * Removes leading blocks from legacy HTML when they repeat the page title
 * (e.g. centered &lt;em&gt;Nhớ Trang&lt;/em&gt; under an h1 of the same name).
 */
export function stripDuplicateTitle(html: string, title: string): string {
  let result = html;
  let guard = 0;

  while (guard++ < 20) {
    const skippable = isSkippablePrefix(result);
    if (!skippable) break;

    const block = skippable.skip;
    const text = stripHtml(block);

    if (text && titlesMatch(text, title)) {
      result = result.trimStart().slice(block.length);
      continue;
    }

    if (!text) {
      result = result.trimStart().slice(block.length);
      continue;
    }

    break;
  }

  return result.trimStart();
}
