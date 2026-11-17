"use client";

import type { ReactNode } from "react";
import error from "./patterns/error";

/** 패턴 키 → 견본. thumb 이 참이면 목록 카드에 들어갈 만큼만 그린다. */
export const PATTERN_DEMOS: Record<string, (thumb: boolean) => ReactNode> = {
  error: error,
};
