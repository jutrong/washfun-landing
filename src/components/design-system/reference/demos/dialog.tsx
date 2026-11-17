"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Button from "../Button";
import Dialog, { DialogSurface } from "../Dialog";

const row = "flex flex-wrap items-center gap-x3";
const label = "mb-x2 text-t2 font-bold text-fg-neutral-subtle";

// 미리 보기의 버튼은 눌러도 아무 일도 하지 않는다.
const nothing = () => {};

function Live() {
  const [open, setOpen] = useState<"confirm" | "alert" | null>(null);
  const [deleting, setDeleting] = useState(false);
  const close = () => setOpen(null);

  // 처리 중에는 창이 닫히지 않는 것을 보여 주려고 잠깐 기다렸다 닫는다.
  const remove = () => {
    setDeleting(true);
    window.setTimeout(() => {
      setDeleting(false);
      setOpen(null);
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-x6">
      <div>
        <p className={label}>미리 보기</p>
        <div className="flex flex-wrap items-start gap-x4">
          <DialogSurface
            tone="danger"
            title="'주말 할인'을 삭제할까요?"
            description="삭제하면 되돌릴 수 없어요."
            secondaryAction={{ label: "닫기", onClick: nothing }}
            primaryAction={{ label: "삭제하기", onClick: nothing }}
          />
          <DialogSurface
            title="포인트가 부족해요"
            description="포인트를 충전하면 결제할 수 있어요."
            primaryAction={{ label: "확인", onClick: nothing }}
          />
        </div>
      </div>
      <div>
        <p className={label}>열어 보기</p>
        <div className={row}>
          <Button variant="outline" onClick={() => setOpen("confirm")}>
            삭제 확인 창 열기
          </Button>
          <Button variant="outline" onClick={() => setOpen("alert")}>
            버튼이 하나인 창 열기
          </Button>
        </div>
      </div>
      <Dialog
        open={open === "confirm"}
        onClose={close}
        tone="danger"
        title="'주말 할인'을 삭제할까요?"
        description="삭제하면 되돌릴 수 없어요."
        secondaryAction={{ label: "닫기", onClick: close }}
        primaryAction={{ label: "삭제하기", onClick: remove, loading: deleting }}
      />
      <Dialog
        open={open === "alert"}
        onClose={close}
        title="포인트가 부족해요"
        description="포인트를 충전하면 결제할 수 있어요."
        primaryAction={{ label: "확인", onClick: close }}
      />
    </div>
  );
}

/** 목록 카드에 넣는 작은 그림. 실제 면을 줄여 그린 것이고 누를 수 없다. */
function Thumb() {
  return (
    <div aria-hidden className="w-full max-w-xs rounded-r4 bg-bg-layer-floating p-x4 text-left shadow-s2">
      <p className="truncate text-t4 font-bold text-fg-neutral">&apos;주말 할인&apos;을 삭제할까요?</p>
      <p className="mt-x1 truncate text-t2 text-fg-neutral-muted">삭제하면 되돌릴 수 없어요.</p>
      <div className="mt-x3 flex gap-x2">
        <span className="flex h-x8 flex-1 items-center justify-center rounded-r2 border border-stroke-neutral-weak text-t3 font-bold text-fg-neutral">
          닫기
        </span>
        <span className="flex h-x8 flex-1 items-center justify-center rounded-r2 bg-bg-critical-solid text-t3 font-bold text-fg-on-brand-solid">
          삭제하기
        </span>
      </div>
    </div>
  );
}

export default function demo(thumb: boolean): ReactNode {
  return thumb ? <Thumb /> : <Live />;
}
