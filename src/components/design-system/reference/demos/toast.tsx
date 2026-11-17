"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Button from "../Button";
import Toast, { ToastSurface } from "../Toast";
import type { ToastTone } from "../Toast";

const row = "flex flex-wrap items-center gap-x3";
const label = "mb-x2 text-t2 font-bold text-fg-neutral-subtle";

const SAMPLES: { tone: ToastTone; message: string; button: string }[] = [
  { tone: "positive", message: "10,000P를 충전했어요", button: "완료" },
  { tone: "informative", message: "매장 주소를 복사했어요", button: "안내" },
  { tone: "warning", message: "구독이 3일 뒤에 끝나요", button: "주의" },
  { tone: "critical", message: "주소를 복사하지 못했어요", button: "실패" },
  { tone: "neutral", message: "알림을 껐어요", button: "아이콘 없음" },
];

function Live() {
  const [open, setOpen] = useState(false);
  const [sample, setSample] = useState(SAMPLES[0]);

  return (
    <div className="flex flex-col gap-x6">
      <div>
        <p className={label}>미리 보기</p>
        <div className="flex flex-col items-start gap-x3">
          {SAMPLES.map((item) => (
            <ToastSurface key={item.tone} tone={item.tone} message={item.message} />
          ))}
        </div>
      </div>
      <div>
        <p className={label}>띄워 보기 (2초 뒤에 사라집니다)</p>
        <div className={row}>
          {SAMPLES.map((item) => (
            <Button
              key={item.tone}
              variant="outline"
              size="medium"
              onClick={() => {
                setSample(item);
                setOpen(true);
              }}
            >
              {item.button}
            </Button>
          ))}
        </div>
      </div>
      <Toast open={open} onClose={() => setOpen(false)} tone={sample.tone} message={sample.message} />
    </div>
  );
}

export default function demo(thumb: boolean): ReactNode {
  return thumb ? <ToastSurface tone="positive" message="10,000P를 충전했어요" /> : <Live />;
}
