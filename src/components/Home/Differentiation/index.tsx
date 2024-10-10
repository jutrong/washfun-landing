import { motion } from "framer-motion";
import Image from "next/image";

const Differentiation = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 bg-color p-20  text-black lg:p-10 md:px-8">
      <div className="mt-20 flex w-full justify-center">
        <h2 className="text-center text-[44px] font-semibold leading-tight text-gray md:text-2xl">
          워시펀은 다른 세차장과의 <br />
          <span className="text-gradient text-[58px] tracking-wider md:text-3xl">차이</span>를 만듭니다.
        </h2>
      </div>
      <div className="flex w-full flex-col gap-16 lg:gap-10 md:gap-4">
        <motion.div className="mb-12 flex w-full justify-center "
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 2, delay: 0.2 } }}
        >
          <div className="mt-20 flex h-full flex-col  ">
            <div className="flex h-1/2 w-full justify-center">
              <Image src="/images/png/difference1.png" alt="" width={1100} height={1000} />
            </div>
            <div className="flex h-1/2 w-full flex-col items-center  gap-3 pb-32  pt-10">
              <p className="text-4xl font-medium md:text-2xl">셀프세차, 노터치 기계세차, 예약제</p>
              <p className="text-3xl font-medium md:text-xl">모두를 하나의 플랫폼으로 !</p>
              <p className="text-2xl font-medium text-gray md:text-xs">셀프세차부터 예약제 노터치 세차까지, 편리함의 새로운 기준</p>
              <p className="md:text-xs">
                (노터치, 예약제 서비스는 2025년 제공 예정)
              </p>
            </div>
          </div>
        </motion.div>
        <motion.div className="flex  w-full justify-end  "
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 2, delay: 0.2 } }}
        >
          <div className="flex size-full items-center  xl:flex-col ">
            <div className="flex h-1/2 w-full justify-center gap-16 pb-10 md:w-16">
              <Image src="/images/png/iphone1.png" alt="" width={200} height={600} className="object-contain" />
              <Image src="/images/png/iphone2.png" alt="" width={200} height={600} className="object-contain" />
              <Image src="/images/png/iphone3.png" alt="" width={200} height={600} className="object-contain" />
            </div>
            <div className="relative flex h-1/2 w-full flex-col items-center  gap-3  pt-0">
              <p className="text-4xl font-medium md:text-2xl">복잡한 타플랫폼과 달리</p>
              <p className="text-3xl font-medium md:text-xl">모든 연령대가 편하게 사용가능한</p>
              <p className="text-2xl font-medium text-gray md:text-xs">UX / UI</p>
            </div>
          </div>
        </motion.div>

        <motion.div className="flex w-full justify-start "
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 2, delay: 0.2 } }}
        >
          <div className="flex size-full flex-row-reverse items-center pt-20 lg:flex-col lg:gap-10 md:flex-col  ">
            <div className="flex h-1/2 w-full justify-center">
              <Image src="/images/png/data-iot2.png" alt="" width={440} height={1000} className="object-contain" />
            </div>
            <div className="flex h-1/2 w-full flex-col items-center xl:items-start    ">
              <p className="text-4xl font-medium xl:text-3xl md:text-xl">IoT 기기를 통한 고객별 데이터 수집으로</p>
              <p className="mt-2 text-4xl font-medium xl:text-3xl  md:text-xl">체계적인 매장관리 지원</p>
              <p className="mt-4 text-lg font-medium text-gray md:text-sm">
                고객 및 매장 특성 분석의 세차장별 맞춤 전략으로 회전율을 극대화 시키고
              </p>
              <p className="text-lg font-medium text-gray md:text-sm">
                매출이 증가하는 데이터 기반 서비스 제공
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div className="flex  w-full justify-end"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 2, delay: 0.2 } }}
        >
          <div className="flex size-full items-center  py-20 lg:flex-col lg:gap-10 md:flex-col md:pb-0 ">
            <div className="flex h-1/2 w-full  justify-center gap-16 ">
              <Image src="/images/png/cost2.png" alt="" width={400} height={600} className="object-contain" />
            </div>
            <div className="relative flex h-1/2 w-full flex-col items-start gap-3 pt-0 md:pt-6">
              <p className="pb-4 text-4xl font-medium md:text-2xl">저렴한 도입 비용</p>
              <p className="text-2xl font-medium text-gray md:text-sm">1. 기존 대비 30% 저렴한 신규 도입 비용</p>
              <p className="text-2xl font-medium text-gray md:text-sm">2. 카드 제작, 카드 단말기 설치, 키오스크 설치와 유사한 기기 도입 비용</p>
            </div>
          </div>
        </motion.div>

        <motion.div className=" flex w-full   justify-center  py-10 pt-20 "
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 2, delay: 0.2 } }}
        >
          <div className="flex size-full flex-row-reverse items-center lg:flex-col lg:gap-10 md:flex-col ">
            <div className="flex h-1/2 w-full items-center justify-center rounded-3xl p-10  shadow-primary-shadow">
              <Image src="/images/png/cycle.png" alt="" width={220} height={500} />
            </div>
            <div className=" flex h-1/2 w-full flex-col items-center gap-3 pr-10 xl:items-start md:mt-10 md:items-start">
              <p className="text-4xl font-semibold xl:text-3xl md:text-2xl">차종, 오염도, 세차 성향 등</p>
              <p className="text-3xl font-medium xl:text-2xl md:text-xl">각자에게 필요한 만큼 1초단위로 사용하는</p>
              <p className="text-2xl font-medium text-gray md:text-sm">후불 결제 시스템</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Differentiation;