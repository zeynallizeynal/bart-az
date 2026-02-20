import { ChevronLeft, ChevronRight } from "bartaz-icons";
import { AnimatePresence, motion } from "framer-motion";

export default function AdSliderButtons({
  handleNext,
  handlePrev,
  isBeginning,
  isEnd,
}: CarouselButtons) {
  return (
    <>
      <AnimatePresence>
        {!isBeginning && (
          <motion.button
            initial={{
              opacity: 0,
            }}
            exit={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            aria-label="geri"
            className="absolute z-[1] center transition top-1/2 -translate-y-1/2 md:left-4 left-2 md:size-12 size-10 md:text-2xl text-xl rounded-full bg-gray-900/50 hover:bg-gray-900 text-background group"
            onClick={handlePrev}
          >
            <ChevronLeft className="group-hover:scale-125 transition group-active:scale-105" />
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!isEnd && (
          <motion.button
            initial={{
              opacity: 0,
            }}
            exit={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            aria-label="irəli"
            className="absolute z-[1] center transition top-1/2 -translate-y-1/2 md:right-4 right-2 md:size-12 size-10 md:text-2xl text-xl rounded-full bg-gray-900/50 hover:bg-gray-900 text-background group"
            onClick={handleNext}
          >
            <ChevronRight className="group-hover:scale-125 transition group-active:scale-105" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
