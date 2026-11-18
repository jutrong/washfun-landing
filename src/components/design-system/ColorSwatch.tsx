import type { Token } from "./tokens";

type Variant = "fill" | "text" | "line";

/**
 * 색 토큰 하나의 견본. 색은 tokens.json 의 값을 그대로 style 로 넣는다.
 * - fill: 면으로 칠한다 (bg, palette)
 * - text: 글자로 보여 준다 (fg). on 에 배경 색을 주면 그 위에 올린다.
 * - line: 테두리로 보여 준다 (stroke)
 */
export default function ColorSwatch({
  token,
  variant,
  on,
}: {
  token: Token;
  variant: Variant;
  on?: string;
}) {
  const sample =
    variant === "fill"
      ? { backgroundColor: token.value }
      : variant === "text"
        ? { color: token.value, backgroundColor: on }
        : { borderColor: token.value, borderWidth: 2 };

  return (
    <div>
      <div
        className="flex h-[72px] items-center justify-center rounded-r3 border border-stroke-neutral-muted bg-bg-layer-default text-t7 font-bold"
        style={sample}
      >
        {variant === "text" ? "가나다 Aa" : null}
      </div>
      <p className="mt-x2 break-all text-t3 font-medium text-fg-neutral">{token.path}</p>
      <p className="break-all text-t2 text-fg-neutral-muted">
        {token.ref ? `${token.ref.replace("color.palette.", "")} · ` : ""}
        {token.value}
      </p>
      {token.description ? (
        <p className="text-t2 text-fg-neutral-muted">{token.description}</p>
      ) : null}
    </div>
  );
}
