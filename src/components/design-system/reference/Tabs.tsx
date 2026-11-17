"use client";

import { useId, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";

type Size = "medium" | "small";

export type TabItem = {
  value: string;
  label: string;
  /** 주면 선택됐을 때 탭 줄 아래에 그린다. */
  content?: ReactNode;
  disabled?: boolean;
};

export type TabsProps = {
  items: TabItem[];
  /** 선택된 탭. 주면 부모가 값을 가진다. */
  value?: string;
  /** 처음 선택할 탭. 없으면 누를 수 있는 첫 탭. */
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** 탭 줄이 무엇을 나누는지 읽어 줄 이름. 예: 매장 상세 */
  label: string;
  size?: Size;
  /** 탭 너비를 똑같이 나눠 줄을 채운다. 탭이 2~3개일 때 쓴다. */
  fullWidth?: boolean;
  className?: string;
};

// 키오스크에서는 이 표만 kiosk 값으로 바꾼다(medium: h-x16 px-x6 text-t3, small 은 두지 않는다).
const SIZES: Record<Size, string> = {
  medium: "h-x12 px-x4 text-t5",
  small: "min-h-touch px-x3 text-t4",
};

// 선택 여부는 색과 함께 밑줄과 굵기로도 알린다. 밑줄 자리(border-b-2)는 언제나 두고 색만 바꾼다.
const SELECTED = "border-fg-neutral font-bold text-fg-neutral";
const UNSELECTED = "border-transparent font-normal text-fg-neutral-muted hover:text-fg-neutral active:bg-bg-neutral-weak active:text-fg-neutral";
const DISABLED = "disabled:cursor-not-allowed disabled:bg-transparent disabled:text-fg-disabled";
// 탭 줄이 가로로 스크롤되므로 초점 테두리는 잘리지 않게 안쪽에 그린다.
const FOCUS = "focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-stroke-brand-solid";

export default function Tabs({ items, value, defaultValue, onChange, label, size = "medium", fullWidth = false, className = "" }: TabsProps) {
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [inner, setInner] = useState(defaultValue ?? items.find((item) => !item.disabled)?.value ?? "");
  const current = value ?? inner;
  const selected = items.find((item) => item.value === current);

  const select = (next: string) => {
    if (value === undefined) setInner(next);
    if (next !== current) onChange?.(next);
  };

  // 화살표 키로 옮기면 초점과 선택이 함께 옮겨 간다. 비활성 탭은 건너뛰고 끝에서는 반대쪽으로 돈다.
  const move = (from: number, step: 1 | -1) => {
    for (let count = 1; count <= items.length; count += 1) {
      const index = (from + step * count + items.length * count) % items.length;
      if (items[index].disabled) continue;
      tabs.current[index]?.focus();
      select(items[index].value);
      return;
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight") move(index, 1);
    else if (event.key === "ArrowLeft") move(index, -1);
    else if (event.key === "Home") move(-1, 1);
    else if (event.key === "End") move(items.length, -1);
    else return;
    event.preventDefault();
  };

  return (
    <div className={className}>
      <div className="relative">
        {/* 1px 구분선. 탭 줄 밑에 깔고 선택된 탭의 밑줄이 그 위를 덮는다. */}
        <span aria-hidden className="absolute inset-x-0 bottom-0 border-b border-stroke-neutral-muted" />
        <div role="tablist" aria-label={label} className="relative flex overflow-x-auto">
          {items.map((item, index) => {
            const active = item.value === current;
            return (
              <button
                key={item.value}
                ref={(node) => {
                  tabs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`${id}-tab-${index}`}
                aria-selected={active}
                aria-controls={active && item.content !== undefined ? `${id}-panel` : undefined}
                // 선택된 탭 하나에만 Tab 키로 들어온다. 나머지는 화살표 키로 간다.
                tabIndex={active ? 0 : -1}
                disabled={item.disabled}
                onClick={() => select(item.value)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={[
                  "inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap border-b-2",
                  "transition-colors duration-d2 ease-standard motion-reduce:transition-none",
                  SIZES[size],
                  active ? SELECTED : UNSELECTED,
                  DISABLED,
                  FOCUS,
                  fullWidth ? "flex-1" : "",
                ].join(" ")}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
      {selected && selected.content !== undefined ? (
        <div
          role="tabpanel"
          id={`${id}-panel`}
          aria-labelledby={`${id}-tab-${items.indexOf(selected)}`}
          tabIndex={0}
          className={`pt-x4 ${FOCUS}`}
        >
          {selected.content}
        </div>
      ) : null}
    </div>
  );
}
