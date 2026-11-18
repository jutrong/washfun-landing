import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// 문서 페이지(Next)도 이 파일을 쓰므로 import.meta.url 대신 저장소 루트에서 찾는다. 테스트와 빌드는 루트에서 돈다.
const DIR = join(process.cwd(), "design-system", "components");

/** 목록 페이지와 왼쪽 메뉴가 이 순서로 묶는다. */
export const CATEGORIES = [
  { key: "action", title: "Action", ko: "누르는 것" },
  { key: "input", title: "Input", ko: "입력하는 것" },
  { key: "selection", title: "Selection", ko: "고르는 것" },
  { key: "display", title: "Display", ko: "보여 주는 것" },
  { key: "feedback", title: "Feedback", ko: "알려 주는 것" },
  { key: "navigation", title: "Navigation", ko: "이동하는 것" },
];

/** design-system/components/*.json 을 분류 순서, 그 안에서는 order 순서로 돌려준다. */
export function loadComponents(dir = DIR) {
  const rank = (component) => CATEGORIES.findIndex((category) => category.key === component.category) * 100 + (component.order ?? 50);
  return readdirSync(dir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => JSON.parse(readFileSync(join(dir, file), "utf8")))
    .sort((a, b) => rank(a) - rank(b) || a.key.localeCompare(b.key));
}

/** 명세가 가리키는 토큰을 모은다. 크기는 환경마다 값이 다르므로 env 를 함께 돌려준다. */
export function tokenRefs(component) {
  const refs = [];
  for (const variant of component.variants ?? []) for (const ref of Object.values(variant.tokens ?? {})) if (ref) refs.push({ ref });
  for (const size of component.sizes ?? [])
    for (const [env, parts] of Object.entries(size.env ?? {})) for (const ref of Object.values(parts)) refs.push({ ref, env });
  for (const state of component.states ?? []) for (const ref of state.tokens ?? []) refs.push({ ref });
  for (const motion of component.motion ?? []) for (const ref of [motion.duration, motion.easing]) if (ref) refs.push({ ref });
  return refs;
}

/** "color.bg.brand-solid" 는 그대로, "font-size.t5" 처럼 환경별 값은 env.<환경>. 아래에서 찾는다. */
export function resolveRef(values, ref, env) {
  return values.get(ref) ?? values.get(`env.${env}.${ref}`);
}
