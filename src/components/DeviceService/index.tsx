"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const DeviceService = () => {
  const scrollRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: [0, 1],
  })
  const firstBoxY = useTransform(scrollYProgress, [0, 0.3], [0, -1200]);
  const secondBoxY = useTransform(scrollYProgress, [0.1, 0.6], [0, -900]);
  const thirdBoxY = useTransform(scrollYProgress, [0.4, 0.9], [0, -200]);

  return (
    <div className="h-full w-full">
      <motion.div className="relative h-[300vh] w-full" ref={scrollRef}>
        <div className="sticky top-0 left-0">
          <motion.div className="absolute top-0 left-0 w-full text-black flex flex-col items-center z-30 bg-white md:flex" style={{ y: firstBoxY }}>
            <div className="flex flex-col justify-center items-center mt-20 ">
              <div className="flex flex-col gap-4 justify-center items-center ">
                <p className="text-5xl font-bold md:text-3xl">실시간 베이 상황 확인으로</p>
                <p className="text-4xl font-bold text-gradient md:text-3xl">간편 매장 모니터링 !</p>
              </div>
              <p className="text-gray opacity-90 font-semibold mt-6 md:text-sm">베이별 사용 시간, 상태 확인</p>
            </div>
            <div className="relative w-[1200px] h-[550px] mt-10 rounded-[26px] shadow-primary-shadow flex flex-col z-30 justify-end bg-white xl:w-[1000px] xl:h-[460px] md:w-[360px] md:h-[400px] lg:w-[800px] lg:h-[380px] ">
              <div className="flex justify-end items-center md:flex-col md:justify-center">
                <div className="flex flex-col justify-start pl-20 pt-10 items-start gap-5 w-full h-full md:items-center md:pl-0 md:gap-1 lg:pt-0">
                  <div>
                    <Image src="/images/svg/clock.svg" alt="clock" width={40} height={40} />
                  </div>
                  <p className="text-3xl font-bold md:text-xl">베이별 사용 시간</p>
                  <p className="text-3xl font-bold md:text-xl">실시간 상태 확인</p>
                </div>
                <div className="flex min-w-[900px] md:hidden xl:min-w-[620px] lg:min-w-[500px] md:min-w-[100px] ">
                  <Image src="/images/png/device-mockup.png" alt="device-mockup" width={900} height={1000} />
                </div>
                <div className="flex md:min-w-[330px] h-[250px] md:justify-center sx:hidden">
                  <Image src="/images/svg/mobile-device.svg" alt="device-mockup" width={500} height={400} />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-20 bg-lightSubPrimary flex justify-start items-center md:h-12 lg:h-14">
                <p className="text-xl font-semibold ml-20">STEP - 1</p>
              </div>
            </div>
          </motion.div>
          <motion.div className="absolute top-[250px] left-0 w-full  text-black flex flex-col items-center bg-white z-20  md:flex md:top-[220px]" style={{ y: secondBoxY }}  >
            <div className="relative w-[1200px] h-[550px]  mt-20 rounded-[26px] shadow-primary-shadow flex flex-col justify-end xl:w-[1000px] xl:h-[460px] md:w-[360px] md:h-[400px] lg:w-[800px] lg:h-[380px]">
              <div className="flex  justify-end items-center md:flex-col md:justify-center">
                <div className="flex flex-col justify-start pl-20 pt-10 items-start  gap-5 w-full h-full md:items-center md:pl-0 md:gap-1 lg:pt-0">
                  <div>
                    <Image src="/images/svg/triangle.svg" alt="triangle" width={40} height={40} />
                  </div>
                  <p className="text-4xl font-bold md:text-xl">에러 내역 확인</p>
                </div>
                <div className="flex min-w-[900px] md:hidden xl:min-w-[720px] lg:min-w-[500px] ">
                  <Image src="/images/png/error-content-mockup.png" alt="device-mockup" width={900} height={1000} />
                </div>
                <div className="flex md:min-w-[330px] h-[250px] md:justify-center sx:hidden ">
                  <Image src="/images/svg/mobile-content.svg" alt="device-mockup" width={500} height={400} />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-20 bg-lightPrimary2 flex justify-start items-center md:h-12 lg:h-14">
                <p className="text-xl font-semibold ml-20">STEP - 2</p>
              </div>
            </div>
          </motion.div>
          <motion.div className="absolute top-[310px] left-0 w-full  text-black flex flex-col items-center bg-white z-10 md:flex md:top-[265px]" style={{ y: thirdBoxY }}>
            <div className="relative w-[1200px] h-[550px]  mt-20 rounded-[26px] shadow-primary-shadow flex flex-col justify-end xl:w-[1000px] xl:h-[460px] md:w-[360px] md:h-[400px] lg:w-[800px] lg:h-[380px]">
              <div className="flex  justify-end items-center  md:flex-col md:justify-center">
                <div className="flex flex-col justify-start pl-20 pt-10 items-start  gap-5 w-full h-full md:items-center md:pl-0 md:gap-1 lg:pt-0">
                  <div>
                    <Image src="/images/svg/desktop.svg" alt="desktop" width={40} height={40} />
                  </div>
                  <p className="text-4xl font-bold md:text-xl">실시간 원격</p>
                  <p className="text-4xl font-bold md:text-xl">고장 설정</p>
                </div>
                <div className="flex min-w-[900px] md:hidden xl:min-w-[720px] lg:min-w-[500px] md:min-w-[100px]">
                  <Image src="/images/png/device-mockup.png" alt="device-mockup" width={900} height={1000} />
                </div>
                <div className="flex md:min-w-[330px] h-[250px] md:justify-center sx:hidden">
                  <Image src="/images/svg/mobile-device.svg" alt="device-mockup" width={500} height={400} />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-20 bg-lightPrimary3 flex justify-start items-center md:h-12 lg:h-14">
                <p className="text-xl font-semibold ml-20">STEP - 3</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div >
  )
}

export default DeviceService;