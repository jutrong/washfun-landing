import type { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";

type Size = "medium" | "small";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> & {
  /** 네모 오른쪽 레이블. 없으면 aria-label 로 이름을 붙인다. */
  label?: ReactNode;
  /** 레이블 아래 보조 설명. */
  description?: string;
  size?: Size;
  /** 오류 상태. 문구는 묶음 아래에 따로 두고 aria-describedby 로 잇는다. */
  invalid?: boolean;
  /** 고르거나 풀 때. 앱과 같은 이름을 쓴다. */
  onCheckedChange?: (checked: boolean) => void;
};

// 키오스크에서는 이 표만 kiosk 값으로 바꾼다(medium: 줄 min-h-x16 py-x4 gap-x4, 네모 size-x8, 감싼 칸 h-x8, 체크 size-icon-xs, 레이블 text-t3).
const SIZES: Record<Size, { row: string; line: string; box: string; check: string; label: string; description: string }> = {
  medium: { row: "min-h-x12 gap-x3 py-x3", line: "h-x6", box: "size-x6", check: "size-icon-sm", label: "text-t5", description: "text-t3" },
  small: { row: "min-h-x10 gap-x2 py-x2", line: "h-x5", box: "size-x5", check: "size-icon-xs", label: "text-t4", description: "text-t2" },
};

// input 자체를 네모로 그린다. 초점과 고른 상태가 요소에 그대로 남는다.
const BOX = [
  "peer shrink-0 cursor-pointer appearance-none rounded-r1 border bg-bg-layer-default",
  "transition-colors duration-d1 ease-standard motion-reduce:transition-none",
  "checked:border-stroke-brand-solid checked:bg-bg-brand-solid",
  "disabled:cursor-not-allowed disabled:border-stroke-neutral-weak disabled:bg-bg-disabled",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stroke-brand-solid",
].join(" ");

export default function Checkbox({
  label,
  description,
  size = "medium",
  invalid = false,
  disabled = false,
  onCheckedChange,
  onChange,
  className = "",
  ...rest
}: CheckboxProps) {
  const s = SIZES[size];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    onCheckedChange?.(event.target.checked);
  };

  return (
    <label className={`inline-flex items-start ${s.row} ${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${className}`}>
      {/* 높이를 레이블 한 줄과 같게 두어, 레이블이 여러 줄이어도 네모가 첫 줄에 맞는다. */}
      <span className={`relative inline-flex shrink-0 items-center ${s.line}`}>
        <input
          {...rest}
          type="checkbox"
          disabled={disabled}
          aria-invalid={invalid || undefined}
          onChange={handleChange}
          className={`${BOX} ${s.box} ${invalid ? "border-fg-critical" : "border-stroke-neutral"}`}
        />
        {/* 고른 상태는 색과 함께 체크 표시로 알린다. */}
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`pointer-events-none absolute inset-0 m-auto text-fg-on-brand-solid opacity-0 transition-opacity duration-d1 ease-standard motion-reduce:transition-none peer-checked:opacity-100 peer-disabled:text-fg-disabled ${s.check}`}
        >
          <path d="M9.55 17.3 4.6 12.35l1.4-1.4 3.55 3.55 8.45-8.45 1.4 1.4-9.85 9.85Z" />
        </svg>
      </span>
      {label ? (
        <span className="flex min-w-0 flex-col">
          <span className={`${s.label} ${disabled ? "text-fg-disabled" : "text-fg-neutral"}`}>{label}</span>
          {description ? <span className={`${s.description} ${disabled ? "text-fg-disabled" : "text-fg-neutral-muted"}`}>{description}</span> : null}
        </span>
      ) : null}
    </label>
  );
}
