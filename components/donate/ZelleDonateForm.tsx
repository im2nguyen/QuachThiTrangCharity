"use client";

import { useState, type ComponentType, type FormEvent } from "react";
import Image from "next/image";
import { Check, Copy } from "lucide-react";
import {
  SiBankofamerica,
  SiChase,
  SiZelle,
} from "@/components/icons/simple-icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CONTACT_EMAIL } from "@/lib/contact";
import type { Locale } from "@/lib/locale";
import { cn } from "@/lib/utils";

const ZELLE = "#6D1ED4";

type BankIconProps = { className?: string; "aria-hidden"?: boolean };

type Bank = {
  id: string;
  name: string;
  short: string;
  href: string;
} & (
  | {
      kind: "icon";
      color: string;
      Icon: ComponentType<BankIconProps>;
      iconClass?: string;
    }
  | { kind: "image"; src: string; bg?: string; imageClass?: string }
);

const BANKS: Bank[] = [
  {
    id: "chase",
    name: "Chase",
    short: "Chase",
    href: "https://www.chase.com/",
    kind: "icon",
    color: "#117ACA",
    Icon: SiChase,
  },
  {
    id: "bofa",
    name: "Bank of America",
    short: "BofA",
    href: "https://www.bankofamerica.com/",
    kind: "icon",
    color: "#012169",
    Icon: SiBankofamerica,
    iconClass: "h-7 w-auto max-w-[2rem]",
  },
  {
    id: "wells",
    name: "Wells Fargo",
    short: "Wells",
    href: "https://www.wellsfargo.com/",
    kind: "image",
    src: "/images/banks/wells-fargo.png",
    bg: "#b51d31",
    imageClass: "size-10 object-contain",
  },
  {
    id: "citi",
    name: "Citi",
    short: "Citi",
    href: "https://online.citi.com/",
    kind: "image",
    src: "/images/banks/citi.png",
    bg: "#ffffff",
  },
  {
    id: "usbank",
    name: "U.S. Bank",
    short: "U.S.",
    href: "https://www.usbank.com/",
    kind: "image",
    src: "/images/banks/us-bank.png",
    bg: "#ffffff",
    imageClass: "size-8 object-contain",
  },
];

const COPY = {
  vi: {
    openCta: "Quyên góp bằng Zelle",
    title: "Quyên góp bằng Zelle",
    step1Label: "Bước 1",
    step1Title: "Nhận biên nhận",
    step1Body: "Nhập email để chúng tôi gửi biên nhận quyên góp.",
    emailLabel: "Địa chỉ email",
    emailPlaceholder: "ban@email.com",
    submit: "Gửi",
    submitting: "Đang gửi…",
    step1Success: "Đã nhận. Chúng tôi sẽ gửi biên nhận tới email này.",
    step1Error: "Không gửi được. Xin vui lòng thử lại.",
    step2Label: "Bước 2",
    step2Title: "Gửi qua Zelle",
    step2Body: "Mở ngân hàng của bạn, rồi gửi tới địa chỉ này:",
    copyLabel: "Sao chép",
    copied: "Đã sao chép",
    bankHint: "Ngân hàng phổ biến",
  },
  en: {
    openCta: "Donate with Zelle",
    title: "Donate with Zelle",
    step1Label: "Step 1",
    step1Title: "Get a receipt",
    step1Body: "Enter your email so we can send your donation receipt.",
    emailLabel: "Email address",
    emailPlaceholder: "you@email.com",
    submit: "Send",
    submitting: "Sending…",
    step1Success: "Got it. We’ll send your receipt to this email.",
    step1Error: "Could not send. Please try again.",
    step2Label: "Step 2",
    step2Title: "Send with Zelle",
    step2Body: "Open your bank, then send to this address:",
    copyLabel: "Copy",
    copied: "Copied",
    bankHint: "Popular banks",
  },
} as const;

function StepHeading({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <div className="flex items-baseline gap-2.5">
      <span className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </span>
      <h3 className="font-serif text-base font-medium text-foreground">
        {title}
      </h3>
    </div>
  );
}

function CopyRecipient({
  label,
  copiedLabel,
}: {
  label: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard may be unavailable */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="flex w-full cursor-pointer items-center gap-2 rounded-md border border-border/80 bg-muted/40 py-1.5 pr-1.5 pl-3 text-left transition hover:bg-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      aria-label={`${label}: ${CONTACT_EMAIL}`}
    >
      <SiZelle
        className="size-4 shrink-0"
        style={{ color: ZELLE }}
        aria-hidden
      />
      <span className="min-w-0 flex-1 truncate font-serif text-sm font-medium text-foreground">
        {CONTACT_EMAIL}
      </span>
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 font-sans text-xs font-medium text-foreground/70">
        {copied ? (
          <Check className="size-3.5 text-primary" aria-hidden />
        ) : (
          <Copy className="size-3.5" aria-hidden />
        )}
        {copied ? copiedLabel : label}
      </span>
    </button>
  );
}

