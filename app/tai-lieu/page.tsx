import { redirect } from "next/navigation";
import { TaiLieuHubPage } from "@/components/pages/TaiLieuHub";
import { getFirstSectionLinkById } from "@/lib/resource-link";
import type { ResourceType } from "@/lib/resource-types";

export const metadata = { title: "Tư liệu — Quách Thị Trang Foundation" };
export const dynamic = "force-dynamic";

export default async function TaiLieu({
  searchParams,
}: {
  searchParams: Promise<{ type?: ResourceType }>;
}) {
  const sp = await searchParams;
  if (sp.type) {
    const first = getFirstSectionLinkById(sp.type, "vi");
    if (first) redirect(first.href);
  }

  return <TaiLieuHubPage locale="vi" />;
}
