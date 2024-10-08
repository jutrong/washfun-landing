'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Reason = () => {
  const [highlightedText, setHighlightedText] = useState('선택하는');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      console.log(scrollPosition);
      if (scrollPosition > 8000) {
        setHighlightedText('도입하는');
      } else if (scrollPosition > 7500) {
        setHighlightedText('주목하는');
      } else if (scrollPosition > 6700) {
        setHighlightedText('선택하는');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-400vh w-full bg-gradient-to-b from-white to-lightPrimary text-black">
      <div className="sticky left-0 top-0 flex h-screen w-full items-center justify-center">
        <h2 className="text-center text-[50px] font-normal">
          워시펀을 {' '}
          <AnimatePresence mode="wait">
            <motion.span
              key={highlightedText}
              className="text-gradient inline-block font-bold"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {highlightedText}
            </motion.span>
          </AnimatePresence>
          {' '} 이유
        </h2>
      </div>
    </div>
  );
};

export default Reason;
