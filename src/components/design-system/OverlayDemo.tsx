"use client";

import { useState } from "react";

export type OverlayLevel = { path: string; name: string; value: string; description: string; className: string };

/** 어두운 면의 단계를 바꿔 가며 뒤의 화면이 얼마나 보이는지 비교한다. */
export default function OverlayDemo({ levels, initial }: { levels: OverlayLevel[]; initial: string }) {
  const [selected, setSelected] = useState(initial);
  const level = levels.find((item) => item.name === selected) ?? levels[0];

  return (
    <div>
      <div role="group" aria-label="어두운 면의 단계" className="flex flex-wrap gap-x2">
        {levels.map((item) => (
          <button
            key={item.name}
            type="button"
            aria-pressed={item.name === level.name}
            onClick={() => setSelected(item.name)}
            className={`inline-flex min-h-touch items-center rounded-full border px-x4 text-t4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stroke-brand-solid ${
              item.name === level.name
                ? "border-stroke-brand-solid bg-bg-brand-weak font-bold text-fg-brand"
                : "border-stroke-neutral-weak bg-bg-layer-default font-medium text-fg-neutral"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="relative mt-x4 h-[280px] overflow-hidden rounded-r4 bg-bg-layer-basement p-x6">
        <div className="flex flex-col gap-x3" aria-hidden>
          <span className="flex h-x10 items-center rounded-r3 bg-bg-layer-default px-x4 text-t4 font-bold text-fg-neutral shadow-s1">
            내 포인트 12,000P
          </span>
          <span className="h-x16 rounded-r3 bg-bg-brand-weak shadow-s2" />
          <span className="h-x16 rounded-r3 bg-bg-layer-default shadow-s2" />
        </div>
        <div
          className={`absolute inset-0 flex items-center justify-center p-x6 transition-colors duration-d3 ease-standard motion-reduce:transition-none ${level.className}`}
        >
          <div className="w-full max-w-container-narrow rounded-r6 bg-bg-layer-floating p-x6 shadow-s3">
            <p className="text-t6 font-bold text-fg-neutral">{level.path}</p>
            <p className="mt-x1 text-t4 text-fg-neutral-muted">
              {level.value} · {level.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
