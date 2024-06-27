import Image from "next/image";

const PointService = () => {
  return (
    <div className="relative w-full h-screen  bg-gradient-to-b from-lightPrimary to-white text-black">
      <div className="flex flex-col justify-center items-center pt-24">
        <p className="text-5xl font-bold">기존 RFID 카드와 유사한</p>
        <div>
          <div>

          </div>
          <p className="text-5xl text-gradient font-bold pt-4">포인트 충전 기능</p>
        </div>
        <div className="flex flex-col items-center pt-10 text-gray">
          <p>현금이나 계좌 이체 후 점주 프로그램에서 포인트 충전</p>
          <p>집에서도 가능한 시공간 제약이 사라진 포인트 충전</p>
        </div>
      </div>
      <div className="flex justify-center items-center mt-16">
        <Image src="/images/png/point-mockup.png" alt="point" width={900} height={1000} quality={100} />
      </div>
    </div>
  )
}

export default PointService;