"use client";

import { PATTERN_DEMOS } from "./pattern-demos";

/** 패턴 문서에 보여 줄 견본. thumb 은 목록 카드에 넣는 작은 견본이다. */
export default function PatternDemo({ name, thumb = false }: { name: string; thumb?: boolean }) {
  const render = PATTERN_DEMOS[name];
  return render ? <>{render(thumb)}</> : null;
}
