import Image from "next/image";

export default function Cover() {
  return (
    <div className="flex h-screen w-full items-start justify-center pt-[200px]">
      <div className="relative flex flex-col gap-[16px]">
        <p className="text-center text-[20px] font-medium leading-[28px] text-secondaryDefault">워시펀 점주용 대시보드</p>
        <h1 className="text-center text-[60px] font-bold text-black lg:text-[32px]">클릭 몇 번으로 끝내는 <br />세차장 관리 시스템</h1>
        <p className="text-center text-[16px] leading-[26px] text-secondaryDefault">매출·고객·기기 모니터링을 한 화면에서. 세차장 무인 운영을 위한 워시펀 점주용 시스템.</p>
        <Image src="/images/v2/svg/sketching.svg" alt="세차장 관리 대시보드 일러스트" width={148} height={148} className="absolute -left-14 -top-14 -z-10 object-cover" />
      </div>
    </div>
  )
}