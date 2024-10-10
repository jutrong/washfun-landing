import Image from "next/image";

const ReasonCard = () => {
  return (
    <div className="flex flex-col px-52 font-Poppins text-black xl:px-0">
      <div className="mt-32 flex flex-col gap-5 xl:px-10">
        <p className="font-PoppinsExtraBold text-3xl">Why Washfun </p>
        <p className="font-NotoSansKR text-xl font-normal text-gray">왜 워시펀을 선택해야 할까요?</p>
      </div>
      <div className="my-14 mt-20 flex size-full flex-col gap-36 px-14 font-NotoSansKR md:gap-10 md:px-0 ">
        <div className="flex h-full flex-1 flex-col  rounded-lg  ">
          <p className="ml-10 mt-8 text-2xl font-bold  text-gray">고객 만족도</p>
          <div className="mt-10 flex items-center md:flex-col md:justify-start  ">
            <div className=" flex flex-[3] items-center justify-center ">
              <Image src="/images/png/why1.png" alt="customer" width={400} height={200} className="rounded-[50px] shadow-primary-shadow md:rounded-[10px]" />
            </div>
            <div className=" flex-[4] p-10 ">
              <div className="flex flex-col gap-8 pl-16 text-left text-lg md:pl-0">
                <div>
                  <p className="pb-2 text-xl font-bold text-primary2">No 현금 ! No 회원 카드 !</p>
                  <p className="text-gray">앱을 통해 간편하게 결제할 수 있어, 충전 문제나 포인트 부족으로 인한 불편함이 사라집니다. </p>
                </div>
                <div>
                  <p className="pb-2 text-xl font-bold text-primary2">체계적이고 합리적인 요금 체계</p>
                  <p className="text-gray">초 단위 결제 시스템으로 사용한 만큼만 비용을 지불하고, 불필요한 낭비를 막을 수 있습니다. 시간에 쫓길 필요 없이 세차를 완벽하게 마칠 수 있다는 점에서 높은 만족도를 유지하고 있습니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="mr-10 mt-8 text-right text-2xl font-bold text-gray">객단가 증가</p>
          <div className="flex h-full  flex-1 flex-col rounded-lg  bg-[#f4f5f641] py-10 md:px-0">
            <div className=" flex flex-row-reverse items-center md:flex-col">
              <div className=" flex flex-[3] items-center justify-center ">
                <Image src="/images/png/why2.png" alt="customer" width={400} height={200} className="rounded-[50px] shadow-primary-shadow md:rounded-[10px]" />
              </div>
              <div className=" flex-[4] p-10">
                <div className="flex flex-col gap-8 text-left text-lg">
                  <div>
                    <p className="pb-2 text-xl font-bold text-primary2">객단가 증가를 통한 매출 상승 가능성!</p>
                    <p className="text-gray">후불제는 고객이 필요한 만큼 시간을 자유롭게 사용할 수 있어, 추가 사용량이 자연스럽게 늘어납니다. 실제 데이터에 따르면, 워시펀 도입 후 약 5%의 사용량 증가가 발생했습니다. 이로 인해 객단가가 상승하고, 점주의 수익이 극대화될 수 있습니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-full flex-1 flex-col  rounded-lg ">
          <p className="ml-10 mt-8 text-2xl font-bold  text-gray">유효 고객</p>
          <div className="mt-10 flex items-center md:flex-col md:justify-start">
            <div className=" flex flex-[3] items-center justify-center ">
              <Image src="/images/png/why3.png" alt="customer" width={400} height={200} className="rounded-[50px] shadow-primary-shadow md:rounded-[10px]" />
            </div>
            <div className=" flex-[4] p-10">
              {/* <p className="mb-7 text-left text-xl font-bold text-primary2">고객 만족도 97%, 재방문률 42%</p> */}
              <div className="flex flex-col gap-8 text-left text-lg">
                <div>
                  <p className="pb-2 text-xl font-bold text-primary2">예약제의 장점</p>
                  <p className="text-gray">예약제 서비스를 사용하는 고객 중 24.9%가 자유롭게 기능을 사용할 수 있어서 예약제를 선호합니다. 그중 68.9%는 예약제가 비싸다고 느낍니다.<br /> 워시펀은 초 단위로 기능을 자유롭게 사용할 수 있기 때문에, 이 고객들은 워시펀의 강력한 잠재 고객이 됩니다. 즉, 기존보다 더 많은 고객이 점주님의 세차장을 선택할 가능성이 큽니다. </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <p className="mr-10 mt-8 text-right text-2xl font-bold text-gray">효율적인 매장 관리</p>
          <div className="flex h-full  flex-1 flex-col rounded-lg  bg-[#f4f5f641] py-10">
            <div className=" flex flex-row-reverse items-center md:flex-col">
              <div className=" flex flex-[3] items-center justify-center ">
                <Image src="/images/png/way4.jpg" alt="customer" width={400} height={200} className="rounded-[50px] shadow-primary-shadow md:rounded-[10px]" />
              </div>
              <div className=" flex-[4] p-10">
                <div className="flex flex-col gap-8 text-left text-lg">
                  <div>
                    <p className="pb-2 text-xl font-bold text-primary2">매장 관리 부담 감소</p>
                    <p className="text-gray">회원 카드 충전이나 잔액 부족 문제로 발생하는 민원이 줄어들기 때문에, 특히 야간 시간대에 점주의 관리 부담이 크게 감소합니다. 또한, 워시펀의 실시간 원격 관리 시스템을 통해 매장을 언제 어디서든 모니터링하고 관리할 수 있어, 매장의 운영 효율성이 크게 향상됩니다.</p>
                  </div>
                  <div>
                    <p className="pb-2 text-xl font-bold text-primary2">데이터 기반 매장 분석</p>
                    <p className="text-gray">세차 데이터를 기반으로 각 고객의 사용 패턴을 분석하여, 어느 시간이 가장 붐비는지, 어떤 기능이 많이 사용되는지를 쉽게 파악할 수 있습니다. 이를 통해 점주는 매출을 극대화할 전략을 세우고, 운영 효율성을 높일 수 있는 맞춤형 관리가 가능합니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReasonCard;
