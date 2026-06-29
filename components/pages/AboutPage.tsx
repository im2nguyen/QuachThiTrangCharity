import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ContentSection } from "@/components/ContentSection";
import { Button } from "@/components/ui/button";

export function AboutPageView() {
  return (
    <>
      <PageHeader title="About Us" />
      <ContentSection width="md" className="space-y-6">
        <h2 className="font-serif text-2xl font-semibold">OUR MISSIONS</h2>
        <p className="leading-relaxed text-foreground/90">
          To address the educational needs of exceptional students in Vietnam who face financial
          hardships, as well as to support the underprivileged children within the Vietnamese
          community. We provide annual scholarships to talented yet financially disadvantaged high
          school students in Vietnam, fostering their continued education and acknowledging their
          latent leadership capabilities amidst challenging circumstances.
        </p>
        <Button asChild>
          <Link href="/contact">Contact us</Link>
        </Button>
      </ContentSection>
    </>
  );
}
