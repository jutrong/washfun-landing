"use client";

import { forwardRef, useEffect, useId, useRef, useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

export type BottomSheetAction = {
  /** 버튼 글자. 일어날 일을 쓴다: 결제하기. */
  label: string;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
};

export type BottomSheetSurfaceProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  /** 한 문장. 무엇을 고르거나 하는 곳인지 쓴다. */
  title: string;
  /** 선택. 제목 아래 한 줄 설명. */
  description?: string;
  /** 선택지 목록이나 짧은 입력. */
  children: ReactNode;
  /** 선택. 맨 아래에 너비를 채우는 주요 버튼. */
  primaryAction?: BottomSheetAction;
  /** 닫기 버튼을 눌렀을 때. */
  onClose: () => void;
  titleId?: string;
  descriptionId?: string;
};

export type BottomSheetProps = Pick<BottomSheetSurfaceProps, "title" | "description" | "children" | "primaryAction"> & {
  open: boolean;
  /** 닫기 버튼, Esc, 배경 누름으로 닫힐 때 부른다. */
  onClose: () => void;
};

// 사라지는 움직임(duration-d3)이 끝난 뒤 DOM 에서 뺀다. motion.duration.d3 과 같은 값.
const EXIT_MS = 200;

const FOCUSABLE = "button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";
const FOCUS = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stroke-brand-solid";

/** 바텀 시트의 면. 오버레이 없이 이것만 그리면 문서의 미리 보기가 된다. */
export const BottomSheetSurface = forwardRef<HTMLDivElement, BottomSheetSurfaceProps>(function BottomSheetSurface(
  { title, description, children, primaryAction, onClose, titleId, descriptionId, className = "", ...rest },
  ref,
) {
  return (
    <div
      {...rest}
      ref={ref}
      // 위쪽 모서리만 둥글다. 아래 여백 x12 에는 홈 표시 줄 자리가 들어 있다.
      className={`flex max-h-full w-full max-w-md flex-col rounded-t-r6 bg-bg-layer-floating px-x6 pb-x12 pt-x6 text-left shadow-s3 outline-none ${className}`}
    >
      <div className="flex items-start justify-between gap-x4">
        <div className="min-w-0">
          <h2 id={titleId} className="text-t7 font-bold text-fg-neutral">
            {title}
          </h2>
          {description ? (
            <p id={descriptionId} className="mt-x1 text-t4 text-fg-neutral-muted">
              {description}
            </p>
          ) : null}
        </div>
        {/* 보이는 아이콘은 24px, 누르는 영역은 touch-target.min. */}
        <button
          type="button"
          aria-label="닫기"
          onClick={onClose}
          className={`-m-x2 inline-flex size-touch shrink-0 items-center justify-center rounded-full text-fg-neutral-muted transition-colors duration-d2 ease-standard active:bg-bg-neutral-weak motion-reduce:transition-none ${FOCUS}`}
        >
          <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="size-icon-lg">
            <path d="m12 10.6 5-5 1.4 1.4-5 5 5 5-1.4 1.4-5-5-5 5L5.6 17l5-5-5-5L7 5.6l5 5Z" />
          </svg>
        </button>
      </div>
      {/* 내용이 길면 제목과 버튼은 그대로 두고 이 부분만 스크롤한다. */}
      <div className="mt-x4 min-h-0 flex-1 overflow-y-auto">{children}</div>
      {primaryAction ? (
        <Button fullWidth className="mt-x6 shrink-0" loading={primaryAction.loading} disabled={primaryAction.disabled} onClick={primaryAction.onClick}>
          {primaryAction.label}
        </Button>
      ) : null}
    </div>
  );
});

export default function BottomSheet({ open, onClose, title, description, children, primaryAction }: BottomSheetProps) {
  // mounted: DOM 에 있는지. visible: 다 올라온 모양인지. 둘을 나눠야 올라오고 내려가는 움직임이 돈다.
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const surface = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const busy = Boolean(primaryAction?.loading);

  // 키 처리에서 늘 최신 값을 보도록 담아 둔다.
  const latest = useRef({ onClose, busy });
  useEffect(() => {
    latest.current = { onClose, busy };
  });

  useEffect(() => {
    if (open) {
      setMounted(true);
      return;
    }
    setVisible(false);
    const timer = window.setTimeout(() => setMounted(false), EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!mounted || !open) return;
    // 숨은 모양을 한 번 계산하게 한 뒤에 바꿔야 transition 이 시작된다.
    surface.current?.getBoundingClientRect();
    setVisible(true);
  }, [mounted, open]);

  useEffect(() => {
    if (!mounted) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    surface.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (!latest.current.busy) latest.current.onClose();
        return;
      }
      if (event.key !== "Tab" || !surface.current) return;
      // 초점이 시트 밖으로 나가지 않게 처음과 끝을 잇는다.
      const items = Array.from(surface.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (!first || !last) {
        event.preventDefault();
      } else if (!surface.current.contains(active) || active === surface.current) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      // 시트를 연 요소로 초점을 돌려준다.
      opener?.focus();
    };
  }, [mounted]);

  if (!mounted) return null;

  const close = busy ? undefined : onClose;

  return createPortal(
    // 위에 x16 을 남겨 시트가 화면을 다 덮지 않게 한다. 뒤 화면이 보여야 돌아갈 곳을 안다.
    <div className="fixed inset-0 z-overlay flex items-end justify-center pt-x16">
      <div
        aria-hidden
        onClick={close}
        // 동작 줄이기에서도 배경은 투명도만 바뀌므로 그대로 둔다.
        className={`absolute inset-0 bg-bg-overlay transition-opacity ${visible ? "opacity-100 duration-d4 ease-enter" : "opacity-0 duration-d3 ease-exit"}`}
      />
      <BottomSheetSurface
        ref={surface}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        title={title}
        description={description}
        primaryAction={primaryAction}
        onClose={close ?? (() => {})}
        titleId={titleId}
        descriptionId={descriptionId}
        // 동작 줄이기에서는 자리 이동 없이 바로 나타나고 사라진다.
        className={`relative transition-transform motion-reduce:transition-none ${
          visible ? "translate-y-0 duration-d4 ease-enter" : "translate-y-full duration-d3 ease-exit"
        }`}
      >
        {children}
      </BottomSheetSurface>
    </div>,
    document.body,
  );
}
