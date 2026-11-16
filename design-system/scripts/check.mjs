import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { loadTokens } from "../lib/tokens.mjs";
import { DOC_PATH, renderTokenTables, injectTables } from "./build-docs.mjs";

const read = (path) => (existsSync(path) ? readFileSync(path, "utf8") : null);

// 원본(tokens.json)에서 만들어지는 파일마다 한 항목. isFresh 가 false 면 fix 명령을 다시 돌려야 한다.
export const checks = [
  {
    name: "DESIGN.md",
    fix: "npm run tokens:docs",
    isFresh() {
      const doc = read(DOC_PATH);
      return doc !== null && doc === injectTables(doc, renderTokenTables(loadTokens()));
    },
  },
];

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const stale = checks.filter((c) => !c.isFresh());
  for (const c of stale) console.error(`${c.name} is out of date. Run: ${c.fix}`);
  if (stale.length) process.exit(1);
  console.log("tokens: all generated files are up to date");
}
