import { PageTitle } from "@/components/PageTitle";
import { BenefactorsTable } from "@/components/donate/BenefactorsTable";
import { DonateCollage } from "@/components/donate/DonateCollage";
import { DonationMethods } from "@/components/donate/DonationMethods";
import type { Locale } from "@/lib/locale";

const COPY = {
  vi: {
    title: "Ủng Hộ",
    description: "Đóng góp cho chương trình học bổng Quách Thị Trang",
    taxExempt:
      "QUACH THI TRANG FOUNDATION là tổ chức phi lợi nhuận được miễn thuế theo Mục 501(c)(3) của Bộ luật Thuế vụ Hoa Kỳ",
    deductible:
      "Người đóng góp có thể khấu trừ các khoản đóng góp cho Quách Thị Trang Foundation theo Mục 170 của Bộ luật Thuế vụ Hoa Kỳ",
    thankYou: "Xin chân thành cảm ơn",
  },
  en: {
    title: "Donate",
    description: "Support the Quach Thi Trang scholarship program",
    taxExempt:
      "QUACH THI TRANG FOUNDATION is a tax-exempt nonprofit organization as described in Section 501(c)(3) of the Internal Revenue Code",
    deductible:
      "Donors can deduct contributions they make to Quach Thi Trang Foundation under IRC Section 170",
    thankYou: "Thank you",
  },
} as const;

export function DonatePageView({ locale }: { locale: Locale }) {
  const copy = COPY[locale];

  return (
    <div className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:pt-20 lg:pt-24">
      <header className="max-w-2xl">
        <PageTitle>{copy.title}</PageTitle>
        <p className="mt-3 font-serif text-base leading-relaxed text-muted-foreground sm:text-lg">
          {copy.description}
        </p>
      </header>

      <section className="mt-8 sm:mt-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-10">
          <DonateCollage locale={locale} />
          <DonationMethods locale={locale} />
        </div>
      </section>

      <section className="mt-16 sm:mt-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] xl:gap-12">
          <div className="space-y-4 lg:pt-1">
            <p className="font-serif text-sm leading-relaxed text-foreground/90 sm:text-base">
              {copy.taxExempt}
            </p>
            <p className="font-sans text-sm font-medium tabular-nums text-foreground">
              EIN #99-3486835
            </p>
            <p className="font-serif text-sm leading-relaxed text-foreground/90 sm:text-base">
              {copy.deductible}. {copy.thankYou}.
            </p>
          </div>
          <BenefactorsTable locale={locale} />
        </div>
      </section>
    </div>
  );
}
