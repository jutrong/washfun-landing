import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "large" | "medium" | "small";

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  variant?: Variant;
  size?: Size;
  /** 부모 너비를 꽉 채운다. 화면 아래 주요 버튼에 쓴다. */
  fullWidth?: boolean;
  /** 처리 중. 폭은 그대로 두고 레이블 자리에 도는 표시를 보여 준다. */
  loading?: boolean;
  /** 레이블 앞 아이콘. 꾸밈용이므로 화면 읽기 프로그램에는 숨긴다. */
  icon?: ReactNode;
  children: ReactNode;
};

// 색은 모두 역할 토큰. 눌린 색은 변형마다 정해 둔다.
const VARIANTS: Record<Variant, string> = {
  primary: "bg-bg-brand-solid text-fg-on-brand-solid active:bg-bg-brand-solid-pressed",
  secondary: "bg-bg-neutral-weak text-fg-neutral active:bg-stroke-neutral-weak",
  outline: "border border-stroke-neutral-weak bg-bg-layer-default text-fg-neutral active:bg-bg-neutral-weak",
  ghost: "text-fg-brand active:bg-bg-brand-weak",
  danger: "bg-bg-critical-solid text-fg-on-brand-solid active:opacity-80",
};

// 키오스크에서는 이 표만 kiosk 값으로 바꾼다(large: h-x16 px-x6 text-t4, 사이는 gap-x3).
const SIZES: Record<Size, string> = {
  large: "h-x12 rounded-r3 px-x5 text-t5",
  medium: "h-x10 rounded-r2 px-x4 text-t4",
  small: "h-x8 rounded-r2 px-x3 text-t3",
};

// 아이콘과 레이블 사이.
const GAPS: Record<Size, string> = { large: "gap-x2", medium: "gap-x2", small: "gap-x1" };

const DISABLED = "disabled:cursor-not-allowed disabled:border-transparent disabled:bg-bg-disabled disabled:text-fg-disabled disabled:opacity-100";
const FOCUS = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stroke-brand-solid";

export default function Button({
  variant = "primary",
  size = "large",
  fullWidth = false,
  loading = false,
  disabled = false,
  icon,
  type = "button",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      // 처리 중에는 다시 누를 수 없지만 비활성 색으로 바꾸지는 않는다.
      disabled={disabled}
      aria-disabled={loading || undefined}
      aria-busy={loading || undefined}
      onClick={loading ? undefined : rest.onClick}
      className={[
        "relative inline-flex select-none items-center justify-center whitespace-nowrap font-bold",
        "transition-colors duration-d2 ease-standard motion-reduce:transition-none",
        VARIANTS[variant],
        SIZES[size],
        DISABLED,
        FOCUS,
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
    >
      {/* 처리 중에도 폭이 변하지 않도록 내용은 그대로 두고 보이지 않게만 한다. */}
      <span className={`inline-flex items-center justify-center ${GAPS[size]} ${loading ? "invisible" : ""}`}>
        {icon ? (
          <span aria-hidden className="inline-flex size-icon-md shrink-0 items-center justify-center">
            {icon}
          </span>
        ) : null}
        <span className="truncate">{children}</span>
      </span>
      {loading ? (
        <span className="absolute inset-0 flex items-center justify-center">
          <span
            aria-hidden
            className="size-icon-md animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none"
          />
          <span className="sr-only">처리하는 중</span>
        </span>
      ) : null}
    </button>
  );
}
