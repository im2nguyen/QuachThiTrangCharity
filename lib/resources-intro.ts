import type { Locale } from "@/lib/locale";

export type ResourcesIntroContent = {
  intro: string;
  forewordLeadIn: string;
  forewordTitle: string;
  forewordParagraphs: string[];
  forewordClosing: string[];
};

const vi: ResourcesIntroContent = {
  intro:
    "Tài liệu về Cô Quách Thị Trang gồm các bài thơ nhạc, các bài khảo cứu, các hình ảnh, và các bài viết liên hệ về Cô Quách Thị Trang, và gần đây nhất là tập thơ nhạc tưởng niệm Cô Quách Thị Trang đã được tái bản lần thứ ba. Nội dung của tập thơ nhạc này đã được đăng trên trang web này. Xin bấm vào các liên kết ở cột bên cạnh để đọc. Để giữ tính lịch sử, các tài liệu này sẽ được đăng dưới ngôn ngữ nguyên thủy mà không lược dịch. Chúng tôi sẽ tiếp tục sưu tầm thêm và cũng rất trân trọng đón nhận thêm những tài liệu xác thực của quý vị cùng quí bạn, nếu có.",
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

const en: ResourcesIntroContent = {
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

export function getResourcesIntroContent(locale: Locale): ResourcesIntroContent {
  return locale === "en" ? en : vi;
}
