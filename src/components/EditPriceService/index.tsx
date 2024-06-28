"use client";

import Image from "next/image";
import { motion } from "framer-motion"

const EditPriceService = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, transition: { duration: 2 } }}
      className="w-full h-full flex items-center my-44 md:flex-col-reverse md:gap-10 md:items-start md:my-20 overflow-x-hidden"
    >
      <motion.div
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.5 },
        }}
        className="flex-1" >
        <Image src="/images/png/editprice-mockup.png" alt="edit price" width={860} height={400} quality={100}
          className="md:w-[330px]"
        />
      </motion.div >
      <div className="flex-1 flex flex-col items-start text-black ml-20 h-full md:ml-0 ">
        <motion.div
          whileHover={{
            scale: 1.4,
            transition: { duration: 0.5 },
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Image src="/images/svg/editprice-click.svg" alt="edit price click" width={80} height={50} />
        </motion.div>
        <div className="ml-5 mt-5">
          <div className="text-5xl font-semibold flex flex-col gap-4 md:text-3xl">
            <p>클릭 몇 번으로 가능한</p>
            <p>간편한 요금 변경 !</p>
          </div>
          <div className="mt-10 text-gray opacity-90 font-normal tracking-wide md:text-sm ">
            <p>DIP스위치 조작 필요 없이 점주 프로그램에서</p>
            <p>동시에 간편 수정 !</p>
          </div>
        </div>
      </div>
    </motion.div >
  );
};

export default EditPriceService;