"use client";

import { useRef } from "react";
import MoveToUp from "@/components/MoveToUp";
import { Accordian } from "@/components/Service";
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
import Header from "@/components/common/Header";
import Benefit from "@/components/HomeV2/Benefit";

export default function Home() {
  const upElement = useRef<HTMLDivElement>(null);

  const onUpMoveBox = () => {
    upElement.current?.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
  };

  return (
    <>
      {/* Header */}
      <Header />
      <div className="box-border w-full px-[120px] font-Pretendard text-black lg:px-[16px]" ref={upElement}>
        <Cover />
        <div className="mx-auto max-w-[1440px]">
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
          <Benefit />
          <CertificationCard />
          <Banner />
        </div>
        <Footer />
        {/* <MoveToUp onUpMoveBox={onUpMoveBox} /> */}
      </div>

    </>
  );
}
