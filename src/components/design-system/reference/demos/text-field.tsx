"use client";

import type { ReactNode } from "react";
import TextField from "../TextField";

const group = "mb-x2 text-t2 font-bold text-fg-neutral-subtle";
const grid = "grid max-w-2xl grid-cols-2 items-start gap-x4 md:grid-cols-1";

/** 입력 칸 견본. thumb 이 참이면 목록 카드에 들어갈 만큼만 그린다. */
export default function demo(thumb: boolean): ReactNode {
  if (thumb) {
    return (
      <div className="w-56">
        <TextField label="휴대폰 번호" placeholder="010-1234-5678" inputMode="numeric" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-x6">
      <div>
        <p className={group}>구성</p>
        <div className={grid}>
          <TextField label="휴대폰 번호" placeholder="010-1234-5678" type="tel" autoComplete="tel" helperText="숫자만 입력해주세요" />
          <TextField label="충전할 금액" defaultValue="10,000" inputMode="numeric" suffix="원" />
        </div>
      </div>
      <div>
        <p className={group}>size</p>
        <div className={grid}>
          <TextField size="large" label="large" placeholder="차량 번호" />
          <TextField size="medium" label="medium" placeholder="매장 이름" />
        </div>
      </div>
      <div>
        <p className={group}>state</p>
        <div className={grid}>
          <TextField label="default" placeholder="010-1234-5678" />
          <TextField label="filled" defaultValue="010-1234-5678" />
          <TextField label="error" defaultValue="010-1234-567" errorText="번호를 다시 확인해주세요" />
          <TextField label="disabled" defaultValue="010-1234-5678" disabled />
        </div>
      </div>
    </div>
  );
}
