"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { COMPONENTS_HREF, FOUNDATIONS, OVERVIEW, PATTERNS_HREF } from "./nav";

type Item = { href: string; title: string };
type Group = { title: string; base: string; items: Item[]; collapsible: boolean };

const EXACT = [OVERVIEW.href, COMPONENTS_HREF, PATTERNS_HREF];

function isActive(pathname: string, href: string) {
  return pathname === href || (!EXACT.includes(href) && pathname.startsWith(`${href}/`));
}

function Links({ items, pathname }: { items: Item[]; pathname: string }) {
  return (
    <ul className="flex flex-col gap-x1 lg:flex-row lg:overflow-x-auto lg:pb-x2">
      {items.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href} className="shrink-0">
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`block whitespace-nowrap rounded-r2 px-x3 py-x2 text-t4 ${
                active ? "bg-bg-neutral-weak font-bold text-fg-neutral" : "text-fg-neutral-muted hover:bg-bg-neutral-weak"
              }`}
            >
              {item.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** 펼치고 접는 묶음. 지금 보고 있는 문서가 이 묶음 안에 있으면 펼친 채로 시작한다. */
function Collapsible({ group, pathname }: { group: Group; pathname: string }) {
  const inside = pathname === group.base || pathname.startsWith(`${group.base}/`);
  const [open, setOpen] = useState(inside);
  const listId = useId();

  // 다른 묶음에서 이 묶음의 문서로 옮겨 오면 펼친다. 접은 상태는 문서를 옮겨도 그대로 둔다.
  useEffect(() => {
    if (inside) setOpen(true);
  }, [inside]);

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-touch w-full items-center justify-between rounded-r2 px-x3 text-t2 font-bold text-fg-neutral-subtle hover:bg-bg-neutral-weak focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stroke-brand-solid lg:w-auto lg:justify-start lg:gap-x2"
      >
        {group.title}
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`size-icon-sm transition-transform duration-d2 ease-standard motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
        >
          <path d="M12 13.17 16.95 8.22l1.41 1.42L12 16 5.64 9.64l1.41-1.42L12 13.17Z" />
        </svg>
      </button>
      <div id={listId} hidden={!open}>
        <Links items={group.items} pathname={pathname} />
      </div>
    </div>
  );
}

/** 왼쪽 메뉴. Foundations 는 늘 펼쳐 두고, Components 와 Patterns 는 펼치고 접는다. 좁은 화면에서는 위쪽 가로 메뉴가 된다. */
export default function Sidebar({ components, patterns }: { components: Item[]; patterns: Item[] }) {
  const pathname = usePathname() ?? "";
  const groups: Group[] = [
    { title: "Foundations", base: OVERVIEW.href, items: [{ ...OVERVIEW, title: "Overview" }, ...FOUNDATIONS], collapsible: false },
    { title: "Components", base: COMPONENTS_HREF, items: [{ href: COMPONENTS_HREF, title: "Overview" }, ...components], collapsible: true },
    { title: "Patterns", base: PATTERNS_HREF, items: [{ href: PATTERNS_HREF, title: "Overview" }, ...patterns], collapsible: true },
  ];

  return (
    <nav aria-label="디자인 시스템 문서" className="w-[200px] shrink-0 lg:w-full">
      <div className="sticky top-[72px] flex max-h-[calc(100vh-88px)] flex-col gap-x6 overflow-y-auto lg:static lg:max-h-none lg:gap-x2">
        {groups.map((group) =>
          group.collapsible ? (
            <Collapsible key={group.title} group={group} pathname={pathname} />
          ) : (
            <div key={group.title}>
              <p className="px-x3 pb-x1 text-t2 font-bold text-fg-neutral-subtle">{group.title}</p>
              <Links items={group.items} pathname={pathname} />
            </div>
          ),
        )}
      </div>
    </nav>
  );
}
