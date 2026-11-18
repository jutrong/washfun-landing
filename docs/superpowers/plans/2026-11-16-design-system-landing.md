# 워시펀 디자인 시스템 1차(랜딩) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** washfun-landing 저장소에 토큰 원본(`tokens.json`), 문서(`DESIGN.md`), 확인 페이지(`/design-system`), 다른 제품이 가져다 쓸 변환 스크립트 원본을 만들고, 랜딩 자신이 그 토큰을 쓰게 한다.

**Architecture:** `design-system/tokens.json` 하나가 유일한 출처다. 작은 Node 스크립트들이 이 파일을 읽어 `DESIGN.md`의 토큰 표, Tailwind preset, TS 객체를 만든다. 페이지는 같은 파일을 import 해서 그린다. 생성물이 원본과 어긋나면 검사 스크립트가 실패한다.

**Tech Stack:** Next.js 14.2 (app router), Tailwind 3.4, Node 내장 테스트 러너(`node --test`), ES modules(`.mjs`). 새 의존성은 추가하지 않는다.

**Spec:** `docs/superpowers/specs/2026-11-16-design-system-design.md`

**이 계획의 범위:** 기획 문서 5.4의 적용 순서 중 1번(washfun-landing)만 다룬다. 앱·키오스크 3종·파트너 웹은 제품마다 별도 계획을 쓴다. 랜딩도 이 계획에서는 "1단계: 이름만 연결"까지만 하고, 대표 색 `#2E87FF` → `#1C74BC` 교체(2단계, 화면이 바뀜)는 하지 않는다.

## Global Constraints

- 대표 색은 `#1C74BC`.
- 토큰 이름은 당근 SEED Design 규칙을 따른다: 팔레트 `color.palette.<색>-<단계>`, 역할 `color.fg.*` / `color.bg.*` / `color.stroke.*`. 팔레트 단계는 gray `00`~`1000`, 유채색 `100`~`1000`.
- 값이 충돌하면 고객 앱(`washFun-Client/src/assets/styles/colors.ts`)의 값을 따른다.
- 역할 토큰은 색 값을 직접 갖지 않고 팔레트 토큰을 참조한다(`{color.palette.blue-600}`).
- 이 계획에서 운영 중인 화면의 모습이 바뀌면 안 된다. 기존 Tailwind 색 이름의 값을 바꾸지 않는다.
- `/design-system` 페이지는 noindex, sitemap 제외, 사이트 메뉴에 넣지 않는다.
- 새 npm 의존성을 추가하지 않는다.
- 작업 브랜치는 `main`에서 딴 `feat/design-system`. 현재 체크아웃된 `chore/footer-marketing-consent`와 루트의 미추적 파일 `channel-CifKkifx.js`, `desktop-BmXAJ9_W.js`는 건드리지 않는다. push와 PR은 사용자가 요청할 때만 한다.

## Review Focus

1. **깨진 참조** — 역할 토큰이 존재하지 않는 팔레트 이름을 가리키면 변환 결과에 `undefined`가 섞이지 않고 스크립트가 토큰 경로를 담은 오류로 실패해야 한다. (Task 1)
2. **문서가 낡음** — `tokens.json`을 고치고 `DESIGN.md`를 다시 만들지 않으면 `npm run tokens:check`가 0이 아닌 코드로 끝나야 한다. (Task 2)
3. **표시 구간이 지워진 문서** — `DESIGN.md`에서 시작/끝 표시가 없어지면 손으로 쓴 내용을 덮어쓰지 않고 오류로 끝나야 한다. (Task 2)
4. **내려받기 실패** — 가져가기 스크립트가 네트워크 오류나 200이 아닌 응답, JSON이 아닌 본문을 받으면 기존 생성 파일을 건드리지 않고 실패해야 한다. (Task 3)
5. **기존 클래스와 이름 충돌** — preset을 붙인 뒤에도 랜딩의 기존 색 클래스(`text-primary`, `bg-lightPrimary` 등)가 같은 값을 내야 한다. (Task 4)

---

## File Structure

