import Image from "next/image";
import { RefObject } from "react";


const ServiceData = ({ element }: { element: RefObject<HTMLDivElement> }) => {
  return (
    <div className="relative w-full h-[300vh]" ref={element}>
      <div className="sticky top-0 w-full h-[120vh] z-20 md:h-[100vh]">
        <div className="text-black text-6xl flex flex-col items-center gap-4 p-24 font-bold pb-10 md:text-2xl md:p-10 md:pt-56">
          <p>매출,고객 수 등 <span className="text-gradient">다양한 데이터</span>를</p>
          <p>한 눈에 확인하세요.</p>
          <div className="font-normal text-gray text-base flex flex-col items-center  md:text-sm">
            <p>데이터 수집과 분석으로 일별, 월별, 시간별, 베이별 매출</p>
            <p>재방문 횟수, 일별, 월별, 시간별 방문자 수 확인</p>
          </div>
        </div>
        <div className="flex justify-center item-cente mb-14">
          <Image src="/images/png/dashboard-mockup.png" alt="dashboard" width={800} height={580} quality={100} className="md:w-[500px]" />
        </div>
      </div>
      <div className="absolute top-1/4 right-0 -z-10 md:-right-0">
        <Image src="/images/png/sales.png" width={600} height={180} alt="sale background text" />
      </div>
      <div className="absolute bottom-96 left-0 -z-9 md:bottom-28 ">
        <Image src="/images/png/customers.png" width={800} height={200} alt="sale background text" />
      </div>
      <div className="absolute top-2/4 left-0 -z-9 md:-left-0">
        <Image src="/images/png/data-text.png" width={500} height={200} alt="sale background text" />
      </div>
      <div className="absolute top-3/4 -right-0 -z-9 md:-right-0">
        <Image src="/images/png/revenue-text.png" width={500} height={200} alt="sale background text" />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-2/3 -z-10">
        <Image src="/images/png/frame.png" fill={true} alt="frame" />
      </div>
    </div>
  )
}

export default ServiceData;