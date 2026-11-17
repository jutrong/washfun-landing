"use client";

import { useId } from "react";
import type { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";

type Size = "large" | "medium";

export type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  /** 입력 칸 위에 항상 보이는 레이블. 입력 안내 글자는 레이블을 대신하지 않는다. */
  label: string;
  /** 입력 칸 아래 도움말. */
  helperText?: string;
  /** 오류 문구. 값이 있으면 오류 상태가 되고 도움말 자리를 대신한다. */
  errorText?: string;
  size?: Size;
  /** 입력 칸 안 오른쪽에 두는 단위(원, P). */
  suffix?: ReactNode;
  /** 값이 바뀔 때. 앱과 같은 이름을 쓴다. */
  onChangeText?: (text: string) => void;
};

// 키오스크에서는 이 표만 kiosk 값으로 바꾼다(large: h-x16 rounded-r3 px-x5 text-t3, 레이블 text-t2, 도움말 text-t1, 사이 gap-x3).
const SIZES: Record<Size, { stack: string; field: string; label: string; helper: string }> = {
  large: { stack: "gap-x2", field: "h-x12 rounded-r4 px-x4 text-t5", label: "text-t4", helper: "text-t3" },
  medium: { stack: "gap-x2", field: "h-x10 rounded-r2 px-x3 text-t4", label: "text-t3", helper: "text-t2" },
};

// 테두리와 면은 input 이 아니라 감싼 상자가 가진다. 뒤 단위가 같은 테두리 안에 들어가기 때문이다.
const DEFAULT = "border-stroke-neutral bg-bg-layer-default focus-within:border-stroke-brand-solid focus-within:outline-stroke-brand-solid";
const ERROR = "border-fg-critical bg-bg-layer-default focus-within:outline-fg-critical";
const DISABLED = "cursor-not-allowed border-stroke-neutral-weak bg-bg-disabled";

export default function TextField({
  label,
  helperText,
  errorText,
  size = "large",
  suffix,
  onChangeText,
  onChange,
  disabled = false,
  id,
  className = "",
  ...rest
}: TextFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const messageId = `${inputId}-message`;
  const s = SIZES[size];
  const invalid = Boolean(errorText);
  const message = errorText ?? helperText;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    onChangeText?.(event.target.value);
  };

  return (
    <div className={`flex w-full flex-col ${s.stack} ${className}`}>
      <label htmlFor={inputId} className={`font-medium text-fg-neutral ${s.label}`}>
        {label}
      </label>
      <div
        className={[
          "flex items-center gap-x2 border",
          // 초점 테두리는 바깥 선을 안쪽으로 겹쳐 2px 로 보이게 한다. 칸의 크기는 변하지 않는다.
          "focus-within:outline focus-within:outline-2 focus-within:-outline-offset-1",
          "transition-colors duration-d2 ease-standard motion-reduce:transition-none",
          s.field,
          disabled ? DISABLED : invalid ? ERROR : DEFAULT,
        ].join(" ")}
      >
        <input
          {...rest}
          id={inputId}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-describedby={message ? messageId : undefined}
          onChange={handleChange}
          className="h-full min-w-0 flex-1 bg-transparent text-fg-neutral outline-none placeholder:text-fg-placeholder disabled:cursor-not-allowed disabled:text-fg-disabled"
        />
        {suffix ? <span className={`shrink-0 ${disabled ? "text-fg-disabled" : "text-fg-neutral-muted"}`}>{suffix}</span> : null}
      </div>
      {/* 도움말과 오류 문구는 같은 자리를 쓴다. 오류는 색과 함께 문구로 알린다. */}
      {message ? (
        <p id={messageId} className={`${s.helper} ${invalid ? "text-fg-critical" : "text-fg-neutral-muted"}`}>
          {message}
        </p>
      ) : null}
    </div>
  );
}
