import Image from "next/image";
import { RefObject } from "react";


const ServiceData = ({ element }: { element: RefObject<HTMLDivElement> }) => {
  return (
    <div className="relative h-300vh w-full" ref={element}>
      <div className="sticky top-0 z-20 h-[120vh] w-full md:h-screen">
        <div className="flex flex-col items-center gap-4 p-24 pb-10 text-6xl font-bold text-black md:p-10 md:pt-56 md:text-2xl">
          <p>매출,고객 수 등 <span className="text-gradient">다양한 데이터</span>를</p>
          <p>한 눈에 확인하세요.</p>
          <div className="flex flex-col items-center text-base font-normal text-gray  md:text-sm">
            <p>데이터 수집과 분석으로 일별, 월별, 시간별, 베이별 매출</p>
            <p>재방문 횟수, 일별, 월별, 시간별 방문자 수 확인</p>
          </div>
        </div>
        <div className="item-center mb-14 flex justify-center">
          <Image src="/images/png/dashboard-mockup.png" alt="dashboard" width={800} height={580} quality={100} className="md:w-500px" />
        </div>
      </div>
      <div className="absolute right-0 top-1/4 -z-10 md:-right-0">
        <Image src="/images/png/sales.png" width={600} height={180} alt="sale background text" />
      </div>
      <div className="-z-9 absolute bottom-96 left-0 md:bottom-28 ">
        <Image src="/images/png/customers.png" width={800} height={200} alt="sale background text" />
      </div>
      <div className="-z-9 absolute left-0 top-2/4 md:-left-0">
        <Image src="/images/png/data-text.png" width={500} height={200} alt="sale background text" />
      </div>
      <div className="-z-9 absolute -right-0 top-3/4 md:-right-0">
        <Image src="/images/png/revenue-text.png" width={500} height={200} alt="sale background text" />
      </div>
      <div className="absolute bottom-0 left-0 -z-10 h-2/3 w-full">
        <Image src="/images/png/frame.png" fill={true} alt="frame" />
      </div>
    </div>
  )
}

export default ServiceData;