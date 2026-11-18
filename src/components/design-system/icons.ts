import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

export type IconEntry = {
  /** 예: home-line */
  name: string;
  variant: "line" | "fill";
  /** Remix Icon 의 분류. 예: Buildings */
  category: string;
  /** 한글 검색어 */
  ko: string[];
  /** 24 격자에 그린 path 의 d 값 */
  d: string;
};

const DIR = join(process.cwd(), "design-system", "icons");

/** design-system/icons 의 아이콘을 이름 순으로 돌려준다. 서버 컴포넌트에서만 쓴다. */
let cache: IconEntry[] | null = null;

export function icons(): IconEntry[] {
  cache ??= read();
  return cache;
}

function read(): IconEntry[] {
  const meta: Record<string, { category: string; ko: string[] }> = JSON.parse(
    readFileSync(join(DIR, "meta.json"), "utf8"),
  );
  return readdirSync(DIR)
    .filter((file) => file.endsWith(".svg"))
    .sort()
    .map((file) => {
      const name = file.replace(/\.svg$/, "");
      const d = readFileSync(join(DIR, file), "utf8").match(/ d="([^"]+)"/)?.[1] ?? "";
      const entry = meta[name.replace(/-(line|fill)$/, "")];
      return {
        name,
        variant: name.endsWith("-fill") ? "fill" : "line",
        category: entry?.category ?? "",
        ko: entry?.ko ?? [],
        d,
      };
    });
}

export const icon = (name: string) => icons().find((entry) => entry.name === name);
