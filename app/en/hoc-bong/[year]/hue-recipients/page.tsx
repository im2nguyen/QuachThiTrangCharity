import { HueRecipientsView } from "@/components/pages/HueRecipients";

export function generateStaticParams() {
  return [{ year: "2024" }, { year: "2020" }];
}

export default async function EnHueRecipients({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  return <HueRecipientsView year={year} locale="en" />;
}
