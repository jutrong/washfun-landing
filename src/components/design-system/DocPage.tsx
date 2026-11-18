import Link from "next/link";
import type { ReactNode } from "react";
import { FOUNDATIONS, OVERVIEW } from "./nav";
import Thumb from "./Thumb";

/** 항목 문서 한 장의 틀: 경로 표시, 제목, 머리 그림, 본문, 이전·다음 문서. */
export default function DocPage({ name, children }: { name: string; children: ReactNode }) {
  const index = FOUNDATIONS.findIndex((item) => item.key === name);
  const item = FOUNDATIONS[index];
  const prev = index > 0 ? FOUNDATIONS[index - 1] : { ...OVERVIEW, title: "Overview" };
  const next = FOUNDATIONS[index + 1];

  return (
    <article>
      <Link href={OVERVIEW.href} className="text-t3 font-medium text-fg-neutral-muted hover:text-fg-neutral">
        Foundations
      </Link>
      <h1 className="mt-x3 text-[40px] font-bold leading-tight md:text-t10">{item.title}</h1>
      <p className="mt-x3 text-t5 text-fg-neutral-muted">{item.lead}</p>
      <div className="mt-x8">
        <Thumb name={name} large />
      </div>
      <div className="mt-x4">{children}</div>
      <nav aria-label="이전·다음 문서" className="mt-x10 grid grid-cols-2 gap-x4 border-t border-stroke-neutral-muted pt-x6">
        <Link href={prev.href} className="rounded-r3 border border-stroke-neutral-weak p-x4 hover:bg-bg-neutral-weak">
          <span className="block text-t2 text-fg-neutral-subtle">이전 문서</span>
          <span className="block text-t5 font-bold">{prev.title}</span>
        </Link>
        {next ? (
          <Link href={next.href} className="rounded-r3 border border-stroke-neutral-weak p-x4 text-right hover:bg-bg-neutral-weak">
            <span className="block text-t2 text-fg-neutral-subtle">다음 문서</span>
            <span className="block text-t5 font-bold">{next.title}</span>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
