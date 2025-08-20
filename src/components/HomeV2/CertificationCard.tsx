import Image from "next/image";

export default function CertificationCard() {
  return (
    <div className="mt-[200px] py-[120px] pb-0">
      <div>
        <p className="text-center text-[48px] font-bold">믿을 만한 솔루션<br />믿을 만한 팀이 만드니깐.</p>
      </div>
      <div className="mt-[64px] grid grid-cols-3 gap-[12px]">
        <div className="flex h-[300px] flex-col gap-[8px] rounded-[24px] border border-borderStrong bg-secondaryForeground p-[24px]">
          <p className="text-[16px] font-semibold leading-[24px] text-main">2023</p>
          <p className="text-[20px] font-medium leading-[28px] text-secondaryDefault">창업진흥원 주관<br />예비창업패키지 선정</p>
          <div className="relative h-[156px] w-full">
            <Image src="/images/v2/png/certification1.png" alt="certification" fill={true} className="scale-[60%] object-contain" />
          </div>
        </div>
        <div className="flex h-[300px] flex-col gap-[8px] rounded-[24px] border border-borderStrong bg-secondaryForeground p-[24px]">
          <p className="text-[16px] font-semibold leading-[24px] text-main">2024</p>
          <p className="text-[20px] font-medium leading-[28px] text-secondaryDefault">중소벤처기업진흥공단<br />청년창업사관학교 선정 및 졸업</p>
          <div className="relative h-[156px] w-full">
            <Image src="/images/v2/png/certification2.png" alt="certification" fill={true} className="scale-[70%] object-contain" />
          </div>
        </div>
        <div className="flex h-[300px] flex-col gap-[8px] rounded-[24px] border border-borderStrong bg-secondaryForeground p-[24px]">
          <p className="text-[16px] font-semibold leading-[24px] text-main">2023</p>
          <p className="text-[20px] font-medium leading-[28px] text-secondaryDefault">한국형 I-Corps<br />지원 기업 선정</p>
          <div className="relative h-[156px] w-full">
            <Image src="/images/v2/png/certification3.png" alt="certification" fill={true} className="scale-[70%] object-contain" />
          </div>
        </div>

        <div className="flex h-[300px] flex-col gap-[8px] rounded-[24px] border border-borderStrong bg-secondaryForeground p-[24px]">
          <p className="text-[16px] font-semibold leading-[24px] text-main">2024</p>
          <p className="text-[20px] font-medium leading-[28px] text-secondaryDefault">한국일보 주관<br />디지털 이노베이션 대상 수상</p>
          <div className="relative h-[156px] w-full">
            <Image src="/images/v2/png/certification4.png" alt="certification" fill={true} className="scale-[60%] object-contain" />
          </div>
        </div>
        <div className="flex h-[300px] flex-col gap-[8px] rounded-[24px] border border-borderStrong bg-secondaryForeground p-[24px]">
          <p className="text-[16px] font-semibold leading-[24px] text-main">2024</p>
          <p className="text-[20px] font-medium leading-[28px] text-secondaryDefault">세차장 관리 및 데이터 분석 등<br />특허 4건 등록</p>
          <div className="relative h-[156px] w-full">
            <Image src="/images/v2/png/certification5.png" alt="certification" fill={true} className="scale-[60%] object-contain" />
          </div>
        </div>
        <div className="flex h-[300px] flex-col gap-[8px] rounded-[24px] border border-borderStrong bg-secondaryForeground p-[24px]">
          <p className="text-[16px] font-semibold leading-[24px] text-main">2024</p>
          <p className="text-[20px] font-medium leading-[28px] text-secondaryDefault">워시펀 자체 상표 및 <br />화면 디자인권 등록</p>
          <div className="relative h-[156px] w-full">
            <Image src="/images/v2/png/certification5.png" alt="certification" fill={true} className="scale-[60%] object-contain" />
          </div>
        </div>

        <div className="flex h-[300px] cursor-pointer flex-col gap-[8px] rounded-[24px] border border-borderStrong bg-white p-[24px]">
          <div className="flex items-start justify-between">
            <p className="text-[20px] font-medium leading-[28px] text-secondaryDefault">"셀프 세차장 결제 불편함 등 <br />해소 솔루션 출시"</p>
            <Image src="/images/v2/svg/arrow-right-up.svg" alt="arrow" width={36} height={36} className="scale-[100%] object-contain" />
          </div>
          <div className="relative h-[156px] w-full">
            <Image src="/images/v2/png/certification6.png" alt="certification" fill={true} className="scale-[40%] object-contain" />
          </div>
        </div>
        <div className="flex h-[300px] cursor-pointer flex-col gap-[8px] rounded-[24px] border border-borderStrong bg-white p-[24px]">
          <div className="flex items-start justify-between">
            <p className="text-[20px] font-medium leading-[28px] text-secondaryDefault">"셀프 세차장 결제 불편함 등 <br />해소 솔루션 출시"</p>
            <Image src="/images/v2/svg/arrow-right-up.svg" alt="arrow" width={36} height={36} className="scale-[100%] object-contain" />
          </div>
          <div className="relative h-[156px] w-full">
            <Image src="/images/v2/png/certification7.png" alt="certification" fill={true} className="scale-[40%] object-contain" />
          </div>
        </div>
        <div className="flex h-[300px] cursor-pointer flex-col gap-[8px] rounded-[24px] border border-borderStrong bg-white p-[24px]">
          <div className="flex items-start justify-between">
            <p className="text-[20px] font-medium leading-[28px] text-secondaryDefault">"셀프 세차장 결제 불편함 등 <br />해소 솔루션 출시"</p>
            <Image src="/images/v2/svg/arrow-right-up.svg" alt="arrow" width={36} height={36} className="scale-[100%] object-contain" />
          </div>
          <div className="relative h-[156px] w-full">
            <Image src="/images/v2/png/certification8.png" alt="certification" fill={true} className="scale-[60%] object-contain" />
          </div>
        </div>
      </div>

    </div>
  )
}
