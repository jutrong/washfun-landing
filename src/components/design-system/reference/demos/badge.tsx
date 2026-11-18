"use client";

import type { ReactNode } from "react";
import Badge from "../Badge";

const row = "flex flex-wrap items-center gap-x2";
const label = "mb-x2 text-t2 font-bold text-fg-neutral-subtle";

export default function demo(thumb: boolean): ReactNode {
  if (thumb)
    return (
      <div className={row}>
        <Badge tone="positive">이용 중</Badge>
        <Badge tone="warning">만료 예정</Badge>
        <Badge tone="critical">결제 실패</Badge>
      </div>
    );

  return (
    <div className="flex flex-col gap-x6">
      <div>
        <p className={label}>tone · weak</p>
        <div className={row}>
          <Badge>셀프 세차</Badge>
          <Badge tone="brand">구독 가능</Badge>
          <Badge tone="critical">결제 실패</Badge>
          <Badge tone="warning">만료 예정</Badge>
          <Badge tone="positive">이용 중</Badge>
          <Badge tone="informative">신규 매장</Badge>
        </div>
      </div>
      <div>
        <p className={label}>tone · solid</p>
        <div className={row}>
          <Badge variant="solid" tone="brand">
            추천
          </Badge>
          <Badge variant="solid" tone="critical">
            결제 실패
          </Badge>
          <Badge variant="solid" tone="warning">
            만료 예정
          </Badge>
          <Badge variant="solid" tone="positive">
            이용 중
          </Badge>
          <Badge variant="solid" tone="informative">
            점검 예정
          </Badge>
        </div>
      </div>
      <div>
        <p className={label}>size</p>
        <div className={row}>
          <Badge tone="positive">medium</Badge>
          <Badge tone="positive" size="large">
            large
          </Badge>
        </div>
      </div>
      <div>
        <p className={label}>dot</p>
        <div className={row}>
          <Badge tone="positive" dot>
            영업 중
          </Badge>
          <Badge dot size="large">
            영업 종료
          </Badge>
        </div>
      </div>
      <div>
        <p className={label}>제목 옆</p>
        <div className="flex items-center gap-x2">
          <span className="text-t5 font-bold text-fg-neutral">월 4회 세차 구독</span>
          <Badge tone="warning">만료 예정</Badge>
        </div>
      </div>
    </div>
  );
}
