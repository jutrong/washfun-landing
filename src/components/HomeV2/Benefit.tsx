import Image from "next/image"

export default function Benefit() {
  return (
    <div className="mt-[200px] py-[120px]">
      <div className="flex flex-col items-center gap-[16px]">
        <p className="text-center text-[48px] font-bold lg:text-[30px]">이렇게 좋은 워시펀, <br />내 세차장에 맞을까요?</p>
        <p className="text-center text-[20px] font-normal leading-[28px] text-secondaryDefault lg:text-[16px]">솔루션은 좋아보이지만, 도입은 고민되시나요? <br />내 매장에도 잘 맞는지 확인해보세요!</p>
      </div>
      <div className="mx-auto mt-[64px] max-w-[1440px] px-[12px] lg:hidden">
        <div className="grid grid-cols-3 grid-rows-6 gap-[12px]">
          <div className="flex h-[282px] items-end justify-end rounded-[24px] border border-borderStrong p-[24px] transition-transform duration-300 ease-in-out hover:scale-[102%]">
            <Image src="/images/v2/svg/arrow-right-down.svg" alt="benefit-1" width={64} height={64} />
          </div>
          <div className="col-span-2 flex h-[282px] items-end rounded-[24px] bg-secondaryForeground p-[24px] transition-transform duration-300 ease-in-out hover:scale-[102%]">
            <p className="text-[30px] font-semibold leading-[36px]">매장이 일반적이지 않아도 문제 없어요.<br />원하는 기능만 골라서 합리적으로 도입해보세요.</p>
          </div>
          <div className="flex h-[282px] flex-col justify-between rounded-[24px] border bg-black p-[24px] transition-transform duration-300 ease-in-out hover:scale-[102%]">
            <Image src="/images/v2/svg/check-line.svg" alt="benefit-1" width={28} height={28} />
            <p className="text-[24px] font-medium leading-[32px] text-white">정기 구독 기반<br />자동 세차 시스템</p>
          </div>
          <div className="flex h-[282px] flex-col justify-between rounded-[24px] border bg-black p-[24px] transition-transform duration-300 ease-in-out hover:scale-[102%]">
            <Image src="/images/v2/svg/check-line.svg" alt="benefit-1" width={28} height={28} />
            <p className="text-[24px] font-medium leading-[32px] text-white">후불제 자동 결제<br />셀프 세차 시스템</p>
          </div>
          <div className="flex h-[282px] flex-col justify-between rounded-[24px] border bg-black p-[24px] transition-transform duration-300 ease-in-out hover:scale-[102%]">
            <Image src="/images/v2/svg/check-line.svg" alt="benefit-1" width={28} height={28} />
            <p className="text-[24px] font-medium leading-[32px] text-white">포인트 자동 충전<br />현금 키오스크</p>
          </div>
          <div className="col-span-2 flex h-[282px] items-end justify-end rounded-[24px] bg-secondaryForeground p-[24px] transition-transform duration-300 ease-in-out hover:scale-[102%]">
            <p className="text-[30px] font-semibold leading-[36px]">시스템을 위해 모든 기기를 다 바꿀 순 없죠.<br />이미 설치된 기기에 필요한 것만 도입하세요.</p>
          </div>
          <div className="relative h-[282px] overflow-hidden rounded-[24px] border border-borderStrong p-[24px] transition-transform duration-300 ease-in-out hover:scale-[102%]">
            <Image src="/images/v2/png/device1.png" alt="device1" fill={true} className="scale-[76%] object-contain object-center" />
            <div className="absolute left-1/2 top-1/2 -z-10 h-[400px] w-[2px] bg-[#C4C7CC]" />
          </div>
          <div className="relative row-span-2 h-[576px] rounded-[24px] border border-dashed border-borderStrong p-[24px] transition-transform duration-300 ease-in-out hover:scale-[102%]">
            <Image src="/images/v2/png/device4.png" alt="device4" fill={true} className="scale-[76%] object-contain" />
          </div>
          <div className="relative h-[282px] overflow-hidden rounded-[24px] border border-borderStrong p-[24px] transition-transform duration-300 ease-in-out hover:scale-[102%]">
            <Image src="/images/v2/png/device3.png" alt="device3" fill={true} className="scale-[76%] object-contain" />
            <div className="absolute left-1/2 top-1/2 -z-10 h-[2px] w-[240px] rotate-0 bg-[#C4C7CC]" />
          </div>
          <div className="relative flex h-[282px] rounded-[24px] border border-borderStrong transition-transform duration-300 ease-in-out hover:scale-[102%]">
            <Image src="/images/v2/png/device2.png" alt="device2" fill={true} className="scale-[76%] object-contain" />
            <div className="absolute left-1/2 top-0 -z-10 h-[200px] w-[2px] bg-[#C4C7CC]" />
            <div className="absolute left-0 top-1/2 -z-10 h-[2px] w-[140px] rotate-0 bg-[#C4C7CC]" />
          </div>
          <div className="col-span-2 flex h-[282px] items-end rounded-[24px] bg-secondaryForeground p-[24px] transition-transform duration-300 ease-in-out hover:scale-[102%]">
            <p className="text-[30px] font-semibold leading-[36px]">고객에게 갑작스러운 혼란은 그만,<br />기존 RF카드 및 키오스크를 유지하며 전환해보세요.</p>
          </div>
          <div className="col-span-2 flex h-[282px] items-end rounded-[24px] bg-secondaryForeground p-[24px] transition-transform duration-300 ease-in-out hover:scale-[102%]">
            <p className="text-[30px] font-semibold leading-[36px]">직영, 가맹, 개인 운영 세차장<br />어떠한 세차장이라도 제한 없이 도입 가능해요.</p>
          </div>
          <div className="relative h-[282px] rounded-[24px] transition-transform duration-300 ease-in-out hover:scale-[102%]">
            <Image src="/images/v2/png/image1.png" alt="image" fill={true} className="scale-[100%] rounded-[24px] object-cover" />
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="mx-auto mt-[64px] hidden max-w-[1440px] px-[12px] lg:block">
        <div className="grid grid-cols-2 grid-rows-5 gap-[12px]">
          <div className="col-span-2 flex h-[160px] flex-col items-start justify-between gap-[8px] rounded-[24px] bg-secondaryForeground p-[16px] transition-transform duration-300 ease-in-out hover:scale-[102%]">
            <p className="text-[18px] font-semibold leading-[28px]">매장이 일반적이지 않아도 문제 없어요.<br />원하는 기능만 골라서<br /> 합리적으로 도입해보세요.</p>
            <Image src="/images/v2/svg/arrow-down-line.svg" alt="benefit-1" width={34} height={34} />
          </div>
          <div className="flex h-[160px] flex-col justify-between rounded-[24px] border bg-black p-[16px] transition-transform duration-300 ease-in-out hover:scale-[102%]">
            <Image src="/images/v2/svg/check-line.svg" alt="benefit-1" width={28} height={28} />
            <p className="text-[16px] font-medium leading-[24px] text-white">정기 구독 기반<br />자동 세차 시스템</p>
          </div>
          <div className="flex h-[160px] flex-col justify-between rounded-[24px] border bg-black p-[16px] transition-transform duration-300 ease-in-out hover:scale-[102%]">
            <Image src="/images/v2/svg/check-line.svg" alt="benefit-1" width={28} height={28} />
            <p className="text-[16px] font-medium leading-[24px] text-white">후불제 자동 결제<br />셀프 세차 시스템</p>
          </div>

          <div className="col-span-2 flex h-[160px] items-end justify-end rounded-[24px] bg-secondaryForeground p-[16px] transition-transform duration-300 ease-in-out hover:scale-[102%]">
            <p className="text-[18px] font-semibold leading-[28px]">시스템을 위해 모든 기기를 다 바꿀 순 없죠.<br />이미 설치된 기기에 필요한 것만 도입하세요.</p>
          </div>
          <div></div>

          <div className="relative h-[160px] overflow-hidden rounded-[24px] border border-borderStrong p-[16px] transition-transform duration-300 ease-in-out hover:scale-[102%]">
            <Image src="/images/v2/png/device1.png" alt="device1" fill={true} className="scale-[76%] object-contain object-center" />
            <div className="absolute left-1/2 top-1/2 -z-10 h-[400px] w-[2px] bg-[#C4C7CC]" />
          </div>
          <div className="relative h-[160px] overflow-hidden rounded-[24px] border border-borderStrong p-[16px] transition-transform duration-300 ease-in-out hover:scale-[102%]">
            <Image src="/images/v2/png/device3.png" alt="device3" fill={true} className="scale-[76%] object-contain" />
            <div className="absolute left-1/2 top-1/2 -z-10 h-[2px] w-[240px] rotate-0 bg-[#C4C7CC]" />
          </div>
          <div className="relative flex h-[160px] rounded-[24px] border border-borderStrong transition-transform duration-300 ease-in-out hover:scale-[102%]">
            <Image src="/images/v2/png/device2.png" alt="device2" fill={true} className="scale-[76%] object-contain" />
            <div className="absolute left-1/2 top-0 -z-10 h-[80px] w-[2px] bg-[#C4C7CC]" />
            <div className="absolute left-0 top-1/2 -z-10 h-[2px] w-[140px] rotate-0 bg-[#C4C7CC]" />
          </div>
          <div className="col-span-2 flex h-[160px] items-end rounded-[24px] bg-secondaryForeground p-[16px] transition-transform duration-300 ease-in-out hover:scale-[102%]">
            <p className="text-[18px] font-semibold leading-[28px]">고객에게 갑작스러운 혼란은 그만,<br />기존 RF카드 및 키오스크를 유지하며<br /> 전환해보세요.</p>
          </div>
          <div className="relative col-span-2 h-[160px] rounded-[24px] border border-dashed border-borderStrong transition-transform duration-300 ease-in-out hover:scale-[102%]">
            <Image src="/images/v2/png/image2.png" alt="device4" fill={true} className="mt-4 scale-[80%] object-contain object-center" />
          </div>
          <div className="col-span-2 flex h-[160px] items-end rounded-[24px] bg-secondaryForeground p-[16px] transition-transform duration-300 ease-in-out hover:scale-[102%]">
            <p className="text-[18px] font-semibold leading-[28px]">직영, 가맹, 개인 운영 세차장<br />어떠한 세차장이라도<br />제한 없이 도입 가능해요.</p>
          </div>
        </div>
      </div>
    </div>
  )
}