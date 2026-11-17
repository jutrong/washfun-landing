import DocPage from "@/components/design-system/DocPage";
import EnvTable from "@/components/design-system/EnvTable";
import TokenSection from "@/components/design-system/TokenSection";
import { list } from "@/components/design-system/tokens";

const code = "rounded-r1 bg-bg-neutral-weak px-x1 text-t3";
const rule = "flex list-disc flex-col gap-x2 pl-x5 text-t4 text-fg-neutral-muted";
const th = "border-b border-stroke-neutral-weak py-x2 pr-x4 font-medium";
const td = "border-b border-stroke-neutral-muted py-x2 pr-x4 align-top";

const RANGES = [
  { name: "휴대폰", range: (md: string) => `${md} 미만`, columns: 4, gutter: "layout.gutter" },
  { name: "태블릿", range: (md: string, lg: string) => `${md} 이상 ${lg} 미만`, columns: 8, gutter: "layout.gutter-wide" },
  { name: "데스크톱", range: (_md: string, lg: string) => `${lg} 이상`, columns: 12, gutter: "layout.gutter-wide" },
];

const STACK = [
  { gap: "x1 ~ x2", use: "한 덩어리 안의 조각 사이. 아이콘과 글자, 레이블과 입력 칸" },
  { gap: "x3 ~ x4", use: "같은 묶음의 항목 사이. 목록의 줄, 입력 칸과 입력 칸" },
  { gap: "x6", use: "묶음과 묶음 사이. 카드와 카드, 폼의 단락" },
  { gap: "x10 이상", use: "구간과 구간 사이. 제목이 새로 시작되는 곳" },
];

export default function LayoutPage() {
  const breakpoints = list("breakpoint");
  const containers = list("container");
  const layers = list("z-index");
  const value = (name: string) => breakpoints.find((token) => token.name === name)?.value ?? "";
  const widest = Math.max(...containers.map((token) => parseInt(token.value, 10)));

  return (
    <DocPage name="layout">
      <TokenSection id="gutter" title="Gutter" lead="화면 가장자리와 내용 사이의 여백입니다. 환경마다 값이 다릅니다.">
        <div className="rounded-r4 bg-bg-layer-basement p-x6">
          <div className="mx-auto flex h-[160px] max-w-container-narrow overflow-hidden rounded-r3 border border-stroke-neutral-weak bg-bg-layer-default">
            <span className="w-gutter shrink-0 bg-bg-brand-weak" aria-hidden />
            <div className="flex flex-1 flex-col justify-center gap-x2 px-x2">
              <span className="h-x4 rounded-r1 bg-bg-neutral-weak" />
              <span className="h-x4 w-2/3 rounded-r1 bg-bg-neutral-weak" />
              <span className="h-x10 rounded-r2 bg-bg-brand-solid" />
            </div>
            <span className="w-gutter shrink-0 bg-bg-brand-weak" aria-hidden />
          </div>
          <p className="mt-x3 text-center text-t2 text-fg-neutral-muted">옅은 파란 띠가 좌우 여백(layout.gutter)입니다.</p>
        </div>
        <div className="mt-x6">
          <EnvTable group="layout" />
        </div>
        <ul className={`mt-x6 ${rule}`}>
          <li>내용은 좌우 여백 안쪽에만 둡니다. 가로로 넘기는 목록과 꽉 찬 이미지, 구분선만 여백을 넘어갈 수 있습니다.</li>
          <li>화면 아래 주요 버튼도 같은 여백을 지킵니다.</li>
          <li>카드 안의 여백은 좌우 여백과 따로 x4 또는 x5를 씁니다.</li>
        </ul>
      </TokenSection>

      <TokenSection
        id="breakpoint"
        title="Breakpoint"
        lead="웹은 화면 너비에 따라 배치를 세 구간으로 나눕니다. 앱과 키오스크에는 경계가 없습니다."
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-t3">
            <thead>
              <tr className="text-fg-neutral-muted">
                <th scope="col" className={th}>구간</th>
                <th scope="col" className={th}>너비</th>
                <th scope="col" className={th}>칸 수</th>
                <th scope="col" className={th}>좌우 여백</th>
              </tr>
            </thead>
            <tbody>
              {RANGES.map((row) => (
                <tr key={row.name}>
                  <th scope="row" className={`${td} text-left font-medium text-fg-neutral`}>{row.name}</th>
                  <td className={`${td} text-fg-neutral-muted`}>{row.range(value("md"), value("lg"))}</td>
                  <td className={`${td} text-fg-neutral-muted`}>{row.columns}</td>
                  <td className={`${td} text-fg-neutral-muted`}>{row.gutter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className={`mt-x6 flex flex-col gap-x2 text-t3 text-fg-neutral-muted`}>
          {breakpoints.map((token) => (
            <li key={token.path}>
              <span className="font-medium text-fg-neutral">{token.path}</span> {token.value} · {token.description}
            </li>
          ))}
        </ul>
        <ul className={`mt-x6 ${rule}`}>
          <li>칸 사이는 layout.column-gap입니다. 카드는 휴대폰에서 한 줄에 하나, 태블릿에서 둘, 데스크톱에서 셋이나 넷을 둡니다.</li>
          <li>좁아질 때는 숨기기보다 아래로 쌓습니다. 표는 가로로 넘겨 볼 수 있게 합니다.</li>
          <li>
            파트너 웹과 랜딩은 Tailwind의 화면 구간을 ‘이 너비 이하’로 정해 두었습니다(<code className={code}>md:</code>는{" "}
            {parseInt(value("md"), 10) - 1}px 이하). 토큰은 같은 경계를 가리키고, 이 설정을 바꾸지 않습니다.
          </li>
        </ul>
      </TokenSection>

      <TokenSection id="container" title="Container" lead="화면이 아무리 넓어도 본문은 정해진 너비를 넘지 않고 가운데에 둡니다.">
        <ul className="flex flex-col gap-x4 rounded-r4 bg-bg-layer-basement p-x6">
          {containers.map((token) => (
            <li key={token.path}>
              <div
                className="mx-auto flex h-x10 items-center justify-center rounded-r2 bg-bg-brand-weak text-t3 font-bold text-fg-neutral"
                style={{ width: `${(parseInt(token.value, 10) / widest) * 100}%` }}
              >
                {token.value}
              </div>
              <p className="mt-x1 text-center text-t2 text-fg-neutral-muted">
                {token.path} · {token.description}
              </p>
            </li>
          ))}
        </ul>
        <ul className={`mt-x6 ${rule}`}>
          <li>읽는 글은 한 줄이 너무 길어지지 않게 narrow 안에 둡니다.</li>
          <li>앱은 화면 너비를 그대로 쓰고, 태블릿에서만 narrow로 가운데에 둡니다.</li>
        </ul>
      </TokenSection>

      <TokenSection id="stack" title="Spacing 쓰는 법" lead="간격의 크기로 무엇이 한 묶음인지 알려 줍니다. 가까울수록 관계가 깊습니다.">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-t3">
            <thead>
              <tr className="text-fg-neutral-muted">
                <th scope="col" className={th}>간격</th>
                <th scope="col" className={th}>쓰는 곳</th>
              </tr>
            </thead>
            <tbody>
              {STACK.map((row) => (
                <tr key={row.gap}>
                  <th scope="row" className={`${td} whitespace-nowrap text-left font-medium text-fg-neutral`}>{row.gap}</th>
                  <td className={`${td} text-fg-neutral-muted`}>{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className={`mt-x6 ${rule}`}>
          <li>묶음 안의 간격은 묶음 사이의 간격보다 항상 작습니다.</li>
          <li>간격은 바깥 여백(margin)보다 부모의 gap으로 줍니다. 항목이 빠지거나 늘어도 간격이 그대로입니다.</li>
          <li>키오스크는 같은 단계 이름에서 한두 단계 큰 값을 씁니다(x4 대신 x6).</li>
        </ul>
      </TokenSection>

      <TokenSection id="z-index" title="Z-index" lead="겹치는 순서는 숫자가 아니라 이름으로 정합니다. 아래로 갈수록 위에 옵니다.">
        <ol className="flex flex-col gap-x2 rounded-r4 bg-bg-layer-basement p-x6">
          {layers.map((token, index) => (
            <li
              key={token.path}
              className="flex items-center justify-between rounded-r2 border border-stroke-neutral-weak bg-bg-layer-default px-x4 py-x3 shadow-s1"
              style={{ marginLeft: `${index * 4}%` }}
            >
              <span className="text-t4 font-medium text-fg-neutral">
                {token.path} <span className="font-normal text-fg-neutral-muted">· {token.description}</span>
              </span>
              <span className="ml-x3 text-t4 font-bold text-fg-brand">{token.value}</span>
            </li>
          ))}
        </ol>
        <ul className={`mt-x6 ${rule}`}>
          <li>9999 같은 큰 숫자를 쓰지 않습니다. 위로 올려야 할 때는 어느 층에 속하는지부터 정합니다.</li>
          <li>확인 창과 바텀 시트는 뒤의 어두운 면과 함께 overlay 층에 둡니다. 토스트는 그 위에도 보여야 하므로 toast 층입니다.</li>
        </ul>
      </TokenSection>

      <TokenSection id="safe-area" title="안전 영역과 고정 영역" lead="기기의 둥근 모서리, 노치, 홈 막대에 내용이 가리지 않게 합니다.">
        <ul className={rule}>
          <li>앱과 모바일 웹은 위·아래 안전 영역만큼 여백을 더합니다. 화면 아래에 고정한 버튼은 안전 영역 위에 둡니다.</li>
          <li>화면 아래에 버튼을 고정하면, 스크롤되는 내용의 끝에 버튼 높이만큼 여백을 더해 마지막 내용이 가리지 않게 합니다.</li>
          <li>키보드가 올라오면 고정한 버튼도 키보드 위로 올립니다.</li>
          <li>키오스크는 기기마다 화면 크기가 정해져 있습니다. 주요 버튼은 화면 아래쪽 손이 닿는 높이에, 안내는 위쪽에 둡니다.</li>
        </ul>
      </TokenSection>

      <TokenSection id="usage" title="쓰는 법" lead="좌우 여백과 칸 사이는 환경별 값, 나머지는 환경과 상관없이 같은 값입니다.">
        <ul className={rule}>
          <li>
            Tailwind: <code className={code}>px-gutter</code>, <code className={code}>gap-column-gap</code>,{" "}
            <code className={code}>mx-auto max-w-container</code>, <code className={code}>z-overlay</code>
          </li>
          <li>
            앱: <code className={code}>tokens.layout.gutter</code>, <code className={code}>tokens.zIndex.overlay</code>
          </li>
          <li>화면 너비 경계는 preset에 넣지 않았습니다. 제품이 이미 쓰는 화면 구간 설정을 그대로 씁니다.</li>
        </ul>
      </TokenSection>
    </DocPage>
  );
}
