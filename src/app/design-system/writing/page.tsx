import type { ReactNode } from "react";
import DocPage from "@/components/design-system/DocPage";
import TokenSection from "@/components/design-system/TokenSection";
import { ENVIRONMENTS } from "@/components/design-system/tokens";
import writing from "../../../../design-system/writing.json";

const code = "rounded-r1 bg-bg-neutral-weak px-x1 text-t3";
const rule = "flex list-disc flex-col gap-x2 pl-x5 text-t4 text-fg-neutral-muted";
const th = "border-b border-stroke-neutral-weak py-x2 pr-x4 font-medium";
const td = "border-b border-stroke-neutral-muted py-x2 pr-x4 align-top";

/** 고친 문구와 고치기 전 문구를 나란히 보여 준다. 색만으로 구분하지 않도록 글자 표시를 함께 둔다. */
function Pair({ dont, good }: { dont: string; good: string }) {
  return (
    <div className="grid grid-cols-2 gap-x3 md:grid-cols-1">
      <p className="rounded-r3 border border-stroke-neutral-muted bg-bg-layer-basement p-x4 text-t4 text-fg-neutral-muted">
        <span className="mb-x1 block text-t2 font-bold text-fg-critical">이렇게 쓰지 않아요</span>
        {dont}
      </p>
      <p className="rounded-r3 border border-stroke-brand-solid bg-bg-brand-weak p-x4 text-t4 font-medium text-fg-neutral">
        <span className="mb-x1 block text-t2 font-bold text-fg-brand">이렇게 써요</span>
        {good}
      </p>
    </div>
  );
}

type GuideItem = {
  key: string;
  title: string;
  lead: string;
  rules: string[];
  exceptions?: string[];
  examples: { source: string; dont: string; do: string; why: string }[];
};

