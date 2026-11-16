# 워시펀 디자인 시스템 기획

- 작성일: 2026-11-16
- 상태: 승인됨(2026-11-16), 구현 계획 작성 중
- 위치: washfun-landing 저장소

표기: **[결정]** 은 사용자가 정한 것, **[제안]** 은 작성자가 정한 것으로 검토 때 바꿀 수 있다.

## 1. 의도

워시펀 제품들이 색·글자·간격을 제각각 정의하고 있다. 같은 브랜드인데 제품마다 대표 색이 다르고, 같은 색에 이름이 여러 개 붙어 있다. 모든 제품이 하나의 기준을 따르게 해서 통일된 인상을 만드는 것이 목적이다. **[결정]**

현재 상태(2026-11-16 확인):

| 제품 | 저장소 폴더 | 스타일 방식 | 대표 색 |
|---|---|---|---|
| 결제 키오스크 | wash-kiosk | Tailwind 3 | `#1C74BC` (primary 50~900 스케일) |
| 멤버십 키오스크 | wash-membership | Tailwind 3 | `#1C74BC` (`brand`) |
| 충전 키오스크 | wash-kiosk-charge | styled-components | `#1A9FFF` / `#0A86EE` |
| 파트너 웹 | washfun | Tailwind 3 + styled-components | `#2B3674` |
| 랜딩 | washfun-landing | Tailwind 3 | `#2E87FF` (+ `#1C74BC`, `#1C73BA`) |
| 고객 앱 | washFun-Client | React Native + styled-components | `#1C74BC` (`main`) |

이미 여러 제품이 같은 값을 쓰는 것: 테두리 `#E1E3E6`, 본문 글자 `#15171A`, 보조 글자 `#6B7280`, neutral 50~900 스케일(결제·멤버십 키오스크 동일), 글꼴 Pretendard.

## 2. 목표 / 비목표 / 실패 조건

**목표**

- 토큰 원본이 한 곳에만 있고, 문서·페이지·각 제품의 코드가 모두 그 원본에서 나온다.
- 여섯 제품이 같은 이름으로 같은 색·글자·간격을 쓴다.
- 사람이 읽는 문서(md)와 눈으로 확인하는 페이지가 랜딩 저장소 안에 있다. **[결정]**

**비목표**

- washfun-admin 적용. **[결정]**
- wash-hp, WashGasApp, course-suggestion-tool, membership-card-poc 적용(활동이 멈춘 저장소). **[제안]**
- 제품 간 공유 컴포넌트 코드. 1차는 토큰과 사용 규칙까지만 한다. **[제안]**
- 다크 모드. 현재 어느 제품에도 없다. 단, 역할 토큰 구조는 나중에 추가할 수 있게 둔다. **[제안]**

**실패 조건(동작해도 실패로 보는 경우)**

- 문서의 값과 코드의 값이 어긋날 수 있는 구조.
- 토큰을 도입하느라 운영 중인 화면의 모습이 예고 없이 바뀌는 것.
- 토큰 도입 이후에 새로 쓰는 코드가 역할 이름 대신 색 값(`#...`)이나 팔레트 이름을 직접 쓰는 것.

**1차 완료 기준 [제안]**

- 랜딩에 토큰 원본·문서·페이지가 있다.
- 여섯 제품의 토큰 정의 파일(Tailwind 설정, `colors.ts`, `theme.ts`)이 원본에서 생성된 파일을 참조한다.
- 화면 코드 안에 이미 흩어져 있는 색 값(파트너 웹 약 520곳, 앱 약 310곳, 결제 키오스크 약 250곳, 충전 키오스크 약 160곳)을 걷어내는 일은 1차에 넣지 않는다. 제품별 후속 작업으로 따로 잡는다. 대신 새 코드에서 색 값을 직접 쓰면 경고하는 lint 규칙을 각 제품에 넣는다.

## 3. 제약

