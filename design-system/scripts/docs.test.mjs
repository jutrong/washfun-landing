import { test } from "node:test";
import assert from "node:assert/strict";
import { loadTokens } from "../lib/tokens.mjs";
import { renderTokenTables, injectTables } from "./build-docs.mjs";

const tables = renderTokenTables(loadTokens());

test("역할 표에 참조와 값이 함께 나온다", () =>
  assert.match(tables, /\| `color\.bg\.brand-solid` \| `color\.palette\.blue-600` \| `#1C74BC` \|/));
test("환경별 표는 세 환경을 나란히 보여 준다", () =>
  assert.match(tables, /\| `font-size\.t5` \| 16px \| 16px \| 28px \|/));
test("표시 구간 밖은 그대로 둔다", () => {
  const doc = "앞\n<!-- tokens:start -->\n옛 표\n<!-- tokens:end -->\n뒤\n";
  const out = injectTables(doc, "새 표");
  assert.equal(out, "앞\n<!-- tokens:start -->\n새 표\n<!-- tokens:end -->\n뒤\n");
});
test("두 번 돌려도 결과가 같다", () => {
  const doc = "<!-- tokens:start -->\n<!-- tokens:end -->\n";
  assert.equal(injectTables(injectTables(doc, tables), tables), injectTables(doc, tables));
});
test("표시가 없으면 덮어쓰지 않고 오류", () =>
  assert.throws(() => injectTables("표시 없음", tables), /missing the tokens:start \/ tokens:end markers/));
