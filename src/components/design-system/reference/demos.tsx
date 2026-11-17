"use client";

import type { ReactNode } from "react";
import Button from "./Button";

// 견본용 아이콘. 실제 제품에서는 Icon Library 의 아이콘을 쓴다.
const plus = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-full">
    <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6Z" />
  </svg>
);

const row = "flex flex-wrap items-center gap-x3";
const label = "mb-x2 text-t2 font-bold text-fg-neutral-subtle";

/** 컴포넌트 키 → 견본. thumb 이 참이면 목록 카드에 들어갈 만큼만 그린다. */
export const DEMOS: Record<string, (thumb: boolean) => ReactNode> = {
  button: (thumb) =>
    thumb ? (
      <div className={row}>
        <Button>충전하기</Button>
        <Button variant="outline">닫기</Button>
      </div>
    ) : (
      <div className="flex flex-col gap-x6">
        <div>
          <p className={label}>variant</p>
          <div className={row}>
            <Button>충전하기</Button>
            <Button variant="secondary">다음에 하기</Button>
            <Button variant="outline">닫기</Button>
            <Button variant="ghost">더 보기</Button>
            <Button variant="danger">삭제하기</Button>
          </div>
        </div>
        <div>
          <p className={label}>size</p>
          <div className={row}>
            <Button size="large">large</Button>
            <Button size="medium">medium</Button>
            <Button size="small">small</Button>
          </div>
        </div>
        <div>
          <p className={label}>state</p>
          <div className={row}>
            <Button icon={plus}>아이콘</Button>
            <Button loading>결제하기</Button>
            <Button disabled>비활성</Button>
            <Button variant="outline" disabled>
              비활성
            </Button>
          </div>
        </div>
      </div>
    ),
};
