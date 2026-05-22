import type { Metadata } from "next";

const title = "세차장 점주용 관리 시스템 — 워시펀 대시보드";
const description =
  "클릭 몇 번으로 끝나는 세차장 운영. 워시펀 점주용 대시보드는 가격 관리, 재고 관리, 변동 요금제, 포인트, 기기 모니터링을 한 화면에서 제공합니다. 세차장 시스템 도입을 고민하시나요? 무료 상담 받아보세요.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "세차장 시스템",
    "세차장 무인 시스템",
    "세차장 관리 시스템",
    "세차장 점주 대시보드",
    "세차장 키오스크",
    "세차장 변동 요금제",
    "세차장 포인트 시스템",
    "세차장 매출 관리",
    "세차장 운영 솔루션",
    "워시펀",
  ],
  alternates: {
    canonical: "/service",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/service",
    title,
    description,
    images: [
      {
        url: "/images/png/cover-page.png",
        width: 1200,
        height: 630,
        alt: "워시펀 점주용 대시보드 화면",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
