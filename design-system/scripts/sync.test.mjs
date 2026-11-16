import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createRequire } from "node:module";
import { loadTokens, resolveTokens } from "../lib/tokens.mjs";
import { toTailwindPreset, toTsObject } from "../sync/convert.mjs";

const tree = loadTokens();
const dir = mkdtempSync(join(tmpdir(), "tokens-"));
const cli = new URL("../sync/sync-tokens.mjs", import.meta.url).pathname;
const src = new URL("../tokens.json", import.meta.url).pathname;
const loadPreset = (text) => {
  const f = join(dir, `p-${Math.random()}.cjs`);
  writeFileSync(f, text);
  return createRequire(import.meta.url)(f).theme.extend;
};

test("preset: 색은 fg/bg/stroke/palette 아래에 풀린 값으로 들어간다", () => {
  const t = loadPreset(toTailwindPreset(tree, "web"));
  assert.deepEqual(Object.keys(t.colors).sort(), ["bg", "fg", "palette", "stroke"]);
  assert.equal(t.colors.bg["brand-solid"], "#1C74BC");
  assert.equal(t.colors.fg["neutral-muted"], "#6B7280");
  assert.equal(t.spacing.x4, "16px");
  assert.equal(t.boxShadow.s1, "0 2px 8px rgba(21,23,26,0.05)");
});
test("preset: 환경에 따라 글자 크기와 모서리가 다르다", () => {
  assert.deepEqual(loadPreset(toTailwindPreset(tree, "web")).fontSize.t5, ["16px", { lineHeight: "1.5" }]);
  assert.deepEqual(loadPreset(toTailwindPreset(tree, "kiosk")).fontSize.t5, ["28px", { lineHeight: "1.5" }]);
  assert.equal(loadPreset(toTailwindPreset(tree, "kiosk")).borderRadius.r6, "30px");
});
test("preset: 풀린 색 값이 lib 구현과 같다", () => {
  const t = loadPreset(toTailwindPreset(tree, "web"));
  const r = resolveTokens(tree).color;
  for (const group of ["fg", "bg", "stroke", "palette"])
    for (const [k, v] of Object.entries(r[group])) assert.equal(t.colors[group][k], v.$value, `${group}.${k}`);
});
test("ts: camelCase 이름과 단위 없는 숫자", () => {
  const out = toTsObject(tree, "app");
  assert.match(out, /^\/\/ Generated from washfun design tokens v\d+\.\d+\.\d+\. Do not edit\./);
  assert.match(out, /neutralMuted: "#6B7280"/);
  assert.match(out, /gray00: "#FFFFFF"/);
  assert.match(out, /x4: 16,/);
  assert.match(out, /as const;\s*$/);
});
test("모르는 환경은 오류", () => assert.throws(() => toTailwindPreset(tree, "tv"), /Unknown env: tv/));
test("CLI: 파일 경로에서 읽어 결과를 쓴다", () => {
  const out = join(dir, "preset.cjs");
  execFileSync("node", [cli, "--source", src, "--format", "tailwind", "--env", "web", "--out", out]);
  assert.equal(readFileSync(out, "utf8"), toTailwindPreset(tree, "web"));
});
test("CLI: 원본을 못 읽으면 기존 파일을 건드리지 않고 실패", () => {
  const out = join(dir, "keep.ts");
  writeFileSync(out, "기존 내용");
  const r = spawnSync("node", [cli, "--source", join(dir, "없는파일.json"), "--format", "ts", "--env", "app", "--out", out]);
  assert.notEqual(r.status, 0);
  assert.equal(readFileSync(out, "utf8"), "기존 내용");
});
test("CLI: JSON이 아닌 원본도 같은 방식으로 실패", () => {
  const bad = join(dir, "bad.json");
  writeFileSync(bad, "<html>404</html>");
  const out = join(dir, "never.ts");
  const r = spawnSync("node", [cli, "--source", bad, "--format", "ts", "--env", "app", "--out", out]);
  assert.notEqual(r.status, 0);
  assert.equal(existsSync(out), false);
});
test("CLI: 필수 인자가 빠지면 사용법을 출력하고 실패", () => {
  const r = spawnSync("node", [cli, "--format", "ts"]);
  assert.notEqual(r.status, 0);
  assert.match(String(r.stderr), /Usage: node sync-tokens\.mjs/);
});
test("글자 크기에 짝이 되는 줄 높이가 없으면 undefined 를 쓰지 않고 오류", () => {
  const bad = structuredClone(tree);
  delete bad.env.web["line-height"].t5;
  assert.throws(() => toTailwindPreset(bad, "web"), /Missing token: env\.web\.line-height\.t5/);
});
test("괄호가 깨진 참조는 값으로 내보내지 않고 오류", () => {
  const bad = structuredClone(tree);
  bad.color.fg.brand.$value = "{color.palette.blue-600";
  assert.throws(() => toTailwindPreset(bad, "web"), /Unresolved token reference: \{color\.palette\.blue-600 at color\.fg\.brand/);
  assert.throws(() => toTsObject(bad, "app"), /Unresolved token reference/);
});