| 파일 | 책임 |
|---|---|
| `design-system/tokens.json` | 토큰 원본 |
| `design-system/lib/tokens.mjs` | 읽기·참조 풀기·평탄화 |
| `design-system/lib/tokens.test.mjs` | 원본의 값과 구조 검증 |
| `design-system/scripts/build-docs.mjs` | `DESIGN.md` 토큰 표 갱신 |
| `design-system/scripts/check.mjs` | 문서·preset·공개 사본이 최신인지 검사 |
| `design-system/scripts/docs.test.mjs` | 문서 생성 테스트 |
| `design-system/sync/convert.mjs` | 토큰 → Tailwind preset / TS 객체 변환(다른 제품이 복사해 갈 원본) |
| `design-system/sync/sync-tokens.mjs` | 내려받아 변환해 쓰는 CLI(다른 제품이 복사해 갈 원본) |
| `design-system/sync/convert.test.mjs` | 변환·CLI 테스트 |
| `design-system/generated/tailwind-preset.cjs` | 랜딩용 생성물(커밋) |
| `DESIGN.md` | 규칙(손으로 씀) + 토큰 표(생성) |
| `src/app/design-system/page.tsx`, `layout.tsx` | 확인 페이지 |
| `src/components/design-system/*.tsx` | 견본 컴포넌트 |
| `public/design-system/tokens.json` | 배포용 사본(빌드 전 복사, git 제외) |

기획 문서 5.3은 랜딩이 "원본을 직접 import"한다고 적었지만, `tailwind.config.ts`에서 `.mjs` 변환기를 불러오는 대신 다른 제품과 같은 방식(생성된 preset 파일을 커밋)으로 한다. 변환기를 랜딩에서 먼저 실제로 써 보게 되고, 최신 여부는 `tokens:check`가 잡는다.

---

### Task 1: 토큰 원본과 읽기 모듈

**Files:**
- Create: `design-system/tokens.json`
- Create: `design-system/lib/tokens.mjs`
- Test: `design-system/lib/tokens.test.mjs`
- Modify: `package.json` (scripts)

**Interfaces:**
- Produces:
  - `loadTokens(path?: string): TokenTree` — 기본 경로는 `design-system/tokens.json`
  - `resolveTokens(tree: TokenTree): ResolvedTokens` — 모든 `{a.b.c}` 참조를 실제 값으로 바꾼 같은 모양의 트리. 풀 수 없는 참조·순환 참조는 `Error("Unresolved token reference: <참조> at <경로>")`
  - `flattenTokens(tree): Array<{ path: string, value: string, ref: string | null, description: string | null }>` — `path`는 `color.fg.brand` 형식, `ref`는 참조하던 토큰 경로
  - `ENVIRONMENTS = ["web", "app", "kiosk"]`

**`tokens.json` 모양:** W3C Design Tokens 형식. 잎은 `{ "$value": ..., "$type": ..., "$description"?: ... }`.

```json
{
  "version": "0.1.0",
  "color": { "palette": {}, "fg": {}, "bg": {}, "stroke": {} },
  "dimension": {},
  "font-family": {},
  "font-weight": {},
  "shadow": {},
  "env": {
    "web":   { "font-size": {}, "line-height": {}, "radius": {} },
    "app":   { "font-size": {}, "line-height": {}, "radius": {} },
    "kiosk": { "font-size": {}, "line-height": {}, "radius": {} }
  }
}
```

**팔레트 값(고정):**

| 단계 | gray | blue | red | yellow | green | azure |
|---|---|---|---|---|---|---|
| 00 | `#FFFFFF` | | | | | |
| 100 | `#F9F9FA` | `#EEF5FB` | `#FFE5E5` | `#FFF8E1` | `#F0FDF4` | `#EFF6FF` |
| 200 | `#F3F4F5` | `#CCE5F5` | | | `#DCFCE7` | `#DBEAFE` |
| 300 | `#E7E7E7` | `#99CBEB` | | | | |
| 400 | `#E1E3E6` | `#66B1E1` | | | | |
| 500 | `#C4C7CC` | `#3397D7` | | | | |
| 600 | `#B1B1B1` | `#1C74BC` | | | | |
| 700 | `#7E7E7E` | `#165D96` | `#FF0000` | `#F59F0A` | `#22C55E` | `#3B82F6` |
| 800 | `#6B7280` | `#114671` | `#CC0000` | `#D97706` | `#16A34A` | `#2563EB` |
| 900 | `#2A2A2A` | `#0B2E4B` | `#990000` | `#B45309` | `#15803D` | `#1D4ED8` |
| 1000 | `#15171A` | `#061726` | | | | |

