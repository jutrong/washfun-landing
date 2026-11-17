import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { loadTokens, flattenTokens } from "./tokens.mjs";
import { checkPairsWith } from "./contrast.mjs";

export { contrastRatio } from "./contrast.mjs";

const DEFAULT_PATH = fileURLToPath(new URL("../accessibility.json", import.meta.url));

export function loadAccessibility(path = DEFAULT_PATH) {
  return JSON.parse(readFileSync(path, "utf8"));
}

/** tokens.json 의 지금 값으로 색 짝을 검사한다. */
export function checkPairs(a11y = loadAccessibility(), tree = loadTokens()) {
  const values = new Map(flattenTokens(tree).map((token) => [token.path, token.value]));
  return checkPairsWith(a11y, (path) => values.get(path));
}
