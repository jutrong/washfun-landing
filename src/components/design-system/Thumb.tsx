import Icon from "./Icon";
import { gradients, list } from "./tokens";

/**
 * 항목을 대표하는 그림. 목록 카드와 각 문서의 머리 그림에 같이 쓴다.
 * 색과 크기는 모두 토큰 클래스나 tokens.json 값에서 온다.
 */
export default function Thumb({ name, large = false }: { name: string; large?: boolean }) {
  const frame = `flex items-center justify-center overflow-hidden rounded-r4 ${large ? "h-[280px] md:h-[200px]" : "h-[168px]"}`;

  if (name === "design-token") {
    return (
      <div className={`${frame} flex-col items-stretch bg-bg-brand-weak`}>
        {["dimension.x4", "color.bg.brand-solid", "color.palette.blue-600"].map((token, index) => (
          <p
            key={token}
            className={`whitespace-nowrap border-b border-stroke-neutral-muted px-x5 py-x2 text-t8 font-bold last:border-b-0 ${
              index === 1 ? "text-fg-brand" : "text-fg-placeholder"
            }`}
          >
            {token}
          </p>
        ))}
      </div>
    );
  }

  if (name === "color") {
    return (
      <div className={`${frame} gap-x2 bg-bg-neutral-weak`}>
        <div className="flex flex-col gap-x2">
          <span className="block size-x14 rounded-r4 bg-palette-blue-200" />
          <span className="block size-x14 rounded-full bg-palette-blue-800" />
        </div>
        <span className="block h-[120px] w-x14 rounded-full bg-bg-brand-solid" />
      </div>
    );
  }

  if (name === "typography") {
    return (
      <div className={`${frame} bg-bg-brand-solid`}>
        <span className="border-y border-stroke-neutral-muted text-[88px] font-bold leading-none text-fg-on-brand-solid">
          가A
        </span>
      </div>
    );
  }

  if (name === "spacing") {
    return (
      <div className={`${frame} items-end gap-x2 bg-bg-neutral-weak pb-x8`}>
        {list("dimension")
          .slice(0, 9)
          .map((token) => (
            <span key={token.path} className="block w-x4 rounded-r1 bg-bg-brand-solid" style={{ height: `calc(${token.value} * 2)` }} />
          ))}
      </div>
    );
  }

  if (name === "radius") {
    return (
      <div className={`${frame} gap-x4 bg-bg-brand-weak`}>
        {list("env.web.radius")
          .filter((_, index) => index % 2 === 1)
          .map((token) => (
            <span
              key={token.path}
              className="block size-x16 border-2 border-stroke-brand-solid bg-bg-layer-default"
              style={{ borderRadius: token.value }}
            />
          ))}
      </div>
    );
  }

  if (name === "gradient") {
    const all = gradients();
    const glow = all.find((gradient) => gradient.name === "glow-brand");
    const highlight = all.find((gradient) => gradient.name === "highlight-brand");
    return (
      <div className={frame} style={{ backgroundImage: `linear-gradient(180deg, ${glow?.stops})` }}>
        <span
          className="block size-[112px] rounded-full"
          style={{ backgroundImage: `linear-gradient(135deg, ${highlight?.stops})` }}
        />
      </div>
    );
  }

  if (name === "iconography") {
    return (
      <div className={`${frame} gap-x6 bg-bg-brand-weak text-fg-brand`}>
        <Icon name="home-line" className="size-x14" />
        <Icon name="heart-fill" className="size-x14" />
        <Icon name="settings-4-line" className="size-x14" />
      </div>
    );
  }

  if (name === "motion") {
    return (
      <div className={`${frame} bg-bg-brand-weak`}>
        <div className="flex items-center gap-x2">
          {["opacity-20", "opacity-40", "opacity-60", "opacity-100"].map((opacity, index) => (
            <span key={opacity} className={`block rounded-full bg-bg-brand-solid ${opacity} ${index === 3 ? "size-x12" : "size-x8"}`} />
          ))}
        </div>
      </div>
    );
  }

  if (name === "writing") {
    return (
      <div className={`${frame} flex-col gap-x3 bg-bg-brand-weak`}>
        <p className="rounded-r3 bg-bg-layer-default px-x5 py-x3 text-t5 text-fg-placeholder line-through">결제 실패: 키 검증 실패</p>
        <p className="rounded-r3 bg-bg-brand-solid px-x5 py-x3 text-t5 font-bold text-fg-on-brand-solid">결제하지 못했어요</p>
      </div>
    );
  }

  if (name === "accessibility") {
    return (
      <div className={`${frame} gap-x4 bg-bg-layer-basement`}>
        <span className="flex size-x16 items-center justify-center rounded-r3 bg-bg-brand-solid text-t8 font-bold text-fg-on-brand-solid">가</span>
        <span className="text-t8 font-bold text-fg-neutral">4.9 : 1</span>
      </div>
    );
  }

  // elevation
  return (
    <div className={`${frame} gap-x6 bg-bg-layer-basement`}>
      {list("shadow").map((token) => (
        <span key={token.path} className="block size-x16 rounded-r3 bg-bg-layer-default" style={{ boxShadow: token.value }} />
      ))}
    </div>
  );
}