빈 칸은 위아래 값 사이를 고르게 채운다(만드는 사람 재량, 기획 문서 7장). 추가로 `static-white #FFFFFF`, `static-black #000000`, `static-black-alpha-700 #000000B3`, `static-black-alpha-500 #00000080`.

**역할 값(고정, 전부 팔레트 참조):**

| 역할 | 참조 | 역할 | 참조 |
|---|---|---|---|
| `fg.neutral` | gray-1000 | `bg.layer-basement` | gray-100 |
| `fg.neutral-muted` | gray-800 | `bg.layer-default` | gray-00 |
| `fg.neutral-subtle` | gray-700 | `bg.layer-floating` | gray-00 |
| `fg.placeholder` | gray-500 | `bg.neutral-weak` | gray-200 |
| `fg.disabled` | gray-600 | `bg.disabled` | gray-200 |
| `fg.brand` | blue-600 | `bg.brand-solid` | blue-600 |
| `fg.on-brand-solid` | static-white | `bg.brand-solid-pressed` | blue-700 |
| `fg.critical` | red-700 | `bg.brand-weak` | blue-100 |
| `fg.warning` | yellow-700 | `bg.overlay` | static-black-alpha-700 |
| `fg.positive` | green-700 | `bg.critical-solid` / `-weak` | red-700 / red-100 |
| `fg.informative` | azure-700 | `bg.warning-solid` / `-weak` | yellow-700 / yellow-100 |
| `stroke.neutral-weak` | gray-400 | `bg.positive-solid` / `-weak` | green-700 / green-100 |
| `stroke.neutral-muted` | gray-300 | `bg.informative-solid` / `-weak` | azure-700 / azure-100 |
| `stroke.brand-solid` | blue-600 | | |

각 역할 토큰의 `$description`에는 기획 문서 5.2 표의 "뜻" 칸 문구를 넣는다.

**색 외의 값(고정):**

- `dimension.x1`~`x10`, `x12`, `x14`, `x16`: `xN` = N × 4px. `dimension.spacing-x.global-gutter` = `{dimension.x4}`.
- `font-family.sans`: `Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif`
- `font-weight`: `regular` 400, `medium` 500, `bold` 700
- `shadow.s1` `0 2px 8px rgba(21,23,26,0.05)`, `s2` `0 10px 30px rgba(21,23,26,0.06)`, `s3` `0 30px 80px rgba(21,23,26,0.35)`
- `env.*.font-size.t1`~`t10` (px): web·app `11, 12, 13, 14, 16, 18, 20, 24, 28, 32` / kiosk `16, 18, 20, 24, 28, 32, 36, 40, 48, 64`
- `env.*.line-height.t1`~`t10`: `t1`~`t5` 1.5, `t6`~`t8` 1.35, `t9`~`t10` 1.25
- `env.*.radius.r1`~`r6`, `full` (px): web·app `4, 8, 12, 16, 20, 24, 9999` / kiosk `8, 12, 16, 20, 24, 30, 9999`

- [ ] **Step 1: 실패하는 테스트 작성** — `design-system/lib/tokens.test.mjs`

```js
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
  assert.equal(resolved.color.fg.critical.$value, "#FF0000");
  assert.equal(resolved.color.fg.warning.$value, "#F59F0A");
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
```

- [ ] **Step 2: 실패 확인** — Run: `node --test design-system/lib/` → Expected: FAIL (`Cannot find module './tokens.mjs'`)
- [ ] **Step 3: `design-system/tokens.json` 작성** — 위 표의 값 그대로.
- [ ] **Step 4: `design-system/lib/tokens.mjs` 구현** — Interfaces의 세 함수와 상수.
- [ ] **Step 5: `package.json` scripts에 `"tokens:test": "node --test design-system/"` 추가**
- [ ] **Step 6: 통과 확인** — Run: `npm run tokens:test` → Expected: 9개 PASS
- [ ] **Step 7: Commit**

```bash
git add design-system/tokens.json design-system/lib package.json
git commit -m "feat(design-system): 토큰 원본과 읽기 모듈 추가"
```

---

### Task 2: DESIGN.md와 문서 생성·검사

**Files:**
- Create: `DESIGN.md`
- Create: `design-system/scripts/build-docs.mjs`
- Create: `design-system/scripts/check.mjs`
- Test: `design-system/scripts/docs.test.mjs`
- Modify: `package.json` (scripts)

