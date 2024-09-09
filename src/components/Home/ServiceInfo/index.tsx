import Image from "next/image";
import { motion } from "framer-motion"

const ServiceInfo = () => {
  return (
    <div className="size-full overflow-x-hidden bg-gradient-to-t from-lightPrimary to-white pb-40">
      <div className="flex justify-center pt-40 text-5xl font-bold tracking-wider md:text-3xl">
        <p className="mr-4 text-black">셀프 셀차의</p>
        <span className="text-gradient text-black">패  러  다  임</span>
      </div>
      <motion.div className="mt-32 flex items-center justify-center gap-20 lg:gap-6 md:flex-col">
        <motion.div className="flex h-96 w-80 flex-col items-center justify-start rounded-3xl shadow-primary-shadow lg:w-60 md:w-80"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 2, delay: 0.2 } }}
        >
          <div className=" mt-10">
            <Image src="/images/png/NFC.png" width={200} height={200} alt="nfc" />
          </div>
          <p className="mt-4 text-2xl font-bold text-black">사용량 기반</p>
          <p className="text-2xl font-bold text-black">후불 결제 시스템</p>
        </motion.div>
        <motion.div className="flex h-96 w-80 flex-col  items-center justify-start rounded-3xl shadow-primary-shadow lg:w-60 md:w-80"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 2, delay: 0.4 } }}
        >
          <div className="relative mt-10">
            <Image src="/images/svg/coinbox.svg" width={180} height={200} alt="coinbox" />
            <motion.div className="absolute right-5 top-0"
              initial={{ y: 0 }}
              animate={{ y: [0, -10, 0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Image src="/images/svg/wifi.svg" width={25} height={200} alt="coinbox" />
            </motion.div>
          </div>
          <p className="mt-10 text-2xl font-bold text-black">실시간 서버와 통신하는</p>
          <p className="text-2xl font-bold text-black">IoT 코인박스 · 청소기</p>
        </motion.div>
        <motion.div className="flex h-96 w-80 flex-col items-center justify-start rounded-3xl shadow-primary-shadow lg:w-60 md:w-80"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 2, delay: 0.6 } }}
        >
          <div className="mt-10">
            <Image src="/images/png/data.png" width={200} height={200} alt="data" />
          </div>
          <p className="mt-4 text-2xl font-bold text-black">사용량 데이터 수집</p>
        </motion.div>
      </motion.div>
    </div >
  )
}

export default ServiceInfo;