"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Button from "../Button";
import Switch from "../Switch";

const label = "mb-x2 text-t2 font-bold text-fg-neutral-subtle";
const card = "rounded-r4 bg-bg-layer-default p-x5";
const bone = "rounded-r2 bg-bg-neutral-weak animate-pulse motion-reduce:animate-none";
const spinner = "inline-block shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none";

const check = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-full" aria-hidden>
    <path d="m9.55 15.15 8.47-8.47 1.41 1.41-9.88 9.88-5-5 1.41-1.41 3.59 3.59Z" />
  </svg>
);

/** 목록 한 줄의 자리 표시. 들어올 내용과 같은 높이와 간격으로 그린다. */
function SkeletonRow() {
  return (
    <div className="flex items-center gap-x3 py-x2">
      <div className={`size-x10 shrink-0 ${bone}`} />
      <div className="flex flex-1 flex-col gap-x2">
        <div className={`h-x4 w-1/2 ${bone}`} />
        <div className={`h-x3 w-1/3 ${bone}`} />
      </div>
      <div className={`h-x4 w-x12 ${bone}`} />
    </div>
  );
}

function SkeletonList({ rows }: { rows: number }) {
  return (
    <div aria-busy className="flex flex-col">
      <span className="sr-only">세차 기록을 불러오는 중</span>
      <div aria-hidden className="flex flex-col">
        {Array.from({ length: rows }, (_, index) => (
          <SkeletonRow key={index} />
        ))}
      </div>
    </div>
  );
}

/** 누른 즉시 처리 중으로 바꾸고, 끝날 때까지 다시 보내지 않는다. */
function SaveButton() {
  const [state, setState] = useState<"idle" | "saving" | "saved">("idle");

  useEffect(() => {
    if (state !== "saving") return;
    const timer = setTimeout(() => setState("saved"), 1500);
    return () => clearTimeout(timer);
  }, [state]);

  return (
    <div className="flex flex-wrap items-center gap-x3">
      <Button loading={state === "saving"} onClick={() => setState("saving")}>
        저장하기
      </Button>
      <p role="status" className="text-t3 text-fg-neutral-muted">
        {state === "saving" ? "한 번만 보내요" : state === "saved" ? "저장했어요" : "눌러 보세요"}
      </p>
    </div>
  );
}

const STEPS = [
  { todo: "카드 읽기", doing: "카드를 읽는 중이에요", done: "카드를 읽었어요" },
  { todo: "결제", doing: "결제하는 중이에요", done: "결제했어요" },
  { todo: "포인트 충전", doing: "포인트를 충전하는 중이에요", done: "포인트를 충전했어요" },
];

/** 키오스크 충전: 몇 초 걸리는 기기 동작은 단계 목록으로 지금 하는 일을 알린다. */
function DeviceSteps() {
  const [step, setStep] = useState(0);
  const finished = step >= STEPS.length;

  useEffect(() => {
    if (finished) return;
    const timer = setTimeout(() => setStep((before) => before + 1), 1800);
    return () => clearTimeout(timer);
  }, [step, finished]);

  return (
    <div className={`${card} flex flex-col gap-x4`}>
      <p className="text-t5 font-bold text-fg-neutral">{finished ? "10,000P를 충전했어요" : "카드를 떼지 말고 기다려주세요"}</p>
      <ol aria-live="polite" className="flex flex-col gap-x3">
        {STEPS.map((item, index) => {
          const state = index < step ? "done" : index === step ? "doing" : "todo";
          return (
            <li key={item.done} className="flex items-center gap-x3">
              <span className="inline-flex size-icon-lg shrink-0 items-center justify-center">
                {state === "done" ? (
                  <span className="inline-flex size-icon-lg rounded-full bg-bg-brand-solid p-x1 text-fg-on-brand-solid">{check}</span>
                ) : state === "doing" ? (
                  <span aria-hidden className={`size-icon-md text-fg-brand ${spinner}`} />
                ) : (
                  <span aria-hidden className="size-icon-md rounded-full border-2 border-stroke-neutral" />
                )}
              </span>
              <span className={`text-t4 ${state === "todo" ? "text-fg-neutral-muted" : "text-fg-neutral"} ${state === "doing" ? "font-bold" : ""}`}>
                {state === "done" ? item.done : state === "doing" ? item.doing : item.todo}
              </span>
            </li>
          );
        })}
      </ol>
      {finished ? (
        <Button variant="secondary" size="medium" onClick={() => setStep(0)}>
          처음부터 다시 보기
        </Button>
      ) : null}
    </div>
  );
}

export default function demo(thumb: boolean): ReactNode {
  if (thumb) {
    return (
      <div className="w-full max-w-xs">
        <SkeletonList rows={3} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x8 md:grid-cols-1">
      <div>
        <p className={label}>누른 버튼 · 버튼 안의 도는 표시</p>
        <SaveButton />

        <p className={`mt-x8 ${label}`}>내용 영역 · 자리 표시</p>
        <div className={card}>
          <SkeletonList rows={3} />
        </div>

        <p className={`mt-x8 ${label}`}>처음 불러올 때 · 도는 표시와 한 문장</p>
        <div role="status" className={`${card} flex flex-col items-center gap-x3 py-x8 text-center`}>
          <span aria-hidden className={`size-icon-lg text-fg-brand ${spinner}`} />
          <p className="text-t4 text-fg-neutral-muted">정산 내역을 불러오는 중입니다.</p>
        </div>
      </div>

      <div>
        <p className={label}>키오스크 충전 · 단계와 지금 하는 일</p>
        <DeviceSteps />

        <p className={`mt-x8 ${label}`}>10초가 지났을 때 · 안내와 다시 시도</p>
        <div className={`${card} flex flex-col items-center gap-x4 text-center`}>
          <div className="flex items-center gap-x2">
            <span aria-hidden className={`size-icon-sm text-fg-neutral-muted ${spinner}`} />
            <p className="text-t4 text-fg-neutral-muted">평소보다 오래 걸리고 있어요. 다시 시도해주세요.</p>
          </div>
          <Button variant="secondary" size="medium">
            다시 시도하기
          </Button>
        </div>

        <p className={`mt-x8 ${label}`}>스위치 · 기다리지 않고 바로 바꿈</p>
        <div className={card}>
          <Switch label="혜택 알림 받기" description="실패하면 되돌리고 토스트로 알려요" defaultChecked />
        </div>
      </div>
    </div>
  );
}
