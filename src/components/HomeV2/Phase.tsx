import Image from "next/image";

export default function Phrase() {
  return (
    <div className="relative flex flex-col items-center justify-self-center py-[120px]">
      {/* 헤더 */}
      <div className="flex flex-col items-center justify-center gap-[16px]">
        <p className="text-[20px] font-medium text-secondaryDefault">세차장 디지털 솔루션, 워시펀</p>
        <p className="text-center text-[48px] font-bold">
          이제 고객의 일상에<br /> 내 세차장을 초대하세요.
        </p>
      </div>

      {/* 카드 묶음  */}
      <div className="relative mt-[64px] flex w-full max-w-[720px] flex-col gap-[60px] overflow-hidden  px-4">
        {/* === 연결선 SVG === */}
        <svg
          className="pointer-events-none absolute inset-0 z-0 sm:inset-[-40px] "
          viewBox="0 0 100 120"
          preserveAspectRatio="xMidYMid meet"
          style={{ transform: 'translateZ(0)' }}
        >
          {/* 점선(도트) */}
          <path
            d="M50 4 
           C 10 24, 90 36, 50 54 
           S 10 84, 50 96"
            fill="none"
            stroke="currentColor"
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className="connector-path"
            strokeWidth={3.2}
            strokeLinecap="square"
            strokeLinejoin="miter"
            vectorEffect="non-scaling-stroke"
            strokeDasharray="2 10"
            style={{ opacity: 0.2, animation: 'connector-march 1.5s linear infinite' }}
            strokeDashoffset={0}
          />
        </svg>

        {/* === 카드 === */}
        <div className="relative z-10 -rotate-2 rounded-[24px] bg-secondaryForeground px-[24px] py-[16px] text-center">
          <p className="text-[24px] font-semibold">커피를 사듯, 저절로 생각나는 세차!</p>
          <Image src="/images/v2/svg/coffee.svg" alt="coffee" quality={100} unoptimized={true} priority={true} width={48} height={48} className="absolute -left-4 top-1/2 -translate-y-1/2" />
        </div>
        <div className="z-10 rotate-2 rounded-[24px] bg-secondaryForeground px-[24px] py-[16px] text-center">
          <p className="text-[24px] font-semibold">합리적이고 부담 없는 세차!</p>
          <Image src="/images/v2/svg/money.svg" alt="coffee" quality={100} unoptimized={true} priority={true} width={48} height={48} className="absolute right-6 top-1/2 -translate-y-1/2" />

        </div>
        <div className="z-10 -rotate-2 rounded-[24px] bg-secondaryForeground px-[24px] py-[16px] text-center">
          <p className="text-[24px] font-semibold">고객의 습관에 스며드는 세차!</p>
          <Image src="/images/v2/svg/running.svg" alt="coffee" quality={100} unoptimized={true} priority={true} width={48} height={48} className="absolute -left-0 top-1/2 -translate-y-1/2" />

        </div>

        <style jsx global>{`
          .connector-path {
            opacity: 0.1;
            will-change: stroke-dashoffset;
            animation: connector-march 1.5s linear infinite;
          }
          @keyframes connector-march {
            from { stroke-dashoffset: 0; }
            to   { stroke-dashoffset: -12; }
          }

          /* (선택) 사용자가 '감소된 모션' 선호 시 애니메이션 비활성화 */
          @media (prefers-reduced-motion: reduce) {
            .connector-path { animation: none !important; }
          }
        `}</style>
      </div>
    </div>
  );
}