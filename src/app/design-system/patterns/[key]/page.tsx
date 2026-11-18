import Link from "next/link";
import { notFound } from "next/navigation";
import PatternDemo from "@/components/design-system/reference/PatternDemo";
import TokenSection from "@/components/design-system/TokenSection";
import { components } from "@/components/design-system/components";
import { COMPONENTS_HREF, PATTERNS_HREF } from "@/components/design-system/nav";
import { pattern, patterns } from "@/components/design-system/patterns";
import { ENVIRONMENTS } from "@/components/design-system/tokens";

const rule = "flex list-disc flex-col gap-x2 pl-x5 text-t4 text-fg-neutral-muted";
const th = "border-b border-stroke-neutral-weak py-x2 pr-x4 font-medium";
const td = "border-b border-stroke-neutral-muted py-x2 pr-x4 align-top";

const ENV_NAME: Record<string, string> = { web: "웹 · 파트너 웹, 랜딩", app: "앱 · 고객 앱", kiosk: "키오스크" };

export const dynamicParams = false;

export function generateStaticParams() {
  return patterns().map((item) => ({ key: item.key }));
}

function Rules({ items }: { items: string[] }) {
  return (
    <ul className={rule}>
      {items.map((text) => (
        <li key={text}>{text}</li>
      ))}
    </ul>
  );
}

export default function PatternPage({ params }: { params: { key: string } }) {
  const spec = pattern(params.key);
  if (!spec) notFound();

  const all = patterns();
  const index = all.findIndex((item) => item.key === spec.key);
  const prev = all[index - 1];
  const next = all[index + 1];
  const used = components().filter((item) => spec.components.includes(item.key));

  return (
    <article>
      <Link href={PATTERNS_HREF} className="text-t3 font-medium text-fg-neutral-muted hover:text-fg-neutral">
        Patterns
      </Link>
      <h1 className="mt-x3 text-[40px] font-bold leading-tight md:text-t10">
        {spec.title} <span className="text-t7 font-medium text-fg-neutral-muted">{spec.ko}</span>
      </h1>
      <p className="mt-x3 text-t5 text-fg-neutral-muted">{spec.lead}</p>
      <div className="mt-x8 rounded-r4 bg-bg-layer-basement p-x8 md:p-x4">
        <PatternDemo name={spec.key} />
      </div>

      <div className="mt-x4">
        <TokenSection id="problem" title="푸는 문제" lead={spec.problem}>
          <p className="mb-x2 text-t3 font-bold text-fg-neutral">이럴 때 써요</p>
          <Rules items={spec.when} />
          <p className="mb-x2 mt-x6 text-t3 font-bold text-fg-neutral">쓰는 부품</p>
          <ul className="flex flex-wrap gap-x2">
            {used.map((item) => (
              <li key={item.key}>
                <Link
                  href={`${COMPONENTS_HREF}/${item.key}`}
                  className="inline-flex min-h-touch items-center rounded-r2 bg-bg-neutral-weak px-x3 text-t3 font-medium text-fg-neutral hover:bg-bg-brand-weak"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </TokenSection>

        {spec.choose ? (
          <TokenSection id="choose" title="고르는 법" lead={spec.choose.title ?? "상황에 따라 쓰는 방법이 다릅니다."}>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-t3">
                <thead>
                  <tr className="text-fg-neutral-muted">
                    {spec.choose.head.map((label) => (
                      <th key={label} scope="col" className={th}>
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {spec.choose.rows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, column) =>
                        column === 0 ? (
                          <th key={column} scope="row" className={`${td} text-left font-medium text-fg-neutral`}>
                            {cell}
                          </th>
                        ) : (
                          <td key={column} className={`${td} text-fg-neutral-muted`}>
                            {cell}
                          </td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TokenSection>
        ) : null}

        <TokenSection id="flow" title="흐름" lead="고객이 겪는 순서대로입니다.">
          <ol className="flex flex-col gap-x3">
            {spec.flow.map((step, order) => (
              <li key={step.title} className="flex gap-x4 rounded-r3 bg-bg-layer-basement p-x4">
                <span className="flex size-x8 shrink-0 items-center justify-center rounded-full bg-bg-brand-solid text-t4 font-bold text-fg-on-brand-solid">
                  {order + 1}
                </span>
                <div className="min-w-0">
                  <p className="text-t5 font-bold text-fg-neutral">{step.title}</p>
                  <p className="mt-x1 text-t4 text-fg-neutral-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </TokenSection>

        <TokenSection id="rules" title="규칙" lead="이 패턴을 만들 때 지키는 것입니다.">
          <div className="flex flex-col gap-x6">
            {spec.rules.map((group) => (
              <div key={group.title}>
                <p className="mb-x2 text-t5 font-bold text-fg-neutral">{group.title}</p>
                <Rules items={group.items} />
              </div>
            ))}
          </div>
        </TokenSection>

        <TokenSection id="env" title="환경별" lead="같은 패턴이라도 환경마다 달라지는 부분입니다.">
          <div className="flex flex-col gap-x6">
            {ENVIRONMENTS.map((env) => (
              <div key={env}>
                <p className="mb-x2 text-t5 font-bold text-fg-neutral">{ENV_NAME[env]}</p>
                <Rules items={spec.env[env]} />
              </div>
            ))}
          </div>
        </TokenSection>

        <TokenSection id="copy" title="문구 예시" lead="Writing 규칙을 지킨 문구입니다. 검사를 통과한 것만 실었습니다.">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-t3">
              <thead>
                <tr className="text-fg-neutral-muted">
                  <th scope="col" className={th}>어디에</th>
                  <th scope="col" className={th}>환경</th>
                  <th scope="col" className={th}>문구</th>
                </tr>
              </thead>
              <tbody>
                {spec.copy.map((copy) => (
                  <tr key={`${copy.where}${copy.text}`}>
                    <th scope="row" className={`${td} text-left font-medium text-fg-neutral`}>{copy.where}</th>
                    <td className={`${td} whitespace-nowrap text-fg-neutral-muted`}>{copy.env}</td>
                    <td className={`${td} text-fg-neutral`}>{copy.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TokenSection>

        <TokenSection id="accessibility" title="Accessibility" lead="이 패턴에서 꼭 지켜야 하는 접근성입니다.">
          <Rules items={spec.accessibility} />
        </TokenSection>

        <TokenSection id="avoid" title="하지 않는 것" lead="자주 보이는 잘못된 방법입니다.">
          <Rules items={spec.avoid} />
        </TokenSection>
      </div>

      <nav aria-label="이전·다음 문서" className="mt-x10 grid grid-cols-2 gap-x4 border-t border-stroke-neutral-muted pt-x6">
        {prev ? (
          <Link href={`${PATTERNS_HREF}/${prev.key}`} className="rounded-r3 border border-stroke-neutral-weak p-x4 hover:bg-bg-neutral-weak">
            <span className="block text-t2 text-fg-neutral-subtle">이전 문서</span>
            <span className="block text-t5 font-bold">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`${PATTERNS_HREF}/${next.key}`} className="rounded-r3 border border-stroke-neutral-weak p-x4 text-right hover:bg-bg-neutral-weak">
            <span className="block text-t2 text-fg-neutral-subtle">다음 문서</span>
            <span className="block text-t5 font-bold">{next.title}</span>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
