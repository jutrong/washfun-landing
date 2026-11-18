import { loadPatterns } from "../../../design-system/lib/patterns.mjs";

type EnvName = "web" | "app" | "kiosk";

export type PatternSpec = {
  key: string;
  title: string;
  ko: string;
  order?: number;
  lead: string;
  /** 이 패턴이 푸는 문제 */
  problem: string;
  when: string[];
  /** 함께 쓰는 부품의 키 */
  components: string[];
  choose?: { title?: string; head: string[]; rows: string[][] };
  flow: { title: string; body: string }[];
  rules: { title: string; items: string[] }[];
  env: Record<EnvName, string[]>;
  copy: { env: EnvName; where: string; text: string }[];
  accessibility: string[];
  avoid: string[];
};

/** 서버 컴포넌트에서만 쓴다. */
export const patterns = (): PatternSpec[] => loadPatterns();

export const pattern = (key: string) => patterns().find((item) => item.key === key);
