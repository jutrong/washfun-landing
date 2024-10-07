/* eslint-disable tailwindcss/no-custom-classname */
import Image from "next/image";

const Benefit = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 bg-color py-20 text-black">
      <h2 className="mb-10 text-4xl font-bold tracking-widest">워시펀 가맹점 2024년 특별 혜택</h2>
      <div className="relative w-full">
        <svg className="absolute -top-20 left-0 w-full" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,50 C300,0 600,100 900,50 C1200,0 1440,100 1440,50 V100 H0 V50Z" fill="#F9FBFF" />
        </svg>
        <div className="flex w-full flex-col gap-10 bg-lightPrimary4 px-52 py-10 pt-20">
          <p className="ml-10 text-3xl font-semibold">마케팅 지원</p>
          <div className="cards my-10 flex w-full justify-between gap-10 ">
            <div className="card relative flex w-400px flex-col justify-between rounded-xl bg-white py-4 shadow-primary-shadow">
              <p className="py-4 pl-10 text-left text-2xl font-medium">블로그 홍보</p>
              <p className="absolute right-5 top-9 text-base font-medium text-red-500">130만원 상당</p>
              <div className="flex h-full items-center justify-center">
                <Image src="/images/png/naver-blog.png" alt="블로그 홍보" width={160} height={200} />
              </div>
            </div>
            <div className="card relative flex w-400px  flex-col justify-between rounded-xl bg-white py-4 shadow-primary-shadow">
              <p className="py-4 pl-10 text-left text-2xl font-medium">현수막, 스티커</p>
              <p className="absolute right-5 top-9 text-base font-medium text-red-500">130만원 상당</p>
              <div className="flex h-full items-center justify-center">
                <Image src="/images/png/naver-blog.png" alt="블로그 홍보" width={160} height={200} />
              </div>
            </div>
            <div className="card relative flex w-400px  flex-col justify-between rounded-xl bg-white py-4 shadow-primary-shadow">
              <p className="py-4 pl-10 text-left text-2xl font-medium">유튜브</p>
              <p className="absolute right-5 top-9 text-base font-medium text-red-500">~1000만원</p>
              <div className="flex h-full items-center justify-center">
                <Image src="/images/png/Youtube-logo.png" alt="블로그 홍보" width={140} height={200} />
              </div>
            </div>
          </div>
          <p className="ml-10 text-3xl font-semibold">도입 지원</p>
          <div className="cards my-10 flex w-full justify-between gap-10 ">
            <div className="card relative flex w-400px  flex-col justify-between rounded-xl bg-white py-4 shadow-primary-shadow">
              <p className="py-4 pl-10 text-left text-2xl font-medium">기기 할인</p>
              <p className="absolute right-5 top-9 text-base font-medium text-red-500">기존 매장 한정</p>
              <div className="flex h-full items-center justify-center">
                <Image src="/images/png/sale.png" alt="블로그 홍보" width={160} height={200} />
              </div>
            </div>
            <div className="card relative flex w-400px  flex-col justify-between rounded-xl bg-white py-4 shadow-primary-shadow">
              <p className="py-4 pl-10 text-left text-2xl font-medium">공유기</p>
              <p className="absolute right-5 top-9 text-base font-medium text-red-500">130만원 상당</p>
              <div className="flex h-full items-center justify-center">
                <Image src="/images/png/naver-blog.png" alt="블로그 홍보" width={160} height={200} />
              </div>
            </div>
            <div className="card relative flex w-400px  flex-col justify-between rounded-xl bg-white py-4 shadow-primary-shadow">
              <p className="py-4 pl-10 text-left text-2xl font-medium">라우터 무상지원</p>
              <p className="absolute right-5 top-9 text-base font-medium text-red-500">130만원 상당</p>
              <div className="flex h-full items-center justify-center">
                <Image src="/images/png/naver-blog.png" alt="블로그 홍보" width={160} height={200} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .cards {
          transition: 400ms;
        }
        .card {
          transition: 400ms;
        }
        .card:hover {
          transform: scale(1.04, 1.04);
        }
        .cards:hover > .card:not(:hover) {
          filter: blur(2px);
          transform: scale(0.9, 0.9);
        }
      `}</style>
    </div>
  )
}

export default Benefit;