import Link from "next/link";
import DocPage from "@/components/design-system/DocPage";
import EnvTable from "@/components/design-system/EnvTable";
import Icon from "@/components/design-system/Icon";
import TokenSection from "@/components/design-system/TokenSection";
import { icons } from "@/components/design-system/icons";
import { list } from "@/components/design-system/tokens";

const code = "rounded-r1 bg-bg-neutral-weak px-x1 text-t3";
const rule = "flex list-disc flex-col gap-x2 pl-x5 text-t4 text-fg-neutral-muted";

const PAIRS = [
  ["home-line", "home-fill"],
  ["heart-line", "heart-fill"],
];

const COLORS = [
  { token: "color.fg.neutral", className: "text-fg-neutral", use: "기본 아이콘" },
  { token: "color.fg.neutral-muted", className: "text-fg-neutral-muted", use: "보조 아이콘, 선택 안 된 탭" },
  { token: "color.fg.brand", className: "text-fg-brand", use: "선택된 탭, 강조" },
  { token: "color.fg.critical", className: "text-fg-critical", use: "삭제, 오류" },
  { token: "color.fg.disabled", className: "text-fg-disabled", use: "비활성" },
];

export default function IconographyPage() {
  const all = icons();
  const touch = list("env.web.touch-target")[0]?.value ?? "44px";
  const base = list("env.web.icon-size").find((token) => token.name === "lg")?.value ?? "24px";

  return (
    <DocPage name="iconography">
      <TokenSection
        id="variants"
        title="Variants"
        lead="같은 모양을 Line과 Fill 두 가지로 둡니다. 고객 앱이 쓰는 Remix Icon의 방식 그대로입니다."
      >
        <div className="grid grid-cols-2 gap-x6 md:grid-cols-1">
          {PAIRS.map(([line, fill]) => (
            <div key={line} className="flex items-center justify-around rounded-r3 bg-bg-layer-basement py-x8">
              {[line, fill].map((name) => (
                <div key={name} className="flex flex-col items-center gap-x2">
                  <Icon name={name} className="size-x10 text-fg-neutral" />
                  <span className="text-t2 text-fg-neutral-muted">{name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <ul className={`mt-x6 ${rule}`}>
          <li>Line이 기본입니다. 상단 내비게이션, 목록, 설정처럼 정보를 차분히 보여 주는 곳에 씁니다.</li>
          <li>Fill은 선택된 상태와 강조에 씁니다. 하단 탭은 선택 안 됨이 Line, 선택됨이 Fill입니다.</li>
          <li>버튼·칩처럼 색 면 안에 들어가는 아이콘과 16px 이하의 작은 아이콘은 Fill이 더 잘 보입니다.</li>
          <li>한 묶음 안에서는 Line과 Fill을 섞지 않습니다. 상태를 나타낼 때만 바꿉니다.</li>
        </ul>
      </TokenSection>

      <TokenSection id="naming" title="Naming" lead="이름은 쓰임새가 아니라 모양으로 짓습니다.">
        <p className="text-t5 font-medium text-fg-neutral">
          모양[-번호]-<span className="text-fg-brand">line | fill</span>
        </p>
        <ul className={`mt-x4 ${rule}`}>
          <li>
            <code className={code}>delete-bin-fill</code>처럼 보이는 모양을 적습니다.{" "}
            <code className={code}>remove-coupon</code>처럼 쓰는 곳을 이름에 넣지 않습니다.
          </li>
          <li>
            같은 모양의 다른 그림은 번호로 구분합니다(<code className={code}>settings-4-line</code>,{" "}
            <code className={code}>user-3-fill</code>). 번호는 Remix Icon의 것을 그대로 씁니다.
          </li>
          <li>소문자와 하이픈만 쓰고, 끝은 반드시 line 또는 fill입니다.</li>
        </ul>
      </TokenSection>

      <TokenSection
        id="size"
        title="Size"
        lead={`기본 크기는 icon-size.lg(${base})입니다. 비율을 지켜 다섯 단계로만 키우고 줄입니다.`}
      >
        <EnvTable group="icon-size" sample={(value) => <Icon name="home-line" size={value} className="text-fg-neutral" />} />
        <ul className={`mt-x6 ${rule}`}>
          <li>글자 옆에 둘 때는 글자 줄 높이와 비슷한 단계를 고릅니다. t4·t5 글자에는 md, t6·t7에는 lg.</li>
          <li>키오스크는 멀리서 보고 손가락으로 누르므로 같은 이름이라도 값이 두 배입니다.</li>
        </ul>
      </TokenSection>

      <TokenSection
        id="touch-area"
        title="Touch Area"
        lead="아이콘만 있는 버튼은 아이콘보다 넓은 영역을 누를 수 있어야 합니다."
      >
        <div className="flex items-center gap-x8 rounded-r3 bg-bg-layer-basement p-x8 md:flex-col">
          <span
            className="flex items-center justify-center rounded-r2 border border-dashed border-stroke-brand-solid bg-bg-brand-weak"
            style={{ width: touch, height: touch }}
          >
            <Icon name="close-large-line" size={base} className="text-fg-neutral" />
          </span>
          <p className="text-t4 text-fg-neutral-muted">
            {base} 아이콘 + 누르는 영역 {touch}. 점선이 실제로 눌리는 범위입니다.
          </p>
        </div>
        <div className="mt-x6">
          <EnvTable group="touch-target" />
        </div>
      </TokenSection>

      <TokenSection
        id="color"
        title="Color"
        lead="아이콘 파일에는 색이 없습니다. 글자색(currentColor)을 따르므로 fg 역할 색으로 칠합니다."
      >
        <ul className="grid grid-cols-5 gap-x4 lg:grid-cols-3 md:grid-cols-2">
          {COLORS.map((color) => (
            <li key={color.token} className="min-w-0">
              <div className="flex h-[88px] items-center justify-center rounded-r3 bg-bg-layer-basement">
                <Icon name="heart-fill" className={`size-icon-xl ${color.className}`} />
              </div>
              <p className="mt-x2 break-all text-t3 font-medium">{color.token}</p>
              <p className="text-t2 text-fg-neutral-muted">{color.use}</p>
            </li>
          ))}
        </ul>
        <p className="mt-x6 text-t4 text-fg-neutral-muted">
          색 면 위에서는 글자와 마찬가지로 <code className={code}>fg.on-brand-solid</code>를 씁니다. 로고와 세차 코스
          그림처럼 여러 색을 쓰는 그림은 아이콘이 아니라 이미지로 다룹니다.
        </p>
      </TokenSection>

      <TokenSection
        id="library"
        title="Library"
        lead={`제품이 실제로 쓰는 모양 ${all.length / 2}개를 Line과 Fill로 등록했습니다. 모두 Remix Icon 공식 파일입니다.`}
      >
        <ul className="grid grid-cols-8 gap-x2 lg:grid-cols-6 md:grid-cols-4">
          {all
            .filter((entry) => entry.variant === "line")
            .slice(0, 16)
            .map((entry) => (
              <li
                key={entry.name}
                className="flex aspect-square items-center justify-center rounded-r3 border border-stroke-neutral-muted"
              >
                <Icon name={entry.name} className="size-icon-lg text-fg-neutral" />
              </li>
            ))}
        </ul>
        <Link
          href="/design-system/iconography/library"
          className="mt-x6 inline-flex min-h-touch items-center rounded-r2 bg-bg-brand-solid px-x5 text-t4 font-bold text-fg-on-brand-solid"
        >
          아이콘 {all.length}개 모두 보기
        </Link>
      </TokenSection>

      <TokenSection id="usage" title="쓰는 법" lead="아이콘 원본은 design-system/icons 폴더의 SVG 파일입니다.">
        <ul className={rule}>
          <li>
            Tailwind: <code className={code}>size-icon-lg text-fg-neutral</code>, 아이콘 버튼은{" "}
            <code className={code}>min-h-touch min-w-touch</code>
          </li>
          <li>
            앱: <code className={code}>tokens.iconSize.lg</code>, <code className={code}>tokens.touchTarget.min</code>
          </li>
          <li>
            파일: <code className={code}>/design-system/icons/home-line.svg</code>
          </li>
          <li>뜻을 전하는 아이콘 버튼에는 읽어 줄 이름(aria-label)을 붙이고, 꾸밈용 아이콘은 읽지 않게 숨깁니다.</li>
        </ul>
      </TokenSection>

      <TokenSection id="add" title="새 아이콘 추가" lead="먼저 Library에 있는지 찾고, 없을 때만 추가합니다.">
        <ol className="flex list-decimal flex-col gap-x2 pl-x5 text-t4 text-fg-neutral-muted">
          <li>Remix Icon에서 같은 모양을 찾아 Line과 Fill을 함께 가져옵니다. 파일은 고치지 않습니다.</li>
          <li>없으면 24 격자에 맞춰 새로 그립니다. 선이 아니라 면으로 그리고 색은 넣지 않습니다.</li>
          <li>design-system/icons의 meta.json에 모양 이름과 한글 검색어를 적고 가져오기 스크립트를 돌리면 Library에 나타납니다.</li>
        </ol>
      </TokenSection>
    </DocPage>
  );
}
