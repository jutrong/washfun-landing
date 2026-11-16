import { icon } from "./icons";

/** 문서 안에서 아이콘을 그린다. 색은 글자색(currentColor)을 따르고 크기는 className 이나 size 로 정한다. */
export default function Icon({ name, size, className = "" }: { name: string; size?: string; className?: string }) {
  const entry = icon(name);
  if (!entry) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={`shrink-0 ${className}`}
      style={size ? { width: size, height: size } : undefined}
    >
      <path d={entry.d} />
    </svg>
  );
}
