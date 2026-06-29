import type { Locale } from "@/lib/locale";

export const MEMORIAL_QUOTE = {
  vi: {
    lines: [
      "Trời nghiêng đất lệch có ngày",
      "Đá kia tượng vững chí này trơ-trơ",
    ],
    attribution: "Vũ Hoàng Chương",
    translationNote: null,
  },
  en: {
    lines: [
      "Though skies may tilt and earth may lean, Her stone statue stands, a timeless scene.",
      "Her spirit's steadfast, unwavering and true, In hearts and minds, forever anew.",
    ],
    attribution: "Vũ Hoàng Chương",
    translationNote: "Translation from Vietnamese",
  },
} as const satisfies Record<
  Locale,
  {
    lines: readonly string[];
    attribution: string;
    translationNote: string | null;
  }
>;