function ZelleFormBody({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const honeypot = String(formData.get("website") ?? "");

    try {
      const response = await fetch("/api/zelle-receipt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale, website: honeypot }),
      });
      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        setError(data?.error ?? copy.step1Error);
        return;
      }

      setSucceeded(true);
    } catch {
      setError(copy.step1Error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-5">
      <section className="space-y-3">
        <StepHeading label={copy.step1Label} title={copy.step1Title} />
        <p className="font-serif text-sm leading-relaxed text-muted-foreground">
          {copy.step1Body}
        </p>

        {succeeded ? (
          <p
            className="rounded-md border border-primary/20 bg-primary/[0.06] px-3 py-2.5 font-serif text-sm text-primary"
            role="status"
          >
            {copy.step1Success}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            <label className="block">
              <span className="sr-only">{copy.emailLabel}</span>
              <div className="flex h-10 overflow-hidden rounded-md border border-border bg-background focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/40">
                <input
                  id="zelle-email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={copy.emailPlaceholder}
                  className="min-w-0 flex-1 border-0 bg-transparent px-3 font-serif text-sm text-foreground outline-none placeholder:text-muted-foreground/70"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="shrink-0 cursor-pointer border-l border-border bg-primary px-4 font-sans text-xs font-medium tracking-wide text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? copy.submitting : copy.submit}
                </button>
              </div>
            </label>
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
              aria-hidden
            />
            {error ? (
              <p className="font-serif text-sm text-destructive" role="alert">
                {error}
              </p>
            ) : null}
          </form>
        )}
      </section>

      <section className="space-y-3">
        <StepHeading label={copy.step2Label} title={copy.step2Title} />
        <p className="font-serif text-sm leading-relaxed text-muted-foreground">
          {copy.step2Body}
        </p>

        <CopyRecipient
          label={copy.copyLabel}
          copiedLabel={copy.copied}
        />

        <div className="mt-3">
          <p className="mb-2.5 font-sans text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            {copy.bankHint}
          </p>
          <ul className="grid grid-cols-5 gap-1.5">
            {BANKS.map((bank) => (
              <li key={bank.id}>
                <a
                  href={bank.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={bank.name}
                  className={cn(
                    "group flex flex-col items-center gap-2 rounded-lg px-1 py-2 transition",
                    "hover:bg-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                  )}
                >
                  {bank.kind === "image" ? (
                    <span
                      className="relative flex size-12 items-center justify-center overflow-hidden rounded-xl shadow-sm ring-1 ring-black/8 transition group-hover:scale-105"
                      style={{ backgroundColor: bank.bg ?? "transparent" }}
                      aria-hidden
                    >
                      <Image
                        src={bank.src}
                        alt=""
                        width={48}
                        height={48}
                        className={cn(
                          "object-contain",
                          bank.imageClass ?? "size-12"
                        )}
                      />
                    </span>
                  ) : (
                    <span
                      className="flex size-12 items-center justify-center rounded-xl text-white shadow-sm ring-1 ring-black/8 transition group-hover:scale-105"
                      style={{ backgroundColor: bank.color }}
                      aria-hidden
                    >
                      <bank.Icon
                        className={
                          bank.iconClass ?? "h-6 w-auto max-w-[1.75rem]"
                        }
                      />
                    </span>
                  )}
                  <span className="font-sans text-[0.7rem] font-medium text-foreground/75 group-hover:text-foreground">
                    {bank.short}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export function ZelleDonateForm({ locale }: { locale: Locale }) {
  const copy = COPY[locale];

  return (
    <div className="mt-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            type="button"
            size="lg"
            className="w-full cursor-pointer gap-2 bg-[#6D1ED4] font-sans text-white hover:bg-[#5a18b0] hover:text-white sm:w-auto"
          >
            <SiZelle className="size-4" aria-hidden />
            {copy.openCta}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[min(90vh,36rem)] max-w-md gap-5 overflow-y-auto p-6 sm:p-7">
          <DialogHeader className="gap-0 border-b border-border/70 pb-4">
            <DialogTitle className="flex items-center gap-2.5 font-serif text-xl font-medium tracking-tight text-foreground">
              <span
                className="flex size-8 items-center justify-center rounded-full text-white"
                style={{ backgroundColor: ZELLE }}
                aria-hidden
              >
                <SiZelle className="size-4" />
              </span>
              {copy.title}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {copy.step1Body} {copy.step2Body}
            </DialogDescription>
          </DialogHeader>
          <ZelleFormBody locale={locale} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
