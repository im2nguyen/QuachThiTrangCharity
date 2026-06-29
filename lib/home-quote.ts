import type { Locale } from "@/lib/locale";

export const HOME_HERO_QUOTE = {
  vi: {
    lines: [
      "Xin tiếp lửa cho tàn đêm thế kỷ",
      "Cho Tương lai Dân Tộc hé môi cười.",
    ],
    attribution: "TRỤ VŨ",
  },
  en: {
    lines: [
      "Kindle the flame to light century's dark nights",
      "For the people's future, let hope smile.",
    ],
    attribution: "TRỤ VŨ",
  },
} as const satisfies Record<
  Locale,
  { lines: readonly string[]; attribution: string }
>;
