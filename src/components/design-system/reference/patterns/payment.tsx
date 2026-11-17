"use client";

import type { ReactNode } from "react";
import Badge from "../Badge";
import Button from "../Button";
import { DialogSurface } from "../Dialog";

const label = "mb-x2 text-t2 font-bold text-fg-neutral-subtle";
const screen = "flex h-full flex-col rounded-r4 border border-stroke-neutral-weak bg-bg-layer-default p-x5";
const nothing = () => {};

// 견본용 아이콘. 실제 제품에서는 Icon Library 의 Fill 아이콘을 쓴다.
const CHECK = "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1.2 14.2-4-4 1.4-1.4 2.6 2.6 5.4-5.4 1.4 1.4-6.8 6.8Z";

function Row({ name, value, tone = "default" }: { name: string; value: string; tone?: "default" | "strong" | "bonus" }) {
  const color = tone === "bonus" ? "text-fg-brand" : "text-fg-neutral";
  return (
    <div className="flex items-baseline justify-between gap-x4">
      <dt className="text-t4 text-fg-neutral-muted">{name}</dt>
      <dd className={`text-right tabular-nums ${tone === "strong" ? "text-t6 font-bold" : "text-t4 font-medium"} ${color}`}>{value}</dd>
    </div>
  );
}

function Progress({ done, children }: { done: boolean; children: string }) {
  return (
    <li className="flex items-center gap-x2 text-t4">
      {done ? (
        <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" className="size-icon-md shrink-0 text-fg-positive">
          <path d={CHECK} />
        </svg>
      ) : (
        <span aria-hidden className="size-icon-md shrink-0 rounded-full border-2 border-stroke-brand-solid" />
      )}
      <span className={done ? "text-fg-neutral-muted" : "font-bold text-fg-neutral"}>{children}</span>
    </li>
  );
}

export default function demo(thumb: boolean): ReactNode {
  if (thumb) {
    return (
      <div className="w-full max-w-xs rounded-r4 border border-stroke-neutral-weak bg-bg-layer-default p-x4">
        <dl className="flex flex-col gap-x1">
          <Row name="충전 포인트" value="10,000P" />
          <Row name="보너스 포인트" value="+1,000P" tone="bonus" />
        </dl>
        <Button fullWidth size="medium" className="mt-x3">
          10,000원 결제하기
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-x8">
      <div className="grid grid-cols-3 gap-x6 md:grid-cols-1">
        <div className="flex flex-col">
          <p className={label}>1 · 확인 · 버튼에 금액</p>
          <div className={screen}>
            <h3 className="text-t6 font-bold text-fg-neutral">11,000P를 충전할까요?</h3>
            <dl className="mt-x4 flex flex-col gap-x2">
              <Row name="결제 수단" value="신용카드" />
              <Row name="충전 포인트" value="10,000P" />
              <Row name="보너스 포인트" value="+1,000P" tone="bonus" />
              <Row name="충전 후 포인트" value="13,500P" />
            </dl>
            <dl className="mt-x4 border-t border-stroke-neutral-weak pt-x4">
              <Row name="결제 금액" value="10,000원" tone="strong" />
            </dl>
            <div className="mt-auto pt-x6">
              <Button fullWidth>10,000원 결제하기</Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <p className={label}>2 · 처리 중 · 끊을 수 없음</p>
          <div className={screen}>
            <h3 className="text-t6 font-bold text-fg-neutral">포인트를 충전하고 있어요</h3>
            <p className="mt-x2 text-t4 text-fg-neutral-muted">카드를 그대로 두고 기다려주세요.</p>
            <ul className="mt-x4 flex flex-col gap-x2" aria-live="polite">
              <Progress done>10,000원을 결제했어요</Progress>
              <Progress done={false}>포인트를 충전하고 있어요</Progress>
            </ul>
            <div className="mt-auto pt-x6">
              <Button fullWidth loading>
                10,000원 결제하기
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <p className={label}>3 · 완료 · 바뀐 숫자와 남은 시간</p>
          <div className={screen}>
            <div className="flex items-center gap-x2">
              <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" className="size-icon-lg shrink-0 text-fg-positive">
                <path d={CHECK} />
              </svg>
              <h3 className="text-t6 font-bold text-fg-neutral">11,000P를 충전했어요</h3>
            </div>
            <dl className="mt-x4 flex flex-col gap-x2">
              <Row name="결제 금액" value="10,000원" />
              <Row name="충전 포인트" value="10,000P" />
              <Row name="보너스 포인트" value="+1,000P" tone="bonus" />
            </dl>
            <dl className="mt-x4 border-t border-stroke-neutral-weak pt-x4">
              <Row name="잔여 포인트" value="13,500P" tone="strong" />
            </dl>
            <div className="mt-auto pt-x6">
              <p className="mb-x2 text-center text-t3 text-fg-neutral-muted">5초 후 처음 화면으로 돌아가요</p>
              <div className="flex gap-x2">
                <Button variant="outline" className="min-w-0 flex-1">
                  영수증 받기
                </Button>
                <Button variant="secondary" className="min-w-0 flex-1">
                  처음으로
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x8 md:grid-cols-1">
        <div>
          <div className="mb-x2 flex items-center gap-x2">
            <p className="text-t2 font-bold text-fg-neutral-subtle">결과를 알 수 없음 · 다시 결제하게 하지 않음</p>
            <Badge tone="warning">확인 중</Badge>
          </div>
          <DialogSurface
            title="결제 결과를 확인하는 중이에요"
            description="다시 결제하지 말고 기다려주세요."
            primaryAction={{ label: "확인하는 중", onClick: nothing, loading: true }}
          />
        </div>
        <div>
          <p className={label}>결제 거절 · 돈이 빠져나갔는지 먼저</p>
          <DialogSurface
            title="결제하지 못했어요"
            description="돈은 빠져나가지 않았어요. 다른 카드로 결제해주세요."
            primaryAction={{ label: "다른 카드로 결제하기", onClick: nothing }}
            secondaryAction={{ label: "닫기", onClick: nothing }}
          />
        </div>
      </div>
    </div>
  );
}
