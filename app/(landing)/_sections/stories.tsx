"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import Story from "@/app/(landing)/_components/story";
import { StoriesCarouselButtons } from "@/components/carousel-buttons";
import { useSwiper } from "@/hooks/use-swiper";
import { Keyboard } from "swiper/modules";

export const fakeUsers = [
  {
    user: "Alice",
    stories: [
      {
        title: "Hövsanda torpaq satılır",
        ad: {
          href: "/",
          name: "Example Ad",
          date: "Bakı, 21 sentyabr 2024",
          price: "$1000",
          image: "/images/image0.png",
        },
      },
      {
        title: "Kia Sorento 2020, 2.2 motor",
        ad: {
          href: "/",
          name: "Example Ad",
          date: "Bakı, 21 sentyabr 2024",
          price: "$2000",
          image: "/images/image0.png",
        },
      },
    ],
  },
  {
    user: "Bob",
    stories: [
      {
        title: "Amin Əmlak daşınmaz lorem",
        ad: {
          href: "/",
          name: "Example Ad",
          date: "Bakı, 21 sentyabr 2024",
          price: "$3000",
          image: "/images/image0.png",
        },
      },
      {
        title: "Samsung Galaxy S24 ultra",
        ad: {
          href: "/",
          name: "Example Ad",
          date: "Bakı, 21 sentyabr 2024",
          price: "$4000",
          image: "/images/image0.png",
        },
      },
      {
        title: "Masazır Homes",
        ad: {
          href: "/",
          name: "Example Ad",
          date: "Bakı, 21 sentyabr 2024",
          price: "$5000",
          image: "/images/image0.png",
        },
      },
    ],
  },
  {
    user: "Charlie",
    stories: [
      {
        title: "Dəniz Cehizim",
        ad: {
          href: "/",
          name: "Example Ad",
          date: "Bakı, 21 sentyabr 2024",
          price: "$6000",
          image: "/images/image0.png",
        },
      },
    ],
  },
  {
    user: "Diana",
    stories: [
      {
        title: "Cənub İnşaat",
        ad: {
          href: "/",
          name: "Example Ad",
          date: "Bakı, 21 sentyabr 2024",
          price: "$7000",
          image: "/images/image0.png",
        },
      },
      {
        title: "Baqaj.az",
        ad: {
          href: "/",
          name: "Example Ad",
          date: "Bakı, 21 sentyabr 2024",
          price: "$8000",
          image: "/images/image0.png",
        },
      },
    ],
  },
  {
    user: "Alice",
    stories: [
      {
        title: "Hövsanda torpaq satılır",
        ad: {
          href: "/",
          name: "Example Ad",
          date: "Bakı, 21 sentyabr 2024",
          price: "$1000",
          image: "/images/image0.png",
        },
      },
      {
        title: "Kia Sorento 2020, 2.2 motor",
        ad: {
          href: "/",
          name: "Example Ad",
          date: "Bakı, 21 sentyabr 2024",
          price: "$2000",
          image: "/images/image0.png",
        },
      },
    ],
  },
  {
    user: "Bob",
    stories: [
      {
        title: "Amin Əmlak daşınmaz lorem",
        ad: {
          href: "/",
          name: "Example Ad",
          date: "Bakı, 21 sentyabr 2024",
          price: "$3000",
          image: "/images/image0.png",
        },
      },
      {
        title: "Samsung Galaxy S24 ultra",
        ad: {
          href: "/",
          name: "Example Ad",
          date: "Bakı, 21 sentyabr 2024",
          price: "$4000",
          image: "/images/image0.png",
        },
      },
      {
        title: "Masazır Homes",
        ad: {
          href: "/",
          name: "Example Ad",
          date: "Bakı, 21 sentyabr 2024",
          price: "$5000",
          image: "/images/image0.png",
        },
      },
    ],
  },
  {
    user: "Charlie",
    stories: [
      {
        title: "Dəniz Cehizim",
        ad: {
          href: "/",
          name: "Example Ad",
          date: "Bakı, 21 sentyabr 2024",
          price: "$6000",
          image: "/images/image0.png",
        },
      },
    ],
  },
  {
    user: "Diana",
    stories: [
      {
        title: "Cənub İnşaat",
        ad: {
          href: "/",
          name: "Example Ad",
          date: "Bakı, 21 sentyabr 2024",
          price: "$7000",
          image: "/images/image0.png",
        },
      },
      {
        title: "Baqaj.az",
        ad: {
          href: "/",
          name: "Example Ad",
          date: "Bakı, 21 sentyabr 2024",
          price: "$8000",
          image: "/images/image0.png",
        },
      },
    ],
  },
  {
    user: "Alice",
    stories: [
      {
        title: "Hövsanda torpaq satılır",
        ad: {
          href: "/",
          name: "Example Ad",
          date: "Bakı, 21 sentyabr 2024",
          price: "$1000",
          image: "/images/image0.png",
        },
      },
      {
        title: "Kia Sorento 2020, 2.2 motor",
        ad: {
          href: "/",
          name: "Example Ad",
          date: "Bakı, 21 sentyabr 2024",
          price: "$2000",
          image: "/images/image0.png",
        },
      },
    ],
  },
  {
    user: "Bob",
    stories: [
      {
        title: "Amin Əmlak daşınmaz lorem",
        ad: {
          href: "/",
          name: "Example Ad",
          date: "Bakı, 21 sentyabr 2024",
          price: "$3000",
          image: "/images/image0.png",
        },
      },
      {
        title: "Samsung Galaxy S24 ultra",
        ad: {
          href: "/",
          name: "Example Ad",
          date: "Bakı, 21 sentyabr 2024",
          price: "$4000",
          image: "/images/image0.png",
        },
      },
      {
        title: "Masazır Homes",
        ad: {
          href: "/",
          name: "Example Ad",
          date: "Bakı, 21 sentyabr 2024",
          price: "$5000",
          image: "/images/image0.png",
        },
      },
    ],
  },
  {
    user: "Charlie",
    stories: [
      {
        title: "Dəniz Cehizim",
        ad: {
          href: "/",
          name: "Example Ad",
          date: "Bakı, 21 sentyabr 2024",
          price: "$6000",
          image: "/images/image0.png",
        },
      },
    ],
  },
  {
    user: "Diana",
    stories: [
      {
        title: "Cənub İnşaat",
        ad: {
          href: "/",
          name: "Example Ad",
          date: "Bakı, 21 sentyabr 2024",
          price: "$7000",
          image: "/images/image0.png",
        },
      },
      {
        title: "Baqaj.az",
        ad: {
          href: "/",
          name: "Example Ad",
          date: "Bakı, 21 sentyabr 2024",
          price: "$8000",
          image: "/images/image0.png",
        },
      },
    ],
  },
  {
    user: "Alice",
    stories: [
      {
        title: "Hövsanda torpaq satılır",
        ad: {
          href: "/",
          name: "Example Ad",
          date: "Bakı, 21 sentyabr 2024",
          price: "$1000",
          image: "/images/image0.png",
        },
      },
      {
        title: "Kia Sorento 2020, 2.2 motor",
        ad: {
          href: "/",
          name: "Example Ad",
          date: "Bakı, 21 sentyabr 2024",
          price: "$2000",
          image: "/images/image0.png",
        },
      },
    ],
  },
  {
    user: "Bob",
    stories: [
      {
        title: "Amin Əmlak daşınmaz lorem",
        ad: {
          href: "/",
          name: "Example Ad",
          date: "Bakı, 21 sentyabr 2024",
          price: "$3000",
          image: "/images/image0.png",
        },
      },
      {
        title: "Samsung Galaxy S24 ultra",
        ad: {
          href: "/",
          name: "Example Ad",
          date: "Bakı, 21 sentyabr 2024",
          price: "$4000",
          image: "/images/image0.png",
        },
      },
      {
        title: "Masazır Homes",
        ad: {
          href: "/",
          name: "Example Ad",
          date: "Bakı, 21 sentyabr 2024",
          price: "$5000",
          image: "/images/image0.png",
        },
      },
    ],
  },
  {
    user: "Charlie",
    stories: [
      {
        title: "Dəniz Cehizim",
        ad: {
          href: "/",
          name: "Example Ad",
          date: "Bakı, 21 sentyabr 2024",
          price: "$6000",
          image: "/images/image0.png",
        },
      },
    ],
  },
  {
    user: "Diana",
    stories: [
      {
        title: "Cənub İnşaat",
        ad: {
          href: "/",
          name: "Example Ad",
          date: "Bakı, 21 sentyabr 2024",
          price: "$7000",
          image: "/images/image0.png",
        },
      },
      {
        title: "Baqaj.az",
        ad: {
          href: "/",
          name: "Example Ad",
          date: "Bakı, 21 sentyabr 2024",
          price: "$8000",
          image: "/images/image0.png",
        },
      },
    ],
  },
];

