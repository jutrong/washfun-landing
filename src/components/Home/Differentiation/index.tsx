import Image from "next/image";

const Differentiation = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 bg-color p-20  text-black">
      <div className="flex w-full justify-center">
        <h2 className="text-[50px] font-normal">워시펀은 다른 세차장과의 <span className="text-gradient tracking-wider">차이</span>를 만듭니다.</h2>
      </div>
      <div className="flex w-full flex-col gap-10">
        <div className="mb-12 flex w-full justify-center ">
          <div className="mt-20 flex h-full flex-col  ">
            <div className="flex h-1/2 w-full justify-center">
              <Image src="/images/png/difference1.png" alt="" width={900} height={1000} />
            </div>
            <div className="flex h-1/2 w-full flex-col items-center  gap-3 pb-32  pt-10">
              <p className="text-4xl font-semibold">셀프세차, 노터치 기계세차, 예약제</p>
              <p className="text-3xl font-medium">모두를 하나의 플랫폼으로 !</p>
              <p className="text-2xl font-medium text-gray">셀프세차부터 예약제 노터치 세차까지, 편리함의 새로운 기준</p>
              <p className="">
                (노터치, 예약제 서비스는 2025년 제공 예정)
              </p>
            </div>
          </div>
        </div>
        <div className="flex  w-full justify-end ">
          <div className="flex size-full items-center     ">
            <div className="flex h-1/2 w-full justify-center gap-16 pb-10">
              <Image src="/images/png/iphone1.png" alt="" width={200} height={600} className="object-contain" />
              <Image src="/images/png/iphone2.png" alt="" width={200} height={600} className="object-contain" />
              <Image src="/images/png/iphone3.png" alt="" width={200} height={600} className="object-contain" />
            </div>
            <div className="relative flex h-1/2 w-full flex-col items-center  gap-3  pt-0">
              <p className="text-4xl font-semibold">복잡한 타플랫폼과 달리</p>
              <p className="text-3xl font-medium">모든 연령대가 편하게 사용가능한</p>
              <p className="text-2xl font-medium text-gray">UX / UI</p>
            </div>
          </div>
        </div>

        <div className="flex w-full justify-start ">
          <div className="flex size-full flex-row-reverse items-center pt-20  ">
            <div className="flex h-1/2 w-full justify-center">
              <Image src="/images/png/iot2.png" alt="" width={440} height={1000} className="object-contain" />
            </div>
            <div className="flex h-1/2 w-full flex-col items-end  gap-3   ">
              <p className="text-4xl font-semibold">IoT 기기를 통한 고객별 데이터 수집으로</p>
              {/* <p className="text-3xl font-medium">고객별 데이터 수집으로</p> */}
              <p className="text-2xl font-medium text-gray">체계적인 매장관리 지원 !</p>

            </div>
          </div>
        </div>
        <div className="flex  w-full justify-end ">
          <div className="flex size-full items-center  py-20 ">
            <div className="flex h-1/2 w-full  justify-center gap-16 ">
              <Image src="/images/png/cost.png" alt="" width={400} height={600} className="object-contain" />
            </div>
            <div className="relative flex h-1/2 w-full flex-col items-start  gap-3  pt-0">
              <p className="pb-4 text-4xl font-semibold">저렴한 도입 비용</p>
              <p className="text-2xl font-medium text-gray">1. 기존 대비 30% 저렴한 신규 도입 비용</p>
              <p className="text-2xl font-medium text-gray">2. 카드 제작, 카드 단말기 설치, 키오스크 설치와 유사한 기기 도입 비용</p>
            </div>
          </div>
        </div>
        <div className=" flex w-full justify-center rounded-3xl py-10 shadow-primary-shadow ">
          <div className="flex h-full w-3/4 items-center">
            <div className="flex h-1/2 w-full items-center justify-center ">
              <Image src="/images/png/cycle.png" alt="" width={220} height={500} />
            </div>
            <div className="ml-10 flex h-1/2 w-full flex-col items-start gap-3 pl-10">
              <p className="text-4xl font-semibold">차종, 오염도, 세차 성향 등</p>
              <p className="text-3xl font-medium">각자에게 필요한 만큼 1초단위로 사용하는</p>
              <p className="text-2xl font-medium text-gray">후불 결제 시스템!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Differentiation;