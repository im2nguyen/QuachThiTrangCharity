import { LibraryPageView } from "@/components/pages/LibraryPage";
import { getLibrarySlugs } from "@/content";

export function generateStaticParams() {
  return getLibrarySlugs("en").map((slug) => ({ slug }));
}

export default async function EnLibrarySlug({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <LibraryPageView slug={slug} locale="en" />;
}
