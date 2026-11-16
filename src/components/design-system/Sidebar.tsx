"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FOUNDATIONS, OVERVIEW } from "./nav";

/** 왼쪽 메뉴. 좁은 화면에서는 위쪽 가로 메뉴가 된다. */
export default function Sidebar() {
  const pathname = usePathname();
  const items = [{ ...OVERVIEW, title: "Overview" }, ...FOUNDATIONS];

  return (
    <nav aria-label="디자인 시스템 문서" className="w-[200px] shrink-0 lg:w-full">
      <ul className="sticky top-[72px] flex flex-col gap-x1 lg:static lg:flex-row lg:overflow-x-auto lg:pb-x2">
        {items.map((item) => {
          const active = pathname === item.href || (item.href !== OVERVIEW.href && pathname.startsWith(`${item.href}/`));
          return (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`block whitespace-nowrap rounded-r2 px-x3 py-x2 text-t4 ${
                  active
                    ? "bg-bg-neutral-weak font-bold text-fg-neutral"
                    : "text-fg-neutral-muted hover:bg-bg-neutral-weak"
                }`}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