export default function Stories() {
  const {
    handleSwiper,
    slideNext,
    slidePrev,
    handleSlideChange,
    isBeginning,
    isEnd,
  } = useSwiper();

  return (
    <section className='container md:py-14 py-3'>
      <div className='flex flex-col md:gap-10 gap-5 [--size:112px] relative'>
        <h3>Xüsusi elanlar</h3>
        <div className='flex md:hidden gap-5 flex-1 w-full overflow-y-auto'>
          {fakeUsers.map((item, index) => (
            <Story
              key={index}
              user={item}
              userIndex={index}
              users={fakeUsers}
            />
          ))}
        </div>
        <Swiper
          onSlideChange={handleSlideChange}
          onSwiper={handleSwiper}
          keyboard={{
            enabled: true,
          }}
          modules={[Keyboard]}
          slidesPerView={2}
          spaceBetween={4}
          breakpoints={{
            400: {
              slidesPerView: 3,
              spaceBetween: 8,
            },
            640: {
              slidesPerView: 5,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 8,
              spaceBetween: 20,
            },
          }}
          className='flex-1 w-full md:!block !hidden'
        >
          {fakeUsers.map((item, index) => (
            <SwiperSlide key={index} className='text-center'>
              <Story user={item} userIndex={index} users={fakeUsers} />
            </SwiperSlide>
          ))}
        </Swiper>
        <StoriesCarouselButtons
          isEnd={isEnd}
          isBeginning={isBeginning}
          handleNext={slideNext}
          handlePrev={slidePrev}
        />
      </div>
    </section>
  );
}
