import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { loadTokens, flattenTokens, ENVIRONMENTS } from "../lib/tokens.mjs";

export const DOC_PATH = fileURLToPath(new URL("../../DESIGN.md", import.meta.url));
const START = "<!-- tokens:start -->";
const END = "<!-- tokens:end -->";

const code = (s) => `\`${s}\``;
const table = (head, rows) =>
  [`| ${head.join(" | ")} |`, `| ${head.map(() => "---").join(" | ")} |`, ...rows.map((r) => `| ${r.join(" | ")} |`)].join("\n");

export function renderTokenTables(tree) {
  const flat = flattenTokens(tree);
  const under = (prefix) => flat.filter((t) => t.path.startsWith(prefix));
  const plain = (title, prefix) =>
    `### ${title}\n\n${table(["이름", "값"], under(prefix).map((t) => [code(t.path), t.ref ? `${code(t.ref)} → ${t.value}` : t.value]))}`;

  const sections = [
    `버전 ${tree.version}`,
    `### 역할 색\n\n${table(
      ["이름", "참조", "값", "뜻"],
      ["color.fg.", "color.bg.", "color.stroke."].flatMap((p) =>
        under(p).map((t) => [code(t.path), code(t.ref), code(t.value), t.description ?? ""]),
      ),
    )}`,
    `### 팔레트\n\n${table(["이름", "값"], under("color.palette.").map((t) => [code(t.path), code(t.value)]))}`,
    plain("크기 단위", "dimension."),
    plain("글자 굵기", "font-weight."),
    plain("그림자", "shadow."),
    plain("그라디언트", "gradient."),
  ];

  // 환경별 값은 이름을 한 번만 쓰고 web / app / kiosk 값을 나란히 둔다.
  const [firstEnv] = ENVIRONMENTS;
  const names = under(`env.${firstEnv}.`).map((t) => t.path.replace(`env.${firstEnv}.`, ""));
  const valueOf = (env, name) => flat.find((t) => t.path === `env.${env}.${name}`)?.value ?? "";
  for (const [title, group] of [["글자 크기", "font-size."], ["줄 높이", "line-height."], ["모서리", "radius."], ["아이콘 크기", "icon-size."], ["누르는 영역", "touch-target."]]) {
    sections.push(
      `### ${title} (환경별)\n\n${table(
        ["이름", ...ENVIRONMENTS],
        names.filter((n) => n.startsWith(group)).map((n) => [code(n), ...ENVIRONMENTS.map((e) => valueOf(e, n))]),
      )}`,
    );
  }
  return sections.join("\n\n");
}

export function injectTables(doc, tables) {
  const start = doc.indexOf(START);
  const end = doc.indexOf(END);
  if (start === -1 || end === -1 || end < start) {
    throw new Error("DESIGN.md is missing the tokens:start / tokens:end markers");
  }
  return `${doc.slice(0, start + START.length)}\n${tables}\n${doc.slice(end)}`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const doc = readFileSync(DOC_PATH, "utf8");
  writeFileSync(DOC_PATH, injectTables(doc, renderTokenTables(loadTokens())));
  console.log(`tokens v${loadTokens().version} → DESIGN.md`);
}
