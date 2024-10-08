import Image from "next/image";

const Recommend = () => {
  return (
    <div className="flex h-screen flex-col px-52 font-Poppins text-black">
      <div className="mt-24 flex flex-col gap-5 ">
        <p className="text-3xl font-extrabold">Who Washfun </p>
        <p className="font-NotoSansKR text-xl font-normal text-gray">이런 분들께 워시펀을 추천합니다.</p>
      </div>
      <div className=" mt-28 flex size-full items-start justify-start gap-20 font-NotoSansKR">
        <div className="flex items-center gap-32">
          <div className=" flex justify-center ">
            <Image src="/images/png/recommend.png" alt="recommend1" width={500} height={500} />
          </div>
          <div className="flex flex-col gap-14">
            <div className="flex items-center gap-4">
              <Image src="/images/png/card2.png" alt="recommend1" width={30} height={30} />
              <p className="text-xl"><span className="font-bold">회원카드 재주문</span>을 해야 하는 점주님 </p>
            </div>
            <div className="flex items-center gap-4">
              <Image src="/images/png/triangle.png" alt="recommend1" width={30} height={30} />
              <p className="text-xl "><span className="font-bold">코인박스가 낡아서 교체</span>를 고민하시는 점주님 </p>
            </div>
            <div className="flex items-center gap-4">
              <Image src="/images/png/pos.png" alt="recommend1" width={30} height={30} />
              <p className="text-xl "><span className="font-bold">직원관리용 포스 시스템</span>을 도입하려고 고민하시는 점주님 </p>
            </div>
            <div className="flex items-center gap-4">
              <Image src="/images/png/headphone.png" alt="recommend1" width={30} height={30} />
              <p className="text-xl "><span className="font-bold">매장 무인화</span>를 위해 키오스크 도입을 고민하시는 점주님 </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommend;
