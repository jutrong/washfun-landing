import Link from "next/link";
import Demo from "@/components/design-system/reference/Demo";
import { categories, components } from "@/components/design-system/components";
import { COMPONENTS_HREF } from "@/components/design-system/nav";

export default function ComponentsPage() {
  const all = components();

  return (
    <>
      <h1 className="text-[40px] font-bold leading-tight md:text-t10">Components</h1>
      <p className="mt-x3 text-t5 text-fg-neutral-muted">
        화면을 이루는 부품입니다. 부품마다 모양, 크기, 상태와 함께 웹·앱·키오스크에서 구현하는 방법을 적었습니다.
      </p>
      {categories
        .filter((category) => all.some((item) => item.category === category.key))
        .map((category) => (
          <section key={category.key} className="mt-x10">
            <h2 className="text-t8 font-bold text-fg-neutral">
              {category.title} <span className="text-t4 font-medium text-fg-neutral-muted">{category.ko}</span>
            </h2>
            <ul className="mt-x4 grid grid-cols-2 gap-x6 md:grid-cols-1">
              {all
                .filter((item) => item.category === category.key)
                .map((item) => (
                  <li key={item.key}>
                    <Link href={`${COMPONENTS_HREF}/${item.key}`} className="group block">
                      {/* 카드 전체가 링크이므로 견본 안의 버튼·입력 칸은 누르거나 초점이 가지 않게 한다. */}
                      <div
                        aria-hidden
                        {...({ inert: "" } as Record<string, string>)}
                        className="pointer-events-none flex h-[168px] items-center justify-center overflow-hidden rounded-r4 bg-bg-layer-basement p-x4"
                      >
                        <Demo name={item.key} thumb />
                      </div>
                      <span className="mt-x3 block text-t6 font-bold group-hover:text-fg-brand">
                        {item.title} <span className="text-t4 font-medium text-fg-neutral-muted">{item.ko}</span>
                      </span>
                      <span className="mt-x1 block text-t3 text-fg-neutral-muted">{item.lead}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        ))}
    </>
  );
}
