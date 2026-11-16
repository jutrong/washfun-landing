import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

export const ENVIRONMENTS = ["web", "app", "kiosk"];

const DEFAULT_PATH = fileURLToPath(new URL("../tokens.json", import.meta.url));
const REF = /^\{([^}]+)\}$/;

const isLeaf = (node) => node !== null && typeof node === "object" && "$value" in node;
const isGroup = (node) => node !== null && typeof node === "object" && !isLeaf(node);

export function loadTokens(path = DEFAULT_PATH) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function lookup(tree, path) {
  let node = tree;
  for (const key of path.split(".")) {
    if (!isGroup(node) || !(key in node)) return undefined;
    node = node[key];
  }
  return isLeaf(node) ? node : undefined;
}

// 참조를 끝까지 따라가 실제 값을 돌려준다. 없는 토큰이나 순환이면 처음 경로를 담아 던진다.
function resolveValue(tree, value, at) {
  const seen = new Set();
  let current = value;
  while (typeof current === "string" && REF.test(current)) {
    const target = current.match(REF)[1];
    const leaf = lookup(tree, target);
    if (!leaf || seen.has(target)) {
      throw new Error(`Unresolved token reference: ${value} at ${at}`);
    }
    seen.add(target);
    current = leaf.$value;
  }
  return current;
}

function walk(node, path, visit) {
  for (const [key, child] of Object.entries(node)) {
    const childPath = path ? `${path}.${key}` : key;
    if (isLeaf(child)) visit(childPath, child);
    else if (isGroup(child)) walk(child, childPath, visit);
  }
}

export function resolveTokens(tree) {
  const out = structuredClone(tree);
  walk(out, "", (path, leaf) => {
    leaf.$value = resolveValue(tree, leaf.$value, path);
  });
  return out;
}

export function flattenTokens(tree) {
  const list = [];
  walk(tree, "", (path, leaf) => {
    const raw = leaf.$value;
    const ref = typeof raw === "string" && REF.test(raw) ? raw.match(REF)[1] : null;
    list.push({
      path,
      value: String(resolveValue(tree, raw, path)),
      ref,
      description: leaf.$description ?? null,
    });
  });
  return list;
}
