import Link from "next/link";
import { FOUNDATIONS, OVERVIEW } from "@/components/design-system/nav";
import Thumb from "@/components/design-system/Thumb";

export default function FoundationsPage() {
  return (
    <>
      <h1 className="text-[40px] font-bold leading-tight md:text-t10">{OVERVIEW.title}</h1>
      <p className="mt-x3 text-t5 text-fg-neutral-muted">{OVERVIEW.lead}</p>
      <ul className="mt-x10 grid grid-cols-2 gap-x6 md:grid-cols-1">
        {FOUNDATIONS.map((item) => (
          <li key={item.key}>
            <Link href={item.href} className="group block">
              <Thumb name={item.key} />
              <span className="mt-x3 block text-t6 font-bold group-hover:text-fg-brand">{item.title}</span>
              <span className="mt-x1 block text-t3 text-fg-neutral-muted">{item.lead}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
