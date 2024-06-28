"use client";

import Image from "next/image";
import { anticipate, backIn, circOut, cubicBezier, motion, useMotionValueEvent, useScroll, useTransform, useViewportScroll } from "framer-motion"
import { use, useRef } from "react";

const VarienceFeeService = () => {
  const scrollRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: [0, 0.5]
  })
  const backgroundColor = useTransform(scrollYProgress, [0, 0.5],
    ['#EFF6FF', '#0d0829']);
  const cloudX = useTransform(scrollYProgress, [0, 0.5], [0, -700]);
  const sunX = useTransform(scrollYProgress, [0, 0.5], [0, 700], { ease: backIn });
  const moonX = useTransform(scrollYProgress, [0.3, 1], [400, 0], { ease: backIn });
  const moonXX = useTransform(scrollYProgress, [0.3, 1], [-500, 0]);
  const textColor = useTransform(scrollYProgress, [0, 0.4], ['#000', '#fff']);
  const subTextColor = useTransform(scrollYProgress, [0, 0.4], ['#4F5055', '#fff']);
  const buildingDayOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const buildingNightOpacity = useTransform(scrollYProgress, [0.5, 0.5], [0, 1]);
  const peopleOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const dayPercentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const nightPercentOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);
  const upY = useTransform(scrollYProgress, [0.2, 1], [300, 0]);
  const dayPannelOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const nightPannelOpacity = useTransform(scrollYProgress, [0.1, 1], [0, 1]);
  const carMotion = useTransform(scrollYProgress, [0.2, 1], [0, 1]);

  return (
    <>
      <motion.div ref={scrollRef} className="h-250vh w-full relative" style={{ backgroundColor }} >
        <div className="sticky top-0 left-0 z-20 h-screen overflow-hidden">
          <motion.div
            className="flex justify-center  md:w-full" >
            <motion.div className="text-black mt-40 z-20 md:mt-30 md:px-4" style={{ color: textColor }}>
              <p className="font-bold text-5xl md:text-xl md:flex md:justify-center ">시간별 변동 요금제로 매장 회전율 극대화</p>
              <motion.div className="flex flex-col items-center mt-10 font-light opacity-70 md:text-xs" style={{ color: subTextColor }}>
                <p>바쁜 시간에는 기존 요금을</p>
                <p>한가한 시간에는 요금 할인으로 오래쓰시는 고객분들을 한가한 시간으로 유도하여 회전율을 높이고,</p>
                <p>주변 세차장과의 가격 경쟁력 확보로 고객 추가 유입 !</p>
              </motion.div>
            </motion.div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
              <motion.div className="absolute" style={{ opacity: dayPannelOpacity }}>
                <Image src="/images/svg/pannel-day100.svg" width={650} height={100} alt="pannel-day" />
              </motion.div>
              <motion.div style={{ opacity: nightPannelOpacity }}>
                <Image src="/images/svg/pannel-night.svg" width={650} height={100} alt="pannel-day" />
              </motion.div>
              <motion.div className="absolute -bottom-10  -translate-x-1/2 opacity-80  w-full h-full flex items-end justify-center" style={{ opacity: carMotion, scale: carMotion }}>
                <Image src="/images/svg/car4.svg" width={600} height={800} alt="car" />
              </motion.div>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                <div className="opacity-90">
                  <Image src="/images/svg/pannel-logo.svg" width={200} height={100} alt="pannel-logo" />
                </div>
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [0, 10, 0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -right-10 -top-16" style={{ opacity: peopleOpacity }}>
                  <Image src="/images/png/people-circle.png" alt="revenue-up" width={80} height={100} />
                </motion.div>
                <motion.div initial={{ y: 0 }}
                  animate={{ y: [0, 10, 0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -left-5 -top-0" style={{ opacity: peopleOpacity }}>
                  <Image src="/images/png/people-circle2.png" alt="revenue-up" width={50} height={100} />
                </motion.div>
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [0, 10, 0, 10, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="absolute -left-16 -top-10" style={{ opacity: peopleOpacity }}>
                  <Image src="/images/png/people-circle3.png" alt="revenue-up" width={40} height={100} />
                </motion.div>
              </div>
              <motion.div className="absolute top-2/4 left-1/2 -translate-x-1/2" style={{ opacity: dayPannelOpacity }}>
                <div className="w-600px h-32 bg-lightPrimary shadow-primary-shadow rounded-3xl flex justify-between items-center px-10 md:w-[300px] md:h-20">
                  <p className="text-gray font-Jamsil text-4xl opacity-80">Day</p>
                  <div className="flex justify-center items-center">
                    <motion.div className="text-black font-Jamsil text-4xl" style={{ opacity: dayPercentOpacity }}>100%</motion.div>
                  </div>
                </div>
              </motion.div>
              <motion.div className="absolute top-2/4 left-1/2 -translate-x-1/2" style={{ opacity: nightPercentOpacity }}>
                <div className="w-600px h-32 bg-lightPrimary shadow-primary-shadow rounded-3xl flex justify-between items-center px-10 md:w-[300px] md:h-20">
                  <p className="text-gray font-Jamsil text-4xl opacity-80">Night</p>
                  <div className="flex justify-center items-center">
                    <motion.div className="relative w-full h-full text-lightPrimary  font-Jamsil text-4xl opacity-5"

                      style={{ opacity: nightPercentOpacity, x: nightPercentOpacity }}
                    >
                      <Image src="/images/png/sale-tag.png" width={200} height={100} alt="sale tag" ></Image>
                      <motion.p className="absolute top-2/4 left-32 font-Jamsil text-2xl z-10 -translate-x-1/2 -translate-y-1/2 tracking-widest" >80%</motion.p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
            <motion.div className="absolute left-80 top-1/3 opacity-50 md:top-[60px]" style={{ x: cloudX }}>
              <Image src="/images/svg/cloud.svg" width={140} height={120} alt="cloud" />
            </motion.div>
            <motion.div className="absolute right-28 top-40 opacity-50 md:top-[320px] md:right-[300px]" style={{ x: sunX }}>
              <Image src="/images/svg/sun.svg" width={160} height={120} alt="sun" />
            </motion.div>
            <motion.div className="absolute bottom-0 left-0 -z-10" style={{ opacity: buildingDayOpacity }}>
              <Image src="/images/svg/building.svg" width={2000} height={100} alt="building" />
            </motion.div>
            <motion.div className="absolute -bottom-32 left-1/4 -z-10" style={{ opacity: buildingDayOpacity }}>
              <Image src="/images/svg/building2.svg" width={1000} height={100} alt="building" />
            </motion.div>
            <motion.div className="absolute bottom-10 left-0 -z-10" style={{ opacity: buildingNightOpacity }}>
              <Image src="/images/svg/building-night.svg" width={2000} height={100} alt="building" />
            </motion.div>
            <motion.div className="absolute right-28 top-40 opacity-50 md:top-[50px]" style={{ x: moonX }}>
              <Image src="/images/png/moon.png" alt="moon" width={200} height={120} />
            </motion.div>
            <motion.div className="absolute left-28 top-28 opacity-50 md:top-[320px]" style={{ x: moonXX }}>
              <Image src="/images/png/moon.png" alt="moon" width={140} height={120} />
            </motion.div>
            <motion.div className="absolute bottom-16 -z-20 opacity-10" style={{ y: upY }}>
              <Image src="/images/png/up.png" alt="up" width={600} height={120} />
            </motion.div>
          </motion.div>
        </div >
      </motion.div >
    </>
  )
};

export default VarienceFeeService;