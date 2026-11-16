import type { ReactNode } from "react";
import { ENVIRONMENTS, list } from "./tokens";

/** 환경별로 값이 다른 토큰(글자 크기·줄 높이·모서리·아이콘 크기)을 web / app / kiosk 세 칸으로 보여 준다. */
export default function EnvTable({
  group,
  sample,
}: {
  group: "font-size" | "line-height" | "radius" | "icon-size" | "touch-target";
  /** 환경별 값을 눈으로 보여 줄 견본 */
  sample?: (value: string) => ReactNode;
}) {
  const byEnv = ENVIRONMENTS.map((env) => new Map(list(`env.${env}.${group}`).map((token) => [token.name, token.value])));
  const names = Array.from(byEnv[0].keys());

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-t3">
        <thead>
          <tr className="text-fg-neutral-muted">
            <th scope="col" className="border-b border-stroke-neutral-weak py-x2 pr-x4 font-medium">이름</th>
            {ENVIRONMENTS.map((env) => (
              <th key={env} scope="col" className="border-b border-stroke-neutral-weak py-x2 pr-x4 font-medium">
                {env}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {names.map((name) => (
            <tr key={name}>
              <th scope="row" className="border-b border-stroke-neutral-muted py-x2 pr-x4 text-left align-middle font-medium text-fg-neutral">
                {group}.{name}
              </th>
              {byEnv.map((valuesOfEnv, col) => {
                const value = valuesOfEnv.get(name) ?? "";
                return (
                  <td
                    key={ENVIRONMENTS[col]}
                    className="border-b border-stroke-neutral-muted py-x2 pr-x4 align-middle text-fg-neutral-muted"
                  >
                    <span className="flex items-center gap-x3">
                      <span className="w-[52px] shrink-0">{value}</span>
                      {sample ? sample(value) : null}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
