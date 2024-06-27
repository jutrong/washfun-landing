"use client";

import Accordian from "@/components/Accordian";
import Contact from "@/components/Contact";
import Cover from "@/components/Cover";
import DeviceService from "@/components/DeviceService";
import EditPriceService from "@/components/EditPriceService";
import Footer from "@/components/Footer";
import InventoryService from "@/components/InventoryService";
import PointService from "@/components/PointService";
import ServiceData from "@/components/ServiceData";
import ServiceInfo from "@/components/ServiceInfo";
import VarienceFeeService from "@/components/VarienceFeeService";
import { useRef } from "react";

export default function Home() {
  const serviceDataElement = useRef<HTMLDivElement>(null);
  const accordianElement = useRef<HTMLDivElement>(null);

  const onServiceDataMoveBox = () => {
    serviceDataElement.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onAccordianMoveBox = () => {
    accordianElement.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className="w-full box-border">
        <Cover onMoveBox={onServiceDataMoveBox} onAccordianMoveBox={onAccordianMoveBox} />
        <ServiceInfo />
        <ServiceData element={serviceDataElement} />
        <EditPriceService />
        <InventoryService />
        <VarienceFeeService />
        <DeviceService />
        <PointService />
        <Contact />
        <Accordian element={accordianElement} />
        <Footer />
      </div>
    </>
  );
}
