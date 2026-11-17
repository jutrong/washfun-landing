"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import BottomSheet, { BottomSheetSurface } from "../BottomSheet";
import Button from "../Button";

const label = "mb-x2 text-t2 font-bold text-fg-neutral-subtle";
const METHODS = ["신용카드", "카카오페이", "네이버페이"];

// 미리 보기의 버튼은 눌러도 아무 일도 하지 않는다.
const nothing = () => {};

const check = (
  <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="size-icon-md shrink-0 text-fg-brand">
    <path d="m10 15.2 8.6-8.6L20 8 10 18l-6-6 1.4-1.4 4.6 4.6Z" />
  </svg>
);

/** 견본용 선택지. 실제 제품에서는 목록 항목이나 Radio 를 넣는다. */
function Methods({ value, onChange }: { value: string; onChange: (next: string) => void }) {
  return (
    <ul className="flex flex-col gap-x1">
      {METHODS.map((method) => (
        <li key={method}>
          <button
            type="button"
            aria-pressed={method === value}
            onClick={() => onChange(method)}
            className={`flex h-x12 w-full items-center justify-between rounded-r3 px-x4 text-left text-t5 text-fg-neutral transition-colors duration-d2 ease-standard focus-visible:outline focus-visible:outline-2 focus-visible:outline-stroke-brand-solid active:bg-bg-neutral-weak motion-reduce:transition-none ${
              method === value ? "bg-bg-brand-weak font-bold" : "font-medium"
            }`}
          >
            {method}
            {method === value ? check : null}
          </button>
        </li>
      ))}
    </ul>
  );
}

function Live() {
  const [open, setOpen] = useState(false);
  const [method, setMethod] = useState(METHODS[0]);

  return (
    <div className="flex flex-col gap-x6">
      <div>
        <p className={label}>미리 보기</p>
        {/* 어두운 배경 위에 아래쪽으로 붙는 모습을 그대로 보여 준다. */}
        <div className="flex w-full max-w-sm items-end overflow-hidden rounded-r4 bg-bg-overlay pt-x10">
          <BottomSheetSurface title="결제 수단을 골라주세요" onClose={nothing} primaryAction={{ label: "결제하기", onClick: nothing }}>
            <Methods value={method} onChange={setMethod} />
          </BottomSheetSurface>
        </div>
      </div>
      <div>
        <p className={label}>열어 보기</p>
        <div className="flex flex-wrap items-center gap-x3">
          <Button variant="outline" onClick={() => setOpen(true)}>
            바텀 시트 열기
          </Button>
          <span className="text-t4 text-fg-neutral-muted">고른 결제 수단: {method}</span>
        </div>
      </div>
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title="결제 수단을 골라주세요"
        primaryAction={{ label: "결제하기", onClick: () => setOpen(false) }}
      >
        <Methods value={method} onChange={setMethod} />
      </BottomSheet>
    </div>
  );
}

/** 목록 카드에 넣는 작은 그림. 실제 면을 줄여 그린 것이고 누를 수 없다. */
function Thumb() {
  return (
    <div aria-hidden className="flex size-full max-w-xs items-end overflow-hidden rounded-r3 bg-bg-overlay pt-x4">
      <div className="w-full rounded-t-r4 bg-bg-layer-floating p-x3 text-left">
        <p className="truncate text-t3 font-bold text-fg-neutral">결제 수단을 골라주세요</p>
        <div className="mt-x2 flex flex-col gap-x1">
          <span className="flex h-x7 items-center justify-between rounded-r2 bg-bg-brand-weak px-x2 text-t2 font-bold text-fg-neutral">
            신용카드
            {check}
          </span>
          <span className="flex h-x7 items-center rounded-r2 px-x2 text-t2 font-medium text-fg-neutral">카카오페이</span>
        </div>
      </div>
    </div>
  );
}

export default function demo(thumb: boolean): ReactNode {
  return thumb ? <Thumb /> : <Live />;
}
