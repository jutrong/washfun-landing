"use client";

import { useRef } from "react";
import Footer from "@/components/Footer";
import MoveToUp from "@/components/MoveToUp";
import { Accordian, Cover } from "@/components/Service";
import Phrase from "@/components/Home/Phrase";
import Benefit from "@/components/Home/Benefit";
import Differentiation from "@/components/Home/Differentiation";
import Reason from "@/components/Home/Reason";
import ReasonCard from "@/components/Home/ReasonCard";
import Recommend from "@/components/Home/Recommend";

export default function Home() {
  const upElement = useRef<HTMLDivElement>(null);

  const onUpMoveBox = () => {
    upElement.current?.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
  };

  return (
    <>
      <div className="box-border w-full font-NotoSansKR text-black" ref={upElement}>
        <Cover />
        <Phrase />
        {/* <Benefit /> */}
        <Differentiation />
        <Reason />
        <div className="bg-gradient-to-b from-lightPrimary3 to-white">
          <ReasonCard />
          <Recommend />
        </div>
        <Footer />
        <MoveToUp onUpMoveBox={onUpMoveBox} />
      </div>

    </>
  );
}
