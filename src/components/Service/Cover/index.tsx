"use client";

import Image from "next/image";
import { motion } from "framer-motion"
import Header from "@/components/Header";
import Link from "next/link";

const Cover = () => {

  return (
    <div className="relative h-screen w-full overflow-x-hidden ">
      <div className="absolute left-0 top-0 z-0 size-full">
        <Image src="/images/png/pc-background.png" fill={true} alt="washfun cover" quality={100} style={{ objectFit: "cover" }} />
      </div>
      <div className="absolute left-0 top-0 z-0 hidden size-full lg:block">
        <Image src="/images/png/mobile-back.png" fill={true} alt="washfun cover" quality={100} style={{ objectFit: "cover" }} />
      </div>
      <Header />
      <div className=" absolute left-72 top-72 flex w-full flex-col text-white xl:left-36 lg:left-1/2 lg:top-32 lg:-translate-x-1/2 md:mt-10">
        <div className="mb-16 flex flex-col gap-3 font-NotoSansKR lg:items-center">
          <p className="text-7xl font-medium opacity-90 lg:text-6xl lg:opacity-100">셀프 세차의</p>
          <p className="text-8xl font-bold tracking-wide lg:text-6xl">디지털 혁신</p>
        </div>
        <div className="mb-6 flex lg:justify-center lg:py-2  ">
          <p className="text-4xl text-primary lg:text-3xl lg:font-bold">워시펀</p>
          <span className="text-4xl text-white lg:text-3xl">과 함께</span>
        </div>
        <div className=" flex lg:justify-center">
          <Link href="/contact">
            <motion.div
              whileHover={{ scale: 1.05, transition: { duration: 0.5 } }}
              className="z-20 flex h-12 w-40 items-center gap-3 rounded-xl border border-x-2 bg-white p-3 lg:justify-center lg:rounded-[100px]">
              <motion.div
              >
                <Image src="/images/svg/contact.svg" width={30} height={30} alt="contact" />
              </motion.div>
              <p className="cursor-pointer text-lg text-gray lg:text-base">도입 문의</p>
            </motion.div>
          </Link>
        </div>
      </div>
      <motion.div
        className="absolute bottom-10 left-1/2 z-10  size-10 md:left-[45%]"
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