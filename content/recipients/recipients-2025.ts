export type RecipientType = "special" | "standard";

export type RecipientRow = {
  type: RecipientType;
  school: string;
  student: string;
};

const RAW = `
Chương trình học bổng Quách Thị Trang 2025
Trường HS được HB ĐB 3,5 triệu Học sinh ký tên
1 THPT An Lạc Đào Huỳnh Như Anh
2 THPT Bà Điểm Đỗ Yến Linh
3 PTNK TDTT Bình Chánh Trần Hà Anh
4 Võ Yến Nhi
5 THPT Dương Văn Thì Nguyễn Ngọc Mai Hương
6 THPT Đào Sơn Tây Nguyễn Ngọc Linh
7 THPT Gia Định Bùi Lưu Bảo Khánh
8 THPT Gò Vấp Đỗ Thị Khánh Linh
9 THPT Hoàng Hoa Thám Nguyễn Dương Ngọc Hân
10 THPT Lương Thế Vinh Lê Ngọc Đỗ Quyên
11 THPT Marie Curie Phan Khánh Băng
12 Nguyễn Trần Như Hiền
13 Đỗ Hoàng Bảo Ngân
14 THPT Nam Kỳ Khởi Nghĩa Dương Thị Hiền
15 Huỳnh Ngọc Như
16 THPT Nguyễn Huệ Nhan Mẫ n Mẫ n
17 Nguyễn Thị Trúc Ngân
18 THPT Nguyễn Công Trứ Lê Lý Thúy An
19 THPT Nguyễn Trung Trực Nguyễn Trần Nhã Uyên
20 THPT Phạm Phú Thứ Diệp Gia Mẫn
21 THPT Phan Đăng Lưu Nguyễn Trần Hà Anh
22 THPT Ten Lơ Man Nguyễn Hồng Bảo Ngọc
23 Trương Nguyễn Hòa Phương
24 Nguyễn Yến Vy
25 THPT Tân Túc Nhan Gia Mẫn
26 Phan Lê Quỳnh Như
27 THPT Thạnh Lộc Đỗ Hiệp Hòa
28 THPT Thanh Đa Trương Hoàng Mai Ngọc
29 THPT Trần Hưng Đạo Trương Thùy Linh
30 Đỗ Trần Thảo Vân
31 THPT Trần Văn Giàu Nguyễn Hoàng Ngọc Ánh
32 Huỳnh Trần Anh Thư
33 THPT Trường Chinh Nguyễn Ngọc Diễm
34 Đặng Phương Linh
35 Võ An Nguyên
36 THPT Vĩnh Lộc B Võ Nguyệt Sang
37 THPT Võ Thị Sáu Nguyễn Ngọc Thủy Tiên
38 Trần Ngọc Thanh Trúc
39 Nguyễn Bảo Uyên

Trường HS được HB 2,5 triệu Học sinh ký tên
1 THPT An Lạc Nguyễn Ngọc Linh Linh Huệ
2 Trần Ái Linh
3 Phan Thị Ngọc Vy
4 THPT Bà Điểm Tăng Thị Mỹ Tiên
5 PTNK TDTT Bình Chánh Đặng Ngọc Anh Thư
6 Nguyễn Thùy Vân
7 THPT Bùi Thị Xuân Lê Võ Thiên Kim
8 Zayna Mousa
9 Hứa Mỹ Thanh
10 Trịnh Dương Anh Thư
11 THPT Dương Văn Thì Nguyễn Thị Kim Đào
12 Dương Ngọc Quỳnh Như
13 Ngô Hoàng Phương Uyên
14 THPT Đào Sơn Tây Nguyễn Thanh Hiền
15 Phạm Võ Thanh Thanh
16 Phạm Lâm Thúy Vy
17 THPT Gia Định Nguyễn Đức Nhiêu Anh
18 Huỳnh Phương Nhi
19 Nguyễn Hoàng Như Ý
20 THPT Gò Vấp Phan Ngọc Tuyết Minh
21 Trần Ngọc Bảo Trân
22 THPT Herman Gmeinere Lê Thảo Quyên
23 Lưu Thụy Linh
24 Nguyến Thanh Tâm
25 Nguyễn Thị Thanh Trúc
26 THPT Hoàng Hoa Thám Nguyễn Lê Bảo Anh
27 Nguyễn Lê Mai Trâm
28 Trần Lê Ánh Tuyết
29 THPT Lê Thánh Tôn Huỳnh Nguyễn Nhật Anh
30 Phạm Trần Kiều Duyên
31 Phạm Dương Quỳnh
32 Nguyễn Võ Kim Quế
33 Lại Nguyễn Nhân Duyên
34 Lục Triệu Vy
35 THPT Lương Thế Vinh Trần Yến Vy
36 Lê Bảo Ngọc
37 Huỳnh Ngọc Phương Trinh
38 THPT Marie Curie Phùng Nguyễn Hương Giang
39 THPT Nam Kỳ Khởi Nghĩa Trịnh Khánh Linh
40 Vòng Minh Tuyết
41 THPT Nguyễn Huệ Đào Khánh Ngọc
42 Phan Thị Hồng Ngọc
43 THPT Nguyễn Công Trứ Đỗ Thúy Hường
44 Phạm Phương Nhiên
45 Ngô Mai Trang
46 THPT Nguyễn Trung Trực Đặng Nguyễn Hồng Anh
47 Trần Ngọc Yến Như
48 Nguyễn Đàm Gia Phương
49 THPT Nguyễn Văn Cừ Nguyễn Gia An
50 Nguyễn Trần Ngọc Diễm
51 THPT Phạm Phú Thứ Lỷ Quý Doanh
52 Nguyễn Thị Xuân Trang
53 Nguyễn Ngọc Bảo Trâm
54 Trần Ngọc Yến Vy
55 THPT Phan Đăng Lưu Nguyễn Trần Quỳnh Mai
56 Trịnh Vân Anh
57 THPT Phong Phú Nguyễn Ngọc Châu
58 Lê Thị Anh Thư
59 Nguyễn Ngọc Xuân Nghi
60 Võ Thị Thanh Hằng
61 THPT Phước Long Đỗ Hiếu Thảo
62 Vũ Anh Thư
63 THPT Ten Lơ Man Lê Ngọc Minh Thư
64 THPT Tân Túc Nguyễn Thị Kiều Oanh
65 Lý Ngọc Phương
66 Phan Huỳnh Phi Yến
67 THPT Thạnh Lộc Võ Thanh Ngọc
68 Bùi Thị Thanh Thảo
69 Phan Thị Vân
70 THPT Thanh Đa Nguyễn Ngọc Thanh Phương
71 Bùi Thanh Như Ngọc
72 Nguyễn Ngọc Thanh Trúc
73 THPT Trần Hưng Đạo Nguyễn Đỗ Quỳnh Anh
74 Nguyễn Lê Phương Nhi
75 THPT Trần Phú Võ Thị Kim Thơ
76 Lê Thị Thanh Thủy
77 THPT Trần Văn Giàu Đặng Thuỳ Dương
78 Chung Thị Thúy Vy
79 THPT Trường Chinh Hoàng Lê Anh Thư
80 THPT Vĩnh Lộc B Trần Thị Kiều Anh
81 Trần Mỹ Dung
82 Lê Yến Nhi
83 THPT Võ Thị Sáu Nguyễn Ánh Hồng
84 Trần Mai Uyên Nhi
`;