- 여섯 제품은 각각 별도 git 저장소다(`lifedivergence/*`). 상위 폴더 `wash-project`는 저장소가 아니다.
- 스타일 방식이 세 가지(Tailwind 3, styled-components, React Native)라 토큰을 세 가지 형식으로 내보내야 한다.
- 키오스크는 현장 장비에 설치되는 Electron 앱이다. 빌드나 실행이 네트워크의 토큰 파일에 의존하면 안 된다.
- 랜딩의 실제 도메인은 포크 저장소의 Vercel 프로젝트에서 배포된다. 랜딩에 추가한 페이지와 파일은 공개 도메인에 노출된다.
- 랜딩 `robots.txt`는 전체 허용이고 sitemap이 자동 생성된다.

## 4. 접근 방식

| 방식 | 내용 | 장단점 |
|---|---|---|
| A. 문서만 | 랜딩에 md와 페이지를 두고 각 제품이 값을 옮겨 적는다 | 가장 빠르지만 값이 어긋나도 알 수 없다 |
| **B. 문서 + 토큰 파일** | 랜딩에 토큰 원본 파일을 두고 md·페이지·각 제품이 그 파일에서 값을 가져온다 | 출처가 한 곳. 제품마다 변환 스크립트가 필요하다 |
| C. 별도 패키지 | 독립 저장소의 npm 패키지로 배포한다 | 버전 관리가 엄격하지만 랜딩 안에 둔다는 방향과 맞지 않고 비공개 배포 설정이 필요하다 |

**B로 정했다. [결정]** 통일이 목적인데 A는 통일을 지킬 장치가 없고, C는 여섯 제품 규모에 비해 관리 부담이 크다.

참고한 것: 당근 SEED Design의 2단 토큰 구조(팔레트 → 역할). SEED 패키지 자체는 쓰지 않는다. React Native를 지원하지 않고, 브랜드와 화면 크기가 다르기 때문이다.

## 5. 설계

### 5.1 랜딩 저장소에 생기는 것

```
washfun-landing/
├─ DESIGN.md                         사람이 읽는 문서(규칙 + 토큰 표)
├─ design-system/
│  ├─ tokens.json                    토큰 원본(유일한 출처)
│  └─ scripts/
│     ├─ build-docs.mjs              tokens.json → DESIGN.md 의 토큰 표 갱신
│     └─ check-docs.mjs              DESIGN.md 의 표가 최신인지 검사
├─ public/design-system/tokens.json  배포용 사본(빌드 때 복사)
└─ src/app/design-system/page.tsx    토큰을 눈으로 보는 페이지
```

- `DESIGN.md`는 두 부분이다. 손으로 쓰는 규칙(언제 어떤 역할 토큰을 쓰는지)과, 스크립트가 표시 구간 안에 채우는 토큰 표. 표를 손으로 고치지 않는다.
- `/design-system` 페이지는 `tokens.json`을 직접 import 해서 색 견본, 글자 크기, 간격, 모서리, 그림자를 보여 준다. 값이 페이지에 따로 적히지 않는다.
- 페이지는 검색에 잡히지 않게 한다(noindex, sitemap 제외). 메뉴에도 넣지 않는다. **[제안]**

### 5.2 토큰 구조

당근 SEED Design의 토큰 체계를 그대로 본뜬다. **[결정]** 이름 규칙·층 구조·단계 번호는 SEED를 따르고, 값만 워시펀 것으로 채운다. SEED에만 있는 당근 전용 토큰(`manner-temp`, `banner`, `magic` 등)은 가져오지 않는다.

**팔레트 (`$color.palette.*`)** — 제품 코드에서 직접 쓰지 않는다. 역할로 표현하기 어려운 예외에만 쓴다.

- 단계 번호는 SEED와 같다: `gray-00`~`gray-1000`, 유채색은 `100`~`1000`.
- `blue`: 대표 색 `#1C74BC`를 중심으로 한 스케일. `#1C74BC`가 놓이는 단계는 SEED의 carrot과 같은 `600`. **[제안]**
- `gray`, `green`, `yellow`, `red`: 중립·성공·경고·오류용.
- `static-white`, `static-black`: 테마와 무관하게 고정인 흰색·검정.

