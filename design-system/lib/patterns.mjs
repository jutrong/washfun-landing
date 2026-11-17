import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// 문서 페이지(Next)도 이 파일을 쓰므로 저장소 루트에서 찾는다. 테스트와 빌드는 루트에서 돈다.
const DIR = join(process.cwd(), "design-system", "patterns");

/** design-system/patterns/*.json 을 order 순서로 돌려준다. */
export function loadPatterns(dir = DIR) {
  return readdirSync(dir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => JSON.parse(readFileSync(join(dir, file), "utf8")))
    .sort((a, b) => (a.order ?? 50) - (b.order ?? 50) || a.key.localeCompare(b.key));
}
