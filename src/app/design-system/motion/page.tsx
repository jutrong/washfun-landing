import DocPage from "@/components/design-system/DocPage";
import MotionDemo from "@/components/design-system/MotionDemo";
import TokenSection from "@/components/design-system/TokenSection";
import { list } from "@/components/design-system/tokens";

const code = "rounded-r1 bg-bg-neutral-weak px-x1 text-t3";
const rule = "flex list-disc flex-col gap-x2 pl-x5 text-t4 text-fg-neutral-muted";
const th = "border-b border-stroke-neutral-weak py-x2 pr-x4 font-medium";
const td = "border-b border-stroke-neutral-muted py-x2 pr-x4 align-top";

const PRINCIPLES = [
  { title: "이유가 있을 때만 움직입니다", body: "움직임은 무엇이 어디서 나왔고 어디로 갔는지 알려 줄 때 씁니다. 꾸미려고 넣지 않습니다." },
  { title: "짧게 끝냅니다", body: "대부분 200ms 안팎입니다. 고객이 움직임을 기다리게 되면 너무 긴 것입니다." },
  { title: "나타날 때와 사라질 때가 다릅니다", body: "나타날 때는 빠르게 들어와 부드럽게 멈추고, 사라질 때는 한 단계 짧게 빠져나갑니다." },
  { title: "줄이기 설정을 따릅니다", body: "기기에서 ‘동작 줄이기’를 켠 고객에게는 자리 이동과 크기 변화를 빼고 바로 보여 줍니다." },
];

const USES = [
  { use: "누름 반응, 체크, 토글", duration: "d1", easing: "standard" },
  { use: "색·테두리 변화 (hover, 선택)", duration: "d2", easing: "standard" },
  { use: "툴팁, 칩, 드롭다운, 토스트가 나타날 때", duration: "d3", easing: "enter" },
  { use: "닫히거나 사라질 때", duration: "d3", easing: "exit" },
  { use: "모달, 시트가 나타날 때", duration: "d4", easing: "enter" },
  { use: "화면 전환, 큰 면이 움직일 때", duration: "d5", easing: "enter" },
  { use: "로딩 표시, 진행 막대", duration: "반복", easing: "linear" },
];

export default function MotionPage() {
  const durations = list("motion.duration");
  const easings = list("motion.easing");
  const standard = easings.find((token) => token.name === "standard")?.value ?? "ease";
  const longest = durations[durations.length - 1]?.value ?? "500ms";

  return (
    <DocPage name="motion">
      <TokenSection id="principles" title="Principles" lead="움직임은 화면이 바뀐 이유를 눈으로 따라갈 수 있게 돕는 도구입니다.">
        <ol className="grid grid-cols-2 gap-x4 md:grid-cols-1">
          {PRINCIPLES.map((principle, index) => (
            <li key={principle.title} className="rounded-r3 bg-bg-layer-basement p-x5">
              <span className="text-t3 font-bold text-fg-brand">{index + 1}</span>
              <p className="mt-x1 text-t5 font-bold text-fg-neutral">{principle.title}</p>
              <p className="mt-x2 text-t4 text-fg-neutral-muted">{principle.body}</p>
            </li>
          ))}
        </ol>
      </TokenSection>

      <TokenSection id="duration" title="Duration" lead="시간은 다섯 단계입니다. 움직이는 것이 작을수록 짧게, 클수록 길게 씁니다.">
        <MotionDemo
          samples={durations.map((token) => ({
            name: `${token.path} · ${token.value}`,
            duration: token.value,
            easing: standard,
            note: token.description ?? "",
          }))}
        />
      </TokenSection>

      <TokenSection id="easing" title="Easing" lead="곡선은 숫자가 아니라 쓰임새 이름으로 고릅니다. 아래는 모두 같은 시간으로 움직입니다.">
        <MotionDemo
          samples={easings.map((token) => ({
            name: token.path,
            duration: longest,
            easing: token.value,
            note: `${token.description ?? ""} · ${token.value}`,
          }))}
        />
      </TokenSection>

      <TokenSection id="choose" title="고르는 법" lead="시간과 곡선은 짝으로 고릅니다.">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-t3">
            <thead>
              <tr className="text-fg-neutral-muted">
                <th scope="col" className={th}>쓰임</th>
                <th scope="col" className={th}>시간</th>
                <th scope="col" className={th}>곡선</th>
              </tr>
            </thead>
            <tbody>
              {USES.map((row) => (
                <tr key={row.use}>
                  <th scope="row" className={`${td} text-left font-medium text-fg-neutral`}>{row.use}</th>
                  <td className={`${td} text-fg-neutral-muted`}>{row.duration}</td>
                  <td className={`${td} text-fg-neutral-muted`}>{row.easing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className={`mt-x6 ${rule}`}>
          <li>움직이는 속성은 투명도와 위치·크기(transform)로 한정합니다. 너비, 높이, 여백을 직접 움직이면 화면이 끊깁니다.</li>
          <li>한 번에 여러 개가 나타날 때는 차례 사이를 d1보다 짧게 두고, 전체가 d5를 넘지 않게 합니다.</li>
          <li>d5보다 긴 움직임은 로딩 표시와 진행 막대뿐입니다.</li>
        </ul>
      </TokenSection>

      <TokenSection id="reduce" title="동작 줄이기" lead="어지러움을 느끼는 고객은 기기에서 움직임을 줄이도록 설정해 둡니다.">
        <ul className={rule}>
          <li>
            웹은 <code className={code}>prefers-reduced-motion</code>, 앱은 기기의 동작 줄이기 설정을 읽습니다. Tailwind에서는{" "}
            <code className={code}>motion-reduce:transition-none</code>을 붙입니다.
          </li>
          <li>줄이기가 켜지면 자리 이동과 크기 변화는 빼고, 필요하면 투명도만 d2로 바꿉니다.</li>
          <li>저절로 반복되는 움직임(배너 넘김, 강조 깜빡임)은 줄이기가 켜지면 멈춥니다.</li>
          <li>키오스크는 여러 사람이 지나가며 보는 화면입니다. 대기 화면 말고는 반복되는 움직임을 두지 않습니다.</li>
        </ul>
      </TokenSection>

      <TokenSection id="usage" title="쓰는 법" lead="시간과 곡선은 환경과 상관없이 같은 값을 씁니다.">
        <ul className={rule}>
          <li>
            Tailwind: <code className={code}>transition-colors duration-d2 ease-standard</code>,{" "}
            <code className={code}>transition-transform duration-d4 ease-enter</code>
          </li>
          <li>
            앱: <code className={code}>tokens.motion.duration.d3</code>(ms 숫자),{" "}
            <code className={code}>Easing.bezier(...tokens.motion.easing.enter)</code>
          </li>
          <li>
            CSS: <code className={code}>transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)</code>처럼 값을 직접 쓰지 않고 토큰에서
            가져옵니다.
          </li>
        </ul>
      </TokenSection>
    </DocPage>
  );
}
