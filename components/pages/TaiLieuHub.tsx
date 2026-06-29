import { ResourcesIntroBlurb } from "@/components/resources/ResourcesIntroBlurb";
import { ResourcesLayout } from "@/components/resources/ResourcesLayout";
import type { Locale } from "@/lib/locale";

export function TaiLieuHubPage({ locale }: { locale: Locale }) {
  return (
    <ResourcesLayout locale={locale}>
      <div className="max-w-3xl">
        <ResourcesIntroBlurb locale={locale} />
      </div>
    </ResourcesLayout>
  );
}
