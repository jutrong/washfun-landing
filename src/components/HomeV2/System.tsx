'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const container = {
  hidden: {},
  visible: {
    transition: {
      // 카드 하나씩 순차 등장
      staggerChildren: 0.32,
      delayChildren: 0.08,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function System() {
  return (
    <div>
      {/* 1행 섹션 */}
      <motion.div
        className="grid grid-cols-2 gap-[12px] py-[120px] lg:grid-cols-1 lg:py-[60px]"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }} // 한번만, 20% 보이면 트리거
      >
        <motion.div
          variants={fadeUp}
          className="flex h-[400px] flex-col justify-between rounded-[24px] border border-borderStrong p-[36px] lg:h-[360px] "
        >
          <div className="flex flex-col gap-[8px]">
            <p className="text-[20px] font-medium text-secondaryDefault lg:text-[18px]">세차를 고객의 일상으로</p>
            <p className="text-[48px] font-semibold text-black lg:text-[30px]">
              지속적인 수익을 만드는<br /> 자동 세차 정기 구독.
            </p>
          </div>
          {/* <div className="flex cursor-pointer items-center gap-[4px]">
            <p className="text-[14px] font-medium text-secondaryDefault">구독 시스템 더 알아보기</p>
            <Image src="/images/v2/svg/arrow-right.svg" alt="arrow-right" width={20} height={20} />
          </div> */}
        </motion.div>

        <motion.div variants={fadeUp} className="rounded-[24px] bg-secondaryForeground lg:h-[360px] ">
          <div className="flex flex-col gap-[4px] p-[24px]">
            <p className="text-[24px] font-semibold text-black lg:text-[18px]">비수기를 걱정하지 않는 세차장</p>
            <p className="text-[18px] font-normal leading-[28px] text-secondaryDefault lg:text-[14px] lg:leading-[20px]">
              지금껏 비수기의 뼈아픈 매출 감소를 감당하고 계셨나요? 이제 구독 고객 확보를 통해 비수기에도 고정된 매출을 만들고,
              걱정을 덜어보세요.
            </p>
          </div>
          <div className="relative h-[200px] w-full">
            <Image src="/images/v2/png/graph.png" alt="system1" fill />
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="flex h-[400px] flex-col justify-between rounded-[24px] bg-secondaryForeground p-[24px] lg:h-[360px]"
        >
          <div className="flex flex-col gap-[4px] ">
            <p className="text-[24px] font-semibold text-black lg:text-[18px]">방문이 습관이 되는 세차장</p>
            <p className="text-[18px] font-normal leading-[28px] text-secondaryDefault lg:text-[14px] lg:leading-[20px]">
              세차를 특별한 일처럼 생각하게 하지 마세요. 항상 자연스럽게, 마치 습관처럼 점주님의 세차장을 방문하게 만들어보세요.
            </p>
          </div>
          <div className="flex items-end gap-[16px] self-end lg:flex-col">
            <p className="text-[20px] font-medium leading-[28px] text-secondaryDefault">월 평균 방문</p>
            <p className="text-[80px] font-medium leading-[60px] text-black lg:text-[64px]">2.6회</p>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="flex h-[400px] flex-col justify-between overflow-hidden rounded-[24px] bg-secondaryForeground lg:h-[360px]"
        >
          <div className="flex flex-col gap-[4px] p-[24px]">
            <p className="text-[24px] font-semibold text-black lg:text-[18px]">커피 주문보다 쉬운 드라이브스루 세차장</p>
            <p className="text-[18px] font-normal leading-[28px] text-secondaryDefault lg:text-[14px] lg:leading-[20px]">
              차에서 내리는 불편함, 복잡한 결제, 어려운 이용 방법은 이제 없습니다. 들어갔다 나오면 끝나는, 커피 주문보다 쉬운 세차
              경험으로 대체하세요.
            </p>
          </div>
          <Image src="/images/v2/png/carNum.png" alt="system1" width={1000} height={1000} className="h-auto w-4/5" />
        </motion.div>
      </motion.div>

      {/* 2행 섹션 */}
      <motion.div
        className="grid grid-cols-2 gap-[12px] py-[120px] lg:grid-cols-1 lg:py-[60px]"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <motion.div
          variants={fadeUp}
          className="flex h-[400px] flex-col justify-between rounded-[24px] border border-borderStrong p-[36px] lg:h-[360px]"
        >
          <div className="flex flex-col gap-[8px]">
            <p className="text-[20px] font-medium text-secondaryDefault lg:text-[18px]">수십년 간 똑같았던 셀프 세차는 그만</p>
            <p className="text-[48px] font-semibold text-black lg:text-[30px]">
              기존보다 10배 편리한<br />후불제 셀프 세차.
            </p>
          </div>
          {/* <div className="flex cursor-pointer items-center gap-[4px]">
            <p className="text-[14px] font-medium text-secondaryDefault">후불제 시스템 더 알아보기</p>
            <Image src="/images/v2/svg/arrow-right.svg" alt="arrow-right" width={20} height={20} />
          </div> */}
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="flex h-[400px] flex-col items-center justify-between overflow-hidden rounded-[24px] bg-secondaryForeground p-[24px] lg:h-[360px]"
        >
          <div className="flex flex-col gap-[4px] ">
            <p className="text-[24px] font-semibold text-black lg:text-[18px]">손님을 가리지 않는 세차장</p>
            <p className="text-[18px] font-normal leading-[28px] text-secondaryDefault lg:text-[14px] lg:leading-[20px]">
              매번 RF 카드를 잃어버리는 고객, 현금을 들고오지 않아 세차를 미루는 고객. 이제 모두가 걱정 없이 세차장에 올 수 있게
              만들어보세요.
            </p>
          </div>
          <Image src="/images/v2/png/conversation.png" alt="system1" width={1200} height={1200} className="h-auto w-5/6 lg:w-[120%]" />
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="flex h-[400px] flex-col justify-between rounded-[24px] bg-secondaryForeground p-[24px] lg:h-[360px]"
        >
          <div className="flex flex-col gap-[4px] ">
            <p className="text-[24px] font-semibold text-black lg:text-[18px]">상한 없이 자유롭게 이용하는 세차장</p>
            <p className="text-[18px] font-normal leading-[28px] text-secondaryDefault lg:text-[14px] lg:leading-[20px]">
              고객은 3분의 시간이 끝나면 단 3천원에도 추가 결제를 고심합니다. 이제 이용 시간의 상한을 없애고 객단가를 더욱 올려보세요.
            </p>
          </div>
          <div className="flex items-end gap-[16px] self-end lg:flex-col">
            <p className="text-[20px] font-medium leading-[28px] text-secondaryDefault">업계 평균 대비 객단가</p>
            <p className="text-[80px] font-medium leading-[60px] text-black lg:text-[64px]">+22%</p>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="flex h-[400px] flex-col items-center justify-between overflow-hidden rounded-[24px] bg-secondaryForeground p-[24px] lg:h-[360px]"
        >
          <div className="flex flex-col gap-[4px]">
            <p className="text-[24px] font-semibold text-black lg:text-[18px]">무인 운영도 걱정 없는 세차장</p>
            <p className="text-[18px] font-normal leading-[28px] text-secondaryDefault lg:text-[14px] lg:leading-[20px]">
              언제 왔다 간지 모르는 진상 고객, 매번 전화를 기다리고 있어야 하는 현금 포인트 충전. 포인트 충전 시스템과 점주용 관리
              시스템으로 안심하고 운영하세요.
            </p>
          </div>
          <Image src="/images/v2/png/circle.png" alt="system1" width={1000} height={1000} className="h-auto w-3/6 lg:w-full" />
        </motion.div>
      </motion.div>
    </div>
  );
}