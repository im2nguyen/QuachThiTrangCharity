import Image from "next/image";
import { PageTitle } from "@/components/PageTitle";
import type { Locale } from "@/lib/locale";

const HERO_IMAGE = "/images/2020-1.jpg";
const CONTACT_EMAIL = "admin@quachthitrangcharity.com";

const COPY = {
  vi: {
    title: "Liên Lạc",
    description: "Liên hệ với ban điều hành Quỹ Quách Thị Trang",
    heroAlt: "Lễ trao học bổng Quách Thị Trang 2020",
    contactHeading: "Liên hệ qua email",
    teamHeading: "Ban Điều Hành",
    mission:
      "Đáp ứng nhu cầu giáo dục của những học sinh xuất sắc tại Việt Nam đang gặp khó khăn về tài chính, đồng thời hỗ trợ trẻ em có hoàn cảnh khó khăn trong cộng đồng người Việt. Chúng tôi cấp học bổng thường niên cho học sinh trung học tài năng nhưng thiếu điều kiện kinh tế, khuyến khích việc học tập và ghi nhận khả năng lãnh đạo tiềm ẩn của các em giữa những hoàn cảnh thử thách.",
  },
  en: {
    title: "Contact",
    description: "Reach the Quach Thi Trang Foundation board",
    heroAlt: "2020 Quach Thi Trang scholarship ceremony",
    contactHeading: "Contact us via email",
    teamHeading: "Our Team",
    mission:
      "To address the educational needs of exceptional students in Vietnam who face financial hardships, as well as to support the underprivileged children within the Vietnamese community. We provide annual scholarships to talented yet financially disadvantaged high school students in Vietnam, fostering their continued education and acknowledging their latent leadership capabilities amidst challenging circumstances.",
  },
} as const;

const TEAM = [
  {
    name: "Dong An Quach, MD",
    role: { vi: "Chủ tịch Hội Đồng Quản Trị", en: "Chair, Board of Directors" },
    bio: "Dr. Dong An Quach, MD currently practices in Southern California. He has over 43 years of experience in the medical field. In addition to his busy medical practice, Dr. Quach has participated in more than half a dozen medical missions, providing essential medical care to underserved populations abroad.",
  },
  {
    name: "Mr. Thanh Quach, MSEE, RCDD",
    role: { vi: "Chủ tịch", en: "President" },
    bio: "Mr. Thanh Quach has worked in the information systems engineering field for 35 years, holding various positions such as project lead engineer, skill holder for processors and servers, subject matter expert for thin client-virtualization environments, network systems engineer, and audio/video systems lead engineer. Additionally, he spent nearly a decade in teaching positions, where he taught physics and chemistry at various levels, from high school to college and university. Mr. Quach holds Master's degrees in physical chemistry and electrical engineering (MSEE), and he is currently a Registered Communications Distribution Designer (RCDD). Outside of work, he dedicates a significant portion of his time to charitable endeavors.",
  },
  {
    name: "Mrs. Annie Nguyen",
    role: { vi: "Thư ký", en: "Secretary" },
    bio: "Mrs. Annie Nguyen is a retired employee of the University of Georgia. After retiring, she dedicated her time to providing administrative support for several medical missions and charity services in Vietnam.",
  },
] as const;

export function ContactPageView({ locale }: { locale: Locale }) {
  const copy = COPY[locale];

  return (
    <div className="mx-auto max-w-6xl px-5 pb-12 pt-16 sm:pt-20 lg:pt-24">
      <header className="max-w-2xl">
        <PageTitle>{copy.title}</PageTitle>
        <p className="mt-3 font-serif text-base leading-relaxed text-muted-foreground sm:text-lg">
          {copy.description}
        </p>
      </header>

      <div className="mt-8 grid gap-8 sm:mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,34rem)]">
        <div className="min-w-0 space-y-8">
          <p className="font-serif text-sm leading-relaxed text-foreground/90 sm:text-base">
            {copy.mission}
          </p>

          <div>
            <h2 className="text-sm font-semibold text-foreground">
              {copy.contactHeading}
            </h2>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-3 inline-block font-serif text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/80 sm:text-base"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-2xl bg-muted">
            <Image
              src={HERO_IMAGE}
              alt={copy.heroAlt}
              width={1200}
              height={800}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 544px"
              priority
            />
          </div>
        </aside>
      </div>

      <section className="mt-12 border-t border-border/60 pt-12 sm:mt-16 sm:pt-16">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
          {copy.teamHeading}
        </h2>
        <ul className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {TEAM.map((member) => (
            <li key={member.name}>
              <div className="space-y-0.5">
                <h3 className="font-serif text-base font-semibold leading-snug text-foreground">
                  {member.name}
                </h3>
                <p className="font-sans text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {member.role[locale]}
                </p>
              </div>
              <p className="mt-3 font-serif text-sm leading-relaxed text-foreground/90 sm:text-base">
                {member.bio}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
