"use client";

import Image from "next/image";
import { motion } from "framer-motion"

const Cover = ({ onMoveBox, onAccordianMoveBox, onContactMoveBox }: { onMoveBox: () => void, onAccordianMoveBox: () => void, onContactMoveBox: () => void; }) => {

  return (
    <div className="relative w-full h-screen overflow-x-hidden ">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Image src="/images/png/pc-background.png" fill={true} alt="washfun cover" quality={100} style={{ objectFit: "cover" }} />
      </div>
      <div className="absolute top-0 left-0 w-full h-full z-0 hidden lg:block">
        <Image src="/images/png/mobile-back.png" fill={true} alt="washfun cover" quality={100} style={{ objectFit: "cover" }} />
      </div>
      <div className="absolute inset-x-0 w-full h-24 z-10 flex justify-between items-center px-60 lg:px-0">
        <div className="w-[120px] h-[60px] flex justify-center items-center">
          <Image src="/images/svg/white-logo.svg" alt="washfun Logo" width={60} height={50} />
        </div>
        <div className="flex space-x-12 cursor-pointer w-full justify-end lg:hidden">
          <p className="text-white text-opacity-80 hover:text-opacity-100 transition duration-500" onClick={onMoveBox}>주요 기능</p>
          <p className="text-white text-opacity-80 hover:text-opacity-100 transition duration-500" onClick={onAccordianMoveBox}>자주 묻는 질문</p>
        </div>
      </div>
      <div className="absolute top-72 left-72 flex flex-col text-white lg:left-1/2 lg:-translate-x-1/2 lg:top-32 w-full xl:left-36">
        <div className="flex flex-col gap-3 mb-16 lg:items-center">
          <p className="text-7xl font-medium opacity-90 lg:text-6xl lg:opacity-100">셀프 세차의</p>
          <p className="text-8xl font-bold tracking-wide lg:text-6xl">디지털 혁신</p>
        </div>
        <div className="mb-6 flex  lg:justify-center  lg:py-2 ">
          <p className="text-4xl text-primary lg:text-3xl lg:font-bold">워시펀</p>
          <span className="text-4xl text-white lg:text-3xl">과 함께</span>
        </div>
        <div className=" flex lg:justify-center">
          <motion.div
            whileHover={{ scale: 1.05, transition: { duration: 0.5 } }}
            className="flex items-center gap-3 p-3 w-40 h-12 border border-x-2 bg-white rounded-xl z-20 lg:justify-center lg:rounded-[100px]" onClick={onContactMoveBox}>
            <motion.div
            >
              <Image src="/images/svg/contact.svg" width={30} height={30} alt="contact" />
            </motion.div>
            <p className="text-lg text-gray cursor-pointer lg:text-base">문의하기</p>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="absolute bottom-10 left-[50%]  w-10  h-10 z-10 md:left-[45%]"
        initial={{ y: 0 }}
        animate={{
          y: [0, 10, 0, 10, 0],
          opacity: [0.5, 0.7, 0.9, 0.7, 0.1],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 4,
        }}
      >
        <Image src="/images/svg/arrow-down-svgrepo-com-2.svg" alt="scroll down" width={100} height={50} />
      </motion.div>
    </div >
  )
}

export default Cover;