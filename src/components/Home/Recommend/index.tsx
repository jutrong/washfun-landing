import Image from "next/image";

const Recommend = () => {
  return (
    <div className="mb-40 flex flex-col px-52 font-Poppins text-black xl:mb-20 xl:px-0 md:px-4">
      <div className="mt-24 flex flex-col gap-5 xl:px-10 ">
        <p className="font-PoppinsExtraBold text-3xl">Who Washfun </p>
        <p className="font-NotoSansKR text-xl font-normal text-gray">이런 분들께 워시펀을 추천합니다.</p>
      </div>
      <div className=" mt-28 flex size-full items-start justify-start gap-20 font-NotoSansKR xl:justify-center">
        <div className="flex items-center gap-44 xl:flex-col xl:items-center xl:gap-14">
          <div className=" flex justify-center  ">
            <Image src="/images/png/recommend.png" alt="recommend1" width={500} height={500} />
          </div>
          <div className="flex flex-col gap-14">
            <div className="flex items-start gap-5">
              <div className="rounded-full bg-lightPrimary p-3">
                <Image src="/images/png/card2.png" alt="recommend1" width={32} height={30} />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xl"><span className="font-bold">회원카드 재주문</span>을 해야 하는 점주님 </p>
                <p className="text-sm text-gray">
                  워시펀은 회원 카드를 사용하지 않습니다.
                  <br />

                  매 년 발생하는 카드 제작 비용으로 워시펀을 도입하세요!
                </p>
              </div>
            </div>
            <div className="flex items-start gap-5">
              <div className="rounded-full bg-lightPrimary p-3">
                <Image src="/images/png/triangle.png" alt="recommend1" width={30} height={30} />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xl "><span className="font-bold">코인박스가 낡아서 교체</span>를 고민하시는 점주님 </p>
                <p className="text-sm text-gray">
                  기기 교체, 이왕 돈 쓰는거  워시펀으로 경쟁력도 확보하세요!
                </p>
              </div>
            </div>
            <div className="flex items-start gap-5">
              <div className="rounded-full bg-lightPrimary p-3">
                <Image src="/images/png/pos.png" alt="recommend1" width={30} height={30} />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xl "><span className="font-bold">직원관리용 포스 시스템</span>을 도입하려고 고민하시는 점주님 </p>
                <p className="text-sm text-gray">
                  포스 시스템 따로 설치하고 돈내지마시고 포스와 시스템까지 한 번에 구축하세요!
                </p>
              </div>
            </div>
            <div className="flex items-start gap-5">
              <div className="rounded-full bg-lightPrimary p-3">
                <Image src="/images/png/headphone.png" alt="recommend1" width={30} height={30} />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xl "><span className="font-bold">매장 무인화</span>를 위해 키오스크 도입을 고민하시는 점주님 </p>
                <p className="text-sm text-gray">
                  수 백만 원 하는 키오스크 하나 설치하는 것 보다 워시펀 하나로 무인화와 매장관리, 직원 관리까지 원 큐에 해결하세요!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommend;
