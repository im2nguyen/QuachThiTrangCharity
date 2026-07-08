"use client";

import { useMemo, useState } from "react";
import type { RecipientRow, RecipientType } from "@/lib/content-types";
import { cn } from "@/lib/utils";

type Props = {
  rows: RecipientRow[];
  locale: "vi" | "en";
};

export function RecipientsTable({ rows, locale }: Props) {
  const [type, setType] = useState<RecipientType>("special");

  const filtered = useMemo(() => rows.filter((r) => r.type === type), [rows, type]);

  const tabs = [
    {
      id: "special" as const,
      label:
        locale === "en" ? "Special scholarship (3.5M VND)" : "HS được HB ĐB 3,5 triệu",
    },
    {
      id: "standard" as const,
      label: locale === "en" ? "Scholarship (2.5M VND)" : "HS được HB 2,5 triệu",
    },
  ];

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">
            {locale === "en" ? "Filter by scholarship type:" : "Lọc theo loại học bổng:"}
          </p>
          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1" role="tablist">
            {tabs.map((t) => {
              const selected = t.id === type;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setType(t.id)}
                  className={cn(
                    "cursor-pointer border-b-2 pb-2 text-sm font-medium transition-[color,border-color] duration-200 ease-out sm:text-base",
                    selected
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          {locale === "en"
            ? `${filtered.length} recipients`
            : `${filtered.length} học sinh`}
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border/70 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/70 text-left font-sans text-xs font-semibold uppercase tracking-wide text-foreground/80">
              <th className="w-16 px-4 py-3 text-center">#</th>
              <th className="px-4 py-3">{locale === "en" ? "School" : "Trường"}</th>
              <th className="px-4 py-3">{locale === "en" ? "Student" : "Học sinh"}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, idx) => (
              <tr
                key={`${r.school}-${r.student}-${idx}`}
                className={cn(
                  "border-b border-border/50 last:border-0",
                  idx % 2 === 1 && "bg-muted/25"
                )}
              >
                <td className="w-16 whitespace-nowrap px-4 py-2.5 text-center font-medium tabular-nums text-muted-foreground">
                  {idx + 1}
                </td>
                <td className="px-4 py-2.5 font-serif leading-snug">{r.school}</td>
                <td className="px-4 py-2.5 font-serif leading-snug">{r.student}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

