#!/usr/bin/env node
/**
 * Extracts page content from Original-QuachThiTrangCharity HTML into JSON for Next.js.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SOURCE = path.join(ROOT, "..", "Original-QuachThiTrangCharity");
const OUT = path.join(ROOT, "content");

/** @type {Record<string, { slug: string; locale: 'vi' | 'en' }>} */
const LIBRARY_MAP = {
  "Motvisaonho.html": { slug: "mot-vi-sao-nho", locale: "vi" },
  "NhoTrang.html": { slug: "nho-trang", locale: "vi" },
  "NhoTrangE.html": { slug: "nho-trang", locale: "en" },
  "DiepKhucQTT.html": { slug: "diep-khuc-qtt", locale: "vi" },
  "Divaolichsu.html": { slug: "di-vao-lich-su", locale: "vi" },
  "KHOCTRANG.html": { slug: "khoc-trang", locale: "vi" },
  "HuongveTrang.html": { slug: "huong-ve-trang", locale: "vi" },
  "CamniemQTT.html": { slug: "cam-niem-qtt", locale: "vi" },
  "NuThanhTuDaoQTT.html": { slug: "nu-thanh-tu-dao-qtt", locale: "vi" },
  "Nenhuongbenmo.html": { slug: "nen-huong-ben-mo", locale: "vi" },
  "Dotnenhuongthomkhannguyencau.html": { slug: "dot-nen-huong-thom", locale: "vi" },
  "VeBenCu.html": { slug: "ve-ben-cu", locale: "vi" },
  "TuongNiem.html": { slug: "tuong-niem", locale: "vi" },
  "TuongNiem2.html": { slug: "tuong-niem-2", locale: "vi" },
  "BanTayCaoCa.html": { slug: "ban-tay-cao-ca", locale: "vi" },
  "HoainiemQTT.html": { slug: "hoai-niem-qtt", locale: "vi" },
  "TenEmVietGiuaCongTruongLon.html": { slug: "ten-em-viet-giua-cong-truong-lon", locale: "vi" },
  "KhocQTT.html": { slug: "khoc-qtt", locale: "vi" },
  "QUACHTHITRANG.html": { slug: "quach-thi-trang", locale: "vi" },
  "HoaDaoNoTrenMo.html": { slug: "hoa-dao-no-tren-mo", locale: "vi" },
  "LuaThieng.html": { slug: "lua-thieng", locale: "vi" },
  "HoaTranghuongsach.html": { slug: "hoa-trang-huong-sach", locale: "vi" },
  "HoaTrangThanhTuong.html": { slug: "hoa-trang-thanh-tuong", locale: "vi" },
  "Tiengthomualoan.html": { slug: "tieng-tho-mua-loan", locale: "vi" },
  "Chantinhcuaem.html": { slug: "chan-tinh-cua-em", locale: "vi" },
  "KinhViengQTT.html": { slug: "kinh-vieng-qtt", locale: "vi" },
  "AoTrangmaudao.html": { slug: "ao-trang-mau-dao", locale: "vi" },
  "Mau.html": { slug: "mau", locale: "vi" },
  "HoaHongConDay.html": { slug: "hoa-hong-con-day", locale: "vi" },
  "EmConSongMai.html": { slug: "em-con-song-mai", locale: "vi" },
  "NhacEMLAVISAOSANG.html": { slug: "nhac-em-la-vi-sao-sang", locale: "vi" },
  "DOCTHOEMLAVISAOSANG.html": { slug: "doc-tho-em-la-vi-sao-sang", locale: "vi" },
  "TuongNiemQTT-TinhThuong.html": { slug: "tuong-niem-qtt-tinh-thuong", locale: "vi" },
  "SVHSDungDay.html": { slug: "sinh-vien-hoc-sinh-dung-day", locale: "vi" },
  "TheHeQTTlamLichSu.html": { slug: "the-he-qtt-lam-lich-su", locale: "vi" },
  "HoiNhacSiVN.html": { slug: "hoi-nhac-si-vn", locale: "vi" },
  "VNNC-TranVanDon.html": { slug: "vnnc-tran-van-don", locale: "vi" },
  "QTT-LietSiTuoi15.html": { slug: "qtt-liet-si-tuoi-15", locale: "vi" },
  "QTT-Wikiand.html": { slug: "qtt-wikiand", locale: "en" },
  "QTT-Wikiandv.html": { slug: "qtt-wikiand", locale: "vi" },
  "TapThoQTT2023.html": { slug: "tap-tho-qtt-2023", locale: "vi" },
  "TapThoQTT2024.html": { slug: "tap-tho-qtt-2024", locale: "vi" },
};

