import DocPage from "@/components/design-system/DocPage";
import TokenSection from "@/components/design-system/TokenSection";
import { list } from "@/components/design-system/tokens";

export default function ElevationPage() {
  const overlay = list("color.bg").find((token) => token.name === "overlay");

  return (
    <DocPage name="elevation">
      <TokenSection id="shadow" title="Shadow" lead="번호가 클수록 높이 떠 있습니다. s1은 버튼·키, s2는 카드·패널, s3은 모달에 씁니다. 모달은 뒤의 어두운 면과 함께 씁니다.">
        <ul className="grid grid-cols-3 gap-x6 rounded-r4 bg-bg-layer-basement p-x8 md:grid-cols-1">
          {list("shadow").map((token) => (
            <li key={token.path} className="min-w-0">
              <div className="h-[96px] rounded-r3 bg-bg-layer-default" style={{ boxShadow: token.value }} />
              <p className="mt-x4 text-t4 font-medium">{token.path}</p>
              <p className="break-all text-t2 text-fg-neutral-muted">{token.value}</p>
            </li>
          ))}
        </ul>
      </TokenSection>

      <TokenSection id="layer" title="Layer" lead="면의 깊이는 그림자와 함께 배경 색으로도 구분합니다.">
        <ul className="flex flex-col gap-x2 text-t4">
          {list("color.bg")
            .filter((token) => token.name.startsWith("layer-"))
            .map((token) => (
              <li key={token.path}>
                <span className="font-medium">{token.path}</span>
                <span className="ml-x3 text-fg-neutral-muted">
                  {token.value} · {token.description}
                </span>
              </li>
            ))}
        </ul>
      </TokenSection>

      <TokenSection
        id="overlay"
        title="Overlay"
        lead="확인 창과 바텀 시트가 뜨면 뒤의 화면을 어둡게 덮습니다. 지금은 이 창에만 답하면 된다는 것을 알려 줍니다."
      >
        <div className="relative h-[280px] overflow-hidden rounded-r4 bg-bg-layer-basement p-x6">
          <div className="flex flex-col gap-x3" aria-hidden>
            <span className="h-x10 rounded-r3 bg-bg-layer-default shadow-s1" />
            <span className="h-x16 rounded-r3 bg-bg-layer-default shadow-s2" />
            <span className="h-x16 rounded-r3 bg-bg-layer-default shadow-s2" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-bg-overlay p-x6">
            <div className="w-full max-w-container-narrow rounded-r6 bg-bg-layer-floating p-x6 shadow-s3">
              <p className="text-t6 font-bold text-fg-neutral">bg.layer-floating + shadow.s3</p>
              <p className="mt-x1 text-t4 text-fg-neutral-muted">뒤의 어두운 면이 bg.overlay입니다.</p>
            </div>
          </div>
        </div>
        <p className="mt-x4 text-t4">
          <span className="font-medium">{overlay?.path}</span>
          <span className="ml-x3 text-fg-neutral-muted">
            {overlay?.value} · {overlay?.description}
          </span>
        </p>
        <ul className="mt-x6 flex list-disc flex-col gap-x2 pl-x5 text-t4 text-fg-neutral-muted">
          <li>어두운 면은 화면 전체를 덮습니다. 머리글과 하단 버튼도 함께 덮어 누를 수 없게 합니다.</li>
          <li>확인 창과 바텀 시트에만 씁니다. 토스트, 툴팁, 드롭다운은 뒤를 어둡게 하지 않습니다.</li>
          <li>어두운 면과 그 위의 창은 같은 층(z-index.overlay)에 두고, 창이 여러 개 겹쳐도 어두운 면은 한 겹만 둡니다.</li>
          <li>어두운 면을 눌러 닫을 수 있는지는 창마다 정합니다. 되돌리기 어려운 일을 묻는 창과 키오스크에서는 닫히지 않습니다.</li>
          <li>나타날 때는 투명도만 d4로, 사라질 때는 d3으로 바꿉니다. 색을 직접 쓰지 않고 bg.overlay를 씁니다.</li>
        </ul>
      </TokenSection>
    </DocPage>
  );
}
