"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const DeviceService = () => {
  const scrollRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: [0, 1]
  })
  const firstBoxY = useTransform(scrollYProgress, [0, 0.3], [0, -1200]);
  const secondBoxY = useTransform(scrollYProgress, [0.2, 0.6], [0, -1000]);
  const thirdBoxY = useTransform(scrollYProgress, [0.4, 1], [0, -500]);

  return (
    <div className="h-full w-full">
      <div className="relative h-[350vh] w-full" ref={scrollRef}>
        <div className="sticky top-0 left-0">
          <motion.div className="absolute top-0 left-0 w-full text-black flex flex-col items-center z-30 bg-white" style={{ y: firstBoxY }}>
            <div className="flex flex-col justify-center items-center mt-24">
              <div className="flex flex-col gap-4 justify-center items-center">
                <p className="text-5xl font-bold">실시간 베이 상황 확인으로</p>
                <p className="text-4xl font-bold text-gradient">간편 매장 모니터링 !</p>
              </div>
              <p className="text-gray opacity-90 font-semibold mt-6">베이별 사용 시간, 상태 확인</p>
            </div>
            <div className="relative w-[1200px] h-[600px]  mt-16 rounded-[26px] shadow-primary-shadow flex flex-col justify-end overflow-hidden bg-white">
              <div className="flex  justify-end items-center">
                <div className="flex flex-col justify-start pl-20 pt-10 items-start  gap-5 w-full h-full">
                  <div>
                    <Image src="/images/svg/clock.svg" alt="clock" width={40} height={40} />
                  </div>
                  <p className="text-3xl font-bold">베이별 사용 시간</p>
                  <p className="text-3xl font-bold">실시간 상태 확인</p>
                </div>
                <div className="flex min-w-[900px] ">
                  <Image src="/images/png/device-mockup.png" alt="device-mockup" width={900} height={1000} />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-20 bg-lightSubPrimary flex justify-start items-center">
                <p className="text-xl font-semibold ml-20">STEP - 1</p>
              </div>
            </div>
          </motion.div>
          <motion.div className="absolute top-[240px] left-0 w-full  text-black flex flex-col items-center bg-white z-20" style={{ y: secondBoxY }}>
            <div className="relative w-[1200px] h-[600px]  mt-20 rounded-[26px] shadow-primary-shadow flex flex-col justify-end overflow-hidden">
              <div className="flex  justify-end items-center">
                <div className="flex flex-col justify-start pl-20 pt-10 items-start  gap-5 w-full h-full">
                  <div>
                    <Image src="/images/svg/triangle.svg" alt="triangle" width={40} height={40} />
                  </div>
                  <p className="text-4xl font-bold">에러 내역 확인</p>
                </div>
                <div className="flex min-w-[900px]">
                  <Image src="/images/png/error-content-mockup.png" alt="device-mockup" width={900} height={1000} />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-20 bg-lightPrimary2 flex justify-start items-center">
                <p className="text-xl font-semibold ml-20">STEP - 2</p>
              </div>
            </div>
          </motion.div>
          <motion.div className="absolute top-[260px] left-0 w-full  text-black flex flex-col items-center bg-white z-10" style={{ y: thirdBoxY }}>
            <div className="relative w-[1200px] h-[600px]  mt-20 rounded-[26px] shadow-primary-shadow flex flex-col justify-end overflow-hidden">
              <div className="flex  justify-end items-center">
                <div className="flex flex-col justify-start pl-20 pt-10 items-start  gap-5 w-full h-full">
                  <div>
                    <Image src="/images/svg/desktop.svg" alt="desktop" width={40} height={40} />
                  </div>
                  <p className="text-4xl font-bold">실시간 원격</p>
                  <p className="text-4xl font-bold">고장 설정</p>
                </div>
                <div className="flex min-w-[900px]">
                  <Image src="/images/png/error-setting-mockup.png" alt="device-mockup" width={900} height={1000} />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-20 bg-lightPrimary3 flex justify-start items-center">
                <p className="text-xl font-semibold ml-20">STEP - 3</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default DeviceService;