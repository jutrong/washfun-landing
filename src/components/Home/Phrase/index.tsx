'use client'
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const phrases = [
  "실물 카드보다 간편 결제 비중이 높은 시대",
  "편의점 카드 결제 비중 80% 돌파!",
  "글로벌 평균 현금 결제 비율 16%",
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
    <div className="relative flex h-screen flex-col items-center justify-start  bg-gradient-to-b  from-lightPrimary  to-white py-20 pt-52 text-black md:py-40 sm:py-28">
      <div className="flex flex-col items-center justify-start gap-6 px-4 md:gap-10 md:px-8 sm:gap-8 sm:px-6">
        <AnimatePresence mode="wait">
          <div className="z-10 rounded-sm p-2 px-3 shadow-sm md:px-5 sm:p-3 sm:px-4">
            <motion.h2
              key={currentPhrase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center text-xl font-bold tracking-widest text-gray md:text-3xl sm:text-base"
            >
              {phrases[currentPhrase]}
            </motion.h2>
          </div>
        </AnimatePresence>
        <h3 className="z-10 text-center text-4xl font-semibold md:text-2xl">
          현금은 고객의 <span className="tracking-widest text-primary2">불편함</span>입니다.
        </h3>
      </div>
      <div className="mt-20">
        <iframe src="https://lottie.host/embed/542775e7-346c-4d43-95fe-bdb9b36a4ff0/DKEb9ZCwnR.json"></iframe>
      </div>
      <div className="absolute left-1/2 top-[74%]  size-[1200px] -translate-x-1/2 -translate-y-1/2 opacity-60 md:top-[60%] md:size-[340px]">
        <iframe src="https://lottie.host/embed/9c567868-ef12-4438-8d6b-be9e852490a7/mOq39H2moK.json" className="size-full"></iframe>
      </div>

    </div >
  )
}

export default Phrase;