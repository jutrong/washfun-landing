"use client";

import { useState } from "react";

export type MotionSample = { name: string; duration: string; easing: string; note: string };

/** 토큰 값 그대로 점을 움직여 보여 준다. '동작 줄이기'를 켠 기기에서는 움직이지 않고 바로 자리를 옮긴다. */
export default function MotionDemo({ samples }: { samples: MotionSample[] }) {
  const [on, setOn] = useState(false);

  return (
    <div className="rounded-r4 bg-bg-layer-basement p-x6">
      <button
        type="button"
        onClick={() => setOn((value) => !value)}
        className="inline-flex min-h-touch items-center rounded-r2 bg-bg-brand-solid px-x5 text-t4 font-bold text-fg-on-brand-solid"
      >
        움직여 보기
      </button>
      <ul className="mt-x6 flex flex-col gap-x5">
        {samples.map((sample) => (
          <li key={sample.name} className="grid grid-cols-[200px_1fr] items-center gap-x4 md:grid-cols-1 md:gap-x2">
            <div className="min-w-0">
              <p className="text-t4 font-medium text-fg-neutral">{sample.name}</p>
              <p className="break-words text-t2 text-fg-neutral-muted">{sample.note}</p>
            </div>
            <div className="relative h-x8 rounded-full bg-bg-layer-default">
              <span
                aria-hidden
                className="absolute top-x1 block size-x6 rounded-full bg-bg-brand-solid motion-reduce:!transition-none"
                style={{
                  left: on ? "calc(100% - 28px)" : "4px",
                  transition: `left ${sample.duration} ${sample.easing}`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
