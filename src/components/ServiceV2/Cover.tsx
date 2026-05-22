import Image from "next/image";

export default function Cover() {
  return (
    <div className="flex h-screen w-full items-start justify-center px-4 pt-[200px] lg:pt-[120px]">
      <div className="relative flex max-w-[720px] flex-col gap-[16px] text-balance">
        <p className="text-center text-[20px] font-medium leading-[28px] text-secondaryDefault lg:text-[14px]">워시펀 점주용 대시보드</p>
        <h1 className="text-center text-[60px] font-bold text-black lg:text-[28px] lg:leading-[1.3]">클릭 몇 번으로 끝내는 <br className="md:hidden" />세차장 관리 시스템</h1>
        <p className="text-center text-[16px] leading-[26px] text-secondaryDefault lg:text-[13px] lg:leading-[20px]">매출·고객·기기 모니터링을 한 화면에서.<br className="md:hidden" />세차장 무인 운영을 위한 점주용 시스템.</p>
        <Image src="/images/v2/svg/sketching.svg" alt="세차장 관리 대시보드 일러스트" width={148} height={148} className="absolute -left-14 -top-14 -z-10 object-cover md:hidden" />
      </div>
    </div>
  )
}