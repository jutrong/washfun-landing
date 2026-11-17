"use client";

import { forwardRef, useEffect, useId, useRef, useState } from "react";
import type { HTMLAttributes } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

export type DialogAction = {
  /** 버튼 글자. 일어날 일을 쓴다: 삭제하기. 창만 닫으면 닫기. */
  label: string;
  onClick: () => void;
  /** 처리 중. 이 동안에는 창이 닫히지 않는다. */
  loading?: boolean;
};

type Tone = "default" | "danger";

export type DialogSurfaceProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  /** 한 문장. 선택을 묻는 창은 질문으로 쓴다. */
  title: string;
  /** 선택. 결과나 되돌릴 수 있는지를 한두 문장으로 알린다. */
  description?: string;
  /** 오른쪽 버튼. 하나만 있으면 너비를 채운다. */
  primaryAction: DialogAction;
  /** 왼쪽 버튼. 덜 중요한 쪽, 보통 닫기. */
  secondaryAction?: DialogAction;
  /** danger 는 삭제처럼 되돌리기 어려운 행동. 오른쪽 버튼이 danger 로 바뀐다. */
  tone?: Tone;
  titleId?: string;
  descriptionId?: string;
};

export type DialogProps = Pick<DialogSurfaceProps, "title" | "description" | "primaryAction" | "secondaryAction" | "tone"> & {
  open: boolean;
  /** Esc, 배경 누름으로 닫힐 때 부른다. 버튼은 각자의 onClick 에서 닫는다. */
  onClose: () => void;
  /** 배경을 눌러 닫을지. 키오스크는 false. danger 와 처리 중에는 true 여도 닫히지 않는다. */
  closeOnBackdrop?: boolean;
};

// 사라지는 움직임(duration-d3)이 끝난 뒤 DOM 에서 뺀다. motion.duration.d3 과 같은 값.
const EXIT_MS = 200;

const FOCUSABLE = "button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";

/** 확인 창의 면. 오버레이 없이 이것만 그리면 문서의 미리 보기가 된다. */
export const DialogSurface = forwardRef<HTMLDivElement, DialogSurfaceProps>(function DialogSurface(
  { title, description, primaryAction, secondaryAction, tone = "default", titleId, descriptionId, className = "", ...rest },
  ref,
) {
  return (
    <div
      {...rest}
      ref={ref}
      // 키오스크에서는 p-x10, 제목 text-t8, 버튼 사이 gap-x3 으로 바꾼다. 모서리는 같은 rounded-r6 이 30px 이 된다.
      className={`flex max-h-full w-full max-w-sm flex-col overflow-y-auto rounded-r6 bg-bg-layer-floating p-x6 text-left shadow-s3 outline-none ${className}`}
    >
      <h2 id={titleId} className="text-t7 font-bold text-fg-neutral">
        {title}
      </h2>
      {description ? (
        <p id={descriptionId} className="mt-x2 text-t5 text-fg-neutral-muted">
          {description}
        </p>
      ) : null}
      {/* 덜 중요한 버튼이 왼쪽, 주요 버튼이 오른쪽. */}
      <div className="mt-x6 flex gap-x2">
        {secondaryAction ? (
          <Button variant="outline" className="min-w-0 flex-1" loading={secondaryAction.loading} onClick={secondaryAction.onClick}>
            {secondaryAction.label}
          </Button>
        ) : null}
        <Button
          variant={tone === "danger" ? "danger" : "primary"}
          className="min-w-0 flex-1"
          loading={primaryAction.loading}
          onClick={primaryAction.onClick}
        >
          {primaryAction.label}
        </Button>
      </div>
    </div>
  );
});

export default function Dialog({
  open,
  onClose,
  title,
  description,
  primaryAction,
  secondaryAction,
  tone = "default",
  closeOnBackdrop = true,
}: DialogProps) {
  // mounted: DOM 에 있는지. visible: 다 나타난 모양인지. 둘을 나눠야 나타나고 사라지는 움직임이 돈다.
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const surface = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const busy = Boolean(primaryAction.loading || secondaryAction?.loading);

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
      // 초점이 창 밖으로 나가지 않게 처음과 끝을 잇는다.
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
      // 창을 연 요소로 초점을 돌려준다.
      opener?.focus();
    };
  }, [mounted]);

  if (!mounted) return null;

  const closable = closeOnBackdrop && tone !== "danger" && !busy;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-x5">
      <div
        aria-hidden
        onClick={closable ? onClose : undefined}
        // 동작 줄이기에서도 배경은 투명도만 바뀌므로 그대로 둔다.
        className={`absolute inset-0 bg-bg-overlay transition-opacity ${visible ? "opacity-100 duration-d4 ease-enter" : "opacity-0 duration-d3 ease-exit"}`}
      />
      <DialogSurface
        ref={surface}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        title={title}
        description={description}
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
        tone={tone}
        titleId={titleId}
        descriptionId={descriptionId}
        className={`relative transition-[opacity,transform] motion-reduce:transition-none ${
          visible ? "scale-100 opacity-100 duration-d4 ease-enter" : "scale-95 opacity-0 duration-d3 ease-exit"
        }`}
      />
    </div>,
    document.body,
  );
}
