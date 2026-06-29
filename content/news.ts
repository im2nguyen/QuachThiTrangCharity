import type { Locale } from "@/lib/locale";

export type NewsArticle = {
  year: number;
  title: string;
  paragraphs: string[];
  scholarshipHref: string;
  pdfHref?: string;
  pdfLabel?: string;
};

const ARTICLES: Record<Locale, NewsArticle[]> = {
  vi: [
    {
      year: 2025,
      title: "Tin Học Bổng Quách Thị Trang Năm 2025",
      paragraphs: [
        "Chương trình học bổng Quách Thị Trang được tổ chức từ năm 2014 nhằm tưởng nhớ liệt nữ Quách Thị Trang đã hy sinh trong khi tham gia cuộc biểu tình ngày 25/8/1963 trước quảng trường chợ Bến Thành, đồng thời nhằm tiếp sức đến trường cho những nữ sinh lớp 11 có hoàn cảnh khó khăn mà cùng lứa tuổi với liệt nữ Quách Thị Trang lúc hy sinh.",
        "Chương trình học bổng Quách Thị Trang lần 12 vào năm 2025 có 123 suất học bổng trong đó 84 suất với giá trị 2,5 triệu đồng một suất và 39 suất với trị giá 3,5 triệu đồng một suất. Toàn bộ kinh phí 346,5 triệu đồng do Quách Thị Trang Foundation ủng hộ.",
        "Danh sách 123 học sinh được cấp học bổng Quách Thị Trang năm 2025 được đính kèm dưới đây gồm 39 học sinh được cấp học bổng đặc biệt 3,5 triệu đồng cho mỗi em.",
        "Lễ trao học bổng Quách Thị Trang năm 2025 đã được tổ chức trước tượng đài Quách Thị Trang ở công viên Bách Tùng Diệp (góc Nam Kỳ Khởi Nghĩa và Lý Tự Trọng, Quận 1) vào 9 giờ sáng chủ nhật 24/8/2025 ngay trước ngày Cô Quách Thị Trang hy sinh năm 1963.",
      ],
      scholarshipHref: "/hoc-bong/2025",
      pdfHref: "/pdf/Recipients2025.pdf",
      pdfLabel: "Danh sách học sinh nhận học bổng 2025 (PDF)",
    },
    {
      year: 2024,
      title: "Tin Học Bổng Quách Thị Trang Năm 2024",
      paragraphs: [
        "Với sự hợp tác của Quach Thi Trang Foundation và các nhà hảo tâm, Chương trình học bổng Quách Thị Trang và chương trình học bổng cho học sinh Thành Phố Huế vẫn tiếp tục như hai năm vừa qua. Lễ trao Học Bổng Quách Thị Trang trong đầu năm học đã được tổ chức vào ngày 25 tháng 8 năm 2024 tại TPHCM. Lễ trao học bổng cho học sinh Thành Phố Huế được dự trù vào ngày 9 tháng 5 năm 2024 tại Huế nhưng đã được dời đến ngày 9 tháng 6 năm 2024 vừa qua. Tổ Chức Quach Thi Trang Foundation đã trao tặng 3 học Bổng Tâm Chánh và 3 học bổng Tâm Tôn cho 6 học sinh của hai trường Trung Học Cơ sở Điền Hòa và Trung Học Cơ Sở Hàm Nghi.",
      ],
      scholarshipHref: "/hoc-bong/2024",
    },
  ],
  en: [
    {
      year: 2025,
      title: "Quach Thi Trang Scholarship News 2025",
      paragraphs: [
        "The Quach Thi Trang scholarship program has been held since 2014 to honor Quach Thi Trang, who was killed while taking part in the August 25, 1963 demonstration in front of Ben Thanh Market, and to help grade-11 girls in financial need who are the same age she was when she died.",
        "The 12th Quach Thi Trang scholarship program in 2025 awarded 123 scholarships: 84 at 2.5 million VND each and 39 at 3.5 million VND each. Quach Thi Trang Foundation provided the full amount of 346.5 million VND.",
        "The list of 123 scholarship recipients for 2025 is linked below, including 39 students who received the special 3.5 million VND scholarship.",
        "The 2025 Quach Thi Trang scholarship ceremony was held at the Quach Thi Trang monument in Bach Tung Diep Park (corner of Nam Ky Khoi Nghia and Ly Tu Trong, District 1) at 9 a.m. on Sunday, August 24, 2025, just before the anniversary of her death in 1963.",
      ],
      scholarshipHref: "/en/hoc-bong/2025",
      pdfHref: "/pdf/Recipients2025.pdf",
      pdfLabel: "2025 scholarship recipients (PDF)",
    },
    {
      year: 2024,
      title: "Quach Thi Trang Scholarship News 2024",
      paragraphs: [
        "With the cooperation of Quach Thi Trang Foundation and generous donors, the Quach Thi Trang scholarship program and the Hue City scholarship program continued as in the previous two years. The Quach Thi Trang scholarship ceremony for the new school year was held on August 25, 2024 in Ho Chi Minh City. The Hue ceremony was originally planned for May 9, 2024 but was moved to June 9, 2024. Quach Thi Trang Foundation awarded three Tam Chanh scholarships and three Tam Ton scholarships to six students at Dien Hoa and Ham Nghi junior high schools.",
      ],
      scholarshipHref: "/en/hoc-bong/2024",
    },
  ],
};

export function getNewsArticles(locale: Locale): NewsArticle[] {
  return ARTICLES[locale];
}
