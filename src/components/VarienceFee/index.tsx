import Image from "next/image";
import { motion } from "framer-motion"

const VarienceFee = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, transition: { duration: 2 } }}
      className="w-full h-full flex items-center my-44 md:flex-col-reverse md:gap-10 md:items-center md:my-20 overflow-x-hidden"
    >
      <motion.div
        className="flex-1" >
        <Image src="/images/svg/varienceFee-mockup1.svg" alt="edit price" width={900} height={500} quality={100}
          className="md:w-[630px]"
        />
      </motion.div >
      <div className="flex-1 flex flex-col items-start text-black ml-20 h-full md:ml-0 md:mt-20">
        <div className="ml-5 mt-5 md:w-full md:flex md:flex-col md:items-center md:ml-0">
          <div className="text-5xl font-semibold flex flex-col gap-4 md:text-3xl">
            <p>시간별 변동 요금제로</p>
            <p>매장 회전율 극대화 !</p>
          </div>
          <div className="mt-10 text-gray opacity-90 font-normal tracking-wide md:text-sm md:flex md:flex-col md:items-center md:px-10">
            <p>바쁜 시간에는 기존 요금을</p>
            <p>한가한 시간에는 요금 할인으로 오래쓰시는 고객분들을 </p>
            <p>한가한 시간으로 유도하여 회전율을 높이고,</p>
            <p>주변 세차장과의 가격 경쟁력 확보로 고객 추가 유입 !</p>
          </div>
        </div>
      </div>
    </motion.div >
  )
}

export default VarienceFee;