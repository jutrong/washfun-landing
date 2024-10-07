"use client";

import Footer from "@/components/Footer";
import { Accordian, Contact, DeviceService, EditPriceService, InventoryService, PointService, ServiceData, ServiceInfo, VarienceFee } from "@/components/Service";
import MoveToUp from "@/components/MoveToUp";
import { useRef } from "react";

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
    </>
  );
};

export default Service;