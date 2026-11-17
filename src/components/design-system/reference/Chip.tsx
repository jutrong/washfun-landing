import type { ButtonHTMLAttributes, ReactNode } from "react";

type Size = "medium" | "small";

export type ChipProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  /** 고른 상태. 값은 부모가 가지고 내려 준다. */
  selected?: boolean;
  size?: Size;
  /** 레이블 앞에 점을 둔다. 색은 글자를 따른다. */
  dot?: boolean;
  /** 레이블 앞 아이콘. 꾸밈용이므로 화면 읽기 프로그램에는 숨긴다. dot 과 함께 쓰지 않는다. */
  icon?: ReactNode;
  children: ReactNode;
};

// 색은 모두 역할 토큰. 선택 여부는 색과 함께 굵기와 체크 표시로도 알린다.
const TONES = {
  unselected: "border-stroke-neutral bg-bg-layer-default font-medium text-fg-neutral group-active:bg-bg-neutral-weak",
  selected: "border-stroke-brand-solid bg-bg-brand-weak font-bold text-fg-brand group-active:bg-bg-layer-default",
};

// 보이는 알약의 크기. 키오스크에서는 이 표만 kiosk 값으로 바꾼다(medium: h-x12 px-x5 gap-x2 text-t2, small 은 두지 않는다).
const SIZES: Record<Size, string> = {
  medium: "h-x9 gap-x2 px-x4 text-t4",
  small: "h-x8 gap-x1 px-x3 text-t3",
};

const DISABLED = "group-disabled:border-transparent group-disabled:bg-bg-disabled group-disabled:text-fg-disabled";
// 초점 테두리는 누르는 영역이 아니라 보이는 알약을 따라 그린다.
const FOCUS =
  "group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-stroke-brand-solid";

const check = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-full">
    <path d="m9.55 15.15 8.47-8.47 1.41 1.41-9.88 9.88-5-5 1.41-1.41 3.59 3.59Z" />
  </svg>
);

export default function Chip({
  selected = false,
  size = "medium",
  dot = false,
  icon,
  type = "button",
  className = "",
  children,
  ...rest
}: ChipProps) {
  // 앞 표시 자리에는 하나만 둔다. 선택되면 체크 표시가 차지한다.
  const leading = selected ? check : icon;

  return (
    // button 은 보이지 않는 누르는 영역이다. 알약보다 위아래로 넓어 min-h-touch 를 채운다.
    <button
      {...rest}
      type={type}
      aria-pressed={selected}
      className={`group inline-flex min-h-touch shrink-0 select-none items-center outline-none disabled:cursor-not-allowed ${className}`}
    >
      <span
        className={[
          "inline-flex items-center justify-center whitespace-nowrap rounded-full border",
          "transition-colors duration-d2 ease-standard motion-reduce:transition-none",
          selected ? TONES.selected : TONES.unselected,
          SIZES[size],
          DISABLED,
          FOCUS,
        ].join(" ")}
      >
        {leading ? (
          <span aria-hidden className="inline-flex size-icon-sm shrink-0 items-center justify-center">
            {leading}
          </span>
        ) : dot ? (
          <span aria-hidden className="size-x2 shrink-0 rounded-full bg-current" />
        ) : null}
        <span>{children}</span>
      </span>
    </button>
  );
}
