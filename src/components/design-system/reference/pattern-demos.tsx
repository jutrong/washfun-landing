"use client";

import type { ReactNode } from "react";
import emptyState from "./patterns/empty-state";
import error from "./patterns/error";
import form from "./patterns/form";
import kioskFlow from "./patterns/kiosk-flow";
import loading from "./patterns/loading";
import payment from "./patterns/payment";

/** 패턴 키 → 견본. thumb 이 참이면 목록 카드에 들어갈 만큼만 그린다. */
export const PATTERN_DEMOS: Record<string, (thumb: boolean) => ReactNode> = {
  error: error,
  form: form,
  loading: loading,
  "empty-state": emptyState,
  payment: payment,
  "kiosk-flow": kioskFlow,
};
