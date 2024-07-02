"use client";
import Image from "next/image";
import { motion } from "framer-motion"

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
import VarienceFee from "@/components/VarienceFee";
import VarienceFeeService from "@/components/VarienceFeeService";
import { useRef } from "react";

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
      <div className="w-full box-border" ref={upElement}>
        <Cover onMoveBox={onServiceDataMoveBox} onAccordianMoveBox={onAccordianMoveBox} onContactMoveBox={onContactMoveBox} />
        <ServiceInfo />
        <ServiceData element={serviceDataElement} />
        <EditPriceService />
        <InventoryService />
        <VarienceFee />
        {/* <VarienceFeeService /> */}
        <DeviceService />
        <PointService />
        <Contact element={contactElement} />
        <Accordian element={accordianElement} />
        <Footer />
        <div className="fixed bottom-6 right-10 bg-white  w-12 h-12 rounded-full cursor-pointer bg-gradient-to-tr from-subPrimary to-white shadow-primary-shadow
          flex justify-center items-center rotate-180
          opacity-90
        "
          onClick={onUpMoveBox}>
          <motion.div
            initial={{ y: -5 }}
            animate={{
              y: [-3, 3, -3, 3, -3],
              opacity: [0.6, 0.8, 0.9, 0.8, 0.6],
            }}
            transition={
              {
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 2,
              }
            }
          >
            <Image src="/images/svg/arrow-down-svgrepo-com-2.svg" alt="scroll down" width={26} height={30} />
          </motion.div>
        </div>
      </div>

    </>
  );
}
