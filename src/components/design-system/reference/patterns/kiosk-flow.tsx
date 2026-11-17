"use client";

import { useEffect, useState, type ReactNode } from "react";
import Badge from "../Badge";
import Button from "../Button";
import { DialogSurface } from "../Dialog";

const label = "mb-x2 text-t2 font-bold text-fg-neutral-subtle";
const nothing = () => {};

const STEPS = ["회원 확인", "상품 선택", "결제"];
const PRODUCTS = [
  { price: "10,000원", points: "10,000P", bonus: "" },
  { price: "30,000원", points: "30,000P", bonus: "+3,000P" },
];
const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "지우기"];
const BODY_LENGTH = 8;
const IDLE_SECONDS = 15;

// 견본용 아이콘. 실제 제품에서는 Icon Library 의 Fill 아이콘을 쓴다.
const BACK = "M15.7 5.3a1 1 0 0 1 0 1.4L10.4 12l5.3 5.3a1 1 0 0 1-1.4 1.4l-6-6a1 1 0 0 1 0-1.4l6-6a1 1 0 0 1 1.4 0Z";
const CHECK = "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1.2 14.2-4-4 1.4-1.4 2.6 2.6 5.4-5.4 1.4 1.4-6.8 6.8Z";

function BackIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="size-icon-sm shrink-0">
      <path d={BACK} />
    </svg>
  );
}

/** 지난 단계는 채우고, 남은 단계는 옅게. 숫자는 머리글의 단계 표시가 알린다. */
function StepBar({ current }: { current: number }) {
  return (
    <div aria-hidden className="flex gap-x1 px-x4 pt-x2">
      {STEPS.map((name, index) => (
        <span key={name} className={`h-x1 flex-1 rounded-full ${index <= current ? "bg-bg-brand-solid" : "bg-bg-neutral-weak"}`} />
      ))}
    </div>
  );
}

function formatPhone(body: string) {
  return body.length > 4 ? `010-${body.slice(0, 4)}-${body.slice(4)}` : `010-${body}`;
}

function KioskFrame() {
  // 0~2 는 단계, 3 은 완료 화면.
  const [step, setStep] = useState(0);
  const [phone, setPhone] = useState("1234");
  const [product, setProduct] = useState(0);
  const done = step === STEPS.length;
  const chosen = PRODUCTS[product];

  const reset = () => {
    // 처음으로: 입력한 것을 모두 지운다.
    setStep(0);
    setPhone("");
    setProduct(0);
  };

  const press = (key: string) => {
    if (key === "지우기") setPhone((value) => value.slice(0, -1));
    else setPhone((value) => (value.length < BODY_LENGTH ? value + key : value));
  };

  const primary =
    step === 0
      ? { text: "다음", disabled: phone.length < BODY_LENGTH }
      : step === 1
        ? { text: "다음", disabled: false }
        : { text: `${chosen.price} 결제하기`, disabled: false };

  return (
    <div className="flex w-full max-w-md flex-col overflow-hidden rounded-r4 border border-stroke-neutral-weak bg-bg-layer-default">
      {done ? null : (
        <>
          <div className="flex items-center justify-between gap-x2 px-x4 pt-x4">
            <Button variant="outline" size="small" icon={<BackIcon />} onClick={() => setStep((value) => Math.max(0, value - 1))}>
              이전으로
            </Button>
            <Badge tone="brand">
              {step + 1} / {STEPS.length} 단계 · {STEPS[step]}
            </Badge>
          </div>
          <StepBar current={step} />
        </>
      )}

      <div className="flex flex-1 flex-col justify-center gap-x4 p-x6">
        {step === 0 ? (
          <>
            <h3 className="text-center text-t6 font-bold text-fg-neutral">휴대폰 번호를 입력해주세요</h3>
            <p className="text-center text-t8 font-bold tabular-nums text-fg-neutral" aria-live="polite">
              {formatPhone(phone)}
            </p>
            <div className="grid grid-cols-3 gap-x2">
              {KEYS.map((key, index) =>
                key ? (
                  <button
                    key={key}
                    type="button"
                    onClick={() => press(key)}
                    className="h-x12 rounded-r3 bg-bg-neutral-weak text-t5 font-bold text-fg-neutral transition-colors duration-d1 ease-standard active:bg-bg-brand-weak motion-reduce:transition-none"
                  >
                    {key}
                  </button>
                ) : (
                  <span key={`blank-${index}`} />
                ),
              )}
            </div>
          </>
        ) : null}

        {step === 1 ? (
          <>
            <h3 className="text-center text-t6 font-bold text-fg-neutral">충전할 금액을 골라주세요</h3>
            <div className="flex flex-col gap-x3">
              {PRODUCTS.map((item, index) => (
                <button
                  key={item.price}
                  type="button"
                  aria-pressed={product === index}
                  onClick={() => setProduct(index)}
                  className={`flex items-center justify-between rounded-r4 border-2 p-x5 text-left ${
                    product === index ? "border-stroke-brand-solid bg-bg-brand-weak" : "border-stroke-neutral-weak bg-bg-layer-default"
                  }`}
                >
                  <span className="text-t6 font-bold tabular-nums text-fg-neutral">{item.price}</span>
                  <span className="flex items-center gap-x2 text-t4 tabular-nums text-fg-neutral-muted">
                    {item.points}
                    {item.bonus ? <Badge tone="brand">{item.bonus}</Badge> : null}
                  </span>
                </button>
              ))}
            </div>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <h3 className="text-center text-t6 font-bold text-fg-neutral">결제할 내용을 확인해주세요</h3>
            <dl className="flex flex-col gap-x2 rounded-r4 bg-bg-neutral-weak p-x5 text-t4">
              <div className="flex justify-between gap-x4">
                <dt className="text-fg-neutral-muted">회원</dt>
                <dd className="tabular-nums text-fg-neutral">010-****-{phone.slice(4) || "5678"}</dd>
              </div>
              <div className="flex justify-between gap-x4">
                <dt className="text-fg-neutral-muted">충전 포인트</dt>
                <dd className="tabular-nums text-fg-neutral">{chosen.points}</dd>
              </div>
              {chosen.bonus ? (
                <div className="flex justify-between gap-x4">
                  <dt className="text-fg-neutral-muted">보너스 포인트</dt>
                  <dd className="tabular-nums text-fg-brand">{chosen.bonus}</dd>
                </div>
              ) : null}
              <div className="flex justify-between gap-x4 font-bold">
                <dt className="text-fg-neutral">결제 금액</dt>
                <dd className="tabular-nums text-fg-neutral">{chosen.price}</dd>
              </div>
            </dl>
          </>
        ) : null}

        {done ? (
          <div className="flex flex-col items-center gap-x3 text-center">
            <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" className="size-icon-xl text-fg-positive">
              <path d={CHECK} />
            </svg>
            <h3 className="text-t6 font-bold text-fg-neutral">{chosen.points}를 충전했어요</h3>
            <p className="text-t4 text-fg-neutral-muted">5초 후 처음 화면으로 돌아가요</p>
          </div>
        ) : null}
      </div>

      <div className="flex gap-x3 border-t border-stroke-neutral-weak p-x4">
        <Button variant="outline" className={done ? "min-w-0 flex-1" : ""} onClick={reset}>
          처음으로
        </Button>
        {done ? null : (
          <Button className="min-w-0 flex-1" disabled={primary.disabled} onClick={() => setStep((value) => value + 1)}>
            {primary.text}
          </Button>
        )}
      </div>
    </div>
  );
}

