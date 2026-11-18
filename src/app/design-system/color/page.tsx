import ColorSwatch from "@/components/design-system/ColorSwatch";
import DocPage from "@/components/design-system/DocPage";
import TokenSection from "@/components/design-system/TokenSection";
import { list } from "@/components/design-system/tokens";

const grid = "grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-x4";

export default function ColorPage() {
  const fg = list("color.fg");
  const bg = list("color.bg");
  const stroke = list("color.stroke");
  const palette = list("color.palette");
  const brandSolid = bg.find((token) => token.name === "brand-solid")?.value;
  // 팔레트 이름의 마지막 단계 숫자를 뗀 앞부분으로 묶는다. 색이 늘어나면 자동으로 따라온다.
  const groups = Array.from(new Set(palette.map((token) => token.name.split("-")[0])));

  return (
    <DocPage name="color">
      <TokenSection
        id="roles"
        title="Roles"
        lead="어디에 쓰는지를 이름에 담은 색입니다. 제품 코드는 이 색만 씁니다."
      >
        <h3 className="text-t5 font-bold">fg — 글자·아이콘</h3>
        <ul className={`mt-x3 ${grid}`}>
          {fg.map((token) => (
            <li key={token.path} className="min-w-0">
              <ColorSwatch token={token} variant="text" on={token.name.startsWith("on-") ? brandSolid : undefined} />
            </li>
          ))}
        </ul>
        <h3 className="mt-x8 text-t5 font-bold">bg — 배경·면</h3>
        <ul className={`mt-x3 ${grid}`}>
          {bg.map((token) => (
            <li key={token.path} className="min-w-0">
              <ColorSwatch token={token} variant="fill" />
            </li>
          ))}
        </ul>
        <h3 className="mt-x8 text-t5 font-bold">stroke — 선</h3>
        <ul className={`mt-x3 ${grid}`}>
          {stroke.map((token) => (
            <li key={token.path} className="min-w-0">
              <ColorSwatch token={token} variant="line" />
            </li>
          ))}
        </ul>
      </TokenSection>

      <TokenSection
        id="palette"
        title="Palette"
        lead="역할 색이 가리키는 값의 목록입니다. 숫자가 클수록 어둡습니다. 역할로 표현하기 어려운 예외에만 직접 씁니다."
      >
        <div className="flex flex-col gap-x6">
          {groups.map((group) => (
            <ul key={group} className={grid}>
              {palette
                .filter((token) => token.name.split("-")[0] === group)
                .map((token) => (
                  <li key={token.path} className="min-w-0">
                    <ColorSwatch token={token} variant="fill" />
                  </li>
                ))}
            </ul>
          ))}
        </div>
      </TokenSection>
    </DocPage>
  );
}
