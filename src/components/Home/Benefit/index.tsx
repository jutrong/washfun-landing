/* eslint-disable tailwindcss/no-custom-classname */
import Image from "next/image";

const Benefit = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 bg-color py-20 font-NotoSansKR text-black">
      <h2 className=" font-OneMobilePOP text-4xl tracking-widest">2024년 특별 혜택</h2>
      <div className="relative w-full">
        <svg className="absolute -top-20 left-0 w-full" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,50 C300,0 600,100 900,50 C1200,0 1440,100 1440,50 V100 H0 V50Z" fill="#F9FBFF" />
        </svg>
        <div className="flex w-full flex-col gap-20 bg-lightPrimary4 px-40 py-10 pt-20">
          <div>
            <p className="pl-10 text-3xl font-semibold">마케팅 지원</p>
            <div className="my-10 flex w-full justify-between gap-10 ">
              <div className="card relative flex w-[420px] flex-col justify-between rounded-lg bg-white py-4 shadow-primary-shadow">
                <p className="py-4 pl-10 text-left text-xl font-medium">블로그 홍보</p>
                <p className="absolute bottom-3 right-5 text-base font-medium text-red-500">130만원 상당</p>
                <div className="flex h-[180px] items-center justify-center opacity-90">
                  <Image src="/images/png/naver-blog.png" alt="블로그 홍보" width={160} height={200} />
                </div>
              </div>
              <div className="card relative flex w-[420px]  flex-col justify-between rounded-lg bg-white py-4 shadow-primary-shadow">
                <p className="py-4 pl-10 text-left text-xl font-medium">현수막 및 안내 스티커 제작 지원</p>
                <p className="absolute bottom-3 right-5 text-base font-medium text-red-500">50만원 상당</p>
                <div className="flex h-[180px] items-center justify-center opacity-90">
                  <Image src="/images/png/banner.png" alt="현수막 및 안내 스티커 제작 지원" width={240} height={200} />
                </div>
              </div>
              <div className="card relative flex w-[420px]  flex-col justify-between rounded-lg bg-white py-4 shadow-primary-shadow">
                <p className="py-4 pl-10 text-left text-xl font-medium">유튜브 홍보(쇼츠, 영상)</p>
                <p className="absolute bottom-3 right-5 text-base font-medium text-red-500">~1000만원</p>
                <div className="flex h-[180px] items-center justify-center opacity-70">
                  <Image src="/images/png/Youtube-logo.png" alt="유튜브 홍보" width={130} height={200} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="pl-10 text-3xl font-semibold">도입 지원</p>
            <div className=" my-10 flex w-full justify-between gap-10 ">
              <div className="card relative flex w-[420px]  flex-col justify-between rounded-lg bg-white py-4 shadow-primary-shadow">
                <p className="py-4 pl-10 text-left text-xl font-medium">기기 할인</p>
                <p className="absolute bottom-3 right-5 z-10 text-base font-medium text-red-500">기존 매장 한정</p>
                <div className="flex h-[180px]  items-center justify-center pr-6 opacity-90">
                  <Image src="/images/png/sale-tag2.png" alt="기기 할인" width={240} height={200} />
                </div>
              </div>
              <div className="card relative flex w-[420px]  flex-col justify-between rounded-lg bg-white py-4 shadow-primary-shadow">
                <p className="py-4 pl-10 text-left text-xl font-medium">와이파이 공유기 무상 설치</p>
                <p className="absolute bottom-3 right-5 text-base font-medium text-red-500">20만원 상당</p>
                <div className="flex h-[180px] items-center justify-center opacity-90">
                  <Image src="/images/png/wifi.jpg" alt="공유기" width={200} height={200} />
                </div>
              </div>
              <div className="card relative flex w-[420px]  flex-col justify-between rounded-lg bg-white py-4 shadow-primary-shadow">
                <p className="py-4 pl-10 text-left text-xl font-medium">LTE 라우터 무상 지원</p>
                <p className="absolute bottom-3 right-5 text-base font-medium text-red-500">180만원 상당 (필요에 따라)</p>
                <div className="flex h-[180px] items-center justify-center opacity-90">
                  <Image src="/images/png/router.jpg" alt="블로그 홍보" width={180} height={200} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <svg className="absolute -bottom-20 left-0 w-full" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,50 C300,100 600,0 900,50 C1200,100 1440,0 1440,50 V0 H0 V50Z" fill="#F9FBFF" />
        </svg>
      </div>
      <style jsx>{`
        .cards {
          transition: 600ms;
        }
        .card {
          transition: 600ms;
        }
        .card:hover {
          transform: scale(1.03, 1.03);
        }
        .cards:hover > .card:not(:hover) {
          filter: blur(2px);
          transform: scale(0.95, 0.95);
        }
      `}</style>
    </div >
  )
}

export default Benefit;