"use client";

import type { ReactNode } from "react";
import Radio, { RadioGroup } from "../Radio";

const group = "mb-x2 text-t2 font-bold text-fg-neutral-subtle";
const row = "flex flex-wrap items-start gap-x6";

/** 라디오 견본. thumb 이 참이면 목록 카드에 들어갈 만큼만 그린다. */
export default function demo(thumb: boolean): ReactNode {
  if (thumb) {
    return (
      <div className="flex flex-col">
        <Radio name="radio-thumb" value="card" defaultChecked label="카드" />
        <Radio name="radio-thumb" value="point" label="포인트" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-x6">
      <div>
        <p className={group}>구성</p>
        <div className={row}>
          <RadioGroup
            legend="결제 수단"
            name="radio-demo-pay"
            defaultValue="card"
            options={[
              { value: "card", label: "카드" },
              { value: "transfer", label: "계좌 이체" },
              { value: "point", label: "포인트", description: "12,000P를 쓸 수 있어요" },
            ]}
          />
          <RadioGroup
            legend="충전할 금액"
            name="radio-demo-amount"
            errorText="충전할 금액을 골라주세요"
            options={[
              { value: "10000", label: "10,000원" },
              { value: "30000", label: "30,000원" },
              { value: "50000", label: "50,000원" },
            ]}
          />
        </div>
      </div>
      <div>
        <p className={group}>size</p>
        <div className={row}>
          <Radio name="radio-demo-medium" size="medium" defaultChecked label="medium" />
          <Radio name="radio-demo-small" size="small" defaultChecked label="small" />
        </div>
      </div>
      <div>
        <p className={group}>state</p>
        <div className={row}>
          <Radio name="radio-demo-off" label="unselected" />
          <Radio name="radio-demo-on" defaultChecked label="selected" />
          <Radio name="radio-demo-error" invalid label="error" />
          <Radio name="radio-demo-disabled" disabled label="disabled" />
          <Radio name="radio-demo-disabled-on" disabled defaultChecked label="disabled selected" />
        </div>
      </div>
    </div>
  );
}
