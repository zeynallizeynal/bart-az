"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "@/components/icons/others";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useScrollControl } from "@/hooks/use-scroll-control";

const fakeCategory = {
  name: "Nəqliyyat",
  href: "/search?s=transport",
  image: "/transport-icon.png",
};

export default function SearchCategories() {
  const { containerRef, handleScroll, scroll, showLeftArrow, showRightArrow } =
    useScrollControl({
      itemSelector: "[role=listitem]",
    });

  return (
    <section className="py-6">
      <div className="container">
        <div className="relative">
          <div
            ref={containerRef}
            role="list"
            className="flex items-center overflow-auto scroll-smooth"
            style={{
              scrollbarWidth: "none",
            }}
            onScroll={handleScroll}
          >
            {Array(20)
              .fill(fakeCategory)
              .map((category, index) => (
                <div
                  key={index}
                  className="shrink-0 first:pr-1.5 first:pl-0 last:pr-0 px-1.5 last:pl-1.5"
                >
                  <button
                    role="listitem"
                    className="relative rounded-lg border font-medium shrink-0 gap-2 h-13 pr-3 pl-1.5 flex items-center hover:border-gray-400 hover:bg-gray-50"
                  >
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={40}
                      height={40}
                      className="shrink-0"
                    />
                    {category.name}
                  </button>
                </div>
              ))}
          </div>
          <AnimatePresence>
            {showLeftArrow && (
              <motion.div
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                className="absolute top-0 flex bg-background items-center z-10 w-[4.5rem] h-full left-0"
                style={{
                  maskImage:
                    "linear-gradient(90deg, rgba(255, 255, 255, 1) 55%, transparent)",
                }}
              >
                <button onClick={() => scroll("left")}>
                  <ChevronLeft className="ml-1" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {showRightArrow && (
              <motion.div
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                className="absolute top-0 flex bg-background justify-end items-center z-10 w-[4.5rem] h-full right-0"
                style={{
                  maskImage:
                    "linear-gradient(90deg, transparent, rgba(255, 255, 255, 1) 55%)",
                }}
              >
                <button onClick={() => scroll("right")}>
                  <ChevronRight className="mr-1" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
