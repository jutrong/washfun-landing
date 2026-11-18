import { test } from "node:test";
import assert from "node:assert/strict";
import { loadTokens, resolveTokens, flattenTokens, ENVIRONMENTS } from "./tokens.mjs";

const tree = loadTokens();
const resolved = resolveTokens(tree);
const flat = flattenTokens(tree);
const get = (p) => flat.find((t) => t.path === p);

test("version 필드가 있다", () => assert.match(tree.version, /^\d+\.\d+\.\d+$/));
test("대표 색은 #1C74BC", () => {
  assert.equal(resolved.color.palette["blue-600"].$value, "#1C74BC");
  assert.equal(resolved.color.bg["brand-solid"].$value, "#1C74BC");
  assert.equal(resolved.color.fg.brand.$value, "#1C74BC");
});
test("앱 기준 값", () => {
  assert.equal(resolved.color.fg.neutral.$value, "#15171A");
  assert.equal(resolved.color.fg["neutral-muted"].$value, "#6B7280");
  assert.equal(resolved.color.bg["layer-basement"].$value, "#F9F9FA");
  assert.equal(resolved.color.stroke["neutral-weak"].$value, "#E1E3E6");
});
test("상태 색 글자와 강조 면은 대비 기준(4.5:1)을 지키는 단계를 가리킨다", () => {
  assert.equal(resolved.color.fg.critical.$value, "#CC0000");
  assert.equal(resolved.color.fg.warning.$value, "#B45309");
  assert.equal(resolved.color.fg.positive.$value, "#15803D");
  assert.equal(resolved.color.fg.informative.$value, "#2563EB");
  assert.equal(resolved.color.bg["critical-solid"].$value, "#CC0000");
  assert.equal(resolved.color.bg["positive-solid"].$value, "#15803D");
  assert.equal(resolved.color.bg["informative-solid"].$value, "#2563EB");
});
test("경고 강조 면은 색을 두고 그 위의 글자를 어둡게 쓴다", () => {
  assert.equal(resolved.color.bg["warning-solid"].$value, "#F59F0A");
  assert.equal(resolved.color.fg["on-warning-solid"].$value, "#15171A");
});
test("역할 색은 모두 팔레트를 참조한다", () => {
  for (const t of flat.filter((t) => /^color\.(fg|bg|stroke)\./.test(t.path)))
    assert.match(t.ref ?? "", /^color\.palette\./, t.path);
});
test("팔레트 단계 이름은 SEED 규칙", () => {
  for (const t of flat.filter((t) => t.path.startsWith("color.palette.")))
    assert.match(t.path, /^color\.palette\.(gray-(00|[1-9]00|1000)|(blue|red|yellow|green|azure)-([1-9]00|1000)|static-[a-z0-9-]+)$/);
});
test("환경 세 벌이 같은 이름을 갖는다", () => {
  const keys = (e) => flat.filter((t) => t.path.startsWith(`env.${e}.`)).map((t) => t.path.replace(`env.${e}.`, "")).sort();
  for (const e of ENVIRONMENTS) assert.deepEqual(keys(e), keys("web"));
  assert.equal(get("env.kiosk.font-size.t5").value, "28px");
  assert.equal(get("env.web.font-size.t5").value, "16px");
});
test("dimension.xN = N*4px", () => assert.equal(resolved.dimension.x4.$value, "16px"));
test("깨진 참조는 경로를 담은 오류", () => {
  const bad = structuredClone(tree);
  bad.color.fg.brand.$value = "{color.palette.nope-600}";
  assert.throws(() => resolveTokens(bad), /Unresolved token reference: \{color\.palette\.nope-600\} at color\.fg\.brand/);
});
test("순환 참조도 오류", () => {
  const bad = structuredClone(tree);
  bad.color.fg.brand.$value = "{color.bg.brand-solid}";
  bad.color.bg["brand-solid"].$value = "{color.fg.brand}";
  assert.throws(() => resolveTokens(bad), /Unresolved token reference/);
});
test("그라디언트의 색 지점은 팔레트를 참조하고 실제 색으로 풀린다", () => {
  for (const stop of tree.gradient["highlight-brand"].$value) assert.match(stop.color, /^\{color\.palette\./);
  assert.deepEqual(resolved.gradient["highlight-brand"].$value, [
    { color: "#1C74BC", position: 0 },
    { color: "#3397D7", position: 1 },
  ]);
  assert.equal(get("gradient.highlight-brand").value, "#1C74BC 0%, #3397D7 100%");
});
test("그라디언트 색 지점의 깨진 참조도 경로를 담은 오류", () => {
  const bad = structuredClone(tree);
  bad.gradient["glow-brand"].$value[1].color = "{color.palette.nope-200}";
  assert.throws(() => resolveTokens(bad), /Unresolved token reference: \{color\.palette\.nope-200\} at gradient\.glow-brand/);
});
test("아이콘 크기와 누르는 영역은 환경마다 값이 있다", () => {
  assert.equal(get("env.app.icon-size.lg").value, "24px");
  assert.equal(get("env.web.icon-size.xs").value, "12px");
  assert.equal(get("env.kiosk.icon-size.lg").value, "48px");
  assert.equal(get("env.app.touch-target.min").value, "44px");
  assert.equal(get("env.kiosk.touch-target.min").value, "64px");
});
test("캡션과 입력 안내 글자는 보조 글자와 같은 단계를 써서 대비 기준을 지킨다", () => {
  assert.equal(resolved.color.fg["neutral-subtle"].$value, "#6B7280");
  assert.equal(resolved.color.fg.placeholder.$value, "#6B7280");
});
test("입력 칸 외곽선은 꾸미는 선과 따로 두고 3:1 을 지킨다", () => {
  assert.equal(resolved.color.stroke.neutral.$value, "#7E7E7E");
  assert.equal(resolved.color.stroke["neutral-weak"].$value, "#E1E3E6");
});
test("옅은 대표 색 면은 그 위의 대표 색 글자가 읽히는 밝기다", () =>
  assert.equal(resolved.color.bg["brand-weak"].$value, "#F3F8FC"));
test("움직임 시간은 다섯 단계이고 뒤로 갈수록 길다", () => {
  const durations = flat.filter((t) => t.path.startsWith("motion.duration.")).map((t) => parseInt(t.value, 10));
  assert.deepEqual(durations, [100, 150, 200, 300, 500]);
  assert.equal(get("motion.duration.d3").value, "200ms");
});
test("움직임 곡선은 쓰임새 이름으로 고른다", () => {
  assert.deepEqual(
    flat.filter((t) => t.path.startsWith("motion.easing.")).map((t) => t.path.split(".").pop()),
    ["standard", "enter", "exit", "linear"],
  );
  assert.equal(get("motion.easing.enter").value, "cubic-bezier(0.21, 0.65, 0.32, 1)");
  for (const t of flat.filter((t) => t.path.startsWith("motion.easing."))) assert.match(t.value, /^cubic-bezier\((-?[\d.]+, ){3}-?[\d.]+\)$/, t.path);
});
test("화면 좌우 여백은 환경마다 값이 있다", () => {
  assert.equal(get("env.web.layout.gutter").value, "16px");
  assert.equal(get("env.web.layout.gutter-wide").value, "24px");
  assert.equal(get("env.app.layout.gutter").value, "20px");
  assert.equal(get("env.kiosk.layout.gutter").value, "48px");
});
test("화면 너비 경계와 본문 최대 너비는 넓어지는 순서다", () => {
  const px = (prefix) => flat.filter((t) => t.path.startsWith(prefix)).map((t) => parseInt(t.value, 10));
  assert.deepEqual(px("breakpoint."), [768, 1024, 1280]);
  assert.deepEqual(px("container."), [448, 1200, 1440]);
});
test("겹치는 순서는 이름으로 정하고 뒤로 갈수록 위에 온다", () => {
  const layers = flat.filter((t) => t.path.startsWith("z-index."));
  assert.deepEqual(layers.map((t) => t.path.split(".").pop()), ["base", "raised", "sticky", "dropdown", "overlay", "toast"]);
  const values = layers.map((t) => Number(t.value));
  assert.deepEqual(values, [...values].sort((a, b) => a - b));
  assert.equal(new Set(values).size, values.length);
});
test("모달 뒤 어두운 면은 세 단계이고 뒤로 갈수록 진하다", () => {
  assert.equal(resolved.color.bg["overlay-weak"].$value, "#00000080");
  assert.equal(resolved.color.bg.overlay.$value, "#000000B3");
  assert.equal(resolved.color.bg["overlay-strong"].$value, "#000000D9");
});
