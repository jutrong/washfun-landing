import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { ENVIRONMENTS } from "./tokens.mjs";
import { loadComponents } from "./components.mjs";
import { loadPatterns } from "./patterns.mjs";
import { findIssues, loadWriting } from "./writing.mjs";

const patterns = loadPatterns();
const componentKeys = loadComponents().map((component) => component.key);
const writing = loadWriting();
const root = (path) => fileURLToPath(new URL(`../../${path}`, import.meta.url));

test("패턴이 하나 이상 있고 키가 겹치지 않는다", () => {
  assert.ok(patterns.length >= 1);
  assert.equal(new Set(patterns.map((pattern) => pattern.key)).size, patterns.length);
});

for (const pattern of patterns) {
  const at = (message) => `${pattern.key}: ${message}`;

  test(at("기본 정보와 모든 구간이 채워져 있다"), () => {
    assert.match(pattern.key, /^[a-z]+(-[a-z]+)*$/);
    assert.ok(pattern.title && pattern.ko && pattern.lead && pattern.problem);
    for (const section of ["when", "flow", "rules", "copy", "accessibility", "avoid", "components"])
      assert.ok(Array.isArray(pattern[section]) && pattern[section].length >= 2, at(section));
    for (const step of pattern.flow) assert.ok(step.title && step.body, at("flow"));
    for (const group of pattern.rules) assert.ok(group.title && group.items.length >= 2, at(`rules.${group.title}`));
    for (const env of ENVIRONMENTS) assert.ok(pattern.env[env]?.length >= 2, at(`env.${env}`));
    if (pattern.choose) for (const row of pattern.choose.rows) assert.equal(row.length, pattern.choose.head.length, at("choose"));
  });

  test(at("쓰는 부품은 모두 Components 에 있다"), () => {
    for (const key of pattern.components) assert.ok(componentKeys.includes(key), at(key));
  });

  test(at("문구 예시는 Writing 규칙을 지킨다"), () => {
    assert.ok(pattern.copy.length >= 3);
    for (const copy of pattern.copy) {
      assert.ok(ENVIRONMENTS.includes(copy.env) && copy.where, at(copy.text));
      assert.deepEqual(findIssues(copy.text, copy.env, writing), [], at(copy.text));
    }
  });

  test(at("견본이 있고 등록돼 있다"), () => {
    const demo = root(`src/components/design-system/reference/patterns/${pattern.key}.tsx`);
    assert.ok(existsSync(demo), demo);
    assert.doesNotMatch(readFileSync(demo, "utf8"), /#[0-9a-fA-F]{3,8}\b/, at("색 값을 직접 쓰지 않는다"));
    const registry = readFileSync(root("src/components/design-system/reference/pattern-demos.tsx"), "utf8");
    assert.match(registry, new RegExp(`["']${pattern.key}["']:|\\b${pattern.key}:`), at("pattern-demos.tsx"));
  });
}
