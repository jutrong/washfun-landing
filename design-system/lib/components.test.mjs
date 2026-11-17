import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { loadTokens, flattenTokens, ENVIRONMENTS } from "./tokens.mjs";
import { contrastRatio } from "./contrast.mjs";
import { loadComponents, tokenRefs, resolveRef, CATEGORIES } from "./components.mjs";

const components = loadComponents();
const flat = new Map(flattenTokens(loadTokens()).map((token) => [token.path, token.value]));
const root = (path) => fileURLToPath(new URL(`../../${path}`, import.meta.url));
const px = (ref, env) => parseFloat(resolveRef(flat, ref, env));

test("컴포넌트가 하나 이상 있고 키가 겹치지 않는다", () => {
  assert.ok(components.length >= 1);
  assert.equal(new Set(components.map((component) => component.key)).size, components.length);
});

for (const component of components) {
  const at = (message) => `${component.key}: ${message}`;

  test(at("기본 정보와 모든 구간이 채워져 있다"), () => {
    assert.match(component.key, /^[a-z]+(-[a-z]+)*$/);
    assert.ok(component.title && component.ko && component.lead);
    assert.ok(CATEGORIES.some((category) => category.key === component.category), component.category);
    for (const section of ["when", "avoid", "anatomy", "variants", "sizes", "states", "behavior", "accessibility", "writing", "props"])
      assert.ok(Array.isArray(component[section]) && component[section].length >= 1, at(section));
    for (const env of ENVIRONMENTS) assert.ok(component.implementation[env]?.length >= 2, at(`implementation.${env}`));
  });

  test(at("명세가 가리키는 토큰이 모두 있다"), () => {
    const refs = tokenRefs(component);
    assert.ok(refs.length >= 5, at("토큰을 다섯 개 이상 가리켜야 한다"));
    for (const { ref, env } of refs)
      for (const target of env ? [env] : ENVIRONMENTS) assert.ok(resolveRef(flat, ref, target) !== undefined, at(`${ref} (${target})`));
  });

  test(at("변형마다 글자와 면의 대비가 4.5:1 이상이다"), () => {
    for (const variant of component.variants) {
      if (!variant.tokens?.fg || !variant.tokens?.bg) continue;
      const ratio = contrastRatio(flat.get(variant.tokens.fg), flat.get(variant.tokens.bg));
      assert.ok(ratio >= 4.5, at(`${variant.name} ${ratio}:1`));
    }
  });

  test(at("누르는 컴포넌트의 기본 크기는 환경마다 누르는 영역 이상이다"), () => {
    if (!component.interactive) return;
    const base = component.sizes.find((size) => size.default) ?? component.sizes[0];
    for (const env of ENVIRONMENTS) {
      assert.ok(base.env[env]?.height, at(`${base.name}.${env}.height`));
      assert.ok(px(base.env[env].height, env) >= px("touch-target.min", env), at(`${base.name} ${env}`));
    }
  });

  test(at("웹 기준 구현은 토큰 클래스만 쓰고, 앱 예시는 tokens 에서 값을 가져온다"), () => {
    const web = root(`src/components/design-system/reference/${component.file}.tsx`);
    const app = root(`design-system/components/${component.key}.app.txt`);
    assert.ok(existsSync(web), web);
    assert.ok(existsSync(app), app);
    const source = readFileSync(web, "utf8");
    assert.doesNotMatch(source, /#[0-9a-fA-F]{3,8}\b/, at("색 값을 직접 쓰지 않는다"));
    assert.doesNotMatch(source, /\b(text|rounded|p[xytblr]?|m[xytblr]?|gap|h|min-h|size|duration)-\[/, at("임의 값 클래스를 쓰지 않는다"));
    const snippet = readFileSync(app, "utf8");
    assert.match(snippet, /tokens\./, at("앱 예시"));
    assert.doesNotMatch(snippet, /#[0-9a-fA-F]{3,8}\b/, at("앱 예시에 색 값을 직접 쓰지 않는다"));
  });

  test(at("문서 페이지에 보여 줄 견본이 등록돼 있다"), () => {
    const demos = readFileSync(root("src/components/design-system/reference/demos.tsx"), "utf8");
    assert.match(demos, new RegExp(`["']?${component.key}["']?:`), at("demos.tsx"));
  });
}
