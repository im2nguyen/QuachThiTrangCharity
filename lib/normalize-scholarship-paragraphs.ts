function toPlainText(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Split intro copy on legacy <br> breaks and wrap each chunk in a real <p>. */
export function normalizeBrToParagraphs(html: string): string {
  if (!/<br\s*\/?>/i.test(html)) return html;

  let inner = html.trim();
  inner = inner.replace(/<center>[\s\S]*?<\/center>/gi, "").trim();
  inner = inner.replace(/^<p>\s*/i, "");
  inner = inner.replace(/<(p|P)\b[^>]*>/i, "");
  inner = inner.replace(/<\/(p|P)>\s*$/i, "");

  const parts = inner
    .split(/<br\s*\/?>/gi)
    .map((part) =>
      part
        .replace(/<(p|P)\b[^>]*>/gi, "")
        .replace(/<\/(p|P)>/gi, "")
        .trim()
    )
    .filter((part) => toPlainText(part).length > 0);

  if (parts.length <= 1) return html;

  return parts.map((part) => `<p>${part}</p>`).join("");
}

/** Normalize intro text before the first table; leave table markup untouched. */
export function normalizeScholarshipIntro(html: string): string {
  const tableMatch = html.match(/<table\b/i);
  if (!tableMatch || tableMatch.index === undefined) {
    return normalizeBrToParagraphs(html);
  }

  const before = html.slice(0, tableMatch.index);
  const rest = html.slice(tableMatch.index);
  return normalizeBrToParagraphs(before) + rest;
}

export function splitAtFirstTable(html: string): {
  introHtml: string;
  tableHtml: string;
  afterTableHtml: string;
} {
  const wrappedMatch = html.match(
    /^(.*?)(<div class="scholarship-table-wrap">[\s\S]*?<\/div>)([\s\S]*)$/i
  );
  if (wrappedMatch) {
    return {
      introHtml: wrappedMatch[1]
        .replace(/<div class="scholarship-table-wrap">\s*$/i, "")
        .trim(),
      tableHtml: wrappedMatch[2],
      afterTableHtml: wrappedMatch[3].trim(),
    };
  }

  const match = html.match(/^(.*?)(<table\b[\s\S]*?<\/table>)([\s\S]*)$/i);
  if (!match) {
    return { introHtml: html, tableHtml: "", afterTableHtml: "" };
  }

  return {
    introHtml: match[1]
      .replace(/<div class="scholarship-table-wrap">\s*$/i, "")
      .trim(),
    tableHtml: match[2],
    afterTableHtml: match[3].trim(),
  };
}