const SCHOOL_PREFIXES = [
  "THPT Herman Gmeinere",
  "PTNK TDTT Bình Chánh",
  "THPT Võ Thị Sáu",
  "THPT Vĩnh Lộc B",
  "THPT Nam Kỳ Khởi Nghĩa",
  "THPT Nguyễn Trung Trực",
  "THPT Nguyễn Văn Cừ",
  "THPT Nguyễn Công Trứ",
  "THPT Nguyễn Huệ",
  "THPT Lương Thế Vinh",
  "THPT Hoàng Hoa Thám",
  "THPT Trần Văn Giàu",
  "THPT Trần Hưng Đạo",
  "THPT Phan Đăng Lưu",
  "THPT Phạm Phú Thứ",
  "THPT Dương Văn Thì",
  "THPT Đào Sơn Tây",
  "THPT Marie Curie",
  "THPT Lê Thánh Tôn",
  "THPT Phước Long",
  "THPT Phong Phú",
  "THPT Thạnh Lộc",
  "THPT Thanh Đa",
  "THPT Trường Chinh",
  "THPT Gia Định",
  "THPT Gò Vấp",
  "THPT Ten Lơ Man",
  "THPT Tân Túc",
  "THPT Trần Phú",
  "THPT An Lạc",
  "THPT Bà Điểm",
  "THPT Bùi Thị Xuân",
];

function detectSchoolAndStudent(rest: string): { school?: string; student: string } {
  const trimmed = rest.trim();
  for (const school of SCHOOL_PREFIXES) {
    if (trimmed.startsWith(school + " ")) {
      return { school, student: trimmed.slice(school.length).trim() };
    }
    if (trimmed === school) return { school, student: "" };
  }
  return { student: trimmed };
}

export function getRecipients2025(): RecipientRow[] {
  const lines = RAW.split("\n").map((l) => l.trim()).filter(Boolean);

  let mode: RecipientType | null = null;
  let currentSchool = "";
  const out: RecipientRow[] = [];

  for (const line of lines) {
    if (/^Trường\s+HS\s+được\s+HB\s+ĐB\s+3,5\s+triệu/i.test(line)) {
      mode = "special";
      currentSchool = "";
      continue;
    }
    if (/^Trường\s+HS\s+được\s+HB\s+2,5\s+triệu/i.test(line)) {
      mode = "standard";
      currentSchool = "";
      continue;
    }
    if (!mode) continue;

    const m = line.match(/^(\d+)\s*(.*)$/);
    if (!m) continue;

    const rest = m[2].trim();
    if (!rest) continue;

    const { school, student } = detectSchoolAndStudent(rest);
    if (school && student) {
      currentSchool = school;
      out.push({ type: mode, school, student });
      continue;
    }
    if (school && !student) {
      currentSchool = school;
      continue;
    }

    // Student line without school prefix: use most recent school.
    if (!currentSchool) continue;
    out.push({ type: mode, school: currentSchool, student });
  }

  return out;
}

