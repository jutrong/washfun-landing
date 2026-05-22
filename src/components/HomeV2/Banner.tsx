"use client";

import Image from "next/image";
import Link from "next/link";
import { track } from "@/lib/analytics";

export default function Banner() {
  return (
    <div className="mt-[200px] lg:mt-[100px]">
      <div className="group relative h-[426px] w-full overflow-hidden rounded-[20px]">
        <Image
          src="/images/v2/png/banner.jpg"
          alt="워시펀 세차장 솔루션 도입 안내 배너 - 구독제 자동 세차"
          width={1920}
          height={1080}
          sizes="(max-width: 1024px) 100vw, 1200px"
          className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        <div className="absolute left-0 top-0 z-10 size-full bg-black opacity-70" />

        <div className="absolute left-0 top-0 z-20 flex size-full flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-[16px]">
            <h2 className="text-center text-[48px] font-bold text-white lg:text-[30px]">이젠, 고민보단 <br />행동이 필요할 때.</h2>
            <p className="text-center text-[20px] font-normal leading-[28px] text-[#C4C7CC] lg:text-[16px] lg:leading-[24px]">이미 수많은 세차장이 구독제를 도입하고<br />내년을 준비하고 있습니다. 창업·리모델링·시스템 도입까지 컨설팅 받아보세요.</p>
          </div>
          <div className="mt-[32px] flex items-center gap-[12px] lg:flex-col">
            <Link
              href="/contact"
              onClick={() => track("lead_cta_click", { source: "home_banner_contact" })}
              className="rounded-[999px] bg-white px-[24px] py-[12px] text-[16px] font-semibold leading-[18px] text-black"
            >
              워시펀 도입 문의하기
            </Link>
            <Link
              href="/consulting"
              onClick={() => track("lead_cta_click", { source: "home_banner_consulting" })}
              className="rounded-[999px] border border-white/40 px-[24px] py-[12px] text-[16px] font-semibold leading-[18px] text-white"
            >
              세차장 컨설팅 알아보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
