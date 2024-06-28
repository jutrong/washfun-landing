"use client";

import Image from "next/image";
import { motion } from "framer-motion"

const Cover = ({ onMoveBox, onAccordianMoveBox, onContactMoveBox }: { onMoveBox: () => void, onAccordianMoveBox: () => void, onContactMoveBox: () => void; }) => {

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Image src="/images/png/pc-background.png" fill={true} alt="washfun cover" quality={100} style={{ objectFit: "cover" }} />
      </div>
      <div className="absolute inset-x-0 w-full h-24 z-10 flex justify-between items-center px-60">
        <div>
          <Image src="/images/svg/white-logo.svg" alt="washfun Logo" width={46} height={46} />
        </div>
        <div className="w-96 h-px bg-gray z-10 mx-48"></div>
        <div className="flex space-x-12 cursor-pointer">
          <p className="text-white text-opacity-80 hover:text-opacity-100 transition duration-500" onClick={onMoveBox}>주요 기능</p>
          <p className="text-white text-opacity-80 hover:text-opacity-100 transition duration-500" onClick={onAccordianMoveBox}>자주 묻는 질문</p>
        </div>
      </div>
      <div className="absolute top-72 left-72 flex flex-col text-white">
        <div className="flex flex-col gap-3 mb-16">
          <p className="text-7xl font-medium  opacity-90">셀프 세차의</p>
          <p className="text-8xl font-bold tracking-wide">디지털 혁신</p>
        </div>
        <div className="mb-6 flex">
          <p className="text-4xl text-primary">워시펀</p>
          <span className="text-4xl text-white">과 함께</span>
        </div>
        <motion.div
          whileHover={{ scale: 1.05, transition: { duration: 0.5 } }}
          className="flex items-center gap-3 p-3 w-40 h-12 border border-x-2 bg-white rounded-xl z-20" onClick={onContactMoveBox}>
          <motion.div
          >
            <Image src="/images/svg/contact.svg" width={30} height={30} alt="contact" />
          </motion.div>
          <p className="text-1xl text-gray cursor-pointer">문의하기</p>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-10 left-1/2 w-10 h-10 z-10 "
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
        <Image src="/images/svg/arrow-down-svgrepo-com-2.svg" alt="scroll down" width={60} height={50} />
      </motion.div>
    </div >
  )
}

export default Cover;