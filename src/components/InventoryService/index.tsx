"use client";

import Image from "next/image";
import { motion } from "framer-motion"

const InventoryService = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, transition: { duration: 2 } }}
      className="w-full h-full flex items-center my-44 md:flex-col md:gap-10 md:items-end md:my-20 overflow-x-hidden"
    >
      <div className="flex-1 flex flex-col items-center text-black h-full md:mr-6">
        <div>
          <motion.div
            whileHover={{
              scale: 1.4,
              transition: { duration: 0.5 },
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="inline-block"
          >
            <Image src="/images/svg/remain-amount.svg" alt="remain amount" width={80} height={50}
            />
          </motion.div>
          <div className="ml-5 mt-5">
            <div className="text-5xl font-semibold flex flex-col gap-4 md:text-3xl">
              <p>수시로 기계실에 가서</p>
              <p>약품 잔량 확인은 그만 !</p>
            </div>
            <div className="mt-10 text-gray opacity-90 font-normal tracking-wide md:text-sm  ">
              <p>교체 주기 임박시 워시펀이 알려드립니다.</p>
              <p>기능별 사용 시간 기반 예상 교체 주기 알림</p>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.5 },
        }}
        className="flex-1" >
        <Image src="/images/png/inventory-mockup.png" alt="inventory mockup" width={860} height={400} quality={100}
          className="md:w-[330px]"
        />
      </motion.div >
    </motion.div >
  );
};

export default InventoryService;