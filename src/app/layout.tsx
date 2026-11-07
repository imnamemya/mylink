import type { Metadata } from "next";
import "./globals.css";

/**
 * RootLayout
 *
 * 폰트: Pretendard (CDN, globals.css @import) — DESIGN.md 761개 샘플 실측
 * Geist 폰트는 Pretendard가 Kurly UI 패밀리로 확인되어 제거
 */

export const metadata: Metadata = {
  title: "마이링크 (MyLink)",
  description: "나만의 멀티 링크 프로필 페이지",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
