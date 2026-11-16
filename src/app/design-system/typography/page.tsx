import DocPage from "@/components/design-system/DocPage";
import EnvTable from "@/components/design-system/EnvTable";
import TokenSection from "@/components/design-system/TokenSection";
import { list } from "@/components/design-system/tokens";

export default function TypographyPage() {
  return (
    <DocPage name="typography">
      <TokenSection id="family" title="Font family">
        {list("font-family").map((token) => (
          <p key={token.path} className="text-t4">
            <span className="font-bold">{token.path}</span>
            <span className="mt-x1 block text-fg-neutral-muted">{token.value}</span>
          </p>
        ))}
      </TokenSection>

      <TokenSection
        id="size"
        title="Font size"
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
      </TokenSection>

      <TokenSection id="line-height" title="Line height" lead="글자 크기와 같은 번호를 짝지어 씁니다.">
        <EnvTable group="line-height" />
      </TokenSection>

      <TokenSection id="weight" title="Font weight">
        <ul className="flex flex-col gap-x3">
          {list("font-weight").map((token) => (
            <li key={token.path} className="flex items-baseline gap-x4 text-t4">
              <span className="w-[180px] shrink-0 font-medium md:w-[140px]">{token.path}</span>
              <span className="w-x12 shrink-0 text-fg-neutral-muted">{token.value}</span>
              <span className="text-t7" style={{ fontWeight: Number(token.value) }}>
                워시펀으로 세차하세요
              </span>
            </li>
          ))}
        </ul>
      </TokenSection>
    </DocPage>
  );
}
