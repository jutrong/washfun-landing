import DocPage from "@/components/design-system/DocPage";
import EnvTable from "@/components/design-system/EnvTable";
import TokenSection from "@/components/design-system/TokenSection";
import { list } from "@/components/design-system/tokens";
import a11y from "../../../../design-system/accessibility.json";
import { checkPairsWith } from "../../../../design-system/lib/contrast.mjs";

const rule = "flex list-disc flex-col gap-x2 pl-x5 text-t4 text-fg-neutral-muted";
const th = "border-b border-stroke-neutral-weak py-x2 pr-x4 font-medium";
const td = "border-b border-stroke-neutral-muted py-x2 pr-x4 align-middle";

type Result = {
  fg: string;
  bg: string;
  kind: string;
  use: string;
  known?: string;
  fgValue: string;
  bgValue: string;
  ratio: number;
  required: number;
  pass: boolean;
};

const short = (path: string) => path.replace("color.", "");

function Guide({ item }: { item: { key: string; title: string; lead: string; rules: string[] } }) {
  return (
    <TokenSection id={item.key} title={item.title} lead={item.lead}>
      <ul className={rule}>
        {item.rules.map((text) => (
          <li key={text}>{text}</li>
        ))}
      </ul>
    </TokenSection>
  );
}

export default function AccessibilityPage() {
  const values = new Map(
    ["color.fg", "color.bg", "color.stroke"].flatMap((group) => list(group).map((token) => [token.path, token.value] as const)),
  );
  const results: Result[] = checkPairsWith(a11y, (path: string) => values.get(path) ?? "#000000");
  const failed = results.filter((result) => !result.pass);
  const [text, ...rest] = a11y.guides;

  return (
    <DocPage name="accessibility">
      <TokenSection id="principles" title="Principles" lead="접근성은 일부 고객을 위한 기능이 아니라 모든 화면의 기본 품질입니다.">
        <ol className="grid grid-cols-2 gap-x4 md:grid-cols-1">
          {a11y.principles.map((principle, index) => (
            <li key={principle.title} className="rounded-r3 bg-bg-layer-basement p-x5">
              <span className="text-t3 font-bold text-fg-brand">{index + 1}</span>
              <p className="mt-x1 text-t5 font-bold text-fg-neutral">{principle.title}</p>
              <p className="mt-x2 text-t4 text-fg-neutral-muted">{principle.body}</p>
            </li>
          ))}
        </ol>
      </TokenSection>

      <TokenSection
        id="contrast"
        title="Contrast"
        lead={`글자는 배경과 ${a11y.contrast.text}:1 이상, 아이콘과 외곽선은 ${a11y.contrast.graphic}:1 이상의 명도 대비를 가집니다. 아래 표는 지금 토큰 값으로 계산한 결과입니다.`}
      >
        <p className="rounded-r3 bg-bg-layer-basement p-x4 text-t4 text-fg-neutral">
          색 짝 {results.length}개 가운데 {results.length - failed.length}개가 기준을 지키고 {failed.length}개가 못 미칩니다.
          못 미치는 짝은 색을 바꾸기 전까지 “쓰는 법”을 따릅니다.
        </p>
        <div className="mt-x6 overflow-x-auto">
          <table className="w-full border-collapse text-left text-t3">
            <thead>
              <tr className="text-fg-neutral-muted">
                <th scope="col" className={th}>견본</th>
                <th scope="col" className={th}>글자 / 배경</th>
                <th scope="col" className={th}>대비</th>
                <th scope="col" className={th}>결과</th>
                <th scope="col" className={th}>쓰는 법</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={`${result.fg}/${result.bg}`}>
                  <td className={td}>
                    <span
                      className="inline-flex h-x10 w-x16 items-center justify-center rounded-r2 border border-stroke-neutral-muted text-t5 font-bold"
                      style={
                        result.kind === "graphic"
                          ? { backgroundColor: result.bgValue, borderColor: result.fgValue, borderWidth: 2 }
                          : { backgroundColor: result.bgValue, color: result.fgValue }
                      }
                      aria-hidden
                    >
                      {result.kind === "graphic" ? "" : "가Aa"}
                    </span>
                  </td>
                  <th scope="row" className={`${td} text-left font-medium text-fg-neutral`}>
                    {short(result.fg)}
                    <span className="block font-normal text-fg-neutral-muted">{short(result.bg)}</span>
                    <span className="block font-normal text-fg-neutral-subtle">{result.use}</span>
                  </th>
                  <td className={`${td} whitespace-nowrap text-fg-neutral`}>
                    {result.ratio}:1
                    <span className="block text-fg-neutral-subtle">기준 {result.required}:1</span>
                  </td>
                  <td className={`${td} whitespace-nowrap font-bold text-fg-neutral`}>
                    {result.pass ? "✓ 지킴" : "✕ 못 미침"}
                  </td>
                  <td className={`${td} text-fg-neutral-muted`}>{result.known ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className={`mt-x6 ${rule}`}>
          <li>큰 글자(24px 이상, 굵게는 19px 이상)는 3:1 이상이면 됩니다.</li>
          <li>비활성 상태의 글자와 꾸미는 그림은 대비 기준에서 빠집니다.</li>
          <li>사진이나 그라디언트 위에 글자를 올릴 때는 가장 밝은 곳을 기준으로 잽니다.</li>
        </ul>
      </TokenSection>

      <TokenSection id={text.key} title={text.title} lead={text.lead}>
        <ul className={rule}>
          {text.rules.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <div className="mt-x6">
          <EnvTable group="font-size" />
        </div>
      </TokenSection>

      {rest.map((item) =>
        item.key === "touch" ? (
          <TokenSection key={item.key} id={item.key} title={item.title} lead={item.lead}>
            <ul className={rule}>
              {item.rules.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <div className="mt-x6">
              <EnvTable group="touch-target" />
            </div>
          </TokenSection>
        ) : (
          <Guide key={item.key} item={item} />
        ),
      )}

      <TokenSection id={a11y.kiosk.key} title={a11y.kiosk.title} lead={a11y.kiosk.lead}>
        <ul className={rule}>
          {a11y.kiosk.rules.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <div className="mt-x6 rounded-r3 border border-stroke-neutral-weak p-x4">
          <p className="text-t3 font-bold text-fg-neutral">아직 확인하지 못한 것</p>
          <ul className={`mt-x2 ${rule}`}>
            {a11y.kiosk.todo.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </TokenSection>

      <TokenSection id="usage" title="쓰는 법" lead="규칙의 원본은 design-system 폴더의 accessibility.json입니다.">
        <ul className={rule}>
          <li>
            색 토큰을 바꾸거나 새 색 짝을 쓰기 시작하면 accessibility.json의 pairs에 올립니다. 테스트가 대비를 다시 계산해
            기준에 못 미치는 짝을 알려 줍니다.
          </li>
          <li>기준에 못 미치는 짝은 known에 쓰는 법을 적어야 테스트를 통과합니다. 색을 고쳐 기준을 지키게 되면 known을 지우라고 알려 줍니다.</li>
          <li>본문 글자 크기, 줄 높이, 누르는 영역의 최소값도 테스트가 환경마다 확인합니다.</li>
        </ul>
        <p className="mt-x6 text-t3 font-bold text-fg-neutral">참고한 자료</p>
        <ul className={`mt-x2 ${rule}`}>
          {a11y.references.map((reference) => (
            <li key={reference.url}>
              <a href={reference.url} target="_blank" rel="noreferrer" className="text-fg-brand underline">
                {reference.name}
              </a>
            </li>
          ))}
        </ul>
      </TokenSection>
    </DocPage>
  );
}
