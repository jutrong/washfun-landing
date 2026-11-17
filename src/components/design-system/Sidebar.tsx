"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { COMPONENTS_HREF, FOUNDATIONS, OVERVIEW, PATTERNS_HREF } from "./nav";

/** 왼쪽 메뉴. 좁은 화면에서는 위쪽 가로 메뉴가 된다. */
type Item = { href: string; title: string };

export default function Sidebar({ components, patterns }: { components: Item[]; patterns: Item[] }) {
  const pathname = usePathname();
  const groups: { title: string; items: Item[] }[] = [
    { title: "Foundations", items: [{ ...OVERVIEW, title: "Overview" }, ...FOUNDATIONS] },
    { title: "Components", items: [{ href: COMPONENTS_HREF, title: "Overview" }, ...components] },
    { title: "Patterns", items: [{ href: PATTERNS_HREF, title: "Overview" }, ...patterns] },
  ];
  const exact = [OVERVIEW.href, COMPONENTS_HREF, PATTERNS_HREF];

  return (
    <nav aria-label="디자인 시스템 문서" className="w-[200px] shrink-0 lg:w-full">
      <div className="sticky top-[72px] flex max-h-[calc(100vh-88px)] flex-col gap-x6 overflow-y-auto lg:static lg:max-h-none lg:gap-x2">
        {groups.map((group) => (
          <div key={group.title}>
            <p className="px-x3 pb-x1 text-t2 font-bold text-fg-neutral-subtle">{group.title}</p>
            <ul className="flex flex-col gap-x1 lg:flex-row lg:overflow-x-auto lg:pb-x2">
              {group.items.map((item) => {
                const active = pathname === item.href || (!exact.includes(item.href) && pathname.startsWith(`${item.href}/`));
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
          </div>
        ))}
      </div>
    </nav>
  );
}
