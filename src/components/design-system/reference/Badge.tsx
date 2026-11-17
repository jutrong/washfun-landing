import type { HTMLAttributes, ReactNode } from "react";

type Tone = "neutral" | "brand" | "critical" | "warning" | "positive" | "informative";
type Variant = "weak" | "solid";
type Size = "medium" | "large";

export type BadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  /** 색조. 뜻으로 고른다: 이용 중은 positive, 만료 예정은 warning, 결제 실패는 critical. */
  tone?: Tone;
  /** weak 는 옅은 면에 진한 글자, solid 는 진한 면에 밝은 글자. */
  variant?: Variant;
  size?: Size;
  /** 레이블 앞에 점을 둔다. 꾸밈용이므로 화면 읽기 프로그램에는 숨긴다. */
  dot?: boolean;
  children: ReactNode;
};

// 색은 모두 역할 토큰. 같은 색조의 면과 글자를 짝으로 쓴다.
const TONES: Record<Variant, Record<Tone, string>> = {
  weak: {
    neutral: "bg-bg-neutral-weak text-fg-neutral",
    brand: "bg-bg-brand-weak text-fg-brand",
    critical: "bg-bg-critical-weak text-fg-critical",
    warning: "bg-bg-warning-weak text-fg-warning",
    positive: "bg-bg-positive-weak text-fg-positive",
    informative: "bg-bg-informative-weak text-fg-informative",
  },
  solid: {
    // neutral 은 진한 면 토큰이 없어 weak 와 같게 그린다.
    neutral: "bg-bg-neutral-weak text-fg-neutral",
    brand: "bg-bg-brand-solid text-fg-on-brand-solid",
    critical: "bg-bg-critical-solid text-fg-on-brand-solid",
    // 진한 경고 면 위에서만 어두운 글자를 쓴다.
    warning: "bg-bg-warning-solid text-fg-on-warning-solid",
    positive: "bg-bg-positive-solid text-fg-on-brand-solid",
    informative: "bg-bg-informative-solid text-fg-on-brand-solid",
  },
};

// 키오스크에서는 이 표만 kiosk 값으로 바꾼다(medium: h-x8 px-x3 gap-x2, large: h-x10 px-x4 gap-x2, 점은 size-x2).
const SIZES: Record<Size, string> = {
  medium: "h-x5 gap-x1 px-x2 text-t1",
  large: "h-x6 gap-x1 px-x2 text-t2",
};

const DOTS: Record<Size, string> = { medium: "size-x1", large: "size-x2" };

export default function Badge({ tone = "neutral", variant = "weak", size = "medium", dot = false, className = "", children, ...rest }: BadgeProps) {
  return (
    // 누를 수 없으므로 span 이다. 뜻은 글자가 전하고 색은 거든다.
    <span
      {...rest}
      className={["inline-flex shrink-0 items-center whitespace-nowrap rounded-full font-bold", TONES[variant][tone], SIZES[size], className].join(" ")}
    >
      {dot ? <span aria-hidden className={`shrink-0 rounded-full bg-current ${DOTS[size]}`} /> : null}
      {children}
    </span>
  );
}
