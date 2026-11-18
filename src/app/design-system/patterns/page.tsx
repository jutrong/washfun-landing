import Link from "next/link";
import PatternDemo from "@/components/design-system/reference/PatternDemo";
import { PATTERNS_HREF } from "@/components/design-system/nav";
import { patterns } from "@/components/design-system/patterns";

export default function PatternsPage() {
  return (
    <>
      <h1 className="text-[40px] font-bold leading-tight md:text-t10">Patterns</h1>
      <p className="mt-x3 text-t5 text-fg-neutral-muted">
        여러 화면에서 되풀이되는 상황을 푸는 방법입니다. 어떤 부품을 어떤 순서로, 어떤 문구와 함께 쓰는지 적었습니다.
      </p>
      <ul className="mt-x10 grid grid-cols-2 gap-x6 md:grid-cols-1">
        {patterns().map((item) => (
          <li key={item.key}>
            <Link href={`${PATTERNS_HREF}/${item.key}`} className="group block">
              {/* 카드 전체가 링크이므로 견본 안의 버튼·입력 칸은 누르거나 초점이 가지 않게 한다. */}
              <div
                aria-hidden
                {...({ inert: "" } as Record<string, string>)}
                className="pointer-events-none flex h-[200px] items-center justify-center overflow-hidden rounded-r4 bg-bg-layer-basement p-x4"
              >
                <PatternDemo name={item.key} thumb />
              </div>
              <span className="mt-x3 block text-t6 font-bold group-hover:text-fg-brand">
                {item.title} <span className="text-t4 font-medium text-fg-neutral-muted">{item.ko}</span>
              </span>
              <span className="mt-x1 block text-t3 text-fg-neutral-muted">{item.lead}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
