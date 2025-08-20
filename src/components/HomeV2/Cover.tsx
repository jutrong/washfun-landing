import Image from "next/image";

export default function Cover() {
  return (
    <div className="h-screen w-full bg-white" >

      {/* Content */}
      <div className="relative flex h-[720px] w-full flex-col items-center justify-center rounded-[40px] bg-gradient-to-b from-secondaryForeground to-[#D2E3F1]">
        <div className="flex flex-col items-center justify-center">
          <p className="text-[60px] font-bold">
            세차를 일상으로
          </p>
          <div className=" flex items-center justify-center gap-[8px]">
            <div className="mb-2 flex items-center justify-center">
              <Image src="/images/v2/svg/add-circle-fill.svg" alt="car" width={64} height={64} style={{ objectFit: "cover" }} />
            </div>
            <p className="text-[60px] font-bold">
              초대하다.
            </p>
          </div>
        </div>

        <div className="mt-[16px] flex flex-col items-center justify-center gap-[6px]">
          <p className="text-[18px] font-normal text-secondaryDefault">후불제 기반 셀프 세차부터</p>
          <p className="text-[18px] font-normal text-secondaryDefault">자동 세차는 물론, 구독제 시스템까지.</p>
        </div>

        <Image src="/images/v2/png/cover-car.png" alt="cover" width={2000} height={2000} style={{ objectFit: "cover" }} className="absolute  bottom-0 left-0" />
      </div>
    </div >
  )
}