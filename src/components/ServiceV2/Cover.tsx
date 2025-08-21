import Image from "next/image";

export default function Cover() {
  return (
    <div className="flex h-screen w-full items-start justify-center pt-[200px]">
      <div className="relative flex flex-col gap-[16px]">
        <p className="text-center text-[20px] font-medium leading-[28px] text-secondaryDefault">워시펀 점주용 대시보드</p>
        <p className="text-center text-[60px] font-bold  text-black">클릭 몇 번으로 끝내는 <br />내 세차장 관리</p>
        <Image src="/images/v2/svg/sketching.svg" alt="service-cover" width={148} height={148} className="absolute -left-14 -top-14 -z-10 object-cover" />
      </div>
    </div>
  )
}