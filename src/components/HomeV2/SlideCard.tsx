import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function SlideCard() {
  const scrollRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  })

  const titleY = useTransform(scrollYProgress, [0, 0], [0, -220]);

  const firstBoxY = useTransform(scrollYProgress, [0, 0], [0, 0]);
  const firstOpacity = useTransform(scrollYProgress, [0.4, 1], [1, 0.5]);
  const firstScale = useTransform(scrollYProgress, [0.2, 0.4], [1, 0.96]);

  const secondBoxY = useTransform(scrollYProgress, [0.2, 0.3], [0, -430]);
  const secondOpacity = useTransform(scrollYProgress, [0.4, 1], [1, 0.6]);
  const secondScale = useTransform(scrollYProgress, [0.2, 0.5], [1, 0.97]);

  const thirdBoxY = useTransform(scrollYProgress, [0.25, 0.4], [200, -410]);
  const thirdOpacity = useTransform(scrollYProgress, [0.4, 1], [1, 0.7]);
  const thirdScale = useTransform(scrollYProgress, [0.2, 0.6], [1, 0.98]);

  const fourthBoxY = useTransform(scrollYProgress, [0.35, 0.5], [200, -390]);
  const fourthOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0.8]);
  const fourthScale = useTransform(scrollYProgress, [0.2, 0.7], [1, 0.99]);

  const fifthBoxY = useTransform(scrollYProgress, [0.45, 0.6], [200, -370]);
  const fifthOpacity = useTransform(scrollYProgress, [1, 1], [0, 1]);
  const fifthScale = useTransform(scrollYProgress, [1, 1], [1, 1]);

  return (
    <div className="flex flex-col items-center justify-center py-[160px]">

      <motion.div className="relative h-250vh w-full" ref={scrollRef}>
        <div className="sticky top-[35%] mt-[64px] flex w-full  flex-col justify-center gap-[32px]">
          <motion.div className=" flex flex-col items-center justify-center" style={{ y: titleY }}>
            <p className="text-center text-[48px] font-bold">세차장 솔루션, <br />왜 워시펀인가요??</p>
            <p className="mt-[16px] text-center text-[20px] font-normal leading-[28px] text-secondaryDefault">다른 솔루션도 있고 외주 개발도 있는데,<br /> 꼭 워시펀이어야 하는 이유는 뭘까요?</p>
          </motion.div>
          {/* #1 - 첫 번째 카드 (고정) */}
          <motion.div
            className="absolute left-0 top-0 z-10 flex h-[400px] w-full rounded-[40px] border border-borderStrong bg-white p-[48px]"
            style={{ y: firstBoxY, opacity: firstOpacity, scale: firstScale }}
          >
            <div className="flex flex-1 flex-col justify-center gap-[12px]">
              <p className="text-[30px] font-semibold leading-[36px]">우선, 탁월한 피드백 속도로 <br />불신과 걱정이 없으니까.</p>
              <p className="text-[16px] font-normal leading-[24px] text-secondaryDefault">만들고 끝인 외주 업체가 아닌, 상생하는 워시펀이기에<br />불편함을 발굴하고 매일 발전하는 서비스를 만듭니다.</p>
            </div>
            <div className="relative flex-1">
              <Image src="/images/v2/png/update.png" alt="update" fill={true} className="scale-90 object-contain" />
            </div>
          </motion.div>

          {/* #2 - 두 번째 카드 (위로 올라감) */}
          <motion.div
            className="absolute left-0 top-[450px] z-20 flex h-[400px] w-full rounded-[40px] border border-borderStrong bg-secondaryForeground p-[48px]"
            style={{ y: secondBoxY, opacity: secondOpacity, scale: secondScale }}
          >
            <div className="flex flex-1 flex-col justify-center gap-[12px]">
              <p className="text-[30px] font-semibold leading-[36px]">다양한 프로모션 기능으로 <br />더 많은 고객을 이끌고,</p>
              <p className="text-[16px] font-normal leading-[24px] text-secondaryDefault">시간대별 변동 요금제, 날씨 기반 프로모션 등<br />단순 시스템 도입뿐만 아니라 마케팅까지 보조합니다.</p>
            </div>
            <div className="relative flex-1">
              <Image src="/images/v2/png/push-alert.png" alt="push" fill={true} className="scale-90 object-contain" />
            </div>
          </motion.div>

          {/* #3 */}
          <motion.div className="absolute left-0 top-[450px] z-30 flex h-[400px] w-full scale-[98%] rounded-[40px] border border-borderStrong bg-[#f4f8fc] p-[48px]"
            style={{ y: thirdBoxY, opacity: thirdOpacity, scale: thirdScale }}>
            <div className="flex flex-1 flex-col justify-center gap-[12px]">
              <p className="text-[30px] font-semibold leading-[36px]">KC 인증 설비들과 신속한 A/S로 <br />안심하고 운영할 수 있으니까.</p>
              <p className="text-[16px] font-normal leading-[24px] text-secondaryDefault">고장날까 걱정되고, 대응하기 어려운 기기 대신<br />워시펀의 안정적인 유지보수 서비스와 함께하세요.</p>
            </div>
            <div className="relative flex-1">
              <Image src="/images/v2/png/device.png" alt="device" fill={true} className="scale-90 object-contain" />
            </div>
          </motion.div>
          {/* #4 */}
          <motion.div className="absolute left-0 top-[450px] z-40 flex h-[400px] w-full scale-[99%] rounded-[40px] border border-borderStrong bg-white "
            style={{ y: fourthBoxY, opacity: fourthOpacity, scale: fourthScale }}>
            <div className="flex flex-1 flex-col justify-center gap-[12px] p-[48px]">
              <p className="text-[30px] font-semibold leading-[36px]">사용하기 쉬운 전용 앱으로<br />무인으로도 새로운 손님을 받고,</p>
              <p className="text-[16px] font-normal leading-[24px] text-secondaryDefault">워시펀은 단순 명료한 UI/UX를 갖춘 앱으로<br />워시펀을 전혀 모르는 사람도 쉽게 이용할 수 있어요.</p>
              <div className="mt-[40px] flex flex-col gap-[16px]">
                <div className=" flex items-center gap-[6px]">
                  <p className="text-[18px] font-medium  text-black">셀프 세차 이용 방법</p>
                  <Image src="/images/v2/svg/arrow-right-black.svg" alt="arrow" width={18} height={20} className="" />
                </div>
                <div className=" flex items-center gap-[6px]">
                  <p className="text-[18px] font-medium  text-black">자동 세차 이용 방법</p>
                  <Image src="/images/v2/svg/arrow-right-black.svg" alt="arrow" width={18} height={20} className="" />
                </div>
                <div className="flex items-center gap-[6px]">
                  <p className="text-[18px] font-medium  text-black">주유소 세차 이용 방법</p>
                  <Image src="/images/v2/svg/arrow-right-black.svg" alt="arrow" width={18} height={20} className="" />
                </div>
              </div>
            </div>
            <div className="relative flex flex-1 flex-col items-center justify-end overflow-hidden">
              <div className="absolute -bottom-5 left-0 size-full">
                <Image src="/images/v2/png/home-mock.png" alt="update" fill={true} className="scale-[90%] object-contain object-bottom" />
              </div>
            </div>
          </motion.div>
          {/* #5 */}
          <motion.div className="absolute left-0 top-[450px] z-50 flex h-[400px] w-full rounded-[40px] border border-borderStrong bg-secondaryForeground p-[48px]"
            style={{ y: fifthBoxY, opacity: fifthOpacity, scale: fifthScale }}>
            <div className="flex flex-1 flex-col justify-center gap-[12px]">
              <p className="text-[30px] font-semibold leading-[36px]">꼭 필요했던 점주용 시스템도 <br />첫 날부터 사용할 수 있으니까.</p>
              <p className="text-[16px] font-normal leading-[24px] text-secondaryDefault">워시펀은 고객만의 편리함을 추구하는 것이 아닌,<br />점주님의 더 편한 운영을 위해 관리 시스템도 기본 제공해요.</p>
            </div>
            <div className="relative flex-1">
              <Image src="/images/v2/png/banner.png" alt="banner" fill={true} className="scale-[80%] object-contain" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}