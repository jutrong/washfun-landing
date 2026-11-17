import type { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";

export type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "role"> & {
  /** 스위치 왼쪽 레이블. 없으면 aria-label 로 이름을 붙인다. */
  label?: ReactNode;
  /** 레이블 아래 보조 설명. */
  description?: string;
  /** 켜거나 끌 때. 앱과 같은 이름을 쓴다. */
  onCheckedChange?: (checked: boolean) => void;
};

// 키오스크에서는 이 값만 kiosk 값으로 바꾼다(줄 min-h-x16 gap-x4, 바탕 h-x9 w-x16, 손잡이 size-x8, 옮기는 거리 translate-x-x7, 레이블 text-t3).
const ROW = "min-h-x12 gap-x3";
const TRACK_SIZE = "h-x7 w-x12";
const THUMB_SIZE = "size-x6 peer-checked:translate-x-x5";
const LABEL = "text-t5";
const DESCRIPTION = "text-t3";

// input 자체를 바탕으로 그린다. role=switch 를 주면 켜짐과 꺼짐을 checked 가 그대로 알린다.
const TRACK = [
  "peer shrink-0 cursor-pointer appearance-none rounded-full bg-stroke-neutral",
  "transition-colors duration-d3 ease-standard motion-reduce:transition-none",
  "checked:bg-bg-brand-solid",
  "disabled:cursor-not-allowed disabled:bg-bg-disabled",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stroke-brand-solid",
].join(" ");

// 손잡이는 transform 으로만 옮긴다. 2px 안쪽 여백은 선 굵기처럼 토큰이 없어 Tailwind 기본 단계를 쓴다.
const THUMB = [
  "pointer-events-none absolute left-0.5 top-0.5 rounded-full bg-fg-on-brand-solid",
  "transition-transform duration-d3 ease-standard motion-reduce:transition-none",
  "peer-disabled:bg-fg-disabled",
].join(" ");

export default function Switch({ label, description, disabled = false, onCheckedChange, onChange, className = "", ...rest }: SwitchProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    onCheckedChange?.(event.target.checked);
  };

  return (
    <label className={`flex items-center justify-between ${ROW} ${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${className}`}>
      {label ? (
        <span className="flex min-w-0 flex-1 flex-col">
          <span className={`${LABEL} ${disabled ? "text-fg-disabled" : "text-fg-neutral"}`}>{label}</span>
          {description ? <span className={`${DESCRIPTION} ${disabled ? "text-fg-disabled" : "text-fg-neutral-muted"}`}>{description}</span> : null}
        </span>
      ) : null}
      <span className="relative inline-flex shrink-0">
        <input {...rest} type="checkbox" role="switch" disabled={disabled} onChange={handleChange} className={`${TRACK} ${TRACK_SIZE}`} />
        {/* 켜짐과 꺼짐은 색과 함께 손잡이의 자리로 알린다. */}
        <span aria-hidden className={`${THUMB} ${THUMB_SIZE}`} />
      </span>
    </label>
  );
}
