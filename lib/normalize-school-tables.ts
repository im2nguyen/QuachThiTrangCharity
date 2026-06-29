const SPLIT_SCHOOL_TABLE_RE =
  /Số\s*Thứ\s*Tự[\s\S]*?Tên\s*Trường[\s\S]*?Số\s*Thứ\s*Tự[\s\S]*?Tên\s*Trường/i;

const ROW_RE = /<tr\b[^>]*>([\s\S]*?)<\/tr>/gi;
const CELL_RE = /<t([dh])\b[^>]*>([\s\S]*?)<\/t\1>/gi;

function extractCells(rowHtml: string): string[] {
  const cells: string[] = [];
  let match: RegExpExecArray | null;
  const re = new RegExp(CELL_RE.source, CELL_RE.flags);
  while ((match = re.exec(rowHtml)) !== null) {
    cells.push(match[2].trim());
  }
  return cells;
}

function cellText(content: string): string {
  return content
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isBlankCell(content: string): boolean {
  return cellText(content) === "";
}

function buildRow(cells: [string, string], tag: "td" | "th"): string {
  return `<tr><${tag}>${cells[0]}</${tag}><${tag}>${cells[1]}</${tag}></tr>`;
}

function normalizeSplitTable(tableHtml: string): string {
  const rows: string[] = [];
  let header: [string, string] | null = null;

  let match: RegExpExecArray | null;
  const rowRe = new RegExp(ROW_RE.source, ROW_RE.flags);
  while ((match = rowRe.exec(tableHtml)) !== null) {
    const cells = extractCells(match[1]);
    if (cells.length !== 4) continue;

    const left: [string, string] = [cells[0], cells[1]];
    const right: [string, string] = [cells[2], cells[3]];

    if (!header) {
      header = left;
      continue;
    }

    if (!isBlankCell(left[0]) || !isBlankCell(left[1])) {
      rows.push(buildRow(left, "td"));
    }
    if (!isBlankCell(right[0]) || !isBlankCell(right[1])) {
      rows.push(buildRow(right, "td"));
    }
  }

  if (!header || rows.length === 0) return tableHtml;

  return `<div class="scholarship-table-wrap"><table class="scholarship-school-table"><thead>${buildRow(header, "th")}</thead><tbody>${rows.join("")}</tbody></table></div>`;
}

/**
 * Legacy scholarship pages lay out two school lists side-by-side in one 4-column
 * table. Merge them into a single readable 2-column table.
 */
export function normalizeSplitSchoolTables(html: string): string {
  return html.replace(/<table\b[^>]*>[\s\S]*?<\/table>/gi, (tableHtml) => {
    if (!SPLIT_SCHOOL_TABLE_RE.test(tableHtml)) return tableHtml;
    return normalizeSplitTable(tableHtml);
  });
}
