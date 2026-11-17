import { test } from "node:test";
import assert from "node:assert/strict";
import { ENVIRONMENTS } from "./tokens.mjs";
import { loadWriting, findIssues } from "./writing.mjs";

const writing = loadWriting();
const rules = (text, env = "app") => findIssues(text, env, writing).map((issue) => issue.rule);

test("원칙, 말투, 용어, 표기, 문구 종류가 모두 있다", () => {
  assert.ok(writing.principles.length >= 3);
  for (const env of ENVIRONMENTS) assert.match(writing.voice[env].style, /^(해요체|합쇼체)$/, env);
  assert.ok(writing.terms.length >= 5);
  assert.ok(writing.formats.length >= 4);
  assert.ok(writing.patterns.length >= 4);
});
test("용어는 쓰는 말과 피하는 말이 겹치지 않고, 피하는 말은 한 용어에만 속한다", () => {
  const seen = new Set();
  for (const term of writing.terms) {
    assert.ok(term.use && term.meaning, JSON.stringify(term));
    for (const word of term.avoid) {
      assert.notEqual(word, term.use);
      assert.ok(!seen.has(word), `${word} 가 두 번 나온다`);
      seen.add(word);
    }
  }
});
test("문구 종류마다 규칙과 예시가 있고, 예시는 환경과 출처를 밝힌다", () => {
  for (const pattern of writing.patterns) {
    assert.ok(pattern.rules.length >= 2, pattern.key);
    assert.ok(pattern.examples.length >= 1, pattern.key);
    for (const example of pattern.examples) {
      assert.ok(ENVIRONMENTS.includes(example.env), example.do);
      assert.ok(example.dont && example.do && example.why, example.do);
      assert.notEqual(example.dont, example.do);
    }
  }
});
test("권하는 예시는 이 가이드의 규칙을 스스로 지킨다", () => {
  for (const pattern of writing.patterns)
    for (const example of pattern.examples) assert.deepEqual(findIssues(example.do, example.env, writing), [], example.do);
  for (const env of ENVIRONMENTS) assert.deepEqual(findIssues(writing.voice[env].example, env, writing), [], env);
  for (const format of writing.formats) assert.deepEqual(rules(format.do), [], format.do);
});
test("피하는 말을 찾아 쓰는 말을 알려 준다", () => {
  const [issue] = findIssues("잠시후 다시 시도해주세요", "app", writing);
  assert.equal(issue.rule, "term");
  assert.equal(issue.found, "잠시후");
  assert.equal(issue.suggest, "잠시 후");
});
test("제품 이름 속의 말은 피하는 말로 세지 않는다", () => assert.deepEqual(rules("워시펀 앱에서 세차를 시작해요"), []));
test("금액은 쉼표를 넣고 원을 붙여 쓴다", () => {
  assert.deepEqual(rules("10000원을 결제했어요"), ["amount"]);
  assert.deepEqual(rules("10,000 원을 결제했어요"), ["amount"]);
  assert.deepEqual(rules("10,000원을 결제했어요"), []);
  assert.deepEqual(rules("한 번에 500만 원까지 충전할 수 있어요"), []);
});
test("느낌표와 말줄임표를 찾는다", () => {
  assert.deepEqual(rules("즐거운 세차 되세요!"), ["punctuation"]);
  assert.deepEqual(rules("다시 시도해주세요..."), ["punctuation"]);
});
test("말투는 환경을 따른다", () => {
  assert.deepEqual(rules("결제에 실패했습니다.", "kiosk"), ["voice"]);
  assert.deepEqual(rules("결제하지 못했어요", "kiosk"), []);
  assert.deepEqual(rules("정산 내역이 없어요", "web"), ["voice"]);
  assert.deepEqual(rules("정산 내역이 없습니다.", "web"), []);
  assert.deepEqual(rules("다시 시도해주세요", "web"), []);
});
