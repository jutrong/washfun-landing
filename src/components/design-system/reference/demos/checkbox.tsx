"use client";

import type { ReactNode } from "react";
import Checkbox from "../Checkbox";

const group = "mb-x2 text-t2 font-bold text-fg-neutral-subtle";
const row = "flex flex-wrap items-start gap-x6";

/** 체크박스 견본. thumb 이 참이면 목록 카드에 들어갈 만큼만 그린다. */
export default function demo(thumb: boolean): ReactNode {
  if (thumb) {
    return (
      <div className="flex flex-col">
        <Checkbox defaultChecked label="모두 동의하기" />
        <Checkbox label="마케팅 알림 받기" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-x6">
      <div>
        <p className={group}>구성</p>
        <fieldset className="flex max-w-md flex-col">
          <legend className="sr-only">약관 동의</legend>
          <Checkbox defaultChecked label="(필수) 서비스 이용약관에 동의해요" />
          <Checkbox label="(선택) 마케팅 정보 받기에 동의해요" description="할인 쿠폰과 매장 소식을 보내요" />
          <Checkbox label="(선택) 레이블이 길면 줄을 바꿔요. 말줄임으로 자르지 않고, 네모는 첫 줄에 맞춰요" />
        </fieldset>
      </div>
      <div>
        <p className={group}>size</p>
        <div className={row}>
          <Checkbox size="medium" defaultChecked label="medium" />
          <Checkbox size="small" defaultChecked label="small" />
        </div>
      </div>
      <div>
        <p className={group}>state</p>
        <div className={row}>
          <Checkbox label="unchecked" />
          <Checkbox defaultChecked label="checked" />
          <Checkbox invalid label="error" />
          <Checkbox disabled label="disabled" />
          <Checkbox disabled defaultChecked label="disabled checked" />
        </div>
      </div>
    </div>
  );
}
