import { ScholarshipYearPage } from "@/components/pages/ScholarshipYear";
import { scholarshipYears } from "@/content";

export function generateStaticParams() {
  return scholarshipYears.map((y) => ({ year: String(y) }));
}

export default async function EnHocBongYear({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  return <ScholarshipYearPage year={year} locale="en" />;
}
