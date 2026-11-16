import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const dir = fileURLToPath(new URL("../icons/", import.meta.url));
const files = readdirSync(dir).filter((f) => f.endsWith(".svg"));
const read = (f) => readFileSync(`${dir}${f}`, "utf8");

test("아이콘이 한 개 이상 있다", () => assert.ok(files.length > 0));
test("이름은 모양-변형(line|fill) 규칙을 따른다", () => {
  for (const f of files) assert.match(f, /^[a-z0-9]+(-[a-z0-9]+)*-(line|fill)\.svg$/, f);
});
test("모든 아이콘은 24 격자에 그린다", () => {
  for (const f of files) assert.match(read(f), /<svg[^>]*viewBox="0 0 24 24"/, f);
});
test("색은 currentColor 만 쓴다", () => {
  for (const f of files) {
    const svg = read(f);
    assert.match(svg, /fill="currentColor"/, f);
    assert.doesNotMatch(svg, /#[0-9a-fA-F]{3,8}\b|stroke=|rgb\(/, f);
  }
});
test("크기는 쓰는 곳에서 정하도록 width / height 를 넣지 않는다", () => {
  for (const f of files) assert.doesNotMatch(read(f), /<svg[^>]*\s(width|height)=/, f);
});
