import raw from "../../../design-system/tokens.json";

export type Leaf = { $value: string | number; $type?: string; $description?: string };
type Group = { [key: string]: Leaf | Group };

export const tokens = raw;
export const ENVIRONMENTS = ["web", "app", "kiosk"] as const;

const REF = /^\{([^}]+)\}$/;
const isLeaf = (node: unknown): node is Leaf =>
  typeof node === "object" && node !== null && "$value" in node;

function find(path: string): Leaf | undefined {
  let node: unknown = raw;
  for (const key of path.split(".")) {
    if (typeof node !== "object" || node === null) return undefined;
    node = (node as Record<string, unknown>)[key];
  }
  return isLeaf(node) ? node : undefined;
}

export type Token = {
  /** 예: color.bg.brand-solid */
  path: string;
  name: string;
  value: string;
  /** 다른 토큰을 가리키면 그 경로 */
  ref: string | null;
  description: string | null;
};

function resolve(value: string | number): string {
  let current = value;
  for (let depth = 0; depth < 10; depth += 1) {
    const match = typeof current === "string" ? current.match(REF) : null;
    if (!match) return String(current);
    const next = find(match[1]);
    if (!next) return String(current);
    current = next.$value;
  }
  return String(current);
}

/** 그룹 바로 아래의 토큰만 순서대로 돌려준다. */
export function list(path: string): Token[] {
  let node: unknown = raw;
  for (const key of path.split(".")) node = (node as Group)?.[key];
  if (typeof node !== "object" || node === null) return [];
  return Object.entries(node as Group)
    .filter((entry): entry is [string, Leaf] => isLeaf(entry[1]))
    .map(([name, leaf]) => {
      const match = typeof leaf.$value === "string" ? leaf.$value.match(REF) : null;
      return {
        path: `${path}.${name}`,
        name,
        value: resolve(leaf.$value),
        ref: match ? match[1] : null,
        description: leaf.$description ?? null,
      };
    });
}
