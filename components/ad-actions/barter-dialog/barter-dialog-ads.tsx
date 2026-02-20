import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "@/components/icons/others";
import Image from "next/image";
import { formatCurrency } from "@/utils/currency.util";
import { AnimatePresence, motion } from "framer-motion";

const fakeAds = [
  {
    id: "124213412",
    name: "Samsung Galaxy S24 Onyx Black 128GB/8GB",
    date: "Bakı, 21 sentyabr 2024",
    price: 46500,
    image: "/images/image0.png",
  },
];

export default function BarterDialogAds() {
  const [selectedAd, setSelectedAd] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <p className="text-gray-800 font-medium leading-6 text-base">
        Barter edəcəyimiz məhsulu seçin
      </p>
      <div className="space-y-5">
        <button
          onClick={() => setIsExpanded((prevState) => !prevState)}
          className={cn(
            "h-14 flex items-center justify-between p-4 text-base rounded-xl bg-gray-100 w-full gap-2",
            selectedAd ? "text-gray-800 font-semibold" : "text-gray-500",
          )}
        >
          <span className="flex-grow text-left">
            {fakeAds.find((value) => value.id === selectedAd)?.name ||
              "Seçin..."}
          </span>
          <ChevronDown
            className={cn(
              "text-gray-800 shrink-0 transform transition",
              isExpanded && "rotate-180",
            )}
          />
        </button>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              animate={{
                opacity: 1,
                scale: 1,
              }}
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
              }}
              transition={{
                duration: 0.15,
              }}
              className="space-y-3"
            >
              {fakeAds.map((ad, index) => (
                <button
                  key={index}
                  className="w-full rounded-custom-xl bg-gray-50 border p-5 flex gap-4 hover:bg-gray-100"
                  onClick={() => {
                    if (selectedAd === ad.id) {
                      setSelectedAd("");
                      setIsExpanded(false);
                    } else {
                      setSelectedAd(ad.id);
                      setIsExpanded(false);
                    }
                  }}
                >
                  <Image
                    src={ad.image}
                    alt={ad.name}
                    width={132}
                    height={108}
                    className="rounded-xl"
                  />
                  <div className="flex flex-col items-start">
                    <b className="font-extrabold text-xl">
                      {formatCurrency(ad.price)}
                    </b>
                    <p className="text-default-lg mt-3 font-medium leading-6 line-clamp-1 text-gray-800 text-left">
                      {ad.name}
                    </p>
                    <p className="text-gray-500 leading-[22px] mt-2">
                      {ad.date}
                    </p>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
