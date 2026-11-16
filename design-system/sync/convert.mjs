// 워시펀 디자인 토큰(tokens.json)을 제품별 형식으로 바꾼다.
// 이 폴더(sync/)는 다른 제품 저장소로 통째로 복사해 쓰므로 폴더 밖의 파일을 import 하지 않는다.

const ENVIRONMENTS = ["web", "app", "kiosk"];
const REF = /^\{([^}]+)\}$/;

const isLeaf = (node) => node !== null && typeof node === "object" && "$value" in node;

function resolve(tree, value, at) {
  const seen = new Set();
  let current = value;
  while (typeof current === "string" && REF.test(current)) {
    const target = current.match(REF)[1];
    const leaf = target.split(".").reduce((node, key) => (node && typeof node === "object" ? node[key] : undefined), tree);
    if (!isLeaf(leaf) || seen.has(target)) throw new Error(`Unresolved token reference: ${value} at ${at}`);
    seen.add(target);
    current = leaf.$value;
  }
  // 괄호가 남아 있으면 참조를 쓰려다 깨진 것이다. 색 값으로 새어 나가지 않게 막는다.
  if (typeof current === "string" && /[{}]/.test(current)) {
    throw new Error(`Unresolved token reference: ${value} at ${at}`);
  }
  return current;
}

// 그룹 하나를 { 이름: 값 } 으로 편다. 하위 그룹은 그대로 중첩해 둔다.
function group(tree, path, mapKey = (k) => k, mapValue = (v) => v) {
  const node = path.split(".").reduce((n, key) => n?.[key], tree);
  if (!node || typeof node !== "object") throw new Error(`Missing token group: ${path}`);
  const out = {};
  for (const [key, child] of Object.entries(node)) {
    const at = `${path}.${key}`;
    out[mapKey(key)] = isLeaf(child) ? mapValue(resolve(tree, child.$value, at)) : group(tree, at, mapKey, mapValue);
  }
  return out;
}

function assertEnv(env) {
  if (!ENVIRONMENTS.includes(env)) throw new Error(`Unknown env: ${env}`);
}

const header = (tree) => `// Generated from washfun design tokens v${tree.version}. Do not edit. Run sync-tokens to update.\n`;

export function toTailwindPreset(tree, env) {
  assertEnv(env);
  const sizes = group(tree, `env.${env}.font-size`);
  const leading = group(tree, `env.${env}.line-height`);
  const fontSize = {};
  for (const [name, size] of Object.entries(sizes)) {
    if (leading[name] === undefined) throw new Error(`Missing token: env.${env}.line-height.${name}`);
    fontSize[name] = [size, { lineHeight: String(leading[name]) }];
  }

  const extend = {
    colors: {
      palette: group(tree, "color.palette"),
      fg: group(tree, "color.fg"),
      bg: group(tree, "color.bg"),
      stroke: group(tree, "color.stroke"),
    },
    spacing: Object.fromEntries(Object.entries(group(tree, "dimension")).filter(([, v]) => typeof v === "string")),
    fontSize,
    borderRadius: group(tree, `env.${env}.radius`),
    boxShadow: group(tree, "shadow"),
  };
  return `${header(tree)}module.exports = ${JSON.stringify({ theme: { extend } }, null, 2)};\n`;
}

const camel = (name) => name.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
const unitless = (value) => (typeof value === "string" && /^-?\d+(\.\d+)?px$/.test(value) ? Number(value.slice(0, -2)) : value);

function serialize(value, indent) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  const pad = "  ".repeat(indent + 1);
  const lines = Object.entries(value).map(([key, child]) => `${pad}${key}: ${serialize(child, indent + 1)},`);
  return `{\n${lines.join("\n")}\n${"  ".repeat(indent)}}`;
}

export function toTsObject(tree, env) {
  assertEnv(env);
  const tokens = {
    color: {
      palette: group(tree, "color.palette", camel),
      fg: group(tree, "color.fg", camel),
      bg: group(tree, "color.bg", camel),
      stroke: group(tree, "color.stroke", camel),
    },
    dimension: group(tree, "dimension", camel, unitless),
    fontFamily: group(tree, "font-family", camel),
    fontWeight: group(tree, "font-weight", camel),
    fontSize: group(tree, `env.${env}.font-size`, camel, unitless),
    lineHeight: group(tree, `env.${env}.line-height`, camel),
    radius: group(tree, `env.${env}.radius`, camel, unitless),
    shadow: group(tree, "shadow", camel),
  };
  return `${header(tree)}export const tokens = ${serialize(tokens, 0)} as const;\n`;
}