**역할 (`$color.fg.*`, `$color.bg.*`, `$color.stroke.*`)** — 제품 코드는 이것만 쓴다. SEED의 규칙대로 `속성.역할-변형[-상태]`로 이름 짓는다.

- 속성: `fg`(글자·아이콘), `bg`(배경), `stroke`(선)
- 역할: `brand`, `neutral`, `positive`, `warning`, `critical`, `informative`, `layer`
- 변형: `solid`(강한 강조), `weak`(약한 강조), `muted`, `subtle`, `contrast`
- 상태: `pressed`, `disabled`

1차에 넣는 역할 토큰과 출발값:

| 역할 토큰 | 뜻 | 출발값 | 출처 |
|---|---|---|---|
| `fg.neutral` | 기본 글자 | `#15171A` | 앱 `lightBlack` |
| `fg.neutral-muted` | 보조 글자 | `#6B7280` | 앱 `subBlack` |
| `fg.neutral-subtle` | 캡션·설명 | `#7E7E7E` | 앱 `gray4` |
| `fg.placeholder` | 입력 안내 글자 | `#C4C7CC` | 앱 `gray7` |
| `fg.disabled` | 비활성 글자 | `#B1B1B1` | 앱 `gray3` |
| `fg.brand` | 강조 글자·링크 | `#1C74BC` | 앱 `main` |
| `fg.on-brand-solid` | 대표 색 위의 글자 | `#FFFFFF` | 공통 |
| `bg.layer-basement` | 화면 가장 아래 배경 | `#F9F9FA` | 앱 `background` |
| `bg.layer-default` | 카드·패널 표면 | `#FFFFFF` | 공통 |
| `bg.layer-floating` | 모달·시트 | `#FFFFFF` | 공통 |
| `bg.neutral-weak` | 회색 면(칩·입력 배경) | `#F3F4F5` | 앱 `muted` |
| `bg.brand-solid` | 주요 버튼·강조 면 | `#1C74BC` | 앱 `main` |
| `bg.brand-solid-pressed` | 눌린 주요 버튼 | blue-700 | 팔레트에서 |
| `bg.brand-weak` | 선택된 카드·칩 배경 | `#EEF5FB` | 멤버십 키오스크(앱에 해당 값 없음) |
| `bg.disabled` | 비활성 면 | gray-200 | 팔레트에서 |
| `bg.overlay` | 모달 뒤 어둡게 | 검정 반투명 | 팔레트에서 |
| `stroke.neutral-weak` | 입력·버튼 외곽선 | `#E1E3E6` | 앱 `borderStrong` |
| `stroke.neutral-muted` | 구분선 | `#E7E7E7` | 앱 `gray2` |
| `stroke.brand-solid` | 선택 테두리 | `#1C74BC` | 앱 `main` |
| `fg.critical` / `bg.critical-solid` / `bg.critical-weak` | 오류 | `#FF0000` 계열 | 앱 `error` |
| `fg.warning` / `bg.warning-solid` / `bg.warning-weak` | 경고 | `#F59F0A` 계열 | 앱 `yellow` |
| `fg.positive` / `bg.positive-solid` / `bg.positive-weak` | 성공 | `#22C55E` 계열 | 키오스크(앱에 해당 값 없음) |
| `fg.informative` / `bg.informative-solid` / `bg.informative-weak` | 안내 | `#3B82F6` 계열 | 키오스크(앱에 해당 값 없음) |

**값이 충돌할 때: 고객 앱(washFun-Client)의 값을 따른다. [결정]** 앱에 해당하는 값이 없을 때만 멤버십 키오스크, 그다음 결제 키오스크 순으로 가져온다. **[제안]** 팔레트 단계는 이렇게 정해진 역할 값이 팔레트의 한 단계와 일치하도록 만든다.

이 규칙 때문에 2단계에서 눈에 띄게 바뀌는 곳:

