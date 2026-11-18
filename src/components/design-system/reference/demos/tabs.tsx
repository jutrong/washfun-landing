"use client";

import type { ReactNode } from "react";
import Tabs from "../Tabs";

const label = "mb-x2 text-t2 font-bold text-fg-neutral-subtle";
const body = "text-t4 text-fg-neutral-muted";

const STORE = [
  { value: "info", label: "매장 정보" },
  { value: "items", label: "상품" },
  { value: "reviews", label: "리뷰" },
];

const STORE_WITH_CONTENT = [
  { value: "info", label: "매장 정보", content: <p className={body}>영업 시간은 매일 06:00~24:00입니다. 셀프 세차 6칸, 자동 세차 1대가 있습니다.</p> },
  { value: "items", label: "상품", content: <p className={body}>포인트 충전 10,000원부터, 월 4회 세차 구독을 고를 수 있습니다.</p> },
  { value: "reviews", label: "리뷰 128", content: <p className={body}>이 매장을 이용한 고객이 남긴 리뷰를 최신순으로 보여 줍니다.</p> },
];

const HISTORY = [
  { value: "all", label: "전체" },
  { value: "wash", label: "세차" },
  { value: "charge", label: "포인트 충전" },
  { value: "subscription", label: "구독" },
  { value: "refund", label: "환불", disabled: true },
];

export default function demo(thumb: boolean): ReactNode {
  if (thumb)
    return (
      <div className="w-full max-w-xs">
        <Tabs label="매장 상세" items={STORE} fullWidth />
      </div>
    );

  return (
    <div className="flex w-full flex-col gap-x6">
      <div>
        <p className={label}>underline · 내용과 함께</p>
        <Tabs label="매장 상세" items={STORE_WITH_CONTENT} />
      </div>
      <div>
        <p className={label}>fullWidth</p>
        <Tabs label="매장 상세" items={STORE} fullWidth defaultValue="items" />
      </div>
      <div>
        <p className={label}>size · small</p>
        <Tabs label="이용 내역 기간" size="small" fullWidth items={[{ value: "month", label: "이번 달" }, { value: "all", label: "전체 기간" }]} />
      </div>
      <div>
        <p className={label}>state · 비활성 탭, 가로 스크롤</p>
        <div className="max-w-xs">
          <Tabs label="이용 내역" items={HISTORY} />
        </div>
      </div>
    </div>
  );
}
