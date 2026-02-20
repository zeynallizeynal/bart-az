import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "@/components/icons/others";
import React from "react";

export function StoriesCarouselButtons({
  isEnd,
  isBeginning,
  handleNext,
  handlePrev,
}: CarouselButtons) {
  return (
    <>
      <AnimatePresence>
        {!isEnd && (
          <motion.button
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0,
            }}
            transition={{
              damping: 50,
              stiffness: 100,
              duration: 0.2,
            }}
            className='absolute z-10 size-10 bg-gray-100 md:flex hidden items-center justify-center rounded-full hover:bg-gray-200 transition top-[var(--size)] -right-4'
            onClick={handleNext}
          >
            <ChevronRight size={24} />
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!isBeginning && (
          <motion.button
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0,
            }}
            transition={{
              damping: 50,
              stiffness: 100,
              duration: 0.2,
            }}
            className='absolute z-10 size-10 bg-gray-100 md:flex hidden items-center justify-center rounded-full hover:bg-gray-200 transition top-[var(--size)] -left-4'
            onClick={handlePrev}
          >
            <ChevronLeft size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
