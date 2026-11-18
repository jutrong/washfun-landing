"use client";

import type { ReactNode } from "react";
import Button from "../Button";
import { DialogSurface } from "../Dialog";
import TextField from "../TextField";
import { ToastSurface } from "../Toast";

const label = "mb-x2 text-t2 font-bold text-fg-neutral-subtle";
const nothing = () => {};

export default function demo(thumb: boolean): ReactNode {
  if (thumb) {
    return (
      <div className="w-full max-w-xs">
        <TextField label="휴대폰 번호" defaultValue="010-1234-567" errorText="휴대폰 번호를 다시 확인해주세요" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x8 md:grid-cols-1">
      <div>
        <p className={label}>입력 오류 · 입력 칸 아래</p>
        <TextField label="휴대폰 번호" defaultValue="010-1234-567" errorText="휴대폰 번호를 다시 확인해주세요" />
        <p className={`mt-x8 ${label}`}>가벼운 실패 · 토스트</p>
        <ToastSurface tone="critical" message="저장하지 못했어요. 잠시 후 다시 시도해주세요" />
        <p className={`mt-x8 ${label}`}>불러오기 실패 · 화면 가운데</p>
        <div className="flex flex-col items-center gap-x4 rounded-r4 bg-bg-layer-default p-x6 text-center">
          <p className="text-t4 text-fg-neutral-muted">내용을 불러오지 못했어요. 잠시 후 다시 시도해주세요.</p>
          <Button variant="secondary" size="medium">
            다시 시도하기
          </Button>
        </div>
      </div>
      <div>
        <p className={label}>돈이 걸린 실패 · 확인 창</p>
        <DialogSurface
          title="결제하지 못했어요"
          description="돈은 빠져나가지 않았어요. 카드를 다시 대주세요."
          primaryAction={{ label: "다시 시도하기", onClick: nothing }}
          secondaryAction={{ label: "닫기", onClick: nothing }}
        />
      </div>
    </div>
  );
}