| 항목 | 앱(기준) | 바뀌는 제품과 현재 값 |
|---|---|---|
| 화면 배경 | `#F9F9FA` | 멤버십 키오스크 `#F4F6F9`, 충전 키오스크 `#F6F8FB` |
| 경고 | `#F59F0A` | 멤버십 키오스크 `#FFC107` |
| 오류 | `#FF0000` | 결제 키오스크 `#EF4444`, 충전 키오스크 `#FB4B4D` |
| 캡션 글자 | `#7E7E7E` | 키오스크들의 `#6B7280`, `#8A929C` |
| 대표 색 | `#1C74BC` | 파트너 웹 `#2B3674`, 충전 키오스크 `#1A9FFF`, 랜딩 `#2E87FF` |

앱 안에서도 기본 글자색이 `black #222222`과 `lightBlack #15171A` 두 가지로 쓰인다. 다른 제품과 일치하는 `#15171A`를 기준으로 잡았다. **[제안]**

**색 외의 토큰** — 이것도 SEED의 이름을 따른다.

- 글꼴: Pretendard. **[제안]**
- 크기 단위 `$dimension.x1`~`x16`: `x1` = 4px. 간격은 이 단위만 쓴다. 자주 쓰는 간격에는 SEED처럼 뜻이 담긴 이름을 붙인다(예: `spacing-x.global-gutter` = 화면 좌우 여백).
- 글자 크기 `$font-size.t1`~`t10`과 줄 높이 `$line-height.t1`~`t10`: 번호가 클수록 크다.
- 글자 굵기 `$font-weight.regular` / `medium` / `bold`.
- 모서리 `$radius.r1`~`r6`, `full`.
- 그림자 `$shadow.s1`~`s3`: 번호가 클수록 높이 떠 있다.
- 환경별 값: 이름은 공통이고 값은 `web`, `app`, `kiosk` 세 벌을 둔다. 키오스크는 화면이 크고 멀리서 보므로 같은 `t5`라도 값이 크다. SEED가 "이름 체계는 그대로 두고 환경에 맞는 값을 주입한다"고 설명하는 방식이다. **[제안]**
- 위 공통 이름에 들어가지 않는 글자 크기·그림자(멤버십 키오스크의 `text-[Npx]`와 `k-*`, 결제 키오스크의 `kiosk-*`, 색 카드별 그림자 등)는 1차에서는 각 제품 안에 그대로 둔다. 1차에서 "역할 이름만 쓴다"는 규칙은 색에만 적용한다. **[제안]**

`tokens.json` 파일 형식은 W3C Design Tokens 형식(`$value`, `$type`)을 따른다. 최상위에 `version` 필드를 둔다.

### 5.3 각 제품이 토큰을 가져가는 방법

각 제품 저장소에 작은 스크립트 하나(`scripts/sync-tokens`)를 넣는다. 이 스크립트는

1. 랜딩 도메인의 `/design-system/tokens.json`을 내려받고,
2. 그 제품의 형식으로 바꾼 파일을 생성해 저장소에 커밋한다.

생성된 파일을 커밋하므로 빌드와 실행은 네트워크 없이 된다. 토큰이 바뀌면 각 제품에서 스크립트를 다시 돌리고, 차이를 보고 커밋한다.

| 제품 | 생성되는 파일 | 연결 방법 |
|---|---|---|
| washfun-landing | 없음(원본을 직접 import) | `tailwind.config.ts`가 원본을 읽는다 |
| wash-kiosk, wash-membership, washfun | Tailwind preset 파일 | `tailwind.config`의 `presets`에 추가 |
| wash-kiosk-charge | styled-components 테마 객체 | 기존 `src/styles/theme.ts`가 이를 참조 |
| washFun-Client | TS 객체 | 기존 `src/assets/styles/colors.ts`가 이를 참조 |
| washfun의 styled-components 부분 | TS 객체 | 기존 `src/styles/theme.ts`가 이를 참조 |

