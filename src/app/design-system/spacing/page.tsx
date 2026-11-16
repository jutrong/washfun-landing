import DocPage from "@/components/design-system/DocPage";
import TokenSection from "@/components/design-system/TokenSection";
import { list } from "@/components/design-system/tokens";

export default function SpacingPage() {
  return (
    <DocPage name="spacing">
      <TokenSection id="unit" title="Dimension" lead="x1은 4px입니다. 여백과 간격은 이 단위만 씁니다.">
        <ul className="flex flex-col gap-x2">
          {list("dimension").map((token) => (
            <li key={token.path} className="flex items-center gap-x4 text-t4">
              <span className="w-[120px] shrink-0 font-medium">{token.path}</span>
              <span className="w-x12 shrink-0 text-fg-neutral-muted">{token.value}</span>
              <span className="block h-x3 rounded-r1 bg-bg-brand-solid" style={{ width: token.value }} />
            </li>
          ))}
        </ul>
      </TokenSection>

      <TokenSection id="semantic" title="뜻이 담긴 간격" lead="자주 쓰는 간격에는 용도를 이름으로 붙입니다.">
        <ul className="flex flex-col gap-x2">
          {list("dimension.spacing-x").map((token) => (
            <li key={token.path} className="text-t4">
              <span className="font-medium">{token.path}</span>
              <span className="ml-x3 text-fg-neutral-muted">
                {token.ref} · {token.value} · {token.description}
              </span>
            </li>
          ))}
        </ul>
      </TokenSection>
    </DocPage>
  );
}
