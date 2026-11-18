import { CATEGORIES, loadComponents } from "../../../design-system/lib/components.mjs";

type EnvName = "web" | "app" | "kiosk";

export type ComponentSpec = {
  key: string;
  /** 기준 구현 파일 이름. 예: Button */
  file: string;
  title: string;
  ko: string;
  category: string;
  order?: number;
  interactive?: boolean;
  lead: string;
  when: string[];
  avoid: string[];
  anatomy: { part: string; ko: string; note: string }[];
  variants: { name: string; use: string; tokens?: Record<string, string | null> }[];
  sizes: { name: string; use: string; default?: boolean; env: Record<EnvName, Record<string, string>> }[];
  states: { name: string; change: string; tokens?: string[] }[];
  motion?: { what: string; duration?: string; easing?: string }[];
  behavior: string[];
  accessibility: string[];
  writing: string[];
  props: { name: string; type: string; default?: string; note: string }[];
  implementation: Record<EnvName, string[]>;
};

export const categories: { key: string; title: string; ko: string }[] = CATEGORIES;

/** 서버 컴포넌트에서만 쓴다. */
export const components = (): ComponentSpec[] => loadComponents();

export const component = (key: string) => components().find((item) => item.key === key);
