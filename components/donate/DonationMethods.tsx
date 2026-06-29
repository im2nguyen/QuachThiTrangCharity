import { SiPaypal, SiZelle } from "@/components/icons/simple-icons";
import { PayPalDonateForm } from "@/components/donate/PayPalDonateForm";
import type { Locale } from "@/lib/locale";

const CONTACT_EMAIL = "admin@quachthitrangcharity.com";

const COPY = {
  vi: {
    methodsLabel: "Hình thức đóng góp",
    zelleLabel: "Zelle",
    paypalLabel: "PayPal & thẻ tín dụng",
    zelleSteps: [
      "Mở ứng dụng ngân hàng hoặc đăng nhập ngân hàng trực tuyến",
      "Chọn gửi tiền qua Zelle",
      "Gửi quyên góp tới",
    ],
    followUp:
      "Sau khi quyên góp, xin vui lòng liên hệ để chúng tôi cập nhật danh sách ân nhân và gửi biên nhận cho bạn:",
  },
  en: {
    methodsLabel: "Donation methods",
    zelleLabel: "Zelle",
    paypalLabel: "PayPal & credit card",
    zelleSteps: [
      "Open your bank app or log in to online banking",
      "Choose Send with Zelle",
      "Send your donation to",
    ],
    followUp:
      "After you donate, please reach out so we can update our benefactors list and send you a receipt:",
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
            <ol className="mt-4 list-decimal space-y-2 pl-4 font-serif text-sm leading-relaxed text-foreground/90 sm:text-base">
              <li>{copy.zelleSteps[0]}</li>
              <li>{copy.zelleSteps[1]}</li>
              <li>
                {copy.zelleSteps[2]}{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-medium text-foreground underline decoration-border underline-offset-4 hover:text-primary"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ol>
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
