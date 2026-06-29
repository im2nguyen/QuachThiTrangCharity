import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HtmlContent } from "@/components/HtmlContent";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { ScholarshipLayout } from "@/components/scholarship/ScholarshipLayout";
import { getScholarshipYear } from "@/content";
import { filterGalleryImages } from "@/lib/gallery";
import {
  htmlToPlainText,
  stripScholarshipBodyHtml,
} from "@/lib/strip-scholarship-body";
import { splitAtFirstTable } from "@/lib/normalize-scholarship-paragraphs";
import { RecipientsTable } from "@/components/scholarship/RecipientsTable";
import { getRecipients2025 } from "@/content/recipients/recipients-2025";
import type { Locale } from "@/lib/locale";

const SCHOLARSHIP_BODY_OVERRIDES: Partial<Record<string, string>> = {
  "2020": `<p class="pi">Với sự hợp tác của thân nhân Cô Quách Thị Trang và các nhà hảo tâm, lễ trao 26 suất học bổng Quách Thị Trang cho các nữ sinh lớp 11 của các trường trung học phổ thông được tổ chức vào 9 giờ sáng thứ ba 25/8/2020 tại tượng đài Quách Thị Trang ở công viên Bách Tùng Diệp trên đường Lý Tự Trọng, Quận 1 (đoạn giữa Nam Kỳ Khởi Nghĩa và Pasteur, chỗ gửi xe ở ngay sau công viên, vào hẽm trên đường Pasteur).</p>
<p class="pi">chương trình học bổng là để tưởng niệm liệt sĩ Quách Thị Trang và đồng thời tiếp sức đến trường cho các nữ sinh có hoàn cảnh khó khăn mà cùng lứa tuổi học trò lớp 11 với liệt sĩ Quách Thị Trang lúc hy sinh.</p>`,
  "2021": `<p class="pi">Do tình hình dịch Covid-19 ở TP.HCM đã được kiểm soát tạm ổn, học sinh đều được đi học lại, lễ trao học bổng Quách Thị Trang lần 8 trao đến 56 nữ sinh lớp 11 của 15 trường trung học phổ thông được tổ chức trước tượng đài Quách Thị Trang ở Công viên Bách Tùng Diệp đúng vào Ngày truyền thống học sinh sinh viên.</p>
<p class="pi">Ngoài ra trong số 56 nữ sinh được học bổng Quách Thị Trang có 3 học sinh nghèo mồ côi học giỏi còn được gia đình họ Quách tặng thêm học bổng 100 USD cho mỗi em. PGS.TS Nguyễn Thiện Tống cũng tặng thêm học bổng 2,1 triệu đồng cho một nữ sinh có hoàn cảnh khó khăn nhất.</p>
<p class="pi">PGS.TS Nguyễn Thiện Tống cho biết, chương trình học bổng Quách Thị Trang được tổ chức từ năm 2014 để tưởng niệm nữ liệt sĩ đã hy sinh khi tham gia cuộc biểu tình tại chợ Bến Thành ở Sài Gòn ngày 25 tháng 8 năm 1963.</p>
<p class="pi">chương trình học bổng là để tưởng niệm liệt sĩ Quách Thị Trang và đồng thời tiếp sức đến trường cho các nữ sinh có hoàn cảnh khó khăn mà cùng lứa tuổi học trò lớp 11 với liệt sĩ Quách Thị Trang lúc hy sinh.</p>`,
  "2022": `<p class="pi">PGS-TS Nguyễn Thiện Tống- Nguyên Trưởng khoa Kỹ thuật Hàng không, trường Đại học Bách khoa TP Hồ Chí Minh (Trưởng Ban tổ chức học bổng “Tiếp sức tới trường” của Báo Tuổi trẻ) cho biết đã tổ chức trao 109 suất học bổng Quách Thị Trang lần thứ 9 năm 2022 sáng ngày 25/8 tại tượng đài Quách Thị Trang ở công viên Bách Tùng Diệp, Quận 1, TpHCM.</p>
<p class="pi">90 nữ sinh nhận học bổng Quách Thị Trang lần thứ 9 năm 2022 là từ các trường THPT: An Lạc, Bình Chánh, Bình Tân, Dương Văn Thì, Gia Định, Gò Vấp, Lương Thế Vinh, Nam Kỳ Khởi Nghĩa, Nguyễn Thái Bình, Nguyễn Văn Cừ, Phạm Phú Thứ, Phan Đăng Lưu, Tân Túc, Ten Lơ Man, Trần Hưng Đạo, Bùi Thị Xuân, Hoàng Hoa Thám, Lê Thánh Tôn, Trần Văn Giàu, Nguyễn Công Trứ, Nguyễn Trung Trực, Thanh Đa và Võ Thị Sáu (TP HCM). Chương trình Học bổng Quách Thị Trang được tổ chức từ năm 2014 nhằm tưởng nhớ liệt nữ Quách Thị Trang đã hy sinh trong khi tham gia cuộc biểu tình ngày 25/8/1963 trước quảng trường Chợ Bến Thành, đồng thời nhằm tiếp sức đến trường cho những nữ sinh lớp 11 có hoàn cảnh khó khăn mà hiếu học.</p>
<p class="pi">Chương trình học bổng Quách Thị Trang năm 2022 có 90 suất học bổng với giá trị 2,4 triệu đồng mỗi suất, ngoài ra 19 học sinh mồ côi cả cha và mẹ hay mồ côi cha hoặc mồ côi mẹ được cấp thêm học bổng đặc biệt 2,4 triệu đồng, tổng kinh phí trao học bổng lần này 261,6 triệu đồng. Số học bổng trên do các nhà hảo tâm ủng hộ như sau: Gia đình học Quách 254,4 triệu đồng; Bà Diệp Mỹ Châu, Phật tử Lê Công Minh Khoa, và PGS-TS Nguyễn Thiện Tống 7,2 triệu đồng.</p>`,
  "2024": `<p class="pi"><a href="recipients2024.htm">Danh Sách Các Em Được Học Bổng tại Huế — Scholarship Recipients</a></p>
<p class="pi"><strong>Niên Khóa 2024</strong></p>
<p class="pi">Với sự hợp tác của Quach Thi Trang Foundation và các nhà hảo tâm, Chương trình học bổng Quách Thị Trang và chương trình học bổng Tám Phật tử Hy Sinh Vì Đạo năm học 2024-2025 vẫn tiếp tục như hai năm vừa qua. Lễ trao Học Bổng Quách Thị Trang trong đầu năm học sẽ được tổ chức vào ngày 25 tháng 8 năm 2024 tại TPHCM. Lễ trao 3 học bổng Tâm Tôn và 3 học Bổng Tâm Chánh được dự trù vào ngày 9 tháng 5 năm 2024 tại Huế nhưng đã được dời đến ngày 9 tháng 6 năm 2024 vừa qua. Tổ Chức Quach Thi Trang Foundation đã trao tặng 3 học Bổng Tâm Chánh và 3 học bổng Tâm Tôn cho 6 học sinh của hai trường Trung Học Cơ sở Điền Hòa và Trung Học Cơ Sở Hàm Nghi.</p>
<p class="pi">Chương trình học bổng Quách Thị Trang là để tưởng niệm liệt sĩ Quách Thị Trang và đồng thời tiếp sức đến trường cho các nữ sinh có hoàn cảnh khó khăn mà cùng lứa tuổi học trò lớp 11 với liệt sĩ Quách Thị Trang lúc hy sinh.</p>`,
};

