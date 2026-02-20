"use client";

import { useCallback, useState } from "react";
import type { Swiper as SwiperType } from "swiper";

export function useSwiper() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSwiper = useCallback((swiper: SwiperType) => {
    setSwiper(swiper);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  const slideTo = useCallback(
    (index: number) => {
      swiper?.slideTo(index);
    },
    [swiper]
  );

  const slideNext = useCallback(() => {
    swiper?.slideNext();
  }, [swiper]);

  const slidePrev = useCallback(() => {
    swiper?.slidePrev();
  }, [swiper]);

  return {
    swiper,
    activeIndex,
    isBeginning,
    isEnd,
    handleSwiper,
    handleSlideChange,
    slideTo,
    slideNext,
    slidePrev,
  };
}
