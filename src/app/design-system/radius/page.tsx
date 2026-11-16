import DocPage from "@/components/design-system/DocPage";
import EnvTable from "@/components/design-system/EnvTable";
import TokenSection from "@/components/design-system/TokenSection";

export default function RadiusPage() {
  return (
    <DocPage name="radius">
      <TokenSection
        id="scale"
        title="Radius"
        lead="번호가 클수록 둥급니다. 키오스크는 요소가 커서 같은 번호라도 값이 큽니다."
      >
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
    </DocPage>
  );
}
