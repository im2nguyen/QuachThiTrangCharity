"use client";

import { useMemo, useState } from "react";
import {
  benefactorYears,
  getBenefactors,
  sumBenefactorAmounts,
  type BenefactorYear,
} from "@/content/benefactors/benefactors";
import type { Locale } from "@/lib/locale";
import { cn } from "@/lib/utils";

export function BenefactorsTable({ locale }: { locale: Locale }) {
  const [year, setYear] = useState<BenefactorYear>(benefactorYears[0]);
  const rows = useMemo(() => getBenefactors(year), [year]);
  const total = useMemo(() => sumBenefactorAmounts(rows), [rows]);

  const filterLabel = locale === "en" ? "Filter by year:" : "Lọc theo năm:";
  const heading =
    locale === "en" ? "List of benefactors" : "Danh sách ân nhân";
  const pdfLabel =
    locale === "en" ? "Download PDF" : "Tải PDF";
  const pdfHref = `/pdf/Benefactors${year}.pdf`;

  const intro =
    locale === "en"
      ? "Thank you for supporting our scholarship program"
      : "Cảm ơn những ân nhân đã ủng hộ chương trình học bổng";

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            {heading}
          </h2>
          <p className="mt-3 font-serif text-sm leading-relaxed text-foreground/90 sm:text-base">
            {intro}
          </p>
        </div>

        <div className="shrink-0 sm:text-right">
          <p className="text-sm font-semibold text-foreground">{filterLabel}</p>
          <div
            className="mt-2 flex flex-wrap gap-x-6 gap-y-1 sm:justify-end"
            role="tablist"
            aria-label={locale === "en" ? "Benefactor year" : "Năm ân nhân"}
          >
            {benefactorYears.map((y) => {
              const selected = year === y;
              return (
                <button
                  key={y}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setYear(y)}
                  className={cn(
                    "cursor-pointer border-b-2 pb-2 text-sm font-medium tabular-nums transition-[color,border-color] duration-200 ease-out sm:text-base",
                    selected
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {y}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>
            {locale === "en"
              ? `${rows.length} contributions · $${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} total`
              : `${rows.length} khoản đóng góp · tổng $${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          </p>
          <a
            href={pdfHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
          >
            {pdfLabel} ({year})
          </a>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border/70 shadow-sm">
          <table className="w-full table-fixed text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/70 text-left font-sans text-xs font-semibold uppercase tracking-wide text-foreground/80">
                <th className="w-[6.75rem] whitespace-nowrap px-4 py-3">
                  {locale === "en" ? "Date" : "Ngày"}
                </th>
                <th className="px-4 py-3">
                  {locale === "en" ? "Name / address" : "Tên / địa chỉ"}
                </th>
                <th className="w-[6.5rem] whitespace-nowrap px-4 py-3 text-right">
                  {locale === "en" ? "Amount" : "Số tiền"}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr
                  key={`${row.date}-${row.name}-${row.amount}-${idx}`}
                  className={cn(
                    "border-b border-border/50 last:border-0",
                    idx % 2 === 1 && "bg-muted/25"
                  )}
                >
                  <td className="whitespace-nowrap px-4 py-3 font-sans tabular-nums text-muted-foreground">
                    {row.date}
                  </td>
                  <td className="px-4 py-3 font-serif leading-snug text-foreground/90">
                    {row.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right font-sans font-medium tabular-nums">
                    {row.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
