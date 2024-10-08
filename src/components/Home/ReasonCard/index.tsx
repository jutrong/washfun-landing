import Image from "next/image";

const ReasonCard = () => {
  return (
    <div className="flex h-screen flex-col px-52 font-Poppins text-black">
      <div className="mt-32 flex flex-col gap-5 ">
        <p className="text-3xl font-extrabold">Why Washfun </p>
        <p className="font-NotoSansKR text-xl font-normal text-gray">워시펀과 함께하세요.</p>
      </div>
      <div className="my-14 flex size-full gap-10 font-NotoSansKR ">
        <div className="flex h-full flex-1 flex-col  rounded-lg bg-[#F4F5F6]">
          <p className="ml-10 mt-8 text-lg font-medium text-primary">고객 만족도</p>
          <div className="mt-10 flex  justify-center  ">
            <Image src="/images/png/why1.png" alt="customer" width={300} height={200} className="rounded-full" />
          </div>
          <div className="mt-2 p-10">
            <p className="mb-7 text-center text-xl font-bold text-primary2">고객 만족도 97%, 재방문률 42%</p>
            <p className="text-center text-lg">다양한 세차 서비스를 하나의 플랫폼에서 제공하여 고객들에게 높은 편의성을 제공합니다. 셀프세차, 노터치 기계세차, 예약제 등 다양한 옵션을 통해 </p>
          </div>
        </div>
        <div className="flex h-full flex-1 flex-col  rounded-lg bg-[#F4F5F6]">
          <p className="ml-10 mt-8 text-lg font-medium text-primary">객단가 증가</p>
          <div className="mt-10 flex  flex-col items-center justify-center gap-4">
            <Image src="/images/png/why2.png" alt="customer" width={300} height={200} className="rounded-full" />
          </div>
          <div className="mt-2 p-10">
            <p className="mb-7 text-center text-xl font-bold text-primary2">고객 만족도 97%, 재방문률 42%</p>
            <p className="text-center text-lg">다양한 세차 서비스를 하나의 플랫폼에서 제공하여 고객들에게 높은 편의성을 제공합니다. 셀프세차, 노터치 기계세차, 예약제 등 다양한 옵션을 통해 </p>
          </div>
        </div>
        <div className="flex h-full flex-1 flex-col  rounded-lg bg-[#F4F5F6]">
          <p className="ml-10 mt-8 text-lg font-medium text-primary">유효 고객</p>
          <div className="mt-10 flex  justify-center ">
            <Image src="/images/png/why3.png" alt="customer" width={300} height={100} className="rounded-full" />
          </div>
          <div className="mt-2 p-10">
            <p className="mb-7 text-center text-xl font-bold text-primary2">고객 만족도 97%, 재방문률 42%</p>
            <p className="text-center text-lg">다양한 세차 서비스를 하나의 플랫폼에서 제공하여 고객들에게 높은 편의성을 제공합니다. 셀프세차, 노터치 기계세차, 예약제 등 다양한 옵션을 통해 </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReasonCard;
