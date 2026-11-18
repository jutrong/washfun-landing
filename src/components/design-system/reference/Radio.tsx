import type { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";

type Size = "medium" | "small";

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> & {
  /** 동그라미 오른쪽 레이블. */
  label: ReactNode;
  /** 레이블 아래 보조 설명. */
  description?: string;
  size?: Size;
  /** 오류 상태. 문구는 묶음 아래에 한 번만 둔다. */
  invalid?: boolean;
  /** 골랐을 때. 앱과 같은 이름을 쓴다. */
  onCheckedChange?: (checked: boolean) => void;
};

// 키오스크에서는 이 표만 kiosk 값으로 바꾼다(medium: 줄 min-h-x16 py-x4 gap-x4, 동그라미 size-x8, 감싼 칸 h-x8, 점 size-x4, 레이블 text-t3).
const SIZES: Record<Size, { row: string; line: string; circle: string; dot: string; label: string; description: string }> = {
  medium: { row: "min-h-x12 gap-x3 py-x3", line: "h-x6", circle: "size-x5", dot: "size-x3", label: "text-t5", description: "text-t3" },
  small: { row: "min-h-x10 gap-x2 py-x2", line: "h-x5", circle: "size-x4", dot: "size-x2", label: "text-t4", description: "text-t2" },
};

// input 자체를 동그라미로 그린다. 같은 name 끼리 화살표로 옮기는 동작은 브라우저가 해 준다.
const CIRCLE = [
  "peer shrink-0 cursor-pointer appearance-none rounded-full border bg-bg-layer-default",
  "transition-colors duration-d1 ease-standard motion-reduce:transition-none",
  "checked:border-stroke-brand-solid",
  "disabled:cursor-not-allowed disabled:border-stroke-neutral-weak disabled:bg-bg-disabled",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stroke-brand-solid",
].join(" ");

export default function Radio({
  label,
  description,
  size = "medium",
  invalid = false,
  disabled = false,
  onCheckedChange,
  onChange,
  className = "",
  ...rest
}: RadioProps) {
  const s = SIZES[size];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    onCheckedChange?.(event.target.checked);
  };

  return (
    <label className={`inline-flex items-start ${s.row} ${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${className}`}>
      {/* 높이를 레이블 한 줄과 같게 두어, 레이블이 여러 줄이어도 동그라미가 첫 줄에 맞는다. */}
      <span className={`relative inline-flex shrink-0 items-center ${s.line}`}>
        <input
          {...rest}
          type="radio"
          disabled={disabled}
          onChange={handleChange}
          className={`${CIRCLE} ${s.circle} ${invalid ? "border-fg-critical" : "border-stroke-neutral"}`}
        />
        {/* 고른 상태는 색과 함께 가운데 점으로 알린다. */}
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-0 m-auto rounded-full bg-bg-brand-solid opacity-0 transition-opacity duration-d1 ease-standard motion-reduce:transition-none peer-checked:opacity-100 peer-disabled:bg-fg-disabled ${s.dot}`}
        />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className={`${s.label} ${disabled ? "text-fg-disabled" : "text-fg-neutral"}`}>{label}</span>
        {description ? <span className={`${s.description} ${disabled ? "text-fg-disabled" : "text-fg-neutral-muted"}`}>{description}</span> : null}
      </span>
    </label>
  );
}

export type RadioOption = { value: string; label: ReactNode; description?: string; disabled?: boolean };

export type RadioGroupProps = {
  /** 무엇을 고르는지 알리는 제목. 눈에 보이게 둔다. */
  legend: string;
  /** 같은 묶음을 잇는 이름. 오류 문구의 id 도 여기서 만든다. */
  name: string;
  options: RadioOption[];
  /** 고른 값. 밖에서 값을 가질 때 쓴다. */
  value?: string;
  /** 처음 고른 값. 값을 밖에 두지 않을 때 쓴다. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** 묶음 아래 오류 문구. 값이 있으면 오류 상태가 된다. */
  errorText?: string;
  size?: Size;
  disabled?: boolean;
  className?: string;
};

export function RadioGroup({ legend, name, options, value, defaultValue, onValueChange, errorText, size = "medium", disabled = false, className = "" }: RadioGroupProps) {
  const invalid = Boolean(errorText);
  const errorId = `${name}-error`;

  return (
    <fieldset aria-invalid={invalid || undefined} aria-describedby={invalid ? errorId : undefined} className={`flex min-w-0 flex-col ${className}`}>
      <legend className="mb-x1 text-t4 font-medium text-fg-neutral">{legend}</legend>
      {options.map((option) => (
        <Radio
          key={option.value}
          name={name}
          value={option.value}
          label={option.label}
          description={option.description}
          size={size}
          invalid={invalid}
          disabled={disabled || option.disabled}
          // value 를 넘기면 밖에서 값을 가지고, 넘기지 않으면 브라우저가 가진다.
          {...(value !== undefined ? { checked: value === option.value } : { defaultChecked: defaultValue === option.value })}
          onCheckedChange={(checked) => {
            if (checked) onValueChange?.(option.value);
          }}
        />
      ))}
      {/* 오류 문구는 선택지마다 되풀이하지 않고 묶음 아래에 한 번만 둔다. */}
      {invalid ? (
        <p id={errorId} className="mt-x1 text-t3 text-fg-critical">
          {errorText}
        </p>
      ) : null}
    </fieldset>
  );
}
