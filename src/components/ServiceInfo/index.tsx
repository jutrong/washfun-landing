import Image from "next/image";
import { motion } from "framer-motion"

const ServiceInfo = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-t from-lightPrimary to-white overflow-hidden">
      <div className="flex justify-center pt-40 text-5xl font-bold tracking-wider">
        <p className="text-black mr-4">셀프 셀차의</p>
        <span className="text-black text-gradient">패  러  다  임</span>
      </div>
      <motion.div className="flex justify-center items-center gap-20 mt-32">
        <motion.div className="w-80 h-96 shadow-primary-shadow rounded-3xl bg-white flex justify-center items-center flex-col"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 2, delay: 0.2 } }}
        >
          <div className="h-44">
            <Image src="/images/svg/card.png" width={320} height={200} alt="nfc" />
          </div>
          <p className="text-black text-2xl font-bold mt-10">사용량 기반</p>
          <p className="text-black text-2xl font-bold">후불 결제 시스템</p>
        </motion.div>
        <motion.div className="w-80 h-96 shadow-primary-shadow rounded-3xl bg-white flex justify-center items-center flex-col"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 2, delay: 0.4 } }}
        >
          <div className="h-44 relative">
            <Image src="/images/svg/coinbox.svg" width={180} height={200} alt="coinbox" />
            <motion.div className="absolute top-0 right-5"
              initial={{ y: 0 }}
              animate={{ y: [0, -10, 0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Image src="/images/svg/wifi.svg" width={25} height={200} alt="coinbox" />
            </motion.div>
          </div>
          <p className="text-black text-2xl font-bold mt-10">실시간 서버와 통신하는</p>
          <p className="text-black text-2xl font-bold">IoT 코인박스 · 청소기</p>
        </motion.div>
        <motion.div className="w-80 h-96 shadow-primary-shadow rounded-3xl bg-white flex justify-center items-center flex-col"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 2, delay: 0.6 } }}
        >
          <div className="h-44 ">
            <Image src="/images/svg/data.svg" width={230} height={200} alt="data" />
          </div>
          <p className="text-black text-2xl font-bold mt-10">사용량 데이터 수집</p>
        </motion.div>
      </motion.div>
    </div >
  )
}

export default ServiceInfo;