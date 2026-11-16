import raw from "../../../design-system/tokens.json";

type Stop = { color: string; position: number };
export type Leaf = { $value: string | number | Stop[]; $type?: string; $description?: string };
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

function resolve(value: Leaf["$value"]): string {
  if (Array.isArray(value)) return stopList(value);
  let current = value;
  for (let depth = 0; depth < 10; depth += 1) {
    const match = typeof current === "string" ? current.match(REF) : null;
    if (!match) return String(current);
    const next = find(match[1]);
    if (!next) return String(current);
    if (Array.isArray(next.$value)) return stopList(next.$value);
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

const stopList = (stops: Stop[]) =>
  stops.map((stop) => `${resolve(stop.color)} ${Math.round(stop.position * 10000) / 100}%`).join(", ");

export type Gradient = {
  path: string;
  name: string;
  /** CSS 그라디언트에 그대로 넣는 색 지점. 예: "#1C74BC 0%, #3397D7 100%" */
  stops: string;
  /** 색 지점이 가리키는 팔레트 이름과 위치 */
  refs: string[];
  description: string | null;
};

export function gradients(): Gradient[] {
  return Object.entries(raw.gradient as Record<string, Leaf>).map(([name, leaf]) => {
    const stops = leaf.$value as Stop[];
    return {
      path: `gradient.${name}`,
      name,
      stops: stopList(stops),
      refs: stops.map(
        (stop) => `${stop.color.replace(/^\{color\.palette\.|\}$/g, "")} ${Math.round(stop.position * 10000) / 100}%`,
      ),
      description: leaf.$description ?? null,
    };
  });
}
