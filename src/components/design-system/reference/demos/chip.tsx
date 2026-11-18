"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Chip from "../Chip";

// 견본용 아이콘. 실제 제품에서는 Icon Library 의 아이콘을 쓴다.
const pin = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-full">
    <path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7Zm0 4.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" />
  </svg>
);

const row = "flex flex-wrap items-center gap-x-x2";
const label = "mb-x1 text-t2 font-bold text-fg-neutral-subtle";

const TYPES = ["전체", "셀프 세차", "자동 세차", "손세차"];
const OPTIONS = ["24시간", "실내 세차", "주차 가능", "구독 가능"];

/** 하나만 고르는 묶음. 언제나 하나가 선택돼 있다. */
function Single({ items, size }: { items: string[]; size?: "medium" | "small" }) {
  const [value, setValue] = useState(items[0]);
  return (
    <div role="group" aria-label="세차 방식" className={row}>
      {items.map((item) => (
        <Chip key={item} size={size} selected={value === item} onClick={() => setValue(item)}>
          {item}
        </Chip>
      ))}
    </div>
  );
}

/** 여러 개를 켜고 끄는 묶음. */
function Multi() {
  const [values, setValues] = useState<string[]>([OPTIONS[0]]);
  const toggle = (item: string) => setValues((prev) => (prev.includes(item) ? prev.filter((value) => value !== item) : [...prev, item]));
  return (
    <div role="group" aria-label="매장 조건" className={row}>
      {OPTIONS.map((item) => (
        <Chip key={item} selected={values.includes(item)} onClick={() => toggle(item)}>
          {item}
        </Chip>
      ))}
    </div>
  );
}

export default function demo(thumb: boolean): ReactNode {
  if (thumb) return <Single items={TYPES.slice(0, 3)} />;

  return (
    <div className="flex flex-col gap-x5">
      <div>
        <p className={label}>single select</p>
        <Single items={TYPES} />
      </div>
      <div>
        <p className={label}>multi select</p>
        <Multi />
      </div>
      <div>
        <p className={label}>size</p>
        <Single items={["medium", "선택 안 함"]} />
        <Single items={["small", "선택 안 함"]} size="small" />
      </div>
      <div>
        <p className={label}>leading</p>
        <div className={row}>
          <Chip dot>영업 중</Chip>
          <Chip icon={pin}>가까운 매장</Chip>
          <Chip selected>선택하면 체크 표시</Chip>
        </div>
      </div>
      <div>
        <p className={label}>state</p>
        <div className={row}>
          <Chip>기본</Chip>
          <Chip selected>선택</Chip>
          <Chip disabled>비활성</Chip>
        </div>
      </div>
    </div>
  );
}