export function ScholarshipYearPage({ year, locale }: { year: string; locale: Locale }) {
  const data = getScholarshipYear(year);
  if (!data) notFound();

  const base = locale === "en" ? "/en/hoc-bong" : "/hoc-bong";
  const images = filterGalleryImages(data.images);
  const pageTitle =
    locale === "en"
      ? `Quach Thi Trang Scholarship ${year}`
      : `Học Bổng Quách Thị Trang ${year}`;
  const rawBodyHtml =
    SCHOLARSHIP_BODY_OVERRIDES[year] ?? stripScholarshipBodyHtml(data.bodyHtml, pageTitle);
  const bodyHtml = rawBodyHtml.replace(
    new RegExp(`href=["']recipients${year}\\.htm["']`, "gi"),
    `href="${base}/${year}/hue-recipients"`
  );
  const bodyHtmlWithoutPdfs = data.pdfs.reduce((html, p) => {
    // Some legacy pages embed the same PDF link in the body HTML.
    // We render PDFs separately, so remove duplicate anchors by href.
    const href = p.href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(
      `<a\\b[^>]*href=[\"']${href}[\"'][^>]*>[\\s\\S]*?<\\/a>\\s*(?:<br\\s*\\/?>\\s*)*`,
      "gi"
    );
    return html.replace(re, "");
  }, bodyHtml);
  const { introHtml, tableHtml, afterTableHtml } =
    splitAtFirstTable(bodyHtmlWithoutPdfs);
  const hasIntro = htmlToPlainText(introHtml).length > 0;
  const hasTable = tableHtml.length > 0;
  const hasAfterTable = htmlToPlainText(afterTableHtml).length > 0;
  const is2025 = year === "2025";
  const recipients2025 = is2025 ? getRecipients2025() : null;

  return (
    <ScholarshipLayout locale={locale} activeYear={year}>
      <div
        className={
          images.length > 0
            ? "grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]"
            : "space-y-8"
        }
      >
        <div className="min-w-0 space-y-8">
          {hasIntro && <HtmlContent html={introHtml} />}

          {data.pdfs.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {data.pdfs.map((p) => (
                <Button key={p.href} asChild>
                  <Link href={p.href}>{p.label.replace(/^\*\s*/, "")}</Link>
                </Button>
              ))}
            </div>
          )}

          {is2025 && recipients2025 ? (
            <RecipientsTable
              rows={recipients2025}
              locale={locale === "en" ? "en" : "vi"}
            />
          ) : (
            hasTable && <HtmlContent html={tableHtml} />
          )}
          {hasAfterTable && <HtmlContent html={afterTableHtml} />}
        </div>

        {images.length > 0 && (
          <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            <GalleryGrid
              images={images}
              year={year}
              locale={locale}
              layout="sidebar"
            />
          </aside>
        )}
      </div>
    </ScholarshipLayout>
  );
}
