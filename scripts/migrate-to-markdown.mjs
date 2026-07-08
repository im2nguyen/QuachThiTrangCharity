#!/usr/bin/env node
/**
 * One-time migration: legacy JSON/HTML content → markdown files.
 * Run: node scripts/migrate-to-markdown.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const CONTENT = path.join(ROOT, "content");
const ORIGINAL = path.join(ROOT, "..", "Original-QuachThiTrangCharity");

const turndown = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
});
turndown.use(gfm);
turndown.addRule("preserveLineBreaks", {
  filter: ["br"],
  replacement: () => "  \n",
});

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeMd(filePath, frontmatter, body) {
  const fm = Object.entries(frontmatter)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}:\n${value.map((v) => `  - ${JSON.stringify(v)}`).join("\n")}`;
      }
      if (typeof value === "object" && value !== null) {
        return `${key}:\n${Object.entries(value)
          .map(([k, v]) => `  ${k}: ${JSON.stringify(v)}`)
          .join("\n")}`;
      }
      return `${key}: ${JSON.stringify(value)}`;
    })
    .join("\n");
  const text = `---\n${fm}\n---\n\n${body.trim()}\n`;
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, text, "utf8");
}

function htmlToMarkdown(html) {
  let cleaned = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<!--[\s\S]*/g, "")
    .replace(/<img[^>]*(?:devider|electronc|logo1)[^>]*>/gi, "")
    .replace(/<center>/gi, "")
    .replace(/<\/center>/gi, "")
    .replace(/<P class="pi">/gi, "<p>")
    .replace(/<\/pi>/gi, "</p>")
    .replace(/<h class="ha">/gi, "## ")
    .replace(/<\/h>/gi, "\n")
    .replace(/class="[^"]*"/gi, "")
    .replace(/style="[^"]*"/gi, "")
    .replace(/face="[^"]*"/gi, "")
    .replace(/size="[^"]*"/gi, "")
    .replace(/color="[^"]*"/gi, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/href="images\//g, 'href="/images/')
    .replace(/src="images\//g, 'src="/images/')
    .replace(/href="pdf\//g, 'href="/pdf/')
    .replace(/src="pdf\//g, 'src="/pdf/');

  let md;
  try {
    md = turndown.turndown(`<div>${cleaned}</div>`);
  } catch {
    md = cleaned.replace(/<[^>]+>/g, "\n").replace(/\n{3,}/g, "\n\n");
  }
  return md
    .replace(/\n{3,}/g, "\n\n")
    .replace(/^\s*[\*\-]\s*$/gm, "")
    .trim();
}

/** @type {Record<string, string>} */
const SLUG_SECTION = {
  "the-he-qtt-lam-lich-su": "III",
  "hoi-nhac-si-vn": "III",
  "vnnc-tran-van-don": "III",
  "qtt-liet-si-tuoi-15": "III",
  "qtt-wikiand": "III",
  "tuong-niem-qtt-tinh-thuong": "III",
  "sinh-vien-hoc-sinh-dung-day": "III",
  "doc-tho-em-la-vi-sao-sang": "III",
  "tap-tho-qtt-2023": "II",
  "tap-tho-qtt-2024": "II",
  "dia-danh": "IV",
};

function variantFor(slug, locale) {
  if (slug === "dia-danh") return "places";
  if (SLUG_SECTION[slug] === "III") return "default";
  if (SLUG_SECTION[slug] === "II") return "default";
  return "poetry";
}

const SCHOLARSHIP_OVERRIDES = {
  "2020": `Với sự hợp tác của thân nhân Cô Quách Thị Trang và các nhà hảo tâm, lễ trao 26 suất học bổng Quách Thị Trang cho các nữ sinh lớp 11 của các trường trung học phổ thông được tổ chức vào 9 giờ sáng thứ ba 25/8/2020 tại tượng đài Quách Thị Trang ở công viên Bách Tùng Diệp trên đường Lý Tự Trọng, Quận 1 (đoạn giữa Nam Kỳ Khởi Nghĩa và Pasteur, chỗ gửi xe ở ngay sau công viên, vào hẽm trên đường Pasteur).

chương trình học bổng là để tưởng niệm liệt sĩ Quách Thị Trang và đồng thời tiếp sức đến trường cho các nữ sinh có hoàn cảnh khó khăn mà cùng lứa tuổi học trò lớp 11 với liệt sĩ Quách Thị Trang lúc hy sinh.`,
  "2021": `Do tình hình dịch Covid-19 ở TP.HCM đã được kiểm soát tạm ổn, học sinh đều được đi học lại, lễ trao học bổng Quách Thị Trang lần 8 trao đến 56 nữ sinh lớp 11 của 15 trường trung học phổ thông được tổ chức trước tượng đài Quách Thị Trang ở Công viên Bách Tùng Diệp đúng vào Ngày truyền thống học sinh sinh viên.

Ngoài ra trong số 56 nữ sinh được học bổng Quách Thị Trang có 3 học sinh nghèo mồ côi học giỏi còn được gia đình họ Quách tặng thêm học bổng 100 USD cho mỗi em. PGS.TS Nguyễn Thiện Tống cũng tặng thêm học bổng 2,1 triệu đồng cho một nữ sinh có hoàn cảnh khó khăn nhất.

PGS.TS Nguyễn Thiện Tống cho biết, chương trình học bổng Quách Thị Trang được tổ chức từ năm 2014 để tưởng niệm nữ liệt sĩ đã hy sinh khi tham gia cuộc biểu tình tại chợ Bến Thành ở Sài Gòn ngày 25 tháng 8 năm 1963.

chương trình học bổng là để tưởng niệm liệt sĩ Quách Thị Trang và đồng thời tiếp sức đến trường cho các nữ sinh có hoàn cảnh khó khăn mà cùng lứa tuổi học trò lớp 11 với liệt sĩ Quách Thị Trang lúc hy sinh.`,
  "2022": `PGS-TS Nguyễn Thiện Tống- Nguyên Trưởng khoa Kỹ thuật Hàng không, trường Đại học Bách khoa TP Hồ Chí Minh (Trưởng Ban tổ chức học bổng "Tiếp sức tới trường" của Báo Tuổi trẻ) cho biết đã tổ chức trao 109 suất học bổng Quách Thị Trang lần thứ 9 năm 2022 sáng ngày 25/8 tại tượng đài Quách Thị Trang ở công viên Bách Tùng Diệp, Quận 1, TpHCM.

90 nữ sinh nhận học bổng Quách Thị Trang lần thứ 9 năm 2022 là từ các trường THPT: An Lạc, Bình Chánh, Bình Tân, Dương Văn Thì, Gia Định, Gò Vấp, Lương Thế Vinh, Nam Kỳ Khởi Nghĩa, Nguyễn Thái Bình, Nguyễn Văn Cừ, Phạm Phú Thứ, Phan Đăng Lưu, Tân Túc, Ten Lơ Man, Trần Hưng Đạo, Bùi Thị Xuân, Hoàng Hoa Thám, Lê Thánh Tôn, Trần Văn Giàu, Nguyễn Công Trứ, Nguyễn Trung Trực, Thanh Đa và Võ Thị Sáu (TP HCM). Chương trình Học bổng Quách Thị Trang được tổ chức từ năm 2014 nhằm tưởng nhớ liệt nữ Quách Thị Trang đã hy sinh trong khi tham gia cuộc biểu tình ngày 25/8/1963 trước quảng trường Chợ Bến Thành, đồng thời nhằm tiếp sức đến trường cho những nữ sinh lớp 11 có hoàn cảnh khó khăn mà hiếu học.

Chương trình học bổng Quách Thị Trang năm 2022 có 90 suất học bổng với giá trị 2,4 triệu đồng mỗi suất, ngoài ra 19 học sinh mồ côi cả cha và mẹ hay mồ côi cha hoặc mồ côi mẹ được cấp thêm học bổng đặc biệt 2,4 triệu đồng, tổng kinh phí trao học bổng lần này 261,6 triệu đồng. Số học bổng trên do các nhà hảo tâm ủng hộ như sau: Gia đình học Quách 254,4 triệu đồng; Bà Diệp Mỹ Châu, Phật tử Lê Công Minh Khoa, và PGS-TS Nguyễn Thiện Tống 7,2 triệu đồng.`,
  "2024": `[Danh Sách Các Em Được Học Bổng tại Huế — Scholarship Recipients](/hoc-bong/2024/hue-recipients)

**Niên Khóa 2024**

Với sự hợp tác của Quach Thi Trang Foundation và các nhà hảo tâm, Chương trình học bổng Quách Thị Trang và chương trình học bổng Tám Phật tử Hy Sinh Vì Đạo năm học 2024-2025 vẫn tiếp tục như hai năm vừa qua. Lễ trao Học Bổng Quách Thị Trang trong đầu năm học sẽ được tổ chức vào ngày 25 tháng 8 năm 2024 tại TPHCM. Lễ trao 3 học bổng Tâm Tôn và 3 học Bổng Tâm Chánh được dự trù vào ngày 9 tháng 5 năm 2024 tại Huế nhưng đã được dời đến ngày 9 tháng 6 năm 2024 vừa qua. Tổ Chức Quach Thi Trang Foundation đã trao tặng 3 học Bổng Tâm Chánh và 3 học bổng Tâm Tôn cho 6 học sinh của hai trường Trung Học Cơ sở Điền Hòa và Trung Học Cơ Sở Hàm Nghi.

Chương trình học bổng Quách Thị Trang là để tưởng niệm liệt sĩ Quách Thị Trang và đồng thời tiếp sức đến trường cho các nữ sinh có hoàn cảnh khó khăn mà cùng lứa tuổi học trò lớp 11 với liệt sĩ Quách Thị Trang lúc hy sinh.`,
};

function stripScholarshipHtml(html, title) {
  const galleryMarker =
    /Hình\s+ảnh\s+buổi\s+lễ[\s\S]{0,160}Scholarship\s+Ceremony\s+Pictures/i;
  let result = html.replace(/<!--[\s\S]*?-->/g, "").replace(/<!--[\s\S]*/g, "");
  const marker = result.match(galleryMarker);
  if (marker?.index !== undefined) {
    result = result.slice(0, marker.index);
  }
  result = result
    .replace(/<center>[\s\S]*?(?:Trở\s*Về|Return\s*to\s*QTT)[\s\S]*?<\/center>/gi, "")
    .replace(/<h[^>]*>[\s\S]*?<\/h>/gi, (h) =>
      h.toLowerCase().includes(title.toLowerCase().slice(0, 12)) ? "" : h
    );
  return htmlToMarkdown(result);
}

function migrateLibrary() {
  const library = JSON.parse(fs.readFileSync(path.join(CONTENT, "library.json"), "utf8"));
  for (const page of library) {
    const body = page.pdf ? "" : htmlToMarkdown(page.bodyHtml);
    writeMd(
      path.join(CONTENT, "library", page.locale, `${page.slug}.md`),
      {
        title: page.title,
        section: SLUG_SECTION[page.slug] ?? "I",
        variant: page.pdf ? "pdf" : variantFor(page.slug, page.locale),
        ...(page.pdf ? { pdf: page.pdf } : {}),
      },
      page.pdf ? "_Content is shown as an embedded PDF._" : body
    );
  }
  console.log(`Migrated ${library.length} library pages`);
}

function migrateScholarships() {
  const scholarships = JSON.parse(
    fs.readFileSync(path.join(CONTENT, "scholarships.json"), "utf8")
  );
  for (const [year, data] of Object.entries(scholarships)) {
    const body =
      SCHOLARSHIP_OVERRIDES[year] ??
      stripScholarshipHtml(data.bodyHtml, data.title);
    writeMd(
      path.join(CONTENT, "scholarships", `${year}.md`),
      {
        year: Number(year),
        title: data.title,
        images: data.images,
        pdfs: data.pdfs,
        recipientsTable: year === "2025",
      },
      body
    );
  }
  console.log(`Migrated ${Object.keys(scholarships).length} scholarship years`);
}

function migrateHome() {
  const home = JSON.parse(fs.readFileSync(path.join(CONTENT, "home.json"), "utf8"));
  for (const locale of ["vi", "en"]) {
    const body = htmlToMarkdown(home[locale].missionHtml);
    writeMd(path.join(CONTENT, "home", locale, "mission.md"), { variant: "mission" }, body);
  }
  console.log("Migrated home mission pages");
}

function migrateNews() {
  const articles = {
    vi: [
      {
        year: 2025,
        title: "Tin Học Bổng Quách Thị Trang Năm 2025",
        scholarshipHref: "/hoc-bong/2025",
        pdfHref: "/pdf/Recipients2025.pdf",
        pdfLabel: "Danh sách học sinh nhận học bổng 2025 (PDF)",
        body: `Chương trình học bổng Quách Thị Trang được tổ chức từ năm 2014 nhằm tưởng nhớ liệt nữ Quách Thị Trang đã hy sinh trong khi tham gia cuộc biểu tình ngày 25/8/1963 trước quảng trường chợ Bến Thành, đồng thời nhằm tiếp sức đến trường cho những nữ sinh lớp 11 có hoàn cảnh khó khăn mà cùng lứa tuổi với liệt nữ Quách Thị Trang lúc hy sinh.

Chương trình học bổng Quách Thị Trang lần 12 vào năm 2025 có 123 suất học bổng trong đó 84 suất với giá trị 2,5 triệu đồng một suất và 39 suất với trị giá 3,5 triệu đồng một suất. Toàn bộ kinh phí 346,5 triệu đồng do Quách Thị Trang Foundation ủng hộ.

Danh sách 123 học sinh được cấp học bổng Quách Thị Trang năm 2025 được đính kèm dưới đây gồm 39 học sinh được cấp học bổng đặc biệt 3,5 triệu đồng cho mỗi em.

Lễ trao học bổng Quách Thị Trang năm 2025 đã được tổ chức trước tượng đài Quách Thị Trang ở công viên Bách Tùng Diệp (góc Nam Kỳ Khởi Nghĩa và Lý Tự Trọng, Quận 1) vào 9 giờ sáng chủ nhật 24/8/2025 ngay trước ngày Cô Quách Thị Trang hy sinh năm 1963.`,
      },
      {
        year: 2024,
        title: "Tin Học Bổng Quách Thị Trang Năm 2024",
        scholarshipHref: "/hoc-bong/2024",
        body: `Với sự hợp tác của Quach Thi Trang Foundation và các nhà hảo tâm, Chương trình học bổng Quách Thị Trang và chương trình học bổng cho học sinh Thành Phố Huế vẫn tiếp tục như hai năm vừa qua. Lễ trao Học Bổng Quách Thị Trang trong đầu năm học đã được tổ chức vào ngày 25 tháng 8 năm 2024 tại TPHCM. Lễ trao học bổng cho học sinh Thành Phố Huế được dự trù vào ngày 9 tháng 5 năm 2024 tại Huế nhưng đã được dời đến ngày 9 tháng 6 năm 2024 vừa qua. Tổ Chức Quach Thi Trang Foundation đã trao tặng 3 học Bổng Tâm Chánh và 3 học bổng Tâm Tôn cho 6 học sinh của hai trường Trung Học Cơ sở Điền Hòa và Trung Học Cơ Sở Hàm Nghi.`,
      },
    ],
    en: [
      {
        year: 2025,
        title: "Quach Thi Trang Scholarship News 2025",
        scholarshipHref: "/en/hoc-bong/2025",
        pdfHref: "/pdf/Recipients2025.pdf",
        pdfLabel: "2025 scholarship recipients (PDF)",
        body: `The Quach Thi Trang scholarship program has been held since 2014 to honor Quach Thi Trang, who was killed while taking part in the August 25, 1963 demonstration in front of Ben Thanh Market, and to help grade-11 girls in financial need who are the same age she was when she died.

The 12th Quach Thi Trang scholarship program in 2025 awarded 123 scholarships: 84 at 2.5 million VND each and 39 at 3.5 million VND each. Quach Thi Trang Foundation provided the full amount of 346.5 million VND.

The list of 123 scholarship recipients for 2025 is linked below, including 39 students who received the special 3.5 million VND scholarship.

The 2025 Quach Thi Trang scholarship ceremony was held at the Quach Thi Trang monument in Bach Tung Diep Park (corner of Nam Ky Khoi Nghia and Ly Tu Trong, District 1) at 9 a.m. on Sunday, August 24, 2025, just before the anniversary of her death in 1963.`,
      },
      {
        year: 2024,
        title: "Quach Thi Trang Scholarship News 2024",
        scholarshipHref: "/en/hoc-bong/2024",
        body: `With the cooperation of Quach Thi Trang Foundation and generous donors, the Quach Thi Trang scholarship program and the Hue City scholarship program continued as in the previous two years. The Quach Thi Trang scholarship ceremony for the new school year was held on August 25, 2024 in Ho Chi Minh City. The Hue ceremony was originally planned for May 9, 2024 but was moved to June 9, 2024. Quach Thi Trang Foundation awarded three Tam Chanh scholarships and three Tam Ton scholarships to six students at Dien Hoa and Ham Nghi junior high schools.`,
      },
    ],
  };

  for (const [locale, items] of Object.entries(articles)) {
    for (const item of items) {
      const { body, ...fm } = item;
      writeMd(path.join(CONTENT, "news", locale, `${item.year}.md`), fm, body);
    }
  }
  console.log("Migrated news articles");
}

function migrateHueRecipients() {
  const files = { "2020": "recipients2020.htm", "2024": "recipients2024.htm" };
  for (const [year, file] of Object.entries(files)) {
    const fp = path.join(ORIGINAL, file);
    if (!fs.existsSync(fp)) {
      console.warn(`Skipping hue recipients ${year}: ${fp} not found`);
      continue;
    }
    const body = htmlToMarkdown(fs.readFileSync(fp, "utf8"));
    writeMd(
      path.join(CONTENT, "hue-recipients", `${year}.md`),
      { year: Number(year), title: `Học bổng Huế ${year}` },
      body
    );
  }
  console.log("Migrated hue recipient pages");
}

function migrateGallery() {
  const src = path.join(CONTENT, "gallery.json");
  const dest = path.join(CONTENT, "data", "gallery.json");
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
  console.log("Copied gallery.json to content/data/");
}

function migrateNavigation() {
  const navSrc = path.join(ROOT, "lib", "navigation.ts");
  const navText = fs.readFileSync(navSrc, "utf8");
  const match = navText.match(/const viLibrary[^=]*=\s*(\[[\s\S]*?\]);/);
  if (!match) throw new Error("Could not parse library navigation from navigation.ts");
  const sections = eval(match[1]);
  const dest = path.join(CONTENT, "navigation", "library.json");
  ensureDir(path.dirname(dest));
  fs.writeFileSync(dest, JSON.stringify(sections, null, 2), "utf8");
  console.log("Exported library navigation to content/navigation/library.json");
}

function migrateSummaries() {
  const summaries = {
    vi: {
      2025: { title: "Lễ trao học bổng Quách Thị Trang năm 2025", blurb: "Trao học bổng lần 12 — 123 suất." },
      2024: { title: "Lễ trao học bổng Quách Thị Trang năm 2024", blurb: "Trao học bổng lần thứ 11 — 129 nữ sinh." },
      2023: { title: "Lễ trao học bổng Quách Thị Trang năm 2023", blurb: "94 nữ sinh nhận học bổng lần 10." },
      2022: { title: "Lễ trao học bổng Quách Thị Trang năm 2022", blurb: "109 nữ sinh nhận học bổng lần 9." },
      2021: { title: "Lễ trao học bổng Quách Thị Trang năm 2021", blurb: "56 nữ sinh nhận học bổng lần 8." },
      2020: { title: "Lễ trao học bổng Quách Thị Trang năm 2020", blurb: "26 học sinh nhận học bổng lần 7." },
    },
    en: {
      2025: { title: "Quach Thi Trang Scholarship Ceremony 2025", blurb: "12th annual awards — 123 scholarships." },
      2024: { title: "Quach Thi Trang Scholarship Ceremony 2024", blurb: "11th annual awards — 129 recipients." },
      2023: { title: "Quach Thi Trang Scholarship Ceremony 2023", blurb: "94 recipients received the 10th annual awards." },
      2022: { title: "Quach Thi Trang Scholarship Ceremony 2022", blurb: "109 recipients received the 9th annual awards." },
      2021: { title: "Quach Thi Trang Scholarship Ceremony 2021", blurb: "56 recipients received the 8th annual awards." },
      2020: { title: "Quach Thi Trang Scholarship Ceremony 2020", blurb: "26 recipients received the 7th annual awards." },
    },
  };
  const dest = path.join(CONTENT, "data", "scholarship-summaries.json");
  fs.writeFileSync(dest, JSON.stringify(summaries, null, 2), "utf8");
  console.log("Wrote scholarship summaries");
}

function migrateResourcesIntro() {
  const vi = {
    intro:
      "Tài liệu về Cô Quách Thị Trang gồm các bài thơ nhạc, các bài khảo cứu, các hình ảnh, và các bài viết liên lạc về Cô Quách Thị Trang, và gần đây nhất là tập thơ nhạc tưởng niệm Cô Quách Thị Trang đã được tái bản lần thứ ba. Nội dung của tập thơ nhạc này đã được đăng trên trang web này. Xin bấm vào các liên kết ở cột bên cạnh để đọc. Để giữ tính lịch sử, các tài liệu này sẽ được đăng dưới ngôn ngữ nguyên thủy mà không lược dịch. Chúng tôi sẽ tiếp tục sưu tầm thêm và cũng rất trân trọng đón nhận thêm những tài liệu xác thực của quý vị cùng quí bạn, nếu có.",
    forewordLeadIn:
      "Dưới đây là Lời Phi Lộ của tập thơ nhạc tưởng niệm Quách Thị Trang:",
    forewordTitle: "Lời Phi Lộ",
    forewordParagraphs: [
      "Mùa hè năm 2021, chúng tôi có dịp đọc luận án tiến sĩ của Ryan Nelson tại University of California, Berkeley với tựa đề \"South Viêtnam: A Social, Cultural, Political History, 1963 to 1967\". Tác giả khảo cứu các yếu tố lịch sử xã hội, văn hóa chính trị của miền nam Việt Nam từ năm 1963 đến năm 1967, phần lớn dựa vào những tin tức và bài viết trên báo chí đương thời ở Sài Gòn.",
      "Trong phần đầu của luận án, tác giả có nói đến sự hy sinh của nữ sinh Quách Thị Trang vào ngày 25 tháng 8 năm 1963 và ảnh hưởng của sự hy sinh ấy trong lịch sử thời đó.",
      "Chị Quách Thị Trang là người con thứ tư trong gia đình chúng tôi. Để tưởng niệm chị và góp thêm tài liệu cho thời kỳ lịch sử này, chúng tôi cố gắng sưu tập và xuất bản những bài thơ viết về chị đã đăng trên báo chí Sài Gòn từ sau ngày hy sinh của chị. Mong rằng việc xuất bản tập thơ này sẽ góp phần ghi nhận những ảnh hưởng sự hy sinh của chị trong lòng người và trong lịch sử Việt Nam.",
      "Rất tiếc là có nhiều bài thơ đã bị thất lạc trong những năm gia đình chúng tôi phải di chuyển nhiều lần, nhưng chúng tôi cũng cònlưu giữ được một số bài đã đăng rải rác trên báo chí Sài Gòn trong khoảng thời gian từ lúc chị hy sinh cho đến vài năm sau đọ Trong số các tác giả, ngoài các thi sĩ nổi tiếng như Vũ Hoàng Chương, Trụ Vũ, Tú Kếu Trần Đức Uyển ... còn có nhiều người khác, phần lớn là những người trẻ tuổi thương mến và cảm phục sự hy sinh của chị. Những dòng thơ của họ có thể không chau chuốt cầu kỳ nhưng đều biểu lộ sự chân thành tương tiếc chị.",
      "Do điều kiện xa xôi cách trở nên chúng tôi không thể liên lạc được với từng tác giả để xin phép. Hơn nữa với thời gian trôi qua đã quá lâu, một số tác giả cũng không còn nữa và chúng tôi không biết được ai là người đã thừa kế. Do vậy chúng tôi xin kính lời tri ân đến tất cả và mong quý vị niệm tình bỏ qua cho sự thiếu sót này.",
    ],
    forewordClosing: [
      "California, ngày 25 tháng 8 năm 2021",
      "Nhân ngày giỗ thứ 58 của chị",
      "Quách An Đông",
    ],
  };
  const en = {
    intro:
      "The materials about Quách Thị Trang include poetry and music, research essays, photographs, and related writings. Most recently, the memorial poetry and music collection in her honor has been reissued for the third time. The contents of that collection are published on this website. Please use the links in the sidebar to read them. To preserve historical authenticity, these materials are presented in their original language without abridged translation. We will continue collecting additional materials and warmly welcome authentic contributions from readers and friends, if any.",
    forewordLeadIn:
      "Below is the foreword to the memorial poetry and music collection for Quách Thị Trang:",
    forewordTitle: "Foreword",
    forewordParagraphs: [
      "In the summer of 2021, we had the opportunity to read Ryan Nelson's doctoral dissertation at the University of California, Berkeley, titled \"South Viêtnam: A Social, Cultural, Political History, 1963 to 1967.\" The author examines the social, cultural, and political history of South Vietnam from 1963 to 1967, drawing largely on news reports and articles in the contemporary Saigon press.",
      "In the opening section of the dissertation, the author discusses the sacrifice of student Quách Thị Trang on August 25, 1963, and the influence of that sacrifice on the history of that period.",
      "Quách Thị Trang was the fourth child in our family. To commemorate her and to contribute additional material on this historical period, we have tried to collect and publish poems written about her that appeared in the Saigon press after the day of her sacrifice. We hope that publishing this collection will help record the influence of her sacrifice in people's hearts and in Vietnam's history.",
      "Regrettably, many poems were lost during the years when our family had to move many times, but we were still able to preserve a number of pieces that had appeared in the Saigon press from the time of her sacrifice until several years afterward. Among the authors, in addition to well-known poets such as Vũ Hoàng Chương, Trụ Vũ, and Tú Kếu Trần Đức Uyển, there were many others, mostly young people who admired and were moved by her sacrifice. Their lines of poetry may not be polished or elaborate, but they all express sincere mourning for her.",
      "Because of distance and separation, we were unable to contact each author to request permission. Moreover, with the passage of so much time, some authors are no longer living and we do not know who their heirs may be. We therefore express our deep gratitude to all of them and ask readers to understand this omission with kindness.",
    ],
    forewordClosing: [
      "California, August 25, 2021",
      "On the 58th anniversary of her passing",
      "Quách An Đông",
    ],
  };
  for (const [locale, data] of Object.entries({ vi, en })) {
    const body = [data.intro, "", `## ${data.forewordTitle}`, "", ...data.forewordParagraphs, "", ...data.forewordClosing].join(
      "\n\n"
    );
    writeMd(path.join(CONTENT, "pages", locale, "resources-intro.md"), data, body);
  }
  console.log("Migrated resources intro");
}

migrateLibrary();
migrateScholarships();
migrateHome();
migrateNews();
migrateHueRecipients();
migrateGallery();
migrateNavigation();
migrateSummaries();
migrateResourcesIntro();

// Generate client-safe manifest JSON
const scholarshipsDir = path.join(CONTENT, "scholarships");
const years = fs
  .readdirSync(scholarshipsDir)
  .filter((f) => /^\d{4}\.md$/.test(f))
  .map((f) => Number(f.replace(".md", "")))
  .sort((a, b) => b - a);
const images = {};
for (const year of years) {
  const raw = fs.readFileSync(path.join(scholarshipsDir, `${year}.md`), "utf8");
  const { data } = matter(raw);
  images[year] = data.images ?? [];
}
ensureDir(path.join(CONTENT, "data"));
fs.writeFileSync(
  path.join(CONTENT, "data", "scholarship-years.json"),
  JSON.stringify(years)
);
fs.writeFileSync(
  path.join(CONTENT, "data", "scholarship-images.json"),
  JSON.stringify(images, null, 2)
);
console.log("Wrote scholarship manifest JSON");

console.log("\nDone! Review content/ and then remove legacy JSON files.");
