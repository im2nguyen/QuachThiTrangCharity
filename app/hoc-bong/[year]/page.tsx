import { ScholarshipYearPage } from "@/components/pages/ScholarshipYear";
import { scholarshipYears } from "@/lib/content-manifest";

export function generateStaticParams() {
  return scholarshipYears.map((y) => ({ year: String(y) }));
}

export default async function HocBongYear({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  return <ScholarshipYearPage year={year} locale="vi" />;
}
