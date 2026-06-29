/** @type {{ source: string; destination: string; permanent: boolean }[]} */
export const legacyRedirects = [
  // Home
  { source: "/index.html", destination: "/", permanent: true },
  { source: "/indexe.html", destination: "/en", permanent: true },

  // News
  { source: "/news", destination: "/tin-tuc", permanent: true },
  { source: "/newsv.html", destination: "/tin-tuc", permanent: true },
  { source: "/news.html", destination: "/en/news", permanent: true },
  { source: "/newsE.html", destination: "/en/news", permanent: true },

  // Documentation hubs
  { source: "/TaiLieuv.html", destination: "/tai-lieu", permanent: true },
  { source: "/TaiLieu.html", destination: "/en/tai-lieu", permanent: true },

  // Gallery (case variants)
  { source: "/Gallery.html", destination: "/hinh-anh", permanent: true },
  { source: "/gallery.html", destination: "/hinh-anh", permanent: true },

  // Donate / contact / about
  { source: "/Donate.html", destination: "/donate", permanent: true },
  { source: "/donate.html", destination: "/donate", permanent: true },
  { source: "/zelle.html", destination: "/donate", permanent: true },
  { source: "/Zelle.html", destination: "/donate", permanent: true },
  { source: "/donate/zelle", destination: "/donate", permanent: true },
  { source: "/en/donate/zelle", destination: "/en/donate", permanent: true },
  { source: "/Contact.html", destination: "/contact", permanent: true },
  { source: "/contact.html", destination: "/contact", permanent: true },
  { source: "/Contact.css.html", destination: "/contact", permanent: true },
  { source: "/About.html", destination: "/about", permanent: true },

  // Scholarships hub
  { source: "/Hocbong.html", destination: "/hoc-bong/2023", permanent: true },

  // Scholarship years (duplicate legacy files → canonical year)
  { source: "/HBQTT25.html", destination: "/hoc-bong/2025", permanent: true },
  { source: "/HBQTT15.html", destination: "/hoc-bong/2025", permanent: true },
  { source: "/HBQTT24.html", destination: "/hoc-bong/2024", permanent: true },
  { source: "/HBQTT14.html", destination: "/hoc-bong/2024", permanent: true },
  { source: "/HBQTT23.html", destination: "/hoc-bong/2023", permanent: true },
  { source: "/HBQTT22.html", destination: "/hoc-bong/2022", permanent: true },
  { source: "/HBQTT21.html", destination: "/hoc-bong/2021", permanent: true },
  { source: "/HBQTT20.html", destination: "/hoc-bong/2020", permanent: true },

  // Hue recipients
  { source: "/recipients2024.htm", destination: "/hoc-bong/2024/hue-recipients", permanent: true },
  { source: "/recipients2020.htm", destination: "/hoc-bong/2020/hue-recipients", permanent: true },

  // Memorial library — poems & articles
  { source: "/Motvisaonho.html", destination: "/tai-lieu/mot-vi-sao-nho", permanent: true },
  { source: "/NhoTrang.html", destination: "/tai-lieu/nho-trang", permanent: true },
  { source: "/NhoTrangE.html", destination: "/en/tai-lieu/nho-trang", permanent: true },
  { source: "/DiepKhucQTT.html", destination: "/tai-lieu/diep-khuc-qtt", permanent: true },
  { source: "/Divaolichsu.html", destination: "/tai-lieu/di-vao-lich-su", permanent: true },
  { source: "/KHOCTRANG.html", destination: "/tai-lieu/khoc-trang", permanent: true },
  { source: "/HuongveTrang.html", destination: "/tai-lieu/huong-ve-trang", permanent: true },
  { source: "/CamniemQTT.html", destination: "/tai-lieu/cam-niem-qtt", permanent: true },
  { source: "/NuThanhTuDaoQTT.html", destination: "/tai-lieu/nu-thanh-tu-dao-qtt", permanent: true },
  { source: "/Nenhuongbenmo.html", destination: "/tai-lieu/nen-huong-ben-mo", permanent: true },
  { source: "/Dotnenhuongthomkhannguyencau.html", destination: "/tai-lieu/dot-nen-huong-thom", permanent: true },
  { source: "/VeBenCu.html", destination: "/tai-lieu/ve-ben-cu", permanent: true },
  { source: "/TuongNiem.html", destination: "/tai-lieu/tuong-niem", permanent: true },
  { source: "/TuongNiem2.html", destination: "/tai-lieu/tuong-niem-2", permanent: true },
  { source: "/BanTayCaoCa.html", destination: "/tai-lieu/ban-tay-cao-ca", permanent: true },
  { source: "/HoainiemQTT.html", destination: "/tai-lieu/hoai-niem-qtt", permanent: true },
  { source: "/TenEmVietGiuaCongTruongLon.html", destination: "/tai-lieu/ten-em-viet-giua-cong-truong-lon", permanent: true },
  { source: "/KhocQTT.html", destination: "/tai-lieu/khoc-qtt", permanent: true },
  { source: "/QUACHTHITRANG.html", destination: "/tai-lieu/quach-thi-trang", permanent: true },
  { source: "/HoaDaoNoTrenMo.html", destination: "/tai-lieu/hoa-dao-no-tren-mo", permanent: true },
  { source: "/LuaThieng.html", destination: "/tai-lieu/lua-thieng", permanent: true },
  { source: "/HoaTranghuongsach.html", destination: "/tai-lieu/hoa-trang-huong-sach", permanent: true },
  { source: "/HoaTrangThanhTuong.html", destination: "/tai-lieu/hoa-trang-thanh-tuong", permanent: true },
  { source: "/Tiengthomualoan.html", destination: "/tai-lieu/tieng-tho-mua-loan", permanent: true },
  { source: "/Chantinhcuaem.html", destination: "/tai-lieu/chan-tinh-cua-em", permanent: true },
  { source: "/KinhViengQTT.html", destination: "/tai-lieu/kinh-vieng-qtt", permanent: true },
  { source: "/AoTrangmaudao.html", destination: "/tai-lieu/ao-trang-mau-dao", permanent: true },
  { source: "/Mau.html", destination: "/tai-lieu/mau", permanent: true },
  { source: "/HoaHongConDay.html", destination: "/tai-lieu/hoa-hong-con-day", permanent: true },
  { source: "/EmConSongMai.html", destination: "/tai-lieu/em-con-song-mai", permanent: true },
  { source: "/NhacEMLAVISAOSANG.html", destination: "/tai-lieu/nhac-em-la-vi-sao-sang", permanent: true },
  { source: "/DOCTHOEMLAVISAOSANG.html", destination: "/tai-lieu/doc-tho-em-la-vi-sao-sang", permanent: true },
  { source: "/TuongNiemQTT-TinhThuong.html", destination: "/tai-lieu/tuong-niem-qtt-tinh-thuong", permanent: true },
  { source: "/SVHSDungDay.html", destination: "/tai-lieu/sinh-vien-hoc-sinh-dung-day", permanent: true },
  { source: "/TheHeQTTlamLichSu.html", destination: "/tai-lieu/the-he-qtt-lam-lich-su", permanent: true },
  { source: "/HoiNhacSiVN.html", destination: "/tai-lieu/hoi-nhac-si-vn", permanent: true },
  { source: "/VNNC-TranVanDon.html", destination: "/tai-lieu/vnnc-tran-van-don", permanent: true },
  { source: "/QTT-LietSiTuoi15.html", destination: "/tai-lieu/qtt-liet-si-tuoi-15", permanent: true },
  { source: "/QTT-Wikiand.html", destination: "/en/tai-lieu/qtt-wikiand", permanent: true },
  { source: "/QTT-Wikiandv.html", destination: "/tai-lieu/qtt-wikiand", permanent: true },
  { source: "/TapThoQTT2023.html", destination: "/tai-lieu/tap-tho-qtt-2023", permanent: true },
  { source: "/TapThoQTT2024.html", destination: "/tai-lieu/tap-tho-qtt-2024", permanent: true },
];
