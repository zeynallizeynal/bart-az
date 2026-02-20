import MaskNumber from "@/components/ad-actions/mask-number";
import ButtonLink from "@/components/button-link";
import { OptimizedImage } from "@/components/ui/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSwiper } from "@/hooks/use-swiper";
import { formatCurrency } from "@/utils/currency.util";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ChevronLeft, ChevronRight, XClose } from "bartaz-icons";
import { Store } from "lucide-react";
import React from "react";
import { GoScreenFull } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import AdSliderThumbs from "./ad-slider-thumbs";
import { Listing } from "@/types/models/listing";

export default function AdFullscreen({
  data,
  initialSlide,
}: {
  data: Listing;
  initialSlide: number;
}) {
  const {
    handleSwiper,
    handleSlideChange,
    activeIndex,
    slideTo,
    slideNext,
    slidePrev,
  } = useSwiper();

  React.useEffect(() => {
    slideTo(initialSlide);
  }, [initialSlide, slideTo]);

  return (
    <Dialog>
      <DialogTrigger
        className="absolute z-1 group center md:right-4 md:top-4 top-2 right-2 md:size-12 size-10 md:text-2xl text-xl rounded-xl bg-gray-900/50 hover:bg-gray-900 text-background"
        aria-label="Enter fullscreen"
      >
        <GoScreenFull className="group-hover:scale-125 transition group-active:scale-105" />
      </DialogTrigger>
      <DialogContent
        overlayProps={{
          className: "backdrop-blur bg-black/90",
        }}
        className="size-full flex flex-col gap-3"
      >
        <VisuallyHidden>
          <DialogDescription>See ad in full screen</DialogDescription>
        </VisuallyHidden>
        <DialogHeader className="rounded-b-xl bg-gray-50 max-w-full w-full px-4 h-16 space-x-0">
          <div className="flex items-center justify-between font-medium text-base w-full">
            <div className="flex items-center gap-5">
              <DialogTitle className="text-base m-0 font-medium">
                {data.name}
              </DialogTitle>
              <div className="h-5 w-px bg-gray-400" />
              {formatCurrency(1000)}
            </div>
            <div className="flex items-center gap-5">
              <MaskNumber
                number="+99451 458 68 06"
                className="**:data-show-number-text:hidden [&_svg]:size-5 h-10 md:flex hidden"
              />
              <ButtonLink
                href="/stores/1"
                size="sm"
                className="md:flex! hidden!"
              >
                <Store size={20} />
                Mağazaya keç
              </ButtonLink>
              <DialogClose className="text-xl hover:bg-gray-200 size-8 text-gray-800 shrink-0 center rounded-lg">
                <XClose />
              </DialogClose>
            </div>
          </div>
        </DialogHeader>
        <div className="relative grow">
          <button
            className="absolute top-1/2 -translate-y-1/2 left-0 text-background md:text-3xl text-2xl md:w-16 md:h-24 w-12 h-20 center bg-transparent hover:bg-gray-800 rounded-r-xl z-10"
            onClick={slidePrev}
          >
            <ChevronLeft />
          </button>
          <button
            className="absolute top-1/2 -translate-y-1/2 right-0 text-background md:text-3xl text-2xl md:w-16 md:h-24 w-12 h-20 center bg-transparent hover:bg-gray-800 rounded-l-xl z-10"
            onClick={slideNext}
          >
            <ChevronRight />
          </button>
          <div className="size-full px-4">
            <Swiper
              onSlideChange={handleSlideChange}
              onSwiper={handleSwiper}
              grabCursor
              slidesPerView={1}
              spaceBetween={16}
              className="size-full"
            >
              {data.images.map((image, index) => (
                <SwiperSlide key={index} className="size-full">
                  <div className="relative size-full">
                    <OptimizedImage
                      src={image.full_url}
                      alt={"image" + index}
                      className="object-contain h-full"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="bg-background rounded-t-xl center px-4">
          <AdSliderThumbs
            data={data.images}
            isEditable={false}
            slideTo={slideTo}
            activeIndex={activeIndex}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
