# 워시펀 디자인 시스템

워시펀 제품(결제·멤버십·충전 키오스크, 파트너 웹, 랜딩, 고객 앱)이 함께 쓰는 색·글자·간격의 기준이다.

- 값의 원본은 `design-system/tokens.json` 하나다. 이 문서의 "토큰" 표와 `/design-system` 페이지는 그 파일에서 만들어진다.
- 토큰을 고친 뒤에는 `npm run tokens:build`로 아래 표와 랜딩의 Tailwind preset을 다시 만든다. 표를 손으로 고치지 않는다.
- 구조와 이름 규칙은 당근 [SEED Design](https://seed-design.io)을 따른다.

## 구조: 팔레트 → 역할

토큰은 두 층이다.

| 층 | 뜻 | 예 |
| --- | --- | --- |
| 팔레트 | 쓸 수 있는 색의 목록 | `color.palette.blue-600` |
| 역할 | 그 색을 어디에 쓰는지 | `color.bg.brand-solid` |

**제품 코드는 역할 토큰만 쓴다.** 팔레트 토큰과 색 값(`#1C74BC`)을 직접 쓰지 않는다. 역할로 표현할 수 없는 예외에만 팔레트를 쓴다.

역할로 부르면 대표 색을 바꿀 때 `color.bg.brand-solid` 한 곳만 고치면 되고, 값이 같아도 뜻이 다른 색을 따로 바꿀 수 있다.

## 이름 규칙

역할 색의 이름은 `속성.역할-변형[-상태]`이다.

| 자리 | 값 | 뜻 |
| --- | --- | --- |
| 속성 | `fg` | 글자·아이콘 |
| | `bg` | 배경·면 |
| | `stroke` | 선 |
| 역할 | `brand` | 브랜드, 화면에서 가장 중요한 동작 |
| | `neutral` | 일반 콘텐츠 |
| | `positive` / `warning` / `critical` / `informative` | 성공 / 경고 / 오류 / 안내 |
| | `layer` | 화면의 깊이(바닥·표면·떠 있는 면) |
| 변형 | `solid` | 강한 강조 |
| | `weak` | 약한 강조 |
| | `muted` / `subtle` | 한 단계, 두 단계 덜 눈에 띄게 |
| 상태 | `pressed` / `disabled` | 눌림 / 비활성 |

팔레트 단계는 gray `00`~`1000`, 유채색 `100`~`1000`이고 숫자가 클수록 어둡다.

## 고르는 법

- 글자와 아이콘은 `fg`, 면은 `bg`, 선은 `stroke`에서 고른다.
- 기본 글자는 `fg.neutral`, 보조 글자는 `fg.neutral-muted`, 캡션은 `fg.neutral-subtle`.
- 화면 바닥은 `bg.layer-basement`, 그 위 카드·패널은 `bg.layer-default`, 모달·시트는 `bg.layer-floating`.
- 주요 버튼은 `bg.brand-solid` 위에 `fg.on-brand-solid`. 색 면 위의 글자는 항상 `fg.on-*`을 쓴다.
- 입력 칸의 외곽선은 `stroke.neutral`(배경과 3:1 이상). 카드·외곽선 버튼처럼 꾸미는 선은 `stroke.neutral-weak`, 영역을 나누는 구분선은 `stroke.neutral-muted`.
- 간격은 `dimension.x1`(4px) 단위만 쓴다.
- 그라디언트 토큰은 색 지점만 정한다. 방향은 쓰는 곳에서 고른다(Tailwind는 `bg-gradient-glow-brand`가 세로, `-x`를 붙이면 가로).

## 아이콘

- 아이콘 원본은 `design-system/icons/`의 SVG다. [Remix Icon](https://remixicon.com) 공식 파일(Apache License 2.0)을 고치지 않고 쓴다. 24 격자에 면으로 그린 Line·Fill 두 가지다.
- 전체 목록은 `/design-system/iconography/library`에서 이름이나 한글로 찾는다. 없는 아이콘은 `design-system/icons/meta.json`에 모양 이름과 한글 검색어를 적고 `node design-system/scripts/import-remix-icons.mjs <remixicon 패키지 폴더>`로 가져온다.
- 이름은 쓰임새가 아니라 모양으로 짓는다: `모양[-번호]-line|fill` (`home-line`, `settings-4-line`, `delete-bin-fill`).
- Line이 기본이다. Fill은 선택된 상태, 색 면 안, 16px 이하에 쓴다. 한 묶음 안에서 둘을 섞지 않는다.
- 파일에는 색과 크기를 넣지 않는다. 색은 `fg` 역할 색으로, 크기는 `icon-size.xs`~`xl`로 정한다. 기본은 `icon-size.lg`.
- 아이콘만 있는 버튼의 누르는 영역은 `touch-target.min` 이상이다.
- 여러 색을 쓰는 그림(로고, 세차 코스 그림)은 아이콘이 아니라 이미지로 다룬다.
- Tailwind는 `size-icon-lg`, `min-h-touch min-w-touch`, 앱은 `tokens.iconSize.lg`, `tokens.touchTarget.min`.

## 글쓰기

- 규칙과 용어의 원본은 `design-system/writing.json`이다. 예시와 함께 보려면 `/design-system/writing`.
- 원칙: 쉬운 말로 쓴다. 한 문장에 하나만 쓴다. 다음에 할 일을 알려 준다. 같은 것은 같은 말로 부른다.
- 말투는 환경을 따른다. 고객 앱과 키오스크는 해요체("결제하지 못했어요"), 파트너 웹과 랜딩은 합쇼체("정산 내역이 없습니다."). 부탁은 어디서나 "~해주세요".
- 버튼은 일어날 일을 "~하기"로 쓴다. 확인·닫기·다음·이전으로·로그인은 그대로 쓴다. 확인 창의 버튼에는 "확인" 대신 "삭제하기"처럼 일어날 일을 쓴다. 창만 닫는 버튼은 "닫기"이고, "취소"는 결제 취소처럼 실제로 무언가를 취소할 때만 쓴다.
- 오류는 "무슨 일 + 다음에 할 일"로 쓴다. 오류 코드, 서버가 준 문장, 개발 용어는 화면에 내보내지 않는다.
- 완료 알림은 "~되었습니다" 대신 "~했어요", "~했습니다"로 쓰고 "성공적으로"를 뺀다.
- 능동형으로 쓴다("수정되었습니다" → "수정했어요"). 만료·종료·해지처럼 수동형이 더 정확한 말은 예외이고, "되어요"는 "돼요"로 줄인다.
- 긍정형으로 쓴다. "없어요"로 끝내지 않고 "~하면 ~할 수 있어요"로 쓴다. 정책 때문에 아예 쓸 수 없을 때만 부정형으로 분명히 쓴다.
- 해요체 환경에서는 높임말을 가볍게 쓴다. "~하시겠어요?" → "~할까요?", "계시다" → "있다", "께" → "에게".
- 명사를 잇지 않고 풀어 쓴다("잔액 부족입니다" → "잔액이 부족해요"). 삽입·금일·익일·상이·기재·불가 같은 한자어는 쉬운 말로 바꾼다.
- 금액은 `10,000원`, 포인트는 `10,000P`, 날짜는 `2026.11.17`, 날짜와 시간은 `2026.11.17 14:30`. 느낌표와 말줄임표는 쓰지 않는다.
- 용어: 포인트(캐시·충전금 ✕), 포인트 충전(잔액 충전 ✕), 매장(지점 ✕), 구독(정기구독·정기권·회원권 ✕), 세차(워시 ✕, 제품 이름 제외), 직원에게 문의(관리자에게 문의 ✕), 확인(OK ✕), 아니요(아니오 ✕), 잠시 후(잠시후 ✕).
- 문구를 검사하려면 `design-system/lib/writing.mjs`의 `findIssues(문구, 환경)`을 쓴다. 피하는 말, 어려운 한자어, 금액 표기, 느낌표·말줄임표, 말투, 수동형, 지나친 높임말을 찾는다.

## 접근성

- 규칙과 검사할 색 짝의 원본은 `design-system/accessibility.json`이다. 지금 값으로 계산한 대비표는 `/design-system/accessibility`.
- 글자는 배경과 4.5:1 이상, 아이콘과 외곽선은 3:1 이상의 명도 대비를 가진다. 큰 글자(24px 이상, 굵게 19px 이상)는 3:1.
- 기준을 지키는 짝: `fg.neutral`, `fg.neutral-muted`, `fg.brand`를 `bg.layer-default` 위에, `fg.on-brand-solid`를 `bg.brand-solid` 위에, 상태 색 글자를 `bg.layer-default`와 옅은 상태 면 위에.
- 검사하는 색 짝은 모두 기준을 지킨다. 캡션(`fg.neutral-subtle`)과 입력 안내 글자(`fg.placeholder`)는 보조 글자와 같은 색이므로 위계는 크기와 굵기로 나눈다. 입력 안내 글자는 레이블을 대신하지 않는다.
- 상태 색 글자(`fg.critical`·`warning`·`positive`·`informative`)와 강조 면은 대비 기준을 지키는 단계를 가리킨다. 경고 강조 면(`bg.warning-solid`) 위의 글자만 `fg.on-warning-solid`(어두운 글자)를 쓰고, 나머지 강조 면 위에는 `fg.on-brand-solid`를 쓴다.
- 본문은 `font-size.t5` 이상, 줄 높이 1.5 이상. 누르는 영역은 `touch-target.min` 이상.
- 색만으로 상태를 알리지 않는다. 아이콘만 있는 버튼에는 읽어 줄 이름을 붙이고, 입력 칸에는 보이는 레이블을 둔다.
- 키오스크는 한 화면에 한 가지 일, 어느 화면에서나 이전으로·처음으로, 결과는 화면과 소리로 함께 알린다. KS X 9211 수치와의 대조는 아직 하지 않았다.
- 대비를 계산하려면 `design-system/lib/contrast.mjs`의 `contrastRatio(색, 색)`을 쓴다.

## 환경별 값

글자 크기·줄 높이·모서리·아이콘 크기·누르는 영역은 이름이 같고 값만 환경마다 다르다. 키오스크는 화면이 크고 멀리서 보므로 같은 `font-size.t5`라도 값이 크다.

| 환경 | 쓰는 제품 |
| --- | --- |
| `web` | 랜딩, 파트너 웹 |
| `app` | 고객 앱 |
| `kiosk` | 결제·멤버십·충전 키오스크 |

색·간격·그림자는 모든 환경이 같은 값을 쓴다.

## 다른 제품에서 가져가기

`design-system/sync/` 폴더(파일 두 개: `convert.mjs`, `sync-tokens.mjs`)를 제품 저장소에 복사하고 아래 명령으로 토큰을 받아 그 제품의 형식으로 바꾼다. 만들어진 파일은 커밋한다.

```bash
node sync-tokens.mjs --format tailwind --env kiosk --out src/styles/tokens-preset.cjs
node sync-tokens.mjs --format ts --env app --out src/assets/styles/tokens.ts
```

- `--source`를 생략하면 `https://www.lifedivergence.com/design-system/tokens.json`에서 받는다. 파일 경로도 줄 수 있다.
- `--format tailwind`는 Tailwind preset(`text-fg-neutral`, `bg-bg-brand-solid`, `border-stroke-neutral-weak`, `p-x4`, `text-t5`, `rounded-r3`, `shadow-s2`, `bg-gradient-glow-brand`)을 만든다.
- `--format ts`는 `tokens.color.fg.neutralMuted`처럼 쓰는 객체를 만든다. 크기는 단위 없는 숫자다.

## 예외

- 랜딩의 마케팅용 글꼴(Jamsil, Poppins, ONE-Mobile-POP 등)은 랜딩에서만 쓴다.
- 결제 키오스크의 `secondary`·`accent` 스케일, 고객 앱의 `sub1`~`sub5`·`reservation`·`auto`·`station` 같은 기능별 색은 각 제품 안에 둔다.
- 공통 이름에 없는 글자 크기와 그림자는 당분간 각 제품의 값을 그대로 쓴다.

## 토큰

<!-- tokens:start -->
버전 0.3.0

### 역할 색

| 이름 | 참조 | 값 | 뜻 |
| --- | --- | --- | --- |
| `color.fg.neutral` | `color.palette.gray-1000` | `#15171A` | 기본 글자 |
| `color.fg.neutral-muted` | `color.palette.gray-800` | `#6B7280` | 보조 글자 |
| `color.fg.neutral-subtle` | `color.palette.gray-800` | `#6B7280` | 캡션·설명 |
| `color.fg.placeholder` | `color.palette.gray-800` | `#6B7280` | 입력 안내 글자 |
| `color.fg.disabled` | `color.palette.gray-600` | `#B1B1B1` | 비활성 글자 |
| `color.fg.brand` | `color.palette.blue-600` | `#1C74BC` | 강조 글자·링크 |
| `color.fg.on-brand-solid` | `color.palette.static-white` | `#FFFFFF` | 대표 색과 오류·성공·안내 강조 면 위의 글자 |
| `color.fg.on-warning-solid` | `color.palette.gray-1000` | `#15171A` | 경고 강조 면 위의 글자 |
| `color.fg.critical` | `color.palette.red-800` | `#CC0000` | 오류 글자 |
| `color.fg.warning` | `color.palette.yellow-900` | `#B45309` | 경고 글자 |
| `color.fg.positive` | `color.palette.green-900` | `#15803D` | 성공 글자 |
| `color.fg.informative` | `color.palette.azure-800` | `#2563EB` | 안내 글자 |
| `color.bg.layer-basement` | `color.palette.gray-100` | `#F9F9FA` | 화면 가장 아래 배경 |
| `color.bg.layer-default` | `color.palette.gray-00` | `#FFFFFF` | 카드·패널 표면 |
| `color.bg.layer-floating` | `color.palette.gray-00` | `#FFFFFF` | 모달·시트 |
| `color.bg.neutral-weak` | `color.palette.gray-200` | `#F3F4F5` | 회색 면(칩·입력 배경) |
| `color.bg.disabled` | `color.palette.gray-200` | `#F3F4F5` | 비활성 면 |
| `color.bg.brand-solid` | `color.palette.blue-600` | `#1C74BC` | 주요 버튼·강조 면 |
| `color.bg.brand-solid-pressed` | `color.palette.blue-700` | `#165D96` | 눌린 주요 버튼 |
| `color.bg.brand-weak` | `color.palette.blue-100` | `#F3F8FC` | 선택된 카드·칩 배경 |
| `color.bg.overlay` | `color.palette.static-black-alpha-700` | `#000000B3` | 모달 뒤 어둡게 |
| `color.bg.critical-solid` | `color.palette.red-800` | `#CC0000` | 오류 강조 면 |
| `color.bg.critical-weak` | `color.palette.red-100` | `#FFE5E5` | 오류 옅은 면 |
| `color.bg.warning-solid` | `color.palette.yellow-700` | `#F59F0A` | 경고 강조 면 |
| `color.bg.warning-weak` | `color.palette.yellow-100` | `#FFF8E1` | 경고 옅은 면 |
| `color.bg.positive-solid` | `color.palette.green-900` | `#15803D` | 성공 강조 면 |
| `color.bg.positive-weak` | `color.palette.green-100` | `#F0FDF4` | 성공 옅은 면 |
| `color.bg.informative-solid` | `color.palette.azure-800` | `#2563EB` | 안내 강조 면 |
| `color.bg.informative-weak` | `color.palette.azure-100` | `#EFF6FF` | 안내 옅은 면 |
| `color.stroke.neutral` | `color.palette.gray-700` | `#7E7E7E` | 입력 칸 외곽선 |
| `color.stroke.neutral-weak` | `color.palette.gray-400` | `#E1E3E6` | 카드·버튼 외곽선(꾸미는 선) |
| `color.stroke.neutral-muted` | `color.palette.gray-300` | `#E7E7E7` | 구분선 |
| `color.stroke.brand-solid` | `color.palette.blue-600` | `#1C74BC` | 선택 테두리 |

### 팔레트

| 이름 | 값 |
| --- | --- |
| `color.palette.gray-00` | `#FFFFFF` |
| `color.palette.gray-100` | `#F9F9FA` |
| `color.palette.gray-200` | `#F3F4F5` |
| `color.palette.gray-300` | `#E7E7E7` |
| `color.palette.gray-400` | `#E1E3E6` |
| `color.palette.gray-500` | `#C4C7CC` |
| `color.palette.gray-600` | `#B1B1B1` |
| `color.palette.gray-700` | `#7E7E7E` |
| `color.palette.gray-800` | `#6B7280` |
| `color.palette.gray-900` | `#2A2A2A` |
| `color.palette.gray-1000` | `#15171A` |
| `color.palette.blue-100` | `#F3F8FC` |
| `color.palette.blue-200` | `#CCE5F5` |
| `color.palette.blue-300` | `#99CBEB` |
| `color.palette.blue-400` | `#66B1E1` |
| `color.palette.blue-500` | `#3397D7` |
| `color.palette.blue-600` | `#1C74BC` |
| `color.palette.blue-700` | `#165D96` |
| `color.palette.blue-800` | `#114671` |
| `color.palette.blue-900` | `#0B2E4B` |
| `color.palette.blue-1000` | `#061726` |
| `color.palette.red-100` | `#FFE5E5` |
| `color.palette.red-200` | `#FFBFBF` |
| `color.palette.red-300` | `#FF9999` |
| `color.palette.red-400` | `#FF7272` |
| `color.palette.red-500` | `#FF4C4C` |
| `color.palette.red-600` | `#FF2626` |
| `color.palette.red-700` | `#FF0000` |
| `color.palette.red-800` | `#CC0000` |
| `color.palette.red-900` | `#990000` |
| `color.palette.yellow-100` | `#FFF8E1` |
| `color.palette.yellow-200` | `#FDE9BD` |
| `color.palette.yellow-300` | `#FCDA99` |
| `color.palette.yellow-400` | `#FACC76` |
| `color.palette.yellow-500` | `#F8BD52` |
| `color.palette.yellow-600` | `#F7AE2E` |
| `color.palette.yellow-700` | `#F59F0A` |
| `color.palette.yellow-800` | `#D97706` |
| `color.palette.yellow-900` | `#B45309` |
| `color.palette.green-100` | `#F0FDF4` |
| `color.palette.green-200` | `#DCFCE7` |
| `color.palette.green-300` | `#B7F1CC` |
| `color.palette.green-400` | `#92E6B0` |
| `color.palette.green-500` | `#6CDB95` |
| `color.palette.green-600` | `#47D079` |
| `color.palette.green-700` | `#22C55E` |
| `color.palette.green-800` | `#16A34A` |
| `color.palette.green-900` | `#15803D` |
| `color.palette.azure-100` | `#EFF6FF` |
| `color.palette.azure-200` | `#DBEAFE` |
| `color.palette.azure-300` | `#BBD5FC` |
| `color.palette.azure-400` | `#9BC0FB` |
| `color.palette.azure-500` | `#7BACF9` |
| `color.palette.azure-600` | `#5B97F8` |
| `color.palette.azure-700` | `#3B82F6` |
| `color.palette.azure-800` | `#2563EB` |
| `color.palette.azure-900` | `#1D4ED8` |
| `color.palette.static-white` | `#FFFFFF` |
| `color.palette.static-black` | `#000000` |
| `color.palette.static-black-alpha-700` | `#000000B3` |
| `color.palette.static-black-alpha-500` | `#00000080` |
| `color.palette.static-white-alpha-00` | `#FFFFFF00` |
| `color.palette.static-white-alpha-700` | `#FFFFFFAB` |
| `color.palette.static-white-alpha-900` | `#FFFFFFD9` |

### 크기 단위

| 이름 | 값 |
| --- | --- |
| `dimension.x1` | 4px |
| `dimension.x2` | 8px |
| `dimension.x3` | 12px |
| `dimension.x4` | 16px |
| `dimension.x5` | 20px |
| `dimension.x6` | 24px |
| `dimension.x7` | 28px |
| `dimension.x8` | 32px |
| `dimension.x9` | 36px |
| `dimension.x10` | 40px |
| `dimension.x12` | 48px |
| `dimension.x14` | 56px |
| `dimension.x16` | 64px |
| `dimension.spacing-x.global-gutter` | `dimension.x4` → 16px |

### 글자 굵기

| 이름 | 값 |
| --- | --- |
| `font-weight.regular` | 400 |
| `font-weight.medium` | 500 |
| `font-weight.bold` | 700 |

### 그림자

| 이름 | 값 |
| --- | --- |
| `shadow.s1` | 0 2px 8px rgba(21,23,26,0.05) |
| `shadow.s2` | 0 10px 30px rgba(21,23,26,0.06) |
| `shadow.s3` | 0 30px 80px rgba(21,23,26,0.35) |

### 그라디언트

| 이름 | 값 |
| --- | --- |
| `gradient.glow-brand` | #F9F9FA 0%, #CCE5F5 100% |
| `gradient.highlight-brand` | #1C74BC 0%, #3397D7 100% |
| `gradient.fade-layer` | #FFFFFF00 0%, #FFFFFFD9 60%, #FFFFFF 100% |
| `gradient.shimmer-neutral` | #FFFFFF00 0%, #FFFFFFAB 46%, #FFFFFFAB 54%, #FFFFFF00 100% |

### 글자 크기 (환경별)

| 이름 | web | app | kiosk |
| --- | --- | --- | --- |
| `font-size.t1` | 11px | 11px | 16px |
| `font-size.t2` | 12px | 12px | 18px |
| `font-size.t3` | 13px | 13px | 20px |
| `font-size.t4` | 14px | 14px | 24px |
| `font-size.t5` | 16px | 16px | 28px |
| `font-size.t6` | 18px | 18px | 32px |
| `font-size.t7` | 20px | 20px | 36px |
| `font-size.t8` | 24px | 24px | 40px |
| `font-size.t9` | 28px | 28px | 48px |
| `font-size.t10` | 32px | 32px | 64px |

### 줄 높이 (환경별)

| 이름 | web | app | kiosk |
| --- | --- | --- | --- |
| `line-height.t1` | 1.5 | 1.5 | 1.5 |
| `line-height.t2` | 1.5 | 1.5 | 1.5 |
| `line-height.t3` | 1.5 | 1.5 | 1.5 |
| `line-height.t4` | 1.5 | 1.5 | 1.5 |
| `line-height.t5` | 1.5 | 1.5 | 1.5 |
| `line-height.t6` | 1.35 | 1.35 | 1.35 |
| `line-height.t7` | 1.35 | 1.35 | 1.35 |
| `line-height.t8` | 1.35 | 1.35 | 1.35 |
| `line-height.t9` | 1.25 | 1.25 | 1.25 |
| `line-height.t10` | 1.25 | 1.25 | 1.25 |

### 모서리 (환경별)

| 이름 | web | app | kiosk |
| --- | --- | --- | --- |
| `radius.r1` | 4px | 4px | 8px |
| `radius.r2` | 8px | 8px | 12px |
| `radius.r3` | 12px | 12px | 16px |
| `radius.r4` | 16px | 16px | 20px |
| `radius.r5` | 20px | 20px | 24px |
| `radius.r6` | 24px | 24px | 30px |
| `radius.full` | 9999px | 9999px | 9999px |

### 아이콘 크기 (환경별)

| 이름 | web | app | kiosk |
| --- | --- | --- | --- |
| `icon-size.xs` | 12px | 12px | 24px |
| `icon-size.sm` | 16px | 16px | 32px |
| `icon-size.md` | 20px | 20px | 40px |
| `icon-size.lg` | 24px | 24px | 48px |
| `icon-size.xl` | 32px | 32px | 64px |

### 누르는 영역 (환경별)

| 이름 | web | app | kiosk |
| --- | --- | --- | --- |
| `touch-target.min` | 44px | 44px | 64px |
<!-- tokens:end -->
