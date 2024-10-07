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
  const firstBoxY = useTransform(scrollYProgress, [0, 1], [0, -5000]);
  const secondBoxY = useTransform(scrollYProgress, [0.1, 1], [0, -1000]);
  const thirdBoxY = useTransform(scrollYProgress, [0.1, 1], [0, -200]);

  return (
    <div className="relative flex size-full items-center justify-center">
      <motion.div className="relative h-300vh w-full max-w-[1200px]  xl:max-w-[1000px] lg:max-w-[800px] md:max-w-[360px]" ref={scrollRef}>
        <div className="sticky top-0 flex w-full justify-center">
          <motion.div className="absolute left-0 top-0 z-30 flex flex-col  items-center justify-center bg-white text-black md:flex " style={{ y: firstBoxY }}>
            <div className="mt-20 flex flex-col items-center justify-center  ">
              <div className="flex flex-col items-center justify-center gap-4 ">
                <p className="text-5xl font-bold md:text-3xl">실시간 베이 상황 확인으로</p>
                <p className="text-gradient text-4xl font-bold md:text-3xl">간편 매장 모니터링 !</p>
              </div>
              <p className="mt-6 font-semibold text-gray opacity-90 md:text-sm">베이별 사용 시간, 상태 확인</p>
            </div>
            <div className="relative z-30 mt-10 flex h-[550px] w-[1200px] flex-col justify-end rounded-[26px] bg-white shadow-primary-shadow xl:h-[460px] xl:w-1000px lg:h-[380px] lg:w-800px md:h-[400px] md:w-[360px] ">
              <div className="flex items-center justify-end md:flex-col md:justify-center">
                <div className="flex size-full flex-col items-start justify-start gap-5 pl-20 pt-10 lg:pt-0 md:items-center md:gap-1 md:pl-0">
                  <div>
                    <Image src="/images/svg/clock.svg" alt="clock" width={40} height={40} />
                  </div>
                  <p className="text-3xl font-bold md:text-xl">베이별 사용 시간</p>
                  <p className="text-3xl font-bold md:text-xl">실시간 상태 확인</p>
                </div>
                <div className="flex min-w-[900px] xl:min-w-[620px] lg:min-w-[500px] md:hidden md:min-w-[100px] ">
                  <Image src="/images/png/device-mockup.png" alt="device-mockup" width={900} height={1000} />
                </div>
                <div className="flex h-[250px] md:min-w-[330px] md:justify-center sx:hidden">
                  <Image src="/images/svg/mobile-device.svg" alt="device-mockup" width={500} height={400} />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 flex h-20 w-full items-center justify-start bg-lightSubPrimary lg:h-14 md:h-12">
                <p className="ml-20 text-xl font-semibold">STEP - 1</p>
              </div>
            </div>
          </motion.div>
          <motion.div className="absolute left-0 top-[250px] z-20 flex -translate-x-1/2 flex-col items-center bg-white text-black  md:top-[220px] md:flex" style={{ y: secondBoxY }}  >
            <div className="relative mt-20 flex h-[550px] w-[1200px] flex-col justify-end rounded-[26px] shadow-primary-shadow xl:h-[460px] xl:w-1000px lg:h-[380px] lg:w-800px md:h-[400px] md:w-[360px]">
              <div className="flex  items-center justify-end md:flex-col md:justify-center">
                <div className="flex size-full flex-col items-start justify-start gap-5  pl-20 pt-10 lg:pt-0 md:items-center md:gap-1 md:pl-0">
                  <div>
                    <Image src="/images/svg/triangle.svg" alt="triangle" width={40} height={40} />
                  </div>
                  <p className="text-4xl font-bold md:text-xl">에러 내역 확인</p>
                </div>
                <div className="flex min-w-[900px] xl:min-w-[720px] lg:min-w-[500px] md:hidden ">
                  <Image src="/images/png/error-content-mockup.png" alt="device-mockup" width={900} height={1000} />
                </div>
                <div className="flex h-[250px] md:min-w-[330px] md:justify-center sx:hidden ">
                  <Image src="/images/svg/mobile-content.svg" alt="device-mockup" width={500} height={400} />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 flex h-20 w-full items-center justify-start bg-lightPrimary2 lg:h-14 md:h-12">
                <p className="ml-20 text-xl font-semibold">STEP - 2</p>
              </div>
            </div>
          </motion.div>
          <motion.div className="absolute left-0 top-[310px]   z-10 flex flex-col items-center bg-white text-black md:top-[265px] md:flex" style={{ y: thirdBoxY }}>
            <div className="relative mt-20 flex  h-[550px] w-[1200px] flex-col justify-end rounded-[26px] shadow-primary-shadow xl:h-[460px] xl:w-1000px lg:h-[380px] lg:w-800px md:h-[400px] md:w-[360px]">
              <div className="flex  items-center justify-end  md:flex-col md:justify-center">
                <div className="flex size-full flex-col items-start justify-start gap-5  pl-20 pt-10 lg:pt-0 md:items-center md:gap-1 md:pl-0">
                  <div>
                    <Image src="/images/svg/desktop.svg" alt="desktop" width={40} height={40} />
                  </div>
                  <p className="text-4xl font-bold md:text-xl">실시간 원격</p>
                  <p className="text-4xl font-bold md:text-xl">고장 설정</p>
                </div>
                <div className="flex min-w-[900px] xl:min-w-[720px] lg:min-w-[500px] md:hidden md:min-w-[100px]">
                  <Image src="/images/png/device-mockup.png" alt="device-mockup" width={900} height={1000} />
                </div>
                <div className="flex h-[250px] md:min-w-[330px] md:justify-center sx:hidden">
                  <Image src="/images/svg/mobile-device.svg" alt="device-mockup" width={500} height={400} />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 flex h-20 w-full items-center justify-start bg-lightPrimary3 lg:h-14 md:h-12">
                <p className="ml-20 text-xl font-semibold">STEP - 3</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default DeviceService;