import DocPage from "@/components/design-system/DocPage";
import TokenSection from "@/components/design-system/TokenSection";
import { list } from "@/components/design-system/tokens";

export default function ElevationPage() {
  return (
    <DocPage name="elevation">
      <TokenSection id="shadow" title="Shadow" lead="번호가 클수록 높이 떠 있습니다. s1은 버튼·키, s2는 카드·패널, s3은 모달에 씁니다.">
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
    </DocPage>
  );
}
