"use client";

import Footer from "@/components/HomeV2/Footer";
import { Accordian, Contact, DeviceService, EditPriceService, InventoryService, PointService, ServiceData, ServiceInfo, VarienceFee } from "@/components/Service";
import MoveToUp from "@/components/MoveToUp";
import { useRef } from "react";
import Header from "@/components/common/Header";
import Cover from "@/components/ServiceV2/Cover";

const Service = () => {
  const upElement = useRef<HTMLDivElement>(null);
  const serviceDataElement = useRef<HTMLDivElement>(null);
  const accordianElement = useRef<HTMLDivElement>(null);
  const contactElement = useRef<HTMLDivElement>(null);


  const onUpMoveBox = () => {
    upElement.current?.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
  };

  return (
    <>
      <Header />
      <Cover />
      <ServiceData element={serviceDataElement} />
      <EditPriceService />
      <InventoryService />
      <VarienceFee />
      <DeviceService />
      <PointService />
      <div className="box-border w-full px-[120px] lg:px-[16px]">
        <Footer />
      </div>
      <MoveToUp onUpMoveBox={onUpMoveBox} />
    </>
  );
};

export default Service;