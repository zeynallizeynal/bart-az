"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { cn } from "@/lib/utils";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
  gap?: number;
};

type CarouselProperties = {
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollSnaps?: number[];
  onPaginate: (index: number) => void;
  selectedScrollSnap?: number;
  scrollProgress: number;
  slideNodes: HTMLElement[];
  slidesNotInView: number[];
  slidesInView: number[];
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
} & CarouselProperties &
  CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

function Carousel({
  children,
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,

  ...props
}: Omit<React.ComponentProps<"div">, "children"> &
  CarouselProps & {
    children:
      | ((props: CarouselProperties) => React.ReactNode)
      | React.ReactNode;
  }) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins,
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);
  const [selectedScrollSnap, setSelectedScrollSnap] = React.useState<
    number | undefined
  >(undefined);
  const [scrollProgress, setScrollProgress] = React.useState<number>(0);
  const [slideNodes, setSlideNodes] = React.useState<HTMLElement[]>([]);
  const [slidesNotInView, setSlidesNotInView] = React.useState<number[]>([]);
  const [slidesInView, setSlidesInView] = React.useState<number[]>([]);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
    setSelectedScrollSnap(api.selectedScrollSnap());
    setScrollProgress(api.scrollProgress());
    setSlideNodes(api.slideNodes());
    setSlidesNotInView(api.slidesNotInView());
    setSlidesInView(api.slidesInView());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  const onPaginate = React.useCallback(
    (index: number) => {
      if (!api) return;
      api.scrollTo(index);
    },
    [api],
  );

  const carouselProperties = {
    scrollPrev,
    scrollNext,
    canScrollPrev,
    canScrollNext,
    scrollSnaps,
    onPaginate,
    scrollProgress,
    selectedScrollSnap,
    slideNodes,
    slidesNotInView,
    slidesInView,
  };

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    setScrollSnaps(api.scrollSnapList());

    onSelect(api);

    const onInit = () => {
      setScrollSnaps(api.scrollSnapList());
      onSelect(api);
    };

    api.on("reInit", onInit);
    api.on("select", onInit);

    api.on("scroll", () => {
      setScrollProgress(api.scrollProgress());
    });

    return () => {
      api?.off("select", onInit);
      api?.off("reInit", onInit);
      api?.off("scroll", () => setScrollProgress(api.scrollProgress()));
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        ...carouselProperties,
      }}
    >
      <div
        tabIndex={0}
        onKeyDownCapture={handleKeyDown}
        className={cn(
          "relative h-full outline-none overflow-hidden",
          className,
        )}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {typeof children === "function"
          ? children({ ...carouselProperties })
          : children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef } = useCarousel();

  return (
    <div
      ref={carouselRef}
      data-slot="carousel-content"
      className="overflow-hidden grow"
    >
      <div className={cn("flex", className)} {...props} />
    </div>
  );
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn("min-w-0 shrink-0 grow-0 basis-full relative", className)}
      {...props}
    />
  );
}

function CarouselScrollbar({ ...props }: React.ComponentProps<"div">) {
  const { scrollProgress } = useCarousel();
  const [scrollbarWidth, setScrollbarWidth] = React.useState<number>(0);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useLayoutEffect(() => {
    if (ref.current) {
      setScrollbarWidth(ref.current.clientWidth);
    }
  }, []);

  const maxTranslate = scrollbarWidth - 100;
  const translateX =
    Math.max(0, Math.min(1, scrollProgress)) *
    (maxTranslate > 0 ? maxTranslate : 0);

  return (
    <div data-slot="carousel-scrollbar" ref={ref} {...props}>
      <div
        data-slot="carousel-scrollbar-thumb"
        className="h-full"
        style={{
          width: `${100}px`,
          transform: `translateX(${translateX}px)`,
        }}
      />
    </div>
  );
}

function CarouselPrevious({
  children,
  className,
  ...props
}: React.ComponentProps<"button">) {
  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <button
      data-slot="carousel-previous"
      className={cn(
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      {React.isValidElement(children) ? (
        children
      ) : (
        <LuChevronLeft className="size-6" />
      )}
      <span className="sr-only">Previous slide</span>
    </button>
  );
}

function CarouselNext({
  children,
  className,
  ...props
}: React.ComponentProps<"button">) {
  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <button
      data-slot="carousel-next"
      className={cn(
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      {React.isValidElement(children) ? (
        children
      ) : (
        <LuChevronRight className="size-6" />
      )}

      <span className="sr-only">Next slide</span>
    </button>
  );
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselScrollbar,
  useCarousel,
};
