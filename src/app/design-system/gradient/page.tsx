import DocPage from "@/components/design-system/DocPage";
import TokenSection from "@/components/design-system/TokenSection";
import { gradients } from "@/components/design-system/tokens";

const code = "rounded-r1 bg-bg-neutral-weak px-x1 text-t3";

export default function GradientPage() {
  const all = gradients();

  return (
    <DocPage name="gradient">
      <TokenSection
        id="stops"
        title="Gradient Stops"
        lead="토큰은 색 지점만 정합니다. 방향은 쓰는 곳에서 고릅니다. 색 지점은 모두 팔레트를 가리킵니다."
      >
        <ul className="grid grid-cols-2 gap-x6 md:grid-cols-1">
          {all.map((gradient) => (
            <li key={gradient.path} className="min-w-0">
              {/* 흰색·투명 지점이 보이도록 어두운 면 위에 올린다. */}
              <div className="overflow-hidden rounded-r3 border border-stroke-neutral-muted bg-palette-gray-900">
                <div className="h-[96px]" style={{ backgroundImage: `linear-gradient(90deg, ${gradient.stops})` }} />
              </div>
              <p className="mt-x3 text-t4 font-medium">{gradient.path}</p>
              {gradient.description ? <p className="text-t3 text-fg-neutral-muted">{gradient.description}</p> : null}
              <ol className="mt-x2 flex flex-wrap gap-x1 text-t2 text-fg-neutral-muted">
                {gradient.refs.map((ref, index) => (
                  <li key={`${ref}-${index}`} className="rounded-r1 bg-bg-neutral-weak px-x2 py-x1">
                    {ref}
                  </li>
                ))}
              </ol>
              <p className="mt-x2 break-all text-t2 text-fg-neutral-muted">{gradient.stops}</p>
            </li>
          ))}
        </ul>
      </TokenSection>

      <TokenSection id="usage" title="쓰는 법" lead="세로 방향이 기본이고, 이름 끝에 -x 를 붙이면 가로 방향입니다.">
        <ul className="flex list-disc flex-col gap-x2 pl-x5 text-t4 text-fg-neutral-muted">
          <li>
            Tailwind: <code className={code}>bg-gradient-glow-brand</code>,{" "}
            <code className={code}>bg-gradient-shimmer-neutral-x</code>
          </li>
          <li>
            앱: <code className={code}>tokens.gradient.glowBrand</code>의 colors와 locations를 LinearGradient에 그대로
            넘깁니다.
          </li>
          <li>글자가 올라가는 면에는 glow-brand처럼 옅은 그라디언트만 씁니다.</li>
        </ul>
      </TokenSection>
    </DocPage>
  );
}
