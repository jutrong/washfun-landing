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
  // 그라디언트는 색 지점의 목록이다. 지점마다 색 참조를 푼다.
  if (Array.isArray(value)) {
    return value.map((stop) => ({ ...stop, color: resolveValue(tree, stop.color, at) }));
  }
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
  if (typeof current === "string" && /[{}]/.test(current)) {
    throw new Error(`Unresolved token reference: ${value} at ${at}`);
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

/** 색 지점 목록을 CSS 그라디언트에 그대로 넣을 수 있는 문자열로 만든다. 예: "#1C74BC 0%, #3397D7 100%" */
export function formatStops(stops) {
  return stops.map((stop) => `${stop.color} ${Math.round(stop.position * 10000) / 100}%`).join(", ");
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
    const value = resolveValue(tree, raw, path);
    list.push({
      path,
      value: Array.isArray(value) ? formatStops(value) : String(value),
      ref,
      description: leaf.$description ?? null,
    });
  });
  return list;
}
