"use client";

import { useRef } from "react";
import Image from "next/image";
import MoveToUp from "@/components/MoveToUp";
import { Accordian } from "@/components/Service";
import Benefit from "@/components/Home/Benefit";
import Differentiation from "@/components/Home/Differentiation";
import Reason from "@/components/Home/Reason";
import ReasonCard from "@/components/Home/ReasonCard";
import Recommend from "@/components/Home/Recommend";
import Cover from "@/components/HomeV2/Cover";
import Situation from "@/components/HomeV2/Situation";
import Phrase from "@/components/HomeV2/Phase";
import System from "@/components/HomeV2/System";
import SlideCard from "@/components/HomeV2/SlideCard";
import Footer from "@/components/HomeV2/Footer";
import Banner from "@/components/HomeV2/Banner";
import CertificationCard from "@/components/HomeV2/CertificationCard";

export default function Home() {
  const upElement = useRef<HTMLDivElement>(null);

  const onUpMoveBox = () => {
    upElement.current?.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
  };

  return (
    <>
      <div className="box-border w-full px-[120px] font-Pretendard text-black" ref={upElement}>
        {/* Header */}
        <div className="sticky left-0 top-0 z-0 flex w-full items-center justify-between bg-white px-[40px] py-[24px] ">
          <div className="flex items-center gap-[40px]">
            <Image src="/images/v2/svg/logo1.svg" alt="washfun Logo" width={65} height={35} style={{ objectFit: "cover" }} />
            <div className="flex gap-[40px] ">
              <p className="cursor-pointer text-[18px] font-medium">홈</p>
              <p className="cursor-pointer text-[18px] font-medium text-secondaryDefault">서비스 안내</p>
              <p className="cursor-pointer text-[18px] font-medium text-secondaryDefault">도입 문의</p>
            </div>
          </div>

          <div className="flex items-center gap-[8px]">
            <div className="flex items-center gap-[8px] rounded-[999px] bg-secondaryForeground px-[16px] py-[10px]">
              <Image src="/images/v2/svg/phone.svg" alt="phone" width={20} height={20} />
              <p className="text-[18px] font-semibold text-secondaryDefault">
                010 1234 5678
              </p>
            </div>
            <div className="rounded-[999px] bg-main px-[24px] py-[12px]">
              <p className="font-semibold text-white">온라인 문의</p>
            </div>
          </div>
        </div >

        <Cover />
        <Situation />
        <Phrase />
        <System />
        <SlideCard />
        {/* <Benefit /> */}
        {/* <Differentiation /> */}
        {/* <Reason /> */}
        {/* <div className="bg-gradient-to-b from-lightPrimary3 to-white"> */}
        {/* <ReasonCard /> */}
        {/* <Recommend /> */}
        {/* </div> */}
        <CertificationCard />
        <Banner />
        <Footer />
        {/* <MoveToUp onUpMoveBox={onUpMoveBox} /> */}
      </div>

    </>
  );
}