/** @type {Record<string, number>} */
const SCHOLARSHIP_MAP = {
  "HBQTT25.html": 2025,
  "HBQTT15.html": 2025,
  "HBQTT24.html": 2024,
  "HBQTT14.html": 2024,
  "HBQTT23.html": 2023,
  "HBQTT22.html": 2022,
  "HBQTT21.html": 2021,
  "HBQTT20.html": 2020,
};

function readHtml(file) {
  return fs.readFileSync(path.join(SOURCE, file), "utf8");
}

function fixAssetPaths(html) {
  return html
    .replace(/src="images\//g, 'src="/images/')
    .replace(/href="images\//g, 'href="/images/')
    .replace(/src="pdf\//g, 'src="/pdf/')
    .replace(/href="pdf\//g, 'href="/pdf/')
    .replace(/data="pdf\//g, 'data="/pdf/')
    .replace(/quach-thi-trang\.jpg/g, "quach-thi-trang.png");
}

function extractBetween(html, startRe, endRe) {
  const start = html.search(startRe);
  if (start === -1) return "";
  const slice = html.slice(start);
  const end = slice.search(endRe);
  if (end === -1) return slice;
  return slice.slice(0, end);
}

function extractCenterColumn(html) {
  const m =
    html.match(/<div class="col-6 col-s-9">([\s\S]*?)<\/div>\s*<div class="col-3/s) ||
    html.match(/<div class="col-6 col-s-10">([\s\S]*?)<\/div>\s*<div class="col-3/s) ||
    html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const inner = m?.[1] || "";
  return fixAssetPaths(inner.trim());
}

function extractTitle(html) {
  const m = html.match(/<title>([\s\S]*?)<\/title>/i);
  return (m?.[1] || "").replace(/\s+/g, " ").trim();
}

function extractPdf(html) {
  const m = html.match(/<object[^>]+data="([^"]+)"/i);
  if (!m) return undefined;
  let src = m[1];
  if (!src.startsWith("/")) src = src.startsWith("pdf/") ? `/pdf/${src.slice(4)}` : `/${src}`;
  return src;
}

function extractImages(html) {
  const imgs = [];
  const re = /src="(images\/[^"]+|\/images\/[^"]+)"/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    let src = m[1];
    if (src.startsWith("images/")) src = `/images/${src.slice(7)}`;
    imgs.push(src);
  }
  return [...new Set(imgs)];
}

function extractGallery() {
  const html = readHtml("Gallery.html");
  /** @type {Record<string, string[]>} */
  const years = {};
  const sections = html.split(/<h class="ha"><center><em>/i);
  for (const section of sections) {
    const yearMatch = section.match(/Award Ceremony (\d{4})|Lễ Trao Học Bổng (\d{4})/i);
    const year = yearMatch?.[1] || yearMatch?.[2];
    if (!year) continue;
    const imgs = [];
    const imgRegex = /src="([^"]+\.(jpg|jpeg|png|gif))"/gi;
    let m;
    while ((m = imgRegex.exec(section)) !== null) {
      let src = m[1];
      if (src.startsWith("images/")) src = `/images/${src.slice(7)}`;
      else if (src.includes("quachthitrangcharity.com/images/")) {
        const name = src.split("/images/").pop();
        if (name) src = `/images/${name}`;
      }
      if (src.startsWith("/images/")) imgs.push(src);
    }
    if (imgs.length) years[year] = [...new Set(imgs)];
  }
  return years;
}

function stripDuplicateHomeTitle(html) {
  return html
    .replace(
      /<h class="ha"><center><em>QUÁCH THỊ TRANG FOUNDATION<\/em><\/center>\s*<\/h>\s*/gi,
      ""
    )
    .replace(
      /<h class="ha"><center><em>QUACH THI TRANG FOUNDATION<\/em><\/center>\s*<\/h>\s*/gi,
      ""
    );
}

function extractMissionHtml(html, locale) {
  let body = stripDuplicateHomeTitle(extractCenterColumn(html));

  if (locale === "vi") {
    const cut = body.search(/<h class="ha"><center><em>Học bổng Quách Thị Trang/i);
    if (cut !== -1) body = body.slice(0, cut);
  } else {
    body = body.replace(/<p class="p1">[\s\S]*?<\/p>\s*/i, "");
    const cut =
      body.search(/<h class="hc"><Center><em>Benefactors/i) !== -1
        ? body.search(/<h class="hc"><Center><em>Benefactors/i)
        : body.search(/<div class="pdf">/i);
    if (cut !== -1) body = body.slice(0, cut);
  }

  return body.trim();
}

function extractScholarship(file, year) {
  const html = readHtml(file);
  const body = extractCenterColumn(html);
  const images = extractImages(html);
  const pdfs = [];
  const re = /<a[^>]+href="(pdf\/[^"]+|\/pdf\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    let href = m[1];
    if (href.startsWith("pdf/")) href = `/pdf/${href.slice(4)}`;
    pdfs.push({ label: m[2].replace(/<[^>]+>/g, "").trim(), href });
  }
  return { year, legacyFile: file, title: extractTitle(html), bodyHtml: body, images, pdfs };
}

function extractDiaDanhHtml(indexHtml) {
  const chunk = extractBetween(
    indexHtml,
    /<h2>IV\.\s*Địa Danh/i,
    /<h2>V\.\s*Hình Ảnh/i
  );
  if (!chunk) return "";

  return fixAssetPaths(chunk)
    .replace(/<h2>IV\.\s*Địa Danh\s*<\/h2>/i, "")
    .replace(/(<br\s*\/?>\s*){6,}/gi, "<br /><br />")
    .replace(/\s*style="[^"]*"/gi, "")
    .trim();
}

function main() {
  fs.mkdirSync(OUT, { recursive: true });

  const library = [];
  for (const [file, meta] of Object.entries(LIBRARY_MAP)) {
    const fp = path.join(SOURCE, file);
    if (!fs.existsSync(fp)) {
      console.warn("Missing:", file);
      continue;
    }
    const html = readHtml(file);
    library.push({
      slug: meta.slug,
      locale: meta.locale,
      legacyFile: file,
      title: extractTitle(html),
      bodyHtml: extractCenterColumn(html),
      pdf: extractPdf(html),
    });
  }

  const scholarships = {};
  const seenYears = new Set();
  for (const [file, year] of Object.entries(SCHOLARSHIP_MAP)) {
    if (seenYears.has(year)) continue;
    seenYears.add(year);
    const preferred =
      Object.keys(SCHOLARSHIP_MAP).find(
        (f) => SCHOLARSHIP_MAP[f] === year && f.includes(String(year).slice(2))
      ) || file;
    if (!fs.existsSync(path.join(SOURCE, preferred))) continue;
    scholarships[year] = extractScholarship(preferred, year);
  }

  const gallery = extractGallery();
  const indexHtml = readHtml("index.html");
  const indexeHtml = readHtml("indexe.html");
  const diaDanhHtml = extractDiaDanhHtml(indexHtml);
  if (diaDanhHtml) {
    library.push({
      slug: "dia-danh",
      locale: "vi",
      legacyFile: "index.html#IV",
      title: "Địa Danh",
      bodyHtml: diaDanhHtml,
    });
  }

  fs.writeFileSync(path.join(OUT, "library.json"), JSON.stringify(library, null, 2));
  fs.writeFileSync(path.join(OUT, "scholarships.json"), JSON.stringify(scholarships, null, 2));
  fs.writeFileSync(path.join(OUT, "gallery.json"), JSON.stringify(gallery, null, 2));
  fs.writeFileSync(
    path.join(OUT, "home.json"),
    JSON.stringify(
      {
        vi: {
          title: extractTitle(indexHtml),
          bodyHtml: extractCenterColumn(indexHtml),
          missionHtml: extractMissionHtml(indexHtml, "vi"),
        },
        en: {
          title: extractTitle(indexeHtml),
          bodyHtml: extractCenterColumn(indexeHtml),
          missionHtml: extractMissionHtml(indexeHtml, "en"),
        },
      },
      null,
      2
    )
  );

  console.log(`Extracted ${library.length} library pages`);
  console.log(`Scholarship years: ${Object.keys(scholarships).join(", ")}`);
  console.log(`Gallery years: ${Object.keys(gallery).join(", ")}`);
}

main();