스크립트는 제품마다 복사해 두되 변환 로직은 같게 유지한다. 스크립트 원본도 랜딩의 `design-system/` 아래에 두고 문서에 사용법을 적는다. **[제안]**

### 5.4 기존 코드 옮기기

두 단계로 나눈다.

**1단계: 이름만 연결(화면 변화 없음)**
기존 이름을 지우지 않고, 값이 같은 것만 새 토큰을 가리키게 한다. 예: 앱의 `borderStrong: '#E1E3E6'` → `stroke.default` 참조. 값이 다른 것은 건드리지 않는다.

**2단계: 값 맞추기(화면이 바뀜)**
값이 기준과 다른 것을 기준에 맞춘다. 눈에 보이는 변화이므로 제품별로 바뀌는 화면을 확인받고 진행한다. 크게 바뀌는 곳:

- 파트너 웹: `#2B3674` → 대표 색
- 충전 키오스크: `#1A9FFF`/`#0A86EE` → 대표 색
- 랜딩: `#2E87FF` → 대표 색

2단계가 끝난 이름부터 옛 이름을 걷어낸다.

**확인 방법 [제안]:** 2단계는 제품마다 바뀌는 주요 화면의 전/후 화면 캡처를 사용자에게 보여 주고 승인을 받은 뒤 합친다. 토큰 변경만을 위한 별도 배포는 하지 않고, 각 제품의 다음 정기 배포(키오스크 설치 파일·OTA, 앱 스토어 릴리스)에 함께 싣는다.

**저장소 작업 방식 [제안]:** 여섯 저장소 모두 지금 진행 중인 작업 브랜치와 커밋 안 된 변경이 있다(멤버십 키오스크, 앱의 릴리스 브랜치 등). 토큰 작업은 제품마다 기본 브랜치에서 새 브랜치를 따서 별도 PR로 올리고, 진행 중인 작업 브랜치는 건드리지 않는다. 각 저장소에 손대기 전에 그 시점의 상태를 사용자에게 확인한다.

**적용 순서 [제안]**

1. washfun-landing — 원본·문서·페이지를 만들고 자신에게 먼저 적용
2. washFun-Client(앱) — 값의 기준이라 화면 변화가 가장 적다
3. wash-membership — 이미 역할 이름을 쓴다
4. wash-kiosk
5. washfun(파트너 웹)
6. wash-kiosk-charge — 6월 이후 변경이 없어 마지막

### 5.5 예외

- 랜딩의 마케팅용 글꼴(Jamsil, Poppins, ONE-Mobile-POP 등)은 랜딩 전용 예외로 남긴다. **[제안]**
- 결제 키오스크의 `secondary`(청록), `accent`(보라) 스케일은 1차 토큰에 넣지 않고 그 제품 안에 남긴다. 실제 사용처를 확인한 뒤 공통으로 올릴지 정한다. **[제안]**
- 앱의 `sub1~5`, `reservation`, `auto`, `station` 같은 기능별 색도 같은 방식으로 제품 안에 남긴다. **[제안]**

## 6. 사용자가 정한 것 (2026-11-16)

1. **대표 색은 `#1C74BC`.**
2. **값이 충돌하면 고객 앱의 값을 따른다.**
3. **`/design-system` 페이지와 `tokens.json`은 공개 도메인에 올려도 된다.** 검색에서는 숨긴다(제안 유지).
4. **당근 SEED Design을 레퍼런스로 삼는다.** 토큰의 이름 규칙과 층 구조를 SEED에 맞춘다.

## 7. 만드는 사람에게 맡기는 것

- blue 팔레트의 중간 단계 값 조정(명도 대비 확인 포함)
- 환경별 글자 크기·모서리의 구체적 값. 각 제품의 현재 값에서 가장 많이 쓰이는 것을 고른다
- 변환 스크립트의 언어와 세부 구현
- `DESIGN.md` 표의 모양, `/design-system` 페이지의 배치
- 1단계에서 "값이 같은 것"을 찾는 방법