**Interfaces:**
- Consumes: Task 1의 `loadTokens`, `resolveTokens`, `flattenTokens`, `ENVIRONMENTS`
- Produces:
  - `renderTokenTables(tree: TokenTree): string` — 마크다운 표 묶음
  - `injectTables(doc: string, tables: string): string` — `<!-- tokens:start -->`와 `<!-- tokens:end -->` 사이를 교체. 표시가 하나라도 없으면 `Error("DESIGN.md is missing the tokens:start / tokens:end markers")`
  - `checks: Array<{ name: string, isFresh(): boolean, fix: string }>` — `check.mjs`가 내보내는 검사 목록. Task 4, 5가 항목을 추가한다.
  - npm scripts: `tokens:docs`(문서 갱신), `tokens:check`(낡았으면 exit 1)

**DESIGN.md 손으로 쓰는 부분(순서 고정):**

1. 이 문서가 무엇인지, 원본이 `design-system/tokens.json`이고 표는 `npm run tokens:docs`로 만든다는 안내
2. 2단 구조 설명(팔레트 → 역할)과 "제품 코드는 역할 토큰만 쓴다" 규칙
3. 이름 규칙: `속성.역할-변형[-상태]`, 속성·역할·변형·상태 각각의 목록(기획 문서 5.2)
4. 고르는 법: 글자는 `fg`, 면은 `bg`, 선은 `stroke` / 외곽선은 `stroke.neutral-weak`, 구분선은 `stroke.neutral-muted` / 색 면 위의 글자는 `fg.on-*`
5. 환경별 값(`web`, `app`, `kiosk`) 설명
6. 다른 제품에서 가져가는 방법(Task 3의 CLI 사용법)
7. 예외 목록(기획 문서 5.5)
8. `## 토큰` 제목 아래 표시 구간

**생성되는 표:** 팔레트(이름·값), 역할 색(이름·참조·값·뜻), dimension, font-weight, shadow, 환경별 font-size / line-height / radius(이름·web·app·kiosk 네 칸).

- [ ] **Step 1: 실패하는 테스트 작성** — `design-system/scripts/docs.test.mjs`

```js
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
```

- [ ] **Step 2: 실패 확인** — Run: `npm run tokens:test` → Expected: FAIL (`Cannot find module './build-docs.mjs'`)
- [ ] **Step 3: `build-docs.mjs` 구현** — 두 함수를 내보내고, 직접 실행되면 `DESIGN.md`를 읽어 갱신해 쓴다.
- [ ] **Step 4: `check.mjs` 구현** — `checks` 배열에 `DESIGN.md` 항목 하나(현재 파일 내용 === `injectTables(현재 내용, renderTokenTables(tree))`). 직접 실행되면 낡은 항목마다 `<name> is out of date. Run: <fix>`를 출력하고 exit 1, 모두 최신이면 `tokens: all generated files are up to date` 출력 후 exit 0.
- [ ] **Step 5: `DESIGN.md` 작성** — 위 1~8, 표시 구간은 비워 둔다.
- [ ] **Step 6: scripts 추가** — `"tokens:docs": "node design-system/scripts/build-docs.mjs"`, `"tokens:check": "node design-system/scripts/check.mjs"`
- [ ] **Step 7: 문서 생성과 통과 확인** — Run: `npm run tokens:docs && npm run tokens:test && npm run tokens:check` → Expected: 테스트 PASS, `all generated files are up to date`
- [ ] **Step 8: 낡음 감지 확인** — `tokens.json`의 `color.palette.blue-600`을 임시로 `#000000`으로 바꾼 뒤 `npm run tokens:check` → Expected: exit 1, `DESIGN.md is out of date`. 확인 후 `git checkout design-system/tokens.json`.
- [ ] **Step 9: Commit**

```bash
git add DESIGN.md design-system/scripts package.json
git commit -m "feat(design-system): DESIGN.md와 토큰 표 생성·검사 추가"
```

---

### Task 3: 변환기와 가져가기 CLI

**Files:**
- Create: `design-system/sync/convert.mjs`
- Create: `design-system/sync/sync-tokens.mjs`
- Test: `design-system/sync/convert.test.mjs`

`design-system/sync/` 폴더는 다른 제품 저장소로 통째로 복사해 갈 것이므로 `../lib/tokens.mjs`를 import 하지 않는다. 참조 풀기에 필요한 최소 코드는 `convert.mjs` 안에 둔다(같은 로직이 두 군데 있게 되며, 두 구현이 같은 결과를 내는지 테스트로 묶는다).

