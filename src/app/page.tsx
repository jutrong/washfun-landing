"use client";

import { useRef } from "react";
import { Accordian, Contact, Cover, DeviceService, EditPriceService, InventoryService, PointService, ServiceData, ServiceInfo, VarienceFee } from "@/components/Home";
import Footer from "@/components/Footer";
import MoveToUp from "@/components/MoveToUp";

export default function Home() {
  const serviceDataElement = useRef<HTMLDivElement>(null);
  const accordianElement = useRef<HTMLDivElement>(null);
  const contactElement = useRef<HTMLDivElement>(null);
  const upElement = useRef<HTMLDivElement>(null);

  const onServiceDataMoveBox = () => {
    serviceDataElement.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onAccordianMoveBox = () => {
    accordianElement.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onContactMoveBox = () => {
    contactElement.current?.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
  };

  const onUpMoveBox = () => {
    upElement.current?.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
  };

  return (
    <>
      <div className="box-border w-full" ref={upElement}>
        <Cover onMoveBox={onServiceDataMoveBox} onAccordianMoveBox={onAccordianMoveBox} onContactMoveBox={onContactMoveBox} />
        <ServiceInfo />
        <ServiceData element={serviceDataElement} />
        <EditPriceService />
        <InventoryService />
        <VarienceFee />
        <DeviceService />
        <PointService />
        <Contact element={contactElement} />
        <Accordian element={accordianElement} />
        <Footer />
        <MoveToUp onUpMoveBox={onUpMoveBox} />
      </div>

    </>
  );
}
