"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type ToastTone = "neutral" | "positive" | "critical" | "warning" | "informative";

export type ToastSurfaceProps = {
  /** 한 줄, 길어도 두 줄. 일어난 일을 쓴다: 10,000P를 충전했어요. */
  message: string;
  /** 결과의 성격. 면의 색은 같고 앞의 아이콘만 바뀐다. */
  tone?: ToastTone;
  className?: string;
};

export type ToastProps = Omit<ToastSurfaceProps, "className"> & {
  open: boolean;
  /** 시간이 지나 사라질 때 부른다. */
  onClose: () => void;
  /** 보이는 시간(ms). 두 줄이면 늘리되 4000 을 넘기지 않는다. */
  duration?: number;
  /** 화면 아래에 주요 버튼이 있을 때. 버튼을 가리지 않게 그 위에 띄운다. */
  aboveAction?: boolean;
};

// 사라지는 움직임(duration-d3)이 끝난 뒤 DOM 에서 뺀다. motion.duration.d3 과 같은 값.
const EXIT_MS = 200;
const MAX_DURATION = 4000;

// 견본용 아이콘. 실제 제품에서는 Icon Library 의 Fill 아이콘을 쓴다.
const ICONS: Record<Exclude<ToastTone, "neutral">, { color: string; path: string }> = {
  positive: {
    color: "text-fg-positive",
    path: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1.2 14.2-4-4 1.4-1.4 2.6 2.6 5.4-5.4 1.4 1.4-6.8 6.8Z",
  },
  critical: {
    color: "text-fg-critical",
    path: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1 5h2v7h-2V7Zm0 9h2v2h-2v-2Z",
  },
  warning: {
    color: "text-fg-warning",
    path: "M12 3 1.6 21h20.8L12 3Zm-1 7h2v5h-2v-5Zm0 6.5h2v2h-2v-2Z",
  },
  informative: {
    color: "text-fg-informative",
    path: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1 5h2v2h-2V7Zm0 4h2v6h-2v-6Z",
  },
};

/** 토스트의 면. 이것만 그리면 문서의 미리 보기가 된다. */
export function ToastSurface({ message, tone = "neutral", className = "" }: ToastSurfaceProps) {
  const icon = tone === "neutral" ? null : ICONS[tone];
  return (
    <div
      // 키오스크에서는 px-x8 py-x5 text-t4(24px), 아이콘 size-icon-sm(32px)으로 바꾼다.
      className={`pointer-events-auto inline-flex max-w-sm items-center gap-x4 rounded-full border border-stroke-neutral-weak bg-bg-layer-floating px-x7 py-x3 text-left text-t4 font-medium text-fg-neutral shadow-s2 ${className}`}
    >
      {icon ? (
        <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" className={`size-icon-md shrink-0 ${icon.color}`}>
          <path d={icon.path} />
        </svg>
      ) : null}
      <span className="line-clamp-2">{message}</span>
    </div>
  );
}

export default function Toast({ open, onClose, message, tone = "neutral", duration = 2000, aboveAction = false }: ToastProps) {
  // ready: 브라우저에서 그릴 준비가 됐는지. mounted: 면이 DOM 에 있는지. visible: 다 나타난 모양인지.
  const [ready, setReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  const latestClose = useRef(onClose);
  useEffect(() => {
    latestClose.current = onClose;
  });

  useEffect(() => setReady(true), []);

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
    box.current?.getBoundingClientRect();
    setVisible(true);
  }, [mounted, open]);

  // 정해진 시간이 지나면 스스로 닫는다. 문구가 바뀌면 시간을 다시 센다.
  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => latestClose.current(), Math.min(duration, MAX_DURATION));
    return () => window.clearTimeout(timer);
  }, [open, message, duration]);

  if (!ready) return null;

  return createPortal(
    // 화면을 덮지 않는다. 토스트 밖은 그대로 누를 수 있고 스크롤도 잠그지 않는다.
    <div className={`pointer-events-none fixed inset-x-0 z-toast flex justify-center px-x4 ${aboveAction ? "bottom-x16 pb-x2" : "bottom-0 pb-x6"}`}>
      {/* 읽어 주는 영역은 늘 두고 내용만 넣었다 뺀다. 그래야 화면 읽기 프로그램이 새 문구를 읽는다. */}
      <div role="status" aria-live="polite" aria-atomic="true">
        {mounted ? (
          <div
            ref={box}
            // 동작 줄이기에서는 자리 이동 없이 바로 나타나고 사라진다.
            className={`transition-[opacity,transform] duration-d3 motion-reduce:transition-none ${
              visible ? "translate-y-0 opacity-100 ease-enter" : "translate-y-x2 opacity-0 ease-exit"
            }`}
          >
            <ToastSurface message={message} tone={tone} />
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