**Interfaces:**
- Produces:
  - `toTailwindPreset(tree: TokenTree, env: "web" | "app" | "kiosk"): string` — CommonJS 파일 본문(`module.exports = { theme: { extend: {...} } }`)
  - `toTsObject(tree: TokenTree, env): string` — `export const tokens = {...} as const;` 본문
  - 두 결과 모두 첫 줄은 `// Generated from washfun design tokens v<version>. Do not edit. Run sync-tokens to update.`
  - CLI: `node sync-tokens.mjs --source <URL 또는 파일 경로> --format <tailwind|ts> --env <web|app|kiosk> --out <파일 경로>`
  - `DEFAULT_SOURCE = "https://www.lifedivergence.com/design-system/tokens.json"` — `--source` 생략 시 사용

**Tailwind preset의 키(고정):**

| 토큰 | `theme.extend` 위치 | 클래스 예 |
|---|---|---|
| `color.fg.neutral-muted` | `colors.fg["neutral-muted"]` | `text-fg-neutral-muted` |
| `color.bg.brand-solid` | `colors.bg["brand-solid"]` | `bg-bg-brand-solid` |
| `color.stroke.neutral-weak` | `colors.stroke["neutral-weak"]` | `border-stroke-neutral-weak` |
| `color.palette.blue-600` | `colors.palette["blue-600"]` | `bg-palette-blue-600` |
| `dimension.x4` | `spacing.x4` | `p-x4` |
| `env.<env>.font-size.t5` + `line-height.t5` | `fontSize.t5 = ["16px", { lineHeight: "1.5" }]` | `text-t5` |
| `env.<env>.radius.r3` | `borderRadius.r3` | `rounded-r3` |
| `shadow.s2` | `boxShadow.s2` | `shadow-s2` |
| `font-family.sans` | 넣지 않음(제품마다 글꼴 로딩 방식이 다르다) | |

네 개의 최상위 색 키(`fg`, `bg`, `stroke`, `palette`)는 여섯 제품의 기존 색 이름과 겹치지 않는다.

**TS 객체의 모양(고정):** `tokens.color.fg.neutralMuted`처럼 하이픈 이름을 camelCase로 바꾼다(`gray-00` → `gray00`, `blue-600` → `blue600`). 크기 값은 React Native에서 바로 쓰도록 단위 없는 숫자로 낸다(`tokens.dimension.x4 === 16`, `tokens.fontSize.t5 === 16`, `tokens.radius.full === 9999`). 줄 높이는 배수 그대로(`1.5`), 그림자는 문자열.

- [ ] **Step 1: 실패하는 테스트 작성** — `design-system/sync/convert.test.mjs`

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createRequire } from "node:module";
import { loadTokens, resolveTokens } from "../lib/tokens.mjs";
import { toTailwindPreset, toTsObject } from "./convert.mjs";

const tree = loadTokens();
const dir = mkdtempSync(join(tmpdir(), "tokens-"));
const cli = new URL("./sync-tokens.mjs", import.meta.url).pathname;
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
```

- [ ] **Step 2: 실패 확인** — Run: `npm run tokens:test` → Expected: FAIL (`Cannot find module './convert.mjs'`)
- [ ] **Step 3: `convert.mjs` 구현** — 두 함수. 객체 키 순서는 `tokens.json`의 순서를 그대로 따른다(결과가 실행마다 같아야 한다).
- [ ] **Step 4: `sync-tokens.mjs` 구현** — `--source`가 `http://` 또는 `https://`로 시작하면 `fetch`(응답이 2xx가 아니면 실패), 아니면 파일로 읽는다. 변환까지 끝난 뒤에만 `--out`에 쓴다. 성공하면 `tokens v<version> → <out>` 한 줄 출력.
- [ ] **Step 5: 통과 확인** — Run: `npm run tokens:test` → Expected: 전부 PASS
- [ ] **Step 6: Commit**

```bash
git add design-system/sync
git commit -m "feat(design-system): 토큰 변환기와 가져가기 CLI 추가"
```

---

### Task 4: 랜딩에 preset 연결 (화면 변화 없음)

**Files:**
- Create: `design-system/generated/tailwind-preset.cjs` (생성물)
- Modify: `tailwind.config.ts`
- Modify: `design-system/scripts/check.mjs`
- Modify: `package.json` (scripts)
- Test: `design-system/scripts/landing.test.mjs`

