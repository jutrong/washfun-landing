import DocPage from "@/components/design-system/DocPage";
import TokenSection from "@/components/design-system/TokenSection";

const cell = "border-b border-stroke-neutral-muted py-x2 pr-x4 align-top";
const head = "border-b border-stroke-neutral-weak py-x2 pr-x4 text-left font-medium text-fg-neutral-muted";
const code = "rounded-r1 bg-bg-neutral-weak px-x1 text-t3";

export default function DesignTokenPage() {
  return (
    <DocPage name="design-token">
      <TokenSection
        id="what"
        title="디자인 토큰이 무엇인가요?"
        lead="색, 글자 크기, 간격처럼 화면을 이루는 값에 이름을 붙인 것입니다. 디자인과 코드가 같은 이름을 쓰면 값이 어긋나지 않습니다."
      >
        <p className="text-t4 text-fg-neutral-muted">
          값의 원본은 <code className={code}>design-system/tokens.json</code> 하나입니다. 이 문서와 각 제품의 코드는 모두 그
          파일에서 만들어집니다.
        </p>
      </TokenSection>

      <TokenSection id="layers" title="팔레트와 역할" lead="토큰은 두 층입니다. 제품 코드는 역할 토큰만 씁니다.">
        <table className="w-full border-collapse text-t4">
          <thead>
            <tr>
              <th scope="col" className={head}>층</th>
              <th scope="col" className={head}>뜻</th>
              <th scope="col" className={head}>예</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={`${cell} font-bold`}>팔레트</td>
              <td className={cell}>쓸 수 있는 값의 목록</td>
              <td className={cell}><code className={code}>color.palette.blue-600</code></td>
            </tr>
            <tr>
              <td className={`${cell} font-bold`}>역할</td>
              <td className={cell}>그 값을 어디에 쓰는지</td>
              <td className={cell}><code className={code}>color.bg.brand-solid</code></td>
            </tr>
          </tbody>
        </table>
        <p className="mt-x4 text-t4 text-fg-neutral-muted">
          역할로 부르면 대표 색을 바꿀 때 한 곳만 고치면 되고, 값이 같아도 뜻이 다른 색을 따로 바꿀 수 있습니다.
        </p>
      </TokenSection>

      <TokenSection id="naming" title="이름 규칙" lead="역할 색의 이름은 속성.역할-변형-상태 순서입니다.">
        <table className="w-full border-collapse text-t4">
          <thead>
            <tr>
              <th scope="col" className={head}>자리</th>
              <th scope="col" className={head}>값</th>
              <th scope="col" className={head}>뜻</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["속성", "fg · bg · stroke", "글자·아이콘 / 배경·면 / 선"],
              ["역할", "brand · neutral · positive · warning · critical · informative · layer", "브랜드 / 일반 / 성공 / 경고 / 오류 / 안내 / 화면의 깊이"],
              ["변형", "solid · weak · muted · subtle", "강한 강조 / 약한 강조 / 한두 단계 덜 눈에 띄게"],
              ["상태", "pressed · disabled", "눌림 / 비활성"],
            ].map(([slot, values, meaning]) => (
              <tr key={slot}>
                <td className={`${cell} whitespace-nowrap font-bold`}>{slot}</td>
                <td className={cell}>{values}</td>
                <td className={`${cell} text-fg-neutral-muted`}>{meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TokenSection>

      <TokenSection
        id="env"
        title="환경별 값"
        lead="글자 크기·줄 높이·모서리는 이름이 같고 값만 환경마다 다릅니다. 색·간격·그림자는 모든 환경이 같습니다."
      >
        <table className="w-full border-collapse text-t4">
          <thead>
            <tr>
              <th scope="col" className={head}>환경</th>
              <th scope="col" className={head}>쓰는 제품</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["web", "랜딩, 파트너 웹"],
              ["app", "고객 앱"],
              ["kiosk", "결제·멤버십·충전 키오스크"],
            ].map(([env, products]) => (
              <tr key={env}>
                <td className={`${cell} font-bold`}>{env}</td>
                <td className={cell}>{products}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TokenSection>

      <TokenSection
        id="sync"
        title="제품에서 가져가기"
        lead="design-system/sync 폴더의 파일 두 개를 제품 저장소에 복사하고, 토큰을 받아 그 제품의 형식으로 바꿉니다. 만들어진 파일은 커밋합니다."
      >
        <pre className="overflow-x-auto rounded-r3 bg-bg-neutral-weak p-x4 text-t3">
          {`node sync-tokens.mjs --format tailwind --env kiosk --out src/styles/tokens-preset.cjs
node sync-tokens.mjs --format ts --env app --out src/assets/styles/tokens.ts`}
        </pre>
        <ul className="mt-x4 flex list-disc flex-col gap-x2 pl-x5 text-t4 text-fg-neutral-muted">
          <li>Tailwind에서는 text-fg-neutral, bg-bg-brand-solid, border-stroke-neutral-weak, p-x4, text-t5, rounded-r3, shadow-s2처럼 씁니다.</li>
          <li>앱에서는 tokens.color.fg.neutralMuted처럼 쓰고, 크기는 단위 없는 숫자입니다.</li>
        </ul>
      </TokenSection>
    </DocPage>
  );
}
