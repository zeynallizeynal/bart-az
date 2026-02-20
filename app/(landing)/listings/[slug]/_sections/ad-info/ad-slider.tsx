"use client";

import { OptimizedImage } from "@/components/ui/image";
import { useSwiper } from "@/hooks/use-swiper";
import { usePathname } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import AdFullscreen from "../../../_components/ad-fullscreen";
import AdSliderThumbs from "../../../_components/ad-slider-thumbs";
import AdSliderButtons from "./ad-slider-buttons";
import { Listing } from "@/types/models/listing";

const fakeImages = [
  "/images/ad-slider/image0.png",
  "/images/ad-slider/image1.png",
  "/images/ad-slider/image2.png",
  "/images/ad-slider/image3.png",
  "/images/ad-slider/image4.png",
  "/images/ad-slider/image0.png",
  "/images/ad-slider/image1.png",
  "/images/ad-slider/image2.png",
  "/images/ad-slider/image3.png",
  "/images/ad-slider/image4.png",
  "/images/ad-slider/image0.png",
  "/images/ad-slider/image1.png",
  "/images/ad-slider/image2.png",
  "/images/ad-slider/image3.png",
  "/images/ad-slider/image4.png",
];

export default function AdSlider({
  data,
  editable,
}: {
  data: Listing;
  editable?: boolean;
}) {
  const {
    handleSwiper,
    handleSlideChange,
    activeIndex,
    isBeginning,
    isEnd,
    slideTo,
    slideNext,
    slidePrev,
  } = useSwiper();

  const pathname = usePathname();
  const isEditable = pathname.includes("edit") && editable;

  return (
    <>
      <div className="relative rounded-xl">
        <Swiper
          onSlideChange={handleSlideChange}
          onSwiper={handleSwiper}
          grabCursor
          slidesPerView={1}
          spaceBetween={16}
        >
          {data?.images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative md:h-136.5 h-63">
                <OptimizedImage
                  src={image.full_url}
                  alt={"image" + index}
                  className="object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <AdFullscreen data={data} initialSlide={activeIndex} />
        <AdSliderButtons
          handleNext={slideNext}
          handlePrev={slidePrev}
          isBeginning={isBeginning}
          isEnd={isEnd}
        />
        {/*<div className="absolute z-[1] bottom-4 inset-x-4 overflow-x-auto">*/}
        {/*  <ul className="text-background font-medium flex items-center gap-2 tracking-tight">*/}
        {/*    <li className="h-10 px-4 rounded-custom bg-gray-900/30 flex shrink-0 items-center gap-1 hover:bg-gray-900/40 transition">*/}
        {/*      <Image*/}
        {/*        src="/images/icons/fire.svg"*/}
        {/*        width={24}*/}
        {/*        height={24}*/}
        {/*        alt="Dəyərindən ucuz"*/}
        {/*        className="shrink-0"*/}
        {/*      />*/}
        {/*      Dəyərindən ucuz*/}
        {/*    </li>*/}
        {/*    <li className="h-10 px-4 shrink-0 rounded-custom bg-gray-900/30 flex items-center gap-1 hover:bg-gray-900/40 transition">*/}
        {/*      <Image*/}
        {/*        src="/images/icons/discount.png"*/}
        {/*        width={24}*/}
        {/*        height={24}*/}
        {/*        alt="Endirim ediləcək"*/}
        {/*        className="shrink-0"*/}
        {/*      />*/}
        {/*      Endirim ediləcək*/}
        {/*    </li>*/}
        {/*    <li className="h-10 px-4 shrink-0 rounded-custom bg-gray-900/30 flex items-center gap-1 hover:bg-gray-900/40 transition">*/}
        {/*      <Image*/}
        {/*        src="/images/icons/gift.png"*/}
        {/*        width={24}*/}
        {/*        height={24}*/}
        {/*        alt="Hədiyyəli məhsul"*/}
        {/*        className="shrink-0"*/}
        {/*      />*/}
        {/*      Hədiyyəli məhsul*/}
        {/*    </li>*/}
        {/*    <li className="h-10 px-4 shrink-0 rounded-custom bg-gray-900/30 flex items-center gap-1 hover:bg-gray-900/40 transition">*/}
        {/*      <Image*/}
        {/*        src="/images/icons/delivery.png"*/}
        {/*        width={24}*/}
        {/*        height={24}*/}
        {/*        alt="Çatdırılma"*/}
        {/*        className="shrink-0"*/}
        {/*      />*/}
        {/*      Çatdırılma*/}
        {/*    </li>*/}
        {/*  </ul>*/}
        {/*</div>*/}
      </div>
      <AdSliderThumbs
        data={data.images}
        isEditable={isEditable}
        slideTo={slideTo}
        activeIndex={activeIndex}
      />
    </>
  );
}
