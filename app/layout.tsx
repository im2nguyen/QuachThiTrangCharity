import type { Metadata } from "next";
import { Merriweather, Oswald } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";

const sans = Oswald({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

const serif = Merriweather({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const siteDescription =
  "Quách Thị Trang Foundation — tổ chức phi lợi nhuận tiếp sức cho Học Bổng Quách Thị Trang. Tax-exempt 501(c)(3), EIN #99-3486835.";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Quách Thị Trang Foundation",
  description: siteDescription,
  icons: {
    icon: [{ url: "/images/quach-thi-trang.png", type: "image/png" }],
    apple: [{ url: "/images/quach-thi-trang.png", type: "image/png" }],
  },
  openGraph: {
    title: "Quách Thị Trang Foundation",
    description: siteDescription,
    siteName: "Quách Thị Trang Foundation",
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quách Thị Trang Foundation",
    description: siteDescription,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={cn(sans.variable, serif.variable, "font-sans")}>
      <body className="font-sans">
        <Navbar />
        <main id="main-content" className="bg-background">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
