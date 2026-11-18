"use client";

import type { ReactNode } from "react";
import Switch from "../Switch";

const group = "mb-x2 text-t2 font-bold text-fg-neutral-subtle";

/** 스위치 견본. thumb 이 참이면 목록 카드에 들어갈 만큼만 그린다. */
export default function demo(thumb: boolean): ReactNode {
  if (thumb) {
    return (
      <div className="flex w-56 flex-col">
        <Switch defaultChecked label="알림 받기" />
        <Switch label="자동 충전" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-x6">
      <div>
        <p className={group}>구성</p>
        <div className="flex max-w-md flex-col">
          <Switch defaultChecked label="마케팅 알림 받기" />
          <Switch label="자동 충전" description="포인트가 5,000P보다 적으면 10,000원을 충전해요" />
          <Switch aria-label="레이블 없이 쓸 때는 읽어 줄 이름을 붙여요" className="justify-end" />
        </div>
      </div>
      <div>
        <p className={group}>state</p>
        <div className="flex max-w-md flex-col">
          <Switch label="off" />
          <Switch defaultChecked label="on" />
          <Switch disabled label="disabled off" />
          <Switch disabled defaultChecked label="disabled on" />
        </div>
      </div>
    </div>
  );
}
