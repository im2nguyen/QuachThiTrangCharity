import { LibraryPageView } from "@/components/pages/LibraryPage";
import { getLibrarySlugs } from "@/lib/content";

export function generateStaticParams() {
  return getLibrarySlugs("vi").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return { title: `${slug} — Tư liệu` };
}

export default async function LibrarySlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <LibraryPageView slug={slug} locale="vi" />;
}
