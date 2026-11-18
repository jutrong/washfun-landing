import type { Metadata } from "next";
import Link from "next/link";
import Sidebar from "@/components/design-system/Sidebar";
import { COMPONENTS_HREF, PATTERNS_HREF } from "@/components/design-system/nav";
import { patterns } from "@/components/design-system/patterns";
import { components } from "@/components/design-system/components";
import { tokens } from "@/components/design-system/tokens";

/**
 * 워시펀 디자인 시스템 문서. 제품을 만드는 사람이 보는 내부 문서라
 * 검색에 잡히지 않게 하고, 사이트 메뉴와 sitemap 에도 넣지 않는다.
 */
export const metadata: Metadata = {
  title: "워시펀 디자인 시스템",
  description: "워시펀 제품이 함께 쓰는 토큰, 규칙, 컴포넌트, 패턴",
  robots: { index: false, follow: false },
};

export default function DesignSystemLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-layer-default text-fg-neutral">
      <header className="sticky top-0 z-10 border-b border-stroke-neutral-muted bg-bg-layer-default">
        <div className="mx-auto flex h-x14 max-w-[1200px] items-center justify-between px-x6 md:px-x4">
          <Link href="/design-system" className="text-t6 font-bold">
            WashFun <span className="text-fg-brand">Design System</span>
          </Link>
          <div className="flex items-center gap-x4 text-t3">
            <span className="text-fg-neutral-subtle md:hidden">v{tokens.version}</span>
            <a
              href="/design-system/tokens.json"
              className="rounded-r2 bg-bg-neutral-weak px-x3 py-x2 font-medium text-fg-neutral"
            >
              tokens.json
            </a>
          </div>
        </div>
      </header>
      <div className="mx-auto flex max-w-[1200px] gap-x10 px-x6 py-x8 lg:flex-col lg:gap-x4 md:px-x4">
        <Sidebar
          components={components().map((item) => ({ href: `${COMPONENTS_HREF}/${item.key}`, title: item.title }))}
          patterns={patterns().map((item) => ({ href: `${PATTERNS_HREF}/${item.key}`, title: item.title }))}
        />
        <main className="min-w-0 flex-1 pb-x16">{children}</main>
      </div>
    </div>
  );
}