**Interfaces:**
- Consumes: Task 3의 CLI와 `toTailwindPreset`, Task 2의 `checks`
- Produces: npm script `tokens:build` — preset을 다시 만들고 문서도 갱신한다(`sync-tokens ... && tokens:docs`). 이후 토큰을 고친 사람은 이 명령 하나만 돌린다.

**값이 같아서 토큰을 가리키게 바꾸는 기존 이름(이것만):**

| `tailwind.config.ts`의 기존 이름 | 현재 값 | 바꿀 참조 |
|---|---|---|
| `borderStrong` | `#E1E3E6` | `stroke["neutral-weak"]` |
| `black` | `#15171A` | `fg.neutral` |
| `primary2` | `#1C74BC` | `bg["brand-solid"]` |
| `secondaryDefault` | `#6B7280` | `fg["neutral-muted"]` |

`primary #2E87FF`, `subPrimary`, `main #1C73BA`, `gray #4F5055`, `lightPrimary*` 등 값이 다른 이름은 손대지 않는다. `main`은 `#1C74BC`와 한 자리 차이지만 값이 다르므로 2단계로 미룬다.

- [ ] **Step 1: 실패하는 테스트 작성** — `design-system/scripts/landing.test.mjs`. `tailwindcss/resolveConfig`로 `tailwind.config.ts`를 푼 결과를 검사한다(TS 설정은 `tailwindcss/loadConfig`로 읽는다).

```js
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
```

- [ ] **Step 2: 실패 확인** — Run: `npm run tokens:test` → Expected: 첫 테스트 FAIL (`colors.bg`가 undefined)
- [ ] **Step 3: scripts 추가** — `"tokens:build": "node design-system/sync/sync-tokens.mjs --source design-system/tokens.json --format tailwind --env web --out design-system/generated/tailwind-preset.cjs && npm run tokens:docs"`
- [ ] **Step 4: preset 생성** — Run: `npm run tokens:build`
- [ ] **Step 5: `tailwind.config.ts` 수정** — `presets: [require("./design-system/generated/tailwind-preset.cjs")]` 추가, 위 표의 네 이름을 preset 값 참조로 교체.
- [ ] **Step 6: `check.mjs`의 `checks`에 항목 추가** — `design-system/generated/tailwind-preset.cjs` 내용 === `toTailwindPreset(tree, "web")`, `fix: "npm run tokens:build"`. `DESIGN.md` 항목의 `fix`도 `npm run tokens:build`로 바꾼다.
- [ ] **Step 7: 통과 확인** — Run: `npm run tokens:test && npm run tokens:check && npm run lint` → Expected: 전부 통과
- [ ] **Step 8: 화면이 그대로인지 확인** — `main`과 이 브랜치에서 각각 `npm run build` 후 `.next/static/css/*.css`에서 기존 클래스 `.text-primary`, `.bg-lightPrimary`, `.border-borderStrong`, `.text-black`의 색 선언을 비교한다. Expected: 네 클래스 모두 동일.
- [ ] **Step 9: Commit**

```bash
git add design-system/generated design-system/scripts tailwind.config.ts package.json
git commit -m "feat(design-system): 랜딩 Tailwind에 토큰 preset 연결"
```

---

### Task 5: /design-system 페이지와 공개 사본

**Files:**
- Create: `src/app/design-system/layout.tsx`
- Create: `src/app/design-system/page.tsx`
- Create: `src/components/design-system/ColorSwatch.tsx`, `TokenSection.tsx`, `EnvTable.tsx`
- Create: `design-system/scripts/copy-public.mjs`
- Modify: `package.json` (scripts), `next-sitemap.config.js`, `.gitignore`

**Interfaces:**
- Consumes: `design-system/tokens.json`(직접 import), Task 4의 preset 클래스
- Produces: 경로 `/design-system`(페이지), `/design-system/tokens.json`(정적 파일). 후자가 Task 3의 `DEFAULT_SOURCE`다.

**페이지 요구사항:**

