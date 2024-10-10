import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const phrases = [
  "실물 카드보다 간편 결제 비중이 높은 시대",
  "편의점 카드 결제 비중 80% 돌파!",
  "글로벌 평균 현금 결제 비율 16%, 한국은 10%",
];

const Phrase = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b  from-lightPrimary  to-white py-20 text-black md:py-40 sm:py-28">
      <div className="flex flex-col items-center justify-center gap-6 px-4 md:gap-10 md:px-8 sm:gap-8 sm:px-6">
        <AnimatePresence mode="wait">
          <div className="rounded-sm p-2 px-3 shadow-sm md:px-5 sm:p-3 sm:px-4">
            <motion.h2
              key={currentPhrase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center text-xl font-bold tracking-widest text-gray md:text-3xl sm:text-lg"
            >
              {phrases[currentPhrase]}
            </motion.h2>
          </div>
        </AnimatePresence>
        <h3 className="text-center text-3xl font-semibold md:text-5xl sm:text-3xl">
          현금은 고객의 <span className="tracking-widest text-primary2">불편함</span>입니다.
        </h3>
      </div>
      <div className="mt-16 flex items-center justify-center rounded-xl px-4 shadow-2xl md:mt-28 md:px-8 sm:mt-20 sm:px-6 sm:shadow-none">
        <Image
          src="/images/png/globalGraph2.png"
          alt="globalGraph"
          width={1100}
          height={400}
          className="w-full max-w-[1100px]"
        />
      </div>
    </div>
  )
}

export default Phrase;