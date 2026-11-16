import type { Metadata } from "next";

/**
 * 워시펀 디자인 시스템 확인 페이지. 제품을 만드는 사람이 보는 내부 문서라
 * 검색에 잡히지 않게 하고, 사이트 메뉴와 sitemap 에도 넣지 않는다.
 */
export const metadata: Metadata = {
  title: "워시펀 디자인 시스템",
  description: "워시펀 제품이 함께 쓰는 색·글자·간격 토큰",
  robots: { index: false, follow: false },
};

export default function DesignSystemLayout({ children }: { children: React.ReactNode }) {
  return children;
}