- 서버 컴포넌트. 값은 전부 `tokens.json`에서 읽고 페이지 코드에 색 값·크기 값을 적지 않는다. 참조를 푸는 일은 페이지 안의 작은 함수로 한다(`design-system/lib/tokens.mjs`는 `fs`를 쓰므로 import 하지 않는다).
- 섹션 순서: 머리말(버전, `DESIGN.md` 요약 두세 줄, `tokens.json` 내려받기 링크) → 역할 색(fg / bg / stroke로 묶음) → 팔레트(색별 한 줄) → 글자 크기(환경 세 칸, 각 크기로 쓴 예문 "워시펀으로 세차하세요") → 간격 → 모서리 → 그림자.
- 색 견본 하나에는 색 면, 토큰 이름, 참조하는 팔레트 이름, 색 값이 보인다. 역할 색에는 `$description`도 보인다.
- `fg.*` 견본은 `bg.layer-default` 위에 글자로, `fg.on-brand-solid`는 `bg.brand-solid` 위에 글자로 보여 준다.
- 페이지 자체의 스타일은 Task 4의 토큰 클래스만 쓴다(`text-fg-neutral`, `bg-bg-layer-basement`, `border-stroke-neutral-muted`, `rounded-r3`, `p-x4` 등).
- 사이트 공통 헤더·푸터·플로팅 버튼 없이 독립된 문서 화면으로 둔다. 루트 `layout.tsx`가 이를 강제로 넣는 구조라면 그대로 두고 메뉴 항목만 추가하지 않는다.
- `layout.tsx`의 metadata: `title: "워시펀 디자인 시스템"`, `robots: { index: false, follow: false }`.
- 폭 375px에서 가로 스크롤이 생기지 않는다.

- [ ] **Step 1: `copy-public.mjs` 작성** — `design-system/tokens.json`을 `public/design-system/tokens.json`으로 복사(폴더가 없으면 만든다).
- [ ] **Step 2: scripts와 설정 수정** — `"predev": "node design-system/scripts/copy-public.mjs"`, `"prebuild": "npm run tokens:check && node design-system/scripts/copy-public.mjs"`. `.gitignore`에 `/public/design-system/` 추가. `next-sitemap.config.js`의 `exclude`에 `"/design-system"`, `"/design-system/*"` 추가.
- [ ] **Step 3: 컴포넌트와 페이지 작성** — 위 요구사항대로.
- [ ] **Step 4: 빌드 확인** — Run: `npm run lint && npm run build` → Expected: 성공, 경로 목록에 `/design-system`이 정적 페이지(○)로 나온다.
- [ ] **Step 5: 산출물 확인**

```bash
test -f public/design-system/tokens.json && cmp design-system/tokens.json public/design-system/tokens.json && echo COPY_OK
grep -c "design-system" public/sitemap-0.xml
grep -o '<meta name="robots"[^>]*>' .next/server/app/design-system.html
```

Expected: `COPY_OK`, `0`, `content="noindex, nofollow"`가 들어간 meta 태그.

- [ ] **Step 6: 브라우저 확인** — dev 서버를 띄워 `/design-system`을 열고 확인한다: 콘솔 오류 없음 / `bg.brand-solid` 견본의 계산된 배경색이 `rgb(28, 116, 188)` / 폭 375px에서 `document.documentElement.scrollWidth <= 375` / `/design-system/tokens.json`이 200으로 열리고 `version`이 원본과 같음 / 홈(`/`)의 모습이 `main`과 같음. 데스크톱과 375px 화면 캡처를 남긴다.
- [ ] **Step 7: 실제 주소로 가져가기 CLI 확인(로컬)** — dev 서버가 떠 있는 상태에서 Run: `node design-system/sync/sync-tokens.mjs --source http://localhost:3000/design-system/tokens.json --format ts --env app --out "$(mktemp -d)/tokens.ts"` → Expected: `tokens v0.1.0 → <임시 경로>/tokens.ts` 한 줄 출력, exit 0.
- [ ] **Step 8: Commit**

```bash
git add src/app/design-system src/components/design-system design-system/scripts package.json next-sitemap.config.js .gitignore
git commit -m "feat(design-system): /design-system 페이지와 tokens.json 공개 사본 추가"
```

---

## 이 계획 이후

- 랜딩이 실제 도메인에 배포돼야 다른 제품이 `DEFAULT_SOURCE`로 토큰을 받을 수 있다. 배포는 포크 저장소의 Vercel 프로젝트를 거치므로 사용자가 진행한다. 그 전까지 다른 제품은 `--source`에 로컬 경로를 줘서 작업할 수 있다.
- 다음 계획: washFun-Client(앱) 적용.
- 랜딩 2단계(`primary #2E87FF` → `#1C74BC` 등 값 맞추기)는 전/후 캡처 승인을 거치는 별도 계획으로 한다.
