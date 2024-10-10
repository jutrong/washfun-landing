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
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-lightPrimary to-white  py-40 text-black">
      <div className="flex flex-col items-center justify-center gap-10 ">
        <AnimatePresence mode="wait">
          <div className=" rounded-sm p-3 px-5 shadow-sm">
            <motion.h2
              key={currentPhrase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold tracking-widest text-gray"
            >
              {phrases[currentPhrase]}
            </motion.h2>
          </div>
        </AnimatePresence>
        <h3 className="text-5xl font-semibold">현금은 고객의 <span className="tracking-widest text-primary2">불편함</span>입니다.</h3>
      </div>
      <div className="mt-28  flex items-center justify-center rounded-xl shadow-2xl">
        <Image src="/images/png/globalGraph2.png" alt="globalGraph" width={1000} height={400} className="w-[1100px]" />
      </div>
    </div>
  )
}

export default Phrase;