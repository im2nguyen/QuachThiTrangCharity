import { SiPaypal, SiZelle } from "@/components/icons/simple-icons";
import { PayPalDonateForm } from "@/components/donate/PayPalDonateForm";
import { ZelleDonateForm } from "@/components/donate/ZelleDonateForm";
import { CONTACT_EMAIL } from "@/lib/contact";
import type { Locale } from "@/lib/locale";

const COPY = {
  vi: {
    methodsLabel: "Hình thức đóng góp",
    zelleLabel: "Zelle",
    paypalLabel: "PayPal & thẻ tín dụng",
    zelleIntro:
      "Gửi quyên góp qua Zelle tới ngân hàng của bạn. Chúng tôi sẽ gửi biên nhận qua email.",
    followUp:
      "Sau khi quyên góp, xin vui lòng liên hệ nếu bạn cần hỗ trợ thêm:",
  },
  en: {
    methodsLabel: "Donation methods",
    zelleLabel: "Zelle",
    paypalLabel: "PayPal & credit card",
    zelleIntro:
      "Send your donation with Zelle through your bank. We will email you a receipt.",
    followUp: "After you donate, please reach out if you need any help:",
  },
} as const;

export function DonationMethods({ locale }: { locale: Locale }) {
  const copy = COPY[locale];

  return (
    <div className="space-y-8">
      <div>
        <p className="font-sans text-sm font-semibold uppercase tracking-wide text-foreground">
          {copy.methodsLabel}
        </p>

        <div className="mt-6 flex flex-col gap-8 sm:flex-row sm:gap-10">
          <section className="min-w-0 flex-1">
            <p className="flex items-center gap-2.5 font-sans text-base font-medium text-[#6D1ED4] sm:text-lg">
              <SiZelle className="h-[1.1em] w-auto shrink-0" aria-hidden />
              <span>{copy.zelleLabel}</span>
            </p>
            <p className="mt-3 font-serif text-sm leading-relaxed text-foreground/90 sm:text-base">
              {copy.zelleIntro}
            </p>
            <ZelleDonateForm locale={locale} />
          </section>

          <section className="min-w-0 flex-1">
            <p className="flex items-center gap-2.5 font-sans text-base font-medium text-[#003087] sm:text-lg">
              <SiPaypal className="h-[1.1em] w-auto shrink-0" aria-hidden />
              <span>{copy.paypalLabel}</span>
            </p>
            <div className="mt-4 flex justify-center">
              <PayPalDonateForm />
            </div>
          </section>
        </div>
      </div>

      <p className="font-serif text-sm leading-relaxed text-foreground/90 sm:text-base">
        {copy.followUp}{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-medium text-foreground underline decoration-border underline-offset-4 hover:text-primary"
        >
          {CONTACT_EMAIL}
        </a>
      </p>
    </div>
  );
}
