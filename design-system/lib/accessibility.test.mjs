import { test } from "node:test";
import assert from "node:assert/strict";
import { loadTokens, flattenTokens, ENVIRONMENTS } from "./tokens.mjs";
import { loadAccessibility, contrastRatio, checkPairs } from "./accessibility.mjs";

const a11y = loadAccessibility();
const flat = flattenTokens(loadTokens());
const px = (path) => parseFloat(flat.find((token) => token.path === path).value);
const results = checkPairs();

test("명도 대비를 WCAG 식으로 계산한다", () => {
  assert.equal(contrastRatio("#000000", "#FFFFFF"), 21);
  assert.equal(contrastRatio("#FFFFFF", "#FFFFFF"), 1);
  assert.equal(contrastRatio("#1C74BC", "#FFFFFF"), contrastRatio("#FFFFFF", "#1C74BC"));
  assert.ok(Math.abs(contrastRatio("#1C74BC", "#FFFFFF") - 4.91) < 0.05);
});
test("기준은 글자 4.5:1, 그림 3:1", () => assert.deepEqual(a11y.contrast, { text: 4.5, graphic: 3 }));
test("검사하는 색 짝은 모두 있는 토큰이고 쓰임새를 밝힌다", () => {
  assert.ok(a11y.pairs.length >= 15);
  for (const pair of a11y.pairs) {
    for (const path of [pair.fg, pair.bg]) assert.ok(flat.some((token) => token.path === path), path);
    assert.match(pair.kind, /^(text|graphic)$/);
    assert.ok(pair.use, pair.fg);
  }
});
test("기본 글자와 주요 버튼은 대비 기준을 지킨다", () => {
  const find = (fg, bg) => results.find((result) => result.fg === fg && result.bg === bg);
  assert.equal(find("color.fg.neutral", "color.bg.layer-default").pass, true);
  assert.equal(find("color.fg.neutral-muted", "color.bg.layer-default").pass, true);
  assert.equal(find("color.fg.on-brand-solid", "color.bg.brand-solid").pass, true);
});
test("기준에 못 미치는 짝은 알려진 문제로 적혀 있고, 그 밖의 짝은 모두 지킨다", () => {
  for (const result of results) {
    if (result.known) assert.equal(result.pass, false, `${result.fg} / ${result.bg} 는 이제 기준을 지킨다. known 을 지운다`);
    else assert.equal(result.pass, true, `${result.fg} / ${result.bg} ${result.ratio}:1 < ${result.required}:1`);
  }
});
test("본문 글자 크기와 줄 높이, 누르는 영역은 어느 환경에서나 최소값 이상이다", () => {
  for (const env of ENVIRONMENTS) {
    assert.ok(px(`env.${env}.font-size.t5`) >= a11y.minimum["body-font-size"], env);
    assert.ok(px(`env.${env}.line-height.t5`) >= a11y.minimum["body-line-height"], env);
    assert.ok(px(`env.${env}.touch-target.min`) >= a11y.minimum["touch-target"], env);
  }
});
test("지침마다 규칙이 있다", () => {
  assert.ok(a11y.principles.length >= 3);
  for (const guide of [...a11y.guides, a11y.kiosk]) assert.ok(guide.title && guide.rules.length >= 2, guide.key);
});
test("상태 색 글자와 강조 면 위의 글자는 알려진 문제 없이 기준을 지킨다", () => {
  const status = results.filter((result) => /critical|warning|positive|informative/.test(result.fg + result.bg));
  assert.equal(status.length, 12);
  for (const result of status) assert.equal(result.known, undefined, `${result.fg} / ${result.bg}`);
  assert.ok(results.some((result) => result.fg === "color.fg.on-warning-solid" && result.bg === "color.bg.warning-solid"));
});
