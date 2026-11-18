import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const resolveConfig = require("tailwindcss/resolveConfig");
const loadConfig = require("tailwindcss/loadConfig");
const { colors, fontSize } = resolveConfig(loadConfig(new URL("../../tailwind.config.ts", import.meta.url).pathname)).theme;

test("토큰 색이 들어온다", () => {
  assert.equal(colors.bg["brand-solid"], "#1C74BC");
  assert.equal(colors.fg.neutral, "#15171A");
  assert.deepEqual(fontSize.t5, ["16px", { lineHeight: "1.5" }]);
});
test("기존 색 이름의 값은 그대로다", () => {
  const before = { primary: "#2E87FF", subPrimary: "#0547F5", white: "#FFFFFF", gray: "#4F5055", lightGray: "#ecf0f1",
    lightPrimary: "#EFF6FF", lightSubPrimary: "#EBF3FF", black: "#15171A", primary2: "#1C74BC",
    secondaryDefault: "#6B7280", main: "#1C73BA", borderStrong: "#E1E3E6" };
  for (const [k, v] of Object.entries(before)) assert.equal(String(colors[k]).toLowerCase(), v.toLowerCase(), k);
});
