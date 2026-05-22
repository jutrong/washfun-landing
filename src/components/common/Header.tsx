"use client";

import Image from "next/image";
import Link from "next/link";
import { track } from "@/lib/analytics";

export default function Header() {
  return (
    <>
      <header
        className="sticky left-0 top-0 z-[100] flex w-full items-center justify-between bg-white px-[160px] py-[24px] lg:hidden"
        aria-label="워시펀 헤더"
      >
        <div className="flex items-center gap-[40px]">
          <Link href="/" aria-label="워시펀 홈으로 이동">
            <Image
              src="/images/v2/svg/logo1.svg"
              alt="워시펀 WashFun 로고"
              width={65}
              height={35}
              style={{ objectFit: "cover", cursor: "pointer" }}
              priority
            />
          </Link>
          <nav className="flex gap-[40px]" aria-label="주 메뉴">
            <Link
              href="/service"
              className="text-[18px] font-medium text-secondaryDefault"
            >
              워시펀 사장님
            </Link>
            <Link
              href="/consulting"
              className="text-[18px] font-medium text-secondaryDefault"
            >
              세차장 컨설팅
            </Link>
            <Link
              href="/contact"
              className="text-[18px] font-medium text-secondaryDefault"
            >
              도입 문의
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-[8px]">
          <a
            href="tel:+82-70-8806-8088"
            onClick={() => track("lead_cta_click", { source: "header_tel" })}
            className="flex items-center gap-[8px] rounded-[999px] bg-secondaryForeground px-[16px] py-[10px]"
            aria-label="워시펀 전화 상담 070-8806-8088"
          >
            <Image src="/images/v2/svg/phone.svg" alt="전화 아이콘" width={20} height={20} />
            <span className="text-[18px] font-semibold text-secondaryDefault">
              070 8806 8088
            </span>
          </a>
          <Link
            href="/contact"
            onClick={() => track("lead_cta_click", { source: "header_contact" })}
            className="rounded-[999px] bg-main px-[24px] py-[12px] font-semibold text-white"
          >
            온라인 문의
          </Link>
        </div>
      </header>
      <header
        className="hidden lg:block lg:p-[16px]"
        aria-label="워시펀 모바일 헤더"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[16px]">
            <Image src="/images/v2/svg/menu.svg" alt="메뉴 열기" width={30} height={28} style={{ objectFit: "cover" }} />
            <Link href="/" aria-label="워시펀 홈">
              <Image
                src="/images/v2/svg/logo1.svg"
                alt="워시펀 WashFun 로고"
                width={50}
                height={46}
                style={{ objectFit: "cover" }}
                priority
              />
            </Link>
          </div>
          <div className="flex items-center gap-[8px]">
            <a
              href="tel:+82-70-8806-8088"
              onClick={() => track("lead_cta_click", { source: "header_tel_mobile" })}
              className="rounded-[999px] border border-borderStrong px-[14px] py-[8px] text-[14px] font-semibold text-black"
              aria-label="전화 상담 070-8806-8088"
            >
              ☎
            </a>
            <Link
              href="/contact"
              onClick={() => track("lead_cta_click", { source: "header_contact_mobile" })}
              className="rounded-[999px] bg-main px-[20px] py-[8px] font-semibold text-white"
            >
              온라인 문의
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
