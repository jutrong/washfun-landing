import Link from "next/link";
import IconLibrary from "@/components/design-system/IconLibrary";
import { icons } from "@/components/design-system/icons";

export default function IconLibraryPage() {
  const all = icons();

  return (
    <article>
      <p className="text-t3 font-medium text-fg-neutral-muted">
        <Link href="/design-system" className="hover:text-fg-neutral">
          Foundations
        </Link>
        {" / "}
        <Link href="/design-system/iconography" className="hover:text-fg-neutral">
          Iconography
        </Link>
      </p>
      <h1 className="mt-x3 text-[40px] font-bold leading-tight md:text-t10">Icon Library</h1>
      <p className="mt-x3 text-t5 text-fg-neutral-muted">
        워시펀 제품이 쓰는 아이콘 {all.length}개입니다. 모양 {all.length / 2}개를 Line과 Fill로 두었고, 모두{" "}
        <a href="https://remixicon.com" className="underline" rel="noreferrer" target="_blank">
          Remix Icon
        </a>{" "}
        공식 파일(Apache License 2.0)입니다.
      </p>
      <div className="mt-x8">
        <IconLibrary entries={all} />
      </div>
    </article>
  );
}