/** 규칙 한 묶음: 규칙, 예외, 고치기 전·후 예시. */
function Guide({ item, children }: { item: GuideItem; children?: ReactNode }) {
  return (
    <TokenSection id={item.key} title={item.title} lead={item.lead}>
      <ul className={rule}>
        {item.rules.map((text) => (
          <li key={text}>{text}</li>
        ))}
      </ul>
      {item.exceptions ? (
        <div className="mt-x4 rounded-r3 bg-bg-layer-basement p-x4">
          <p className="text-t3 font-bold text-fg-neutral">이럴 때는 예외</p>
          <ul className={`mt-x2 ${rule}`}>
            {item.exceptions.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {children}
      <ul className="mt-x6 flex flex-col gap-x6">
        {item.examples.map((example) => (
          <li key={example.do}>
            <p className="mb-x2 text-t2 text-fg-neutral-subtle">{example.source}</p>
            <Pair dont={example.dont} good={example.do} />
            <p className="mt-x2 text-t3 text-fg-neutral-muted">{example.why}</p>
          </li>
        ))}
      </ul>
    </TokenSection>
  );
}

export default function WritingPage() {
  return (
    <DocPage name="writing">
      <TokenSection id="principles" title="Principles" lead="문구를 쓸 때 가장 먼저 떠올리는 네 가지입니다.">
        <ol className="grid grid-cols-2 gap-x4 md:grid-cols-1">
          {writing.principles.map((principle, index) => (
            <li key={principle.title} className="rounded-r3 bg-bg-layer-basement p-x5">
              <span className="text-t3 font-bold text-fg-brand">{index + 1}</span>
              <p className="mt-x1 text-t5 font-bold text-fg-neutral">{principle.title}</p>
              <p className="mt-x2 text-t4 text-fg-neutral-muted">{principle.body}</p>
            </li>
          ))}
        </ol>
      </TokenSection>

      <TokenSection
        id="voice"
        title="Voice"
        lead="말투는 글자 크기처럼 환경마다 다릅니다. 고객이 쓰는 화면은 해요체, 사장님이 쓰는 화면은 합쇼체입니다."
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-t3">
            <thead>
              <tr className="text-fg-neutral-muted">
                <th scope="col" className={th}>환경</th>
                <th scope="col" className={th}>말투</th>
                <th scope="col" className={th}>쓰는 법</th>
                <th scope="col" className={th}>예</th>
              </tr>
            </thead>
            <tbody>
              {ENVIRONMENTS.map((env) => {
                const voice = writing.voice[env];
                return (
                  <tr key={env}>
                    <th scope="row" className={`${td} text-left font-medium text-fg-neutral`}>
                      {env}
                      <span className="block font-normal text-fg-neutral-subtle">{voice.where}</span>
                    </th>
                    <td className={`${td} whitespace-nowrap font-bold text-fg-brand`}>{voice.style}</td>
                    <td className={`${td} text-fg-neutral-muted`}>{voice.note}</td>
                    <td className={`${td} text-fg-neutral`}>{voice.example}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <ul className={`mt-x6 ${rule}`}>
          <li>한 화면 안에서는 두 말투를 섞지 않습니다.</li>
          <li>부탁은 어느 환경에서나 “~해주세요”로 씁니다. “~하십시오”, “~바랍니다”는 쓰지 않습니다.</li>
          <li>“결제 완료”처럼 명사로 끝나는 말은 제목과 상태 표시에만 쓰고, 안내 문장은 끝까지 씁니다.</li>
        </ul>
      </TokenSection>

      {writing.style.map((item) => (
        <Guide key={item.key} item={item}>
          {item.key === "plain" ? (
            <div className="mt-x6 overflow-x-auto">
              <table className="w-full border-collapse text-left text-t3">
                <thead>
                  <tr className="text-fg-neutral-muted">
                    <th scope="col" className={th}>어려운 말</th>
                    <th scope="col" className={th}>쉬운 말</th>
                  </tr>
                </thead>
                <tbody>
                  {writing.plain.map((word) => (
                    <tr key={word.avoid}>
                      <td className={`${td} text-fg-neutral-subtle line-through`}>{word.avoid}</td>
                      <th scope="row" className={`${td} text-left font-bold text-fg-neutral`}>{word.use}</th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </Guide>
      ))}

      {writing.patterns.map((item) => (
        <Guide key={item.key} item={item} />
      ))}

      <TokenSection
        id="terms"
        title="용어"
        lead="같은 것을 제품마다 다르게 부르던 말을 하나로 정했습니다. 새 용어가 생기면 이 표에 먼저 올립니다."
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-t3">
            <thead>
              <tr className="text-fg-neutral-muted">
                <th scope="col" className={th}>쓰는 말</th>
                <th scope="col" className={th}>피하는 말</th>
                <th scope="col" className={th}>뜻과 쓰임</th>
              </tr>
            </thead>
            <tbody>
              {writing.terms.map((term) => (
                <tr key={term.use}>
                  <th scope="row" className={`${td} whitespace-nowrap text-left font-bold text-fg-neutral`}>{term.use}</th>
                  <td className={`${td} text-fg-neutral-muted`}>{term.avoid.join(", ")}</td>
                  <td className={`${td} text-fg-neutral-muted`}>{term.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TokenSection>

      <TokenSection id="formats" title="숫자와 표기" lead="금액, 포인트, 날짜는 어느 제품에서나 같은 모양으로 씁니다.">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-t3">
            <thead>
              <tr className="text-fg-neutral-muted">
                <th scope="col" className={th}>종류</th>
                <th scope="col" className={th}>이렇게 써요</th>
                <th scope="col" className={th}>이렇게 쓰지 않아요</th>
                <th scope="col" className={th}>규칙</th>
              </tr>
            </thead>
            <tbody>
              {writing.formats.map((format) => (
                <tr key={format.name}>
                  <th scope="row" className={`${td} whitespace-nowrap text-left font-medium text-fg-neutral`}>{format.name}</th>
                  <td className={`${td} font-bold text-fg-neutral`}>{format.do}</td>
                  <td className={`${td} text-fg-neutral-subtle line-through`}>{format.dont}</td>
                  <td className={`${td} text-fg-neutral-muted`}>{format.rule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TokenSection>

      <TokenSection id="usage" title="쓰는 법" lead="규칙의 원본은 design-system 폴더의 writing.json입니다. 이 페이지는 그 파일을 그대로 보여 줍니다.">
        <ul className={rule}>
          <li>
            용어나 예시를 바꿀 때는 <code className={code}>design-system/writing.json</code>만 고칩니다.
          </li>
          <li>
            <code className={code}>design-system/lib/writing.mjs</code>의 <code className={code}>findIssues(문구, 환경)</code>는
            피하는 말, 어려운 한자어, 금액 표기, 느낌표·말줄임표, 말투, 수동형, 지나친 높임말을 찾아 줍니다. 이 페이지의 “이렇게 써요” 예시는 모두 이 검사를 통과합니다.
          </li>
          <li>
            능동형·긍정형·높임말·풀어 쓰기 규칙은{" "}
            <a href={writing.reference.url} target="_blank" rel="noreferrer" className="text-fg-brand underline">
              {writing.reference.name}
            </a>
            를 참고해 워시펀에 맞게 다시 썼습니다.
          </li>
          <li>기계가 볼 수 없는 것(쉬운 말인지, 다음에 할 일을 알려 주는지)은 리뷰할 때 위 원칙으로 확인합니다.</li>
        </ul>
      </TokenSection>
    </DocPage>
  );
}
