import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Banner() {
  const router = useRouter()
  return (
    <div className="mt-[200px]">
      <div className="group relative h-[426px] w-full cursor-pointer overflow-hidden rounded-[20px]">
        {/* 이미지를 맨 뒤로 */}
        <Image
          src="/images/v2/png/banner.jpg"
          alt="banner"
          width={1920}
          height={1080}
          className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* 검은색 오버레이 */}
        <div className="absolute left-0 top-0 z-10 size-full bg-black opacity-70" />

        {/* 텍스트와 버튼 */}
        <div className="absolute left-0 top-0 z-20 flex size-full flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-[16px]">
            <p className="text-center text-[48px] font-bold text-white">이젠, 고민보단 <br />행동이 필요할 때.</p>
            <p className="text-center text-[20px] font-normal leading-[28px] text-[#C4C7CC]">이미 수 많은 매장들이 구독제를 도입하고<br /> 내년을 준비하고 있습니다.</p>
          </div>
          <button className="mt-[32px] rounded-[999px] bg-white px-[24px] py-[12px] text-[16px] font-semibold leading-[18px] text-black" onClick={() => router.push('/contact')}>워시펀 도입 문의하기</button>
        </div>
      </div>
    </div>
  )
}