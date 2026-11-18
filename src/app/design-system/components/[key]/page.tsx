import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import Demo from "@/components/design-system/reference/Demo";
import TokenSection from "@/components/design-system/TokenSection";
import { component, components } from "@/components/design-system/components";
import { COMPONENTS_HREF } from "@/components/design-system/nav";
import { ENVIRONMENTS, list } from "@/components/design-system/tokens";

const rule = "flex list-disc flex-col gap-x2 pl-x5 text-t4 text-fg-neutral-muted";
const th = "border-b border-stroke-neutral-weak py-x2 pr-x4 font-medium";
const td = "border-b border-stroke-neutral-muted py-x2 pr-x4 align-top";
const code = "rounded-r1 bg-bg-neutral-weak px-x1 text-t3";

export const dynamicParams = false;

export function generateStaticParams() {
  return components().map((item) => ({ key: item.key }));
}

/** "color.bg.brand-solid" 나 "font-size.t5"(환경별) 를 지금 값으로 바꾼다. */
function valueOf(ref: string, env: string) {
  for (const path of [ref, `env.${env}.${ref}`]) {
    const at = path.lastIndexOf(".");
    const found = list(path.slice(0, at)).find((token) => token.name === path.slice(at + 1));
    if (found) return found.value;
  }
  return "";
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

function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-t3">
        <thead>
          <tr className="text-fg-neutral-muted">
            {head.map((label) => (
              <th key={label} scope="col" className={th}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export default function ComponentPage({ params }: { params: { key: string } }) {
  const spec = component(params.key);
  if (!spec) notFound();

  const all = components();
  const index = all.findIndex((item) => item.key === spec.key);
  const prev = all[index - 1];
  const next = all[index + 1];
  const sizeParts = Array.from(new Set(spec.sizes.flatMap((size) => ENVIRONMENTS.flatMap((env) => Object.keys(size.env[env] ?? {})))));

  return (
    <article>
      <Link href={COMPONENTS_HREF} className="text-t3 font-medium text-fg-neutral-muted hover:text-fg-neutral">
        Components
      </Link>
      <h1 className="mt-x3 text-[40px] font-bold leading-tight md:text-t10">
        {spec.title} <span className="text-t7 font-medium text-fg-neutral-muted">{spec.ko}</span>
      </h1>
      <p className="mt-x3 text-t5 text-fg-neutral-muted">{spec.lead}</p>
      <div className="mt-x8 rounded-r4 bg-bg-layer-basement p-x8 md:p-x4">
        <Demo name={spec.key} />
      </div>

      <div className="mt-x4">
        <TokenSection id="usage" title="쓰는 곳" lead="먼저 이 부품이 맞는지 확인합니다.">
          <div className="grid grid-cols-2 gap-x4 md:grid-cols-1">
            <div className="rounded-r3 border border-stroke-brand-solid bg-bg-brand-weak p-x4">
              <p className="mb-x2 text-t3 font-bold text-fg-brand">이럴 때 써요</p>
              <Rules items={spec.when} />
            </div>
            <div className="rounded-r3 border border-stroke-neutral-muted bg-bg-layer-basement p-x4">
              <p className="mb-x2 text-t3 font-bold text-fg-critical">이럴 때는 쓰지 않아요</p>
              <Rules items={spec.avoid} />
            </div>
          </div>
        </TokenSection>

        <TokenSection id="anatomy" title="Anatomy" lead="부품을 이루는 조각과 그 이름입니다. 코드에서도 같은 이름을 씁니다.">
          <Table head={["조각", "이름", "설명"]}>
            {spec.anatomy.map((part, order) => (
              <tr key={part.part}>
                <th scope="row" className={`${td} whitespace-nowrap text-left font-medium text-fg-neutral`}>
                  {order + 1}. {part.part}
                </th>
                <td className={`${td} whitespace-nowrap text-fg-neutral`}>{part.ko}</td>
                <td className={`${td} text-fg-neutral-muted`}>{part.note}</td>
              </tr>
            ))}
          </Table>
        </TokenSection>

        <TokenSection id="variants" title="Variants" lead="모양은 쓰임새에 따라 고릅니다. 색은 모두 역할 토큰입니다.">
          <Table head={["견본", "이름", "쓰임", "토큰"]}>
            {spec.variants.map((variant) => {
              const tokens = Object.entries(variant.tokens ?? {}).filter((entry): entry is [string, string] => Boolean(entry[1]));
              const color = (part: string) => {
                const ref = variant.tokens?.[part];
                return ref ? valueOf(ref, "web") : undefined;
              };
              return (
                <tr key={variant.name}>
                  <td className={td}>
                    <span
                      aria-hidden
                      className="inline-flex h-x10 w-x16 items-center justify-center rounded-r2 border text-t4 font-bold"
                      style={{
                        backgroundColor: color("bg") ?? "transparent",
                        color: color("fg"),
                        borderColor: color("stroke") ?? "transparent",
                      }}
                    >
                      가Aa
                    </span>
                  </td>
                  <th scope="row" className={`${td} whitespace-nowrap text-left font-medium text-fg-neutral`}>{variant.name}</th>
                  <td className={`${td} text-fg-neutral-muted`}>{variant.use}</td>
                  <td className={`${td} text-fg-neutral-muted`}>
                    {tokens.map(([part, ref]) => (
                      <span key={part} className="block whitespace-nowrap">
                        {part}: {ref.replace("color.", "")}
                      </span>
                    ))}
                  </td>
                </tr>
              );
            })}
          </Table>
        </TokenSection>

        <TokenSection id="sizes" title="Sizes" lead="크기는 환경마다 다른 값을 씁니다. 토큰 이름과 지금 값을 함께 적었습니다.">
          {spec.sizes.map((size) => (
            <div key={size.name} className="mb-x8 last:mb-0">
              <p className="text-t5 font-bold text-fg-neutral">
                {size.name}
                {size.default ? <span className="ml-x2 text-t3 font-medium text-fg-brand">기본</span> : null}
                <span className="ml-x2 text-t3 font-medium text-fg-neutral-muted">{size.use}</span>
              </p>
              <div className="mt-x2">
                <Table head={["부분", ...ENVIRONMENTS]}>
                  {sizeParts
                    .filter((part) => ENVIRONMENTS.some((env) => size.env[env]?.[part]))
                    .map((part) => (
                      <tr key={part}>
                        <th scope="row" className={`${td} whitespace-nowrap text-left font-medium text-fg-neutral`}>{part}</th>
                        {ENVIRONMENTS.map((env) => {
                          const ref = size.env[env]?.[part];
                          return (
                            <td key={env} className={`${td} whitespace-nowrap text-fg-neutral-muted`}>
                              {ref ? (
                                <>
                                  {ref.replace("dimension.", "")} <span className="text-fg-neutral">{valueOf(ref, env)}</span>
                                </>
                              ) : (
                                "–"
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                </Table>
              </div>
            </div>
          ))}
        </TokenSection>

        <TokenSection id="states" title="States" lead="상태마다 무엇이 어떻게 바뀌는지입니다.">
          <Table head={["상태", "바뀌는 것", "토큰"]}>
            {spec.states.map((state) => (
              <tr key={state.name}>
                <th scope="row" className={`${td} whitespace-nowrap text-left font-medium text-fg-neutral`}>{state.name}</th>
                <td className={`${td} text-fg-neutral-muted`}>{state.change}</td>
                <td className={`${td} text-fg-neutral-muted`}>
                  {(state.tokens ?? []).map((ref) => (
                    <span key={ref} className="block whitespace-nowrap">
                      {ref.replace("color.", "")}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </Table>
          {spec.motion?.length ? (
            <div className="mt-x6">
              <p className="mb-x2 text-t3 font-bold text-fg-neutral">움직임</p>
              <Table head={["무엇이", "시간", "곡선"]}>
                {spec.motion.map((motion) => (
                  <tr key={motion.what}>
                    <th scope="row" className={`${td} text-left font-medium text-fg-neutral`}>{motion.what}</th>
                    <td className={`${td} whitespace-nowrap text-fg-neutral-muted`}>
                      {motion.duration ? `${motion.duration.replace("motion.duration.", "")} · ${valueOf(motion.duration, "web")}` : "–"}
                    </td>
                    <td className={`${td} whitespace-nowrap text-fg-neutral-muted`}>{motion.easing?.replace("motion.easing.", "") ?? "–"}</td>
                  </tr>
                ))}
              </Table>
            </div>
          ) : null}
        </TokenSection>

        <TokenSection id="behavior" title="Behavior" lead="눌렀을 때, 내용이 길 때, 화면이 좁을 때 어떻게 되는지입니다.">
          <Rules items={spec.behavior} />
        </TokenSection>

        <TokenSection id="accessibility" title="Accessibility" lead="이 부품에서 꼭 지켜야 하는 접근성입니다.">
          <Rules items={spec.accessibility} />
        </TokenSection>

        <TokenSection id="writing" title="Writing" lead="이 부품에 들어가는 문구의 규칙입니다.">
          <Rules items={spec.writing} />
        </TokenSection>

        <TokenSection id="props" title="Props" lead="웹과 앱의 구현이 같은 이름을 씁니다.">
          <Table head={["이름", "값", "기본", "설명"]}>
            {spec.props.map((prop) => (
              <tr key={prop.name}>
                <th scope="row" className={`${td} whitespace-nowrap text-left font-medium text-fg-neutral`}>{prop.name}</th>
                <td className={`${td} text-fg-neutral-muted`}>
                  <code className={code}>{prop.type}</code>
                </td>
                <td className={`${td} whitespace-nowrap text-fg-neutral-muted`}>{prop.default ?? "–"}</td>
                <td className={`${td} text-fg-neutral-muted`}>{prop.note}</td>
              </tr>
            ))}
          </Table>
        </TokenSection>

        <TokenSection id="web" title="구현: 웹" lead="파트너 웹과 랜딩. React와 Tailwind, 토큰 preset(web)을 씁니다.">
          <ol className="flex list-decimal flex-col gap-x2 pl-x5 text-t4 text-fg-neutral-muted">
            {spec.implementation.web.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ol>
        </TokenSection>

        <TokenSection id="app" title="구현: 앱" lead="고객 앱. React Native와 토큰 파일(tokens.ts, app)을 씁니다.">
          <ol className="flex list-decimal flex-col gap-x2 pl-x5 text-t4 text-fg-neutral-muted">
            {spec.implementation.app.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ol>
        </TokenSection>

        <TokenSection id="kiosk" title="구현: 키오스크" lead="키오스크 3종. 웹 기준 구현을 그대로 쓰고 토큰 preset만 kiosk로 바꿉니다.">
          <ol className="flex list-decimal flex-col gap-x2 pl-x5 text-t4 text-fg-neutral-muted">
            {spec.implementation.kiosk.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ol>
        </TokenSection>
      </div>

      <nav aria-label="이전·다음 문서" className="mt-x10 grid grid-cols-2 gap-x4 border-t border-stroke-neutral-muted pt-x6">
        {prev ? (
          <Link href={`${COMPONENTS_HREF}/${prev.key}`} className="rounded-r3 border border-stroke-neutral-weak p-x4 hover:bg-bg-neutral-weak">
            <span className="block text-t2 text-fg-neutral-subtle">이전 문서</span>
            <span className="block text-t5 font-bold">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`${COMPONENTS_HREF}/${next.key}`} className="rounded-r3 border border-stroke-neutral-weak p-x4 text-right hover:bg-bg-neutral-weak">
            <span className="block text-t2 text-fg-neutral-subtle">다음 문서</span>
            <span className="block text-t5 font-bold">{next.title}</span>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
