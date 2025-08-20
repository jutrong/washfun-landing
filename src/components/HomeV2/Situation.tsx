'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMemo, useRef } from 'react';

type Face = {
  title1: string;
  title2?: string;
  icon: string;
  body: string;
  bg: string;
  fg: string;
};

type CardCopy = { front: Face; back: Face };

const COPIES: CardCopy[] = [
  {
    front: {
      title1: '세차는 날 잡아서',
      title2: '가끔 하는 정도에요.',
      icon: '/images/v2/svg/double-quotes.svg',
      body:
        '세차를 완전 자주 하기는 좀 그렇죠. 힘들기도 하고, 부담이 전혀 없을 정도로 저렴한 것도 아닌데, 굳이 내 차가 매일같이 깨끗해야 하나요?',
      bg: 'bg-secondaryForeground',
      fg: 'text-black',
    },
    back: {
      title1: '성수기와 비수기의',
      title2: '불규칙적인 매출이 걱정되시나요?',
      icon: '/images/v2/svg/bar-chart-fill.svg',
      body: '계절을 많이 타는 세차장의 특성상, 기존의 방식으로는 성수기와 비수기라는 불가항력인 영향으로부터 벗어날 수 없습니다.',
      bg: 'bg-black',
      fg: 'text-white',
    },
  },
  {
    front: {
      title1: '안 그래도 자주 더러워지는데,',
      title2: '비싼 돈 주고 해야 하잖아요.',
      icon: '/images/v2/svg/double-quotes.svg',

      body:
        '실내 세차까지 하면 적어도 6~8만 원은 내야 하는데, 이걸 어떻게 자주 하나요.. 너무 비싸서 중요한 일 있기 전에만 한 번씩 합니다.',
      bg: 'bg-secondaryForeground',
      fg: 'text-black',
    },
    back: {
      title1: '더 이상 올리기 힘든,',
      title2: '객단가의 한계를 마주하셨나요?',
      icon: '/images/v2/svg/receipt-fill.svg',

      body: '시간이 지나면 끊기는 세차 기기와 현금을 더 투입하기 꺼리는 고객. 지금의 설비는 고객이 돈을 더 적게 쓰도록 만들어 버립니다.',
      bg: 'bg-black',
      fg: 'text-white',
    },
  },
  {
    front: {
      title1: '세차는 주유하고 나서',
      title2: '대충 하면 되는거지..',
      icon: '/images/v2/svg/double-quotes.svg',

      body:
        '그냥 주유소에서 자동세차 쓰면 끝 아닌가요? 전 여기에 왜 이렇게 신경을 쓰는지 모르겠어요.',
      bg: 'bg-secondaryForeground',
      fg: 'text-black',
    },
    back: {
      title1: '방문하는 고객 풀을',
      title2: '더 확장하기가 어려우신가요?',
      icon: '/images/v2/svg/user-fill.svg',

      body: '압도적인 차별성과 경쟁력이 없다면, 내 세차장은 결국 동네 사람들만 방문하는 동네 세차장에 안주해야 합니다.',
      bg: 'bg-black',
      fg: 'text-white',
    },
  },
];

const seg = (t: number, a: number, b: number) => (t <= a ? 0 : t >= b ? 1 : (t - a) / (b - a));

export default function Situation() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const ranges = useMemo<[number, number][]>(() => {
    return [
      [0.00, 0.30],
      [0.35, 0.65],
      [0.70, 1.00],
    ];
  }, []);

  const textProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const textContent = useTransform(textProgress, (progress) => {
    return progress > 0.5 ? '매장' : '고객';
  });

  return (
    <section ref={sectionRef} className="relative h-300vh">
      {/* sticky로 한 화면에 고정 */}
      <div className="sticky top-0 flex min-h-screen items-center">
        <div className="w-full py-[80px]">
          {/* 헤더 */}
          <div className="mb-16 flex flex-col items-center justify-center gap-4">
            <p className="text-[20px] font-medium text-secondaryDefault">점주님들의 고민은 워시펀의 고민</p>
            <div className="text-center">
              <p className="text-[48px] font-bold leading-tight">점주님의 {' '}
                <motion.span
                  key={textContent.get()}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, }}
                >
                  {textContent}
                </motion.span>은
              </p>
              <p className="text-[48px] font-bold leading-tight">지금 어떤 모습인가요?</p>
            </div>
          </div>

          {/* 카드들 */}
          <div
            className="mt-8 flex w-full items-stretch justify-between gap-3 px-4"
            style={{ perspective: '1200px' }}
          >
            {COPIES.map((c, i) => (
              <FlipCard
                key={i}
                index={i}
                range={ranges[i]}
                scrollYProgress={scrollYProgress}
                copy={c}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FlipCard({
  index,
  range,
  scrollYProgress,
  copy,
}: {
  index: number;
  range: [number, number];
  scrollYProgress: any;
  copy: CardCopy;
}) {
  // 이 카드의 국소 진행도(0~1)
  const local = useTransform(scrollYProgress, [0, 1], [0, 1]);
  // 0→1에서 0°→180° 회전 (가운데서 90°, 앞/뒤 전환지점)
  const rotateY = useTransform(local, (t) => seg(t, range[0], range[1]) * 180);
  // 플립 중에 살짝 위로/확대(넘어가는 느낌)
  const y = useTransform(local, (t) => -10 * seg(t, range[0], range[1]));
  const z = useTransform(local, (t) => 1 + 1 * seg(t, range[0], range[1]));

  return (
    <motion.div
      className="relative h-[400px] flex-1 rounded-[24px] will-change-transform"
      style={{
        transformStyle: 'preserve-3d',
        rotateY,
        y,
        zIndex: 1 + index,
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 28, mass: 0.6 }}
      aria-label="flip-card"
      role="group"
    >
      {/* 앞면 */}
      <div
        className={`absolute inset-0 rounded-[24px] p-6 ${copy.front.bg} ${copy.front.fg} border border-black/0`}
        style={{
          backfaceVisibility: 'hidden',
          transform: 'translateZ(1px)',
        }}
      >
        <FaceContent face={copy.front} />
      </div>

      {/* 뒷면 (반대로 뒤집어 배치) */}
      <div
        className={`absolute inset-0 rounded-[24px] p-6 ${copy.back.bg} ${copy.back.fg}`}
        style={{
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg) translateZ(1px)',
        }}
      >
        <FaceContent face={copy.back} dark />
      </div>
    </motion.div>
  );
}

function FaceContent({ face, dark = false }: { face: Face; dark?: boolean }) {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col gap-3">
        <Image
          src={face.icon}
          alt="quote"
          width={36}
          height={36}
          style={{ objectFit: 'cover' }}
        />
        <p className="text-[24px] font-semibold leading-[32px]">
          {face.title1}
          {face.title2 && (
            <>
              <br />
              {face.title2}
            </>
          )}
        </p>
      </div>
      <p
        className={`text-[18px] leading-[28px] ${dark ? 'text-white/80' : 'text-secondaryDefault'
          }`}
      >
        {face.body}
      </p>
    </div>
  );
}