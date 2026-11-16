import ColorSwatch from "@/components/design-system/ColorSwatch";
import EnvTable from "@/components/design-system/EnvTable";
import TokenSection from "@/components/design-system/TokenSection";
import { list, tokens } from "@/components/design-system/tokens";

const grid = "grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-x4";

const PALETTE_GROUPS = ["gray", "blue", "red", "yellow", "green", "azure", "static"];

export default function DesignSystemPage() {
  const fg = list("color.fg");
  const bg = list("color.bg");
  const stroke = list("color.stroke");
  const palette = list("color.palette");
  const brandSolid = bg.find((token) => token.name === "brand-solid")?.value;

  return (
    <main className="min-h-screen bg-bg-layer-basement text-fg-neutral">
      <div className="mx-auto max-w-[1080px] px-x6 py-x12 md:px-x4 md:py-x8">
        <header className="pb-x10">
          <p className="text-t3 font-medium text-fg-brand">v{tokens.version}</p>
          <h1 className="mt-x1 text-t10 font-bold md:text-t9">워시펀 디자인 시스템</h1>
          <p className="mt-x3 max-w-[640px] text-t5 text-fg-neutral-muted">
            워시펀 제품이 함께 쓰는 색·글자·간격의 기준입니다. 토큰은 팔레트와 역할 두 층으로
            나뉘고, 제품 코드는 역할 토큰만 씁니다.
          </p>
          <a
            href="/design-system/tokens.json"
            className="mt-x5 inline-block rounded-r2 bg-bg-brand-solid px-x4 py-x2 text-t4 font-medium text-fg-on-brand-solid"
          >
            tokens.json 받기
          </a>
        </header>

        <TokenSection
          id="roles"
          title="역할 색"
          lead="어디에 쓰는지를 이름에 담은 색입니다. 속성(fg · bg · stroke)과 역할, 변형으로 이름 짓습니다."
        >
          <h3 className="text-t5 font-bold">fg — 글자·아이콘</h3>
          <div className={`mt-x3 ${grid}`}>
            {fg.map((token) => (
              <ColorSwatch
                key={token.path}
                token={token}
                variant="text"
                on={token.name.startsWith("on-") ? brandSolid : undefined}
              />
            ))}
          </div>
          <h3 className="mt-x8 text-t5 font-bold">bg — 배경·면</h3>
          <div className={`mt-x3 ${grid}`}>
            {bg.map((token) => (
              <ColorSwatch key={token.path} token={token} variant="fill" />
            ))}
          </div>
          <h3 className="mt-x8 text-t5 font-bold">stroke — 선</h3>
          <div className={`mt-x3 ${grid}`}>
            {stroke.map((token) => (
              <ColorSwatch key={token.path} token={token} variant="line" />
            ))}
          </div>
        </TokenSection>

        <TokenSection
          id="palette"
          title="팔레트"
          lead="역할 색이 가리키는 값의 목록입니다. 숫자가 클수록 어둡습니다. 제품 코드에서 직접 쓰지 않습니다."
        >
          <div className="flex flex-col gap-x6">
            {PALETTE_GROUPS.map((group) => (
              <div key={group} className={grid}>
                {palette
                  .filter((token) => token.name.startsWith(`${group}-`))
                  .map((token) => (
                    <ColorSwatch key={token.path} token={token} variant="fill" />
                  ))}
              </div>
            ))}
          </div>
        </TokenSection>

        <TokenSection
          id="font-size"
          title="글자 크기"
          lead="이름은 같고 값은 환경마다 다릅니다. 키오스크는 화면이 크고 멀리서 보므로 값이 큽니다."
        >
          <EnvTable
            group="font-size"
            sample={(value) => (
              <span className="whitespace-nowrap text-fg-neutral" style={{ fontSize: value, lineHeight: 1.2 }}>
                워시펀
              </span>
            )}
          />
          <h3 className="mt-x8 text-t5 font-bold">줄 높이</h3>
          <div className="mt-x3">
            <EnvTable group="line-height" />
          </div>
        </TokenSection>

        <TokenSection id="spacing" title="간격" lead="x1은 4px입니다. 간격은 이 단위만 씁니다.">
          <ul className="flex flex-col gap-x2">
            {list("dimension").map((token) => (
              <li key={token.path} className="flex items-center gap-x4 text-t3">
                <span className="w-[120px] shrink-0 font-medium">{token.path}</span>
                <span className="w-x12 shrink-0 text-fg-neutral-muted">{token.value}</span>
                <span className="h-x3 rounded-r1 bg-bg-brand-solid" style={{ width: token.value }} />
              </li>
            ))}
          </ul>
        </TokenSection>

        <TokenSection id="radius" title="모서리">
          <EnvTable
            group="radius"
            sample={(value) => (
              <span
                className="inline-block size-x10 shrink-0 border-2 border-stroke-brand-solid bg-bg-brand-weak"
                style={{ borderRadius: value }}
              />
            )}
          />
        </TokenSection>

        <TokenSection id="shadow" title="그림자" lead="숫자가 클수록 높이 떠 있습니다.">
          <div className={grid}>
            {list("shadow").map((token) => (
              <div key={token.path} className="min-w-0">
                <div className="h-[72px] rounded-r3 bg-bg-layer-default" style={{ boxShadow: token.value }} />
                <p className="mt-x3 text-t3 font-medium">{token.path}</p>
                <p className="break-all text-t2 text-fg-neutral-subtle">{token.value}</p>
              </div>
            ))}
          </div>
        </TokenSection>
      </div>
    </main>
  );
}