/** 남은 시간을 1초마다 고쳐 보여 준다. 견본이라 0이 되면 다시 15초부터 센다. */
function IdleDialog() {
  const [seconds, setSeconds] = useState(IDLE_SECONDS);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((value) => (value <= 1 ? IDLE_SECONDS : value - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <DialogSurface
      title="계속 이용할까요?"
      description={`${seconds}초 후 처음 화면으로 돌아가요. 입력한 내용은 모두 지워요.`}
      primaryAction={{ label: "계속하기", onClick: () => setSeconds(IDLE_SECONDS) }}
      secondaryAction={{ label: "처음으로", onClick: nothing }}
    />
  );
}

export default function demo(thumb: boolean): ReactNode {
  if (thumb) {
    return (
      <div className="flex w-full max-w-xs flex-col overflow-hidden rounded-r4 border border-stroke-neutral-weak bg-bg-layer-default">
        <div className="flex items-center justify-between gap-x2 px-x4 pt-x3">
          <span className="inline-flex items-center gap-x1 text-t3 font-bold text-fg-neutral-muted">
            <BackIcon />
            이전으로
          </span>
          <Badge tone="brand">2 / 3 단계</Badge>
        </div>
        <StepBar current={1} />
        <p className="px-x4 py-x4 text-center text-t4 font-bold text-fg-neutral">충전할 금액을 골라주세요</p>
        <div className="flex gap-x2 border-t border-stroke-neutral-weak p-x3">
          <Button variant="outline" size="small">
            처음으로
          </Button>
          <Button size="small" className="min-w-0 flex-1">
            다음
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x8 md:grid-cols-1">
      <div>
        <p className={label}>단계 화면 · 머리글, 한 가지 일, 아래 버튼</p>
        <KioskFrame />
      </div>
      <div>
        <p className={label}>무입력 90초 뒤 · 남은 시간을 세는 확인 창</p>
        <IdleDialog />
        <p className={`mt-x8 ${label}`}>자리가 변하지 않는 것</p>
        <ul className="flex flex-col gap-x2 text-t4 text-fg-neutral-muted">
          <li>머리글 왼쪽: 이전으로</li>
          <li>머리글 오른쪽: 지금 단계 / 전체 단계</li>
          <li>화면 아래 왼쪽: 처음으로</li>
          <li>화면 아래 오른쪽: 주요 버튼 하나</li>
        </ul>
      </div>
    </div>
  );
}
