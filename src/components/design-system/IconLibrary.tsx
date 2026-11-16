"use client";

import { useMemo, useState } from "react";
import type { IconEntry } from "./icons";

type Variant = "all" | "line" | "fill";
type CopyKind = "name" | "svg";

const VARIANTS: { key: Variant; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "line", label: "Line" },
  { key: "fill", label: "Fill" },
];
const COPY_KINDS: { key: CopyKind; label: string }[] = [
  { key: "name", label: "이름" },
  { key: "svg", label: "SVG" },
];

const svgOf = (entry: IconEntry) =>
  `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="${entry.d}"/></svg>`;

const chip = (on: boolean) =>
  `min-h-[36px] rounded-full px-x4 text-t3 font-medium ${
    on ? "bg-bg-brand-solid text-fg-on-brand-solid" : "bg-bg-neutral-weak text-fg-neutral-muted"
  }`;

/** 이름·한글 검색어·분류로 찾고, 누르면 이름이나 SVG 를 복사하는 아이콘 목록. */
export default function IconLibrary({ entries }: { entries: IconEntry[] }) {
  const [query, setQuery] = useState("");
  const [variant, setVariant] = useState<Variant>("all");
  const [copyKind, setCopyKind] = useState<CopyKind>("name");
  const [copied, setCopied] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  const shown = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return entries.filter((entry) => {
      if (variant !== "all" && entry.variant !== variant) return false;
      const haystack = `${entry.name} ${entry.category} ${entry.ko.join(" ")}`.toLowerCase();
      return words.every((word) => haystack.includes(word));
    });
  }, [entries, query, variant]);

  async function copy(entry: IconEntry) {
    const text = copyKind === "name" ? entry.name : svgOf(entry);
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      // 클립보드 권한이 없는 환경(끼워 넣은 화면 등)에서는 옛 방식으로 한 번 더 시도한다.
      const area = document.createElement("textarea");
      area.value = text;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      ok = document.execCommand("copy");
      area.remove();
    }
    setCopied(ok ? entry.name : null);
    setFailed(!ok);
  }

  return (
    <div>
      <label className="block">
        <span className="sr-only">아이콘 검색</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="이름이나 한글로 검색 (예: home, 결제, 화살표)"
          className="min-h-touch w-full rounded-r2 border border-stroke-neutral-weak bg-bg-layer-default px-x4 text-t5 text-fg-neutral placeholder:text-fg-placeholder focus:border-stroke-brand-solid focus:outline-none"
        />
      </label>

      <div className="mt-x4 flex flex-wrap items-center justify-between gap-x3">
        <div role="group" aria-label="모양" className="flex gap-x2">
          {VARIANTS.map((item) => (
            <button
              key={item.key}
              type="button"
              aria-pressed={variant === item.key}
              onClick={() => setVariant(item.key)}
              className={chip(variant === item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div role="group" aria-label="누르면 복사할 것" className="flex items-center gap-x2">
          <span className="text-t3 text-fg-neutral-muted">누르면 복사</span>
          {COPY_KINDS.map((item) => (
            <button
              key={item.key}
              type="button"
              aria-pressed={copyKind === item.key}
              onClick={() => setCopyKind(item.key)}
              className={chip(copyKind === item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <p aria-live="polite" className="mt-x4 text-t3 text-fg-neutral-muted">
        {shown.length}개
        {copied ? ` · ${copied} ${copyKind === "name" ? "이름을" : "SVG를"} 복사했습니다` : ""}
        {failed ? " · 복사하지 못했습니다. 브라우저의 클립보드 권한을 확인해 주세요" : ""}
      </p>

      {shown.length === 0 ? (
        <p className="mt-x6 rounded-r3 bg-bg-layer-basement px-x6 py-x10 text-center text-t4 text-fg-neutral-muted">
          찾는 아이콘이 없습니다. 다른 낱말로 찾아 보거나, 없으면 Iconography의 &ldquo;새 아이콘 추가&rdquo; 순서대로
          등록합니다.
        </p>
      ) : (
        <ul className="mt-x4 grid grid-cols-5 gap-x3 lg:grid-cols-4 md:grid-cols-2">
          {shown.map((entry) => (
            <li key={entry.name}>
              <button
                type="button"
                onClick={() => copy(entry)}
                title={entry.ko.join(", ")}
                className={`flex w-full flex-col items-center gap-x3 rounded-r3 border px-x2 py-x5 hover:border-stroke-brand-solid ${
                  copied === entry.name ? "border-stroke-brand-solid bg-bg-brand-weak" : "border-stroke-neutral-muted"
                }`}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-icon-xl text-fg-neutral">
                  <path d={entry.d} />
                </svg>
                <span className="break-all text-center text-t2 text-fg-neutral-muted">{entry.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
