"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Badge from "../Badge";
import Button from "../Button";
import Chip from "../Chip";

const label = "mb-x2 text-t2 font-bold text-fg-neutral-subtle";
const card = "rounded-r4 bg-bg-layer-default p-x5";

// 꾸미는 그림. 내용보다 눈에 띄지 않게 작고 옅게 둔다.
const carIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-full" aria-hidden>
    <path d="M6.5 5h11l2.2 5.2c.8.3 1.3 1 1.3 1.8v5h-2v2h-3v-2H8v2H5v-2H3v-5c0-.8.5-1.5 1.3-1.8L6.5 5Zm1.3 2-1.3 3h11l-1.3-3H7.8ZM6.5 15.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm11 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
  </svg>
);

const searchIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-full" aria-hidden>
    <path d="M10.5 3a7.5 7.5 0 0 1 5.9 12.1l4.3 4.2-1.4 1.4-4.3-4.2A7.5 7.5 0 1 1 10.5 3Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z" />
  </svg>
);

type EmptyProps = {
  icon?: ReactNode;
  title: string;
  body?: string;
  /** 버튼은 하나만 둔다. 할 수 있는 일이 없으면 두지 않는다. */
  action?: ReactNode;
  className?: string;
};

/** 빈 화면 안내: 작은 그림(선택), 제목 한 문장, 본문 한 줄(선택), 버튼 하나. */
function Empty({ icon, title, body, action, className = "" }: EmptyProps) {
  return (
    <div className={`flex flex-col items-center gap-x4 text-center ${className}`}>
      {icon ? <span className="inline-flex size-icon-xl text-fg-neutral-subtle">{icon}</span> : null}
      <div className="flex flex-col gap-x1">
        <p className="text-t5 font-bold text-fg-neutral">{title}</p>
        {body ? <p className="text-t4 text-fg-neutral-muted">{body}</p> : null}
      </div>
      {action}
    </div>
  );
}

const STORES = [
  { name: "워시펀 성수", tags: ["24시간"] },
  { name: "워시펀 판교", tags: ["24시간", "실내"] },
  { name: "워시펀 일산", tags: ["실내"] },
];
const FILTERS = ["24시간", "실내", "하부 세차"];

/** 조건에 맞는 결과가 없을 때: 고른 조건은 그대로 보여 주고 조건 지우기로 잇는다. */
function FilteredList() {
  const [selected, setSelected] = useState<string[]>(["24시간", "하부 세차"]);
  const stores = STORES.filter((store) => selected.every((filter) => store.tags.includes(filter)));

  const toggle = (filter: string) =>
    setSelected((before) => (before.includes(filter) ? before.filter((item) => item !== filter) : [...before, filter]));

  return (
    <div className={`${card} flex flex-col gap-x4`}>
      <div className="flex flex-wrap gap-x2">
        {FILTERS.map((filter) => (
          <Chip key={filter} size="small" selected={selected.includes(filter)} aria-pressed={selected.includes(filter)} onClick={() => toggle(filter)}>
            {filter}
          </Chip>
        ))}
      </div>
      <div aria-live="polite">
        {stores.length > 0 ? (
          <ul className="flex flex-col">
            {stores.map((store) => (
              <li key={store.name} className="flex items-center justify-between gap-x3 border-b border-stroke-neutral-weak py-x3 last:border-b-0">
                <span className="text-t4 text-fg-neutral">{store.name}</span>
                <span className="flex gap-x1">
                  {store.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <Empty
            className="py-x4"
            icon={searchIcon}
            title="조건에 맞는 매장이 없어요"
            body="조건을 줄이면 더 많은 매장을 볼 수 있어요"
            action={
              <Button variant="secondary" size="medium" onClick={() => setSelected([])}>
                조건 지우기
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
}

export default function demo(thumb: boolean): ReactNode {
  if (thumb) {
    return (
      <Empty
        className="w-full max-w-xs"
        title="아직 세차 기록이 없어요"
        body="세차를 마치면 여기에서 볼 수 있어요"
        action={
          <Button variant="secondary" size="medium">
            세차장 둘러보기
          </Button>
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x8 md:grid-cols-1">
      <div>
        <p className={label}>처음 써서 없음 · 고객 앱 세차 기록</p>
        <Empty
          className={`${card} py-x8`}
          icon={carIcon}
          title="아직 세차 기록이 없어요"
          body="세차를 마치면 여기에서 볼 수 있어요"
          action={<Button size="medium">세차장 둘러보기</Button>}
        />

        <p className={`mt-x8 ${label}`}>조건에 맞는 것이 없음 · 조건은 그대로 두고 지우기</p>
        <FilteredList />

        <p className={`mt-x8 ${label}`}>로그인이 필요함 · 하면 볼 수 있는 것</p>
        <Empty
          className={`${card} py-x6`}
          title="로그인하면 세차 기록을 볼 수 있어요"
          action={
            <Button variant="secondary" size="medium">
              로그인
            </Button>
          }
        />
      </div>

      <div>
        <p className={label}>표가 비었을 때 · 파트너 웹 정산 내역</p>
        <div className={`${card} overflow-x-auto`}>
          <table className="w-full text-left text-t3">
            <caption className="sr-only">정산 내역</caption>
            <thead>
              <tr className="border-b border-stroke-neutral-weak text-fg-neutral-muted">
                <th scope="col" className="py-x2 font-medium">
                  정산일
                </th>
                <th scope="col" className="py-x2 font-medium">
                  매출
                </th>
                <th scope="col" className="py-x2 text-right font-medium">
                  정산 금액
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={3} className="py-x10">
                  <Empty title="정산 내역이 없습니다." body="정산을 마치면 이 표에 표시합니다." />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className={`mt-x8 ${label}`}>지금은 없음 · 키오스크 혜택 고르기</p>
        <Empty
          className={`${card} py-x8`}
          title="지금 받을 수 있는 혜택이 없어요"
          action={<Button fullWidth>혜택 없이 계속하기</Button>}
        />

        <p className={`mt-x8 ${label}`}>모두 끝냄 · 버튼 없음</p>
        <Empty className={`${card} py-x6`} title="알림을 모두 확인했어요" />
      </div>
    </div>
  );
}
