"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import * as icons from "bartaz-icons";
import { Image } from "@/components/ui/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { categoryAssets } from "@/constants/categories";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Category } from "@/types/models/category";
import Link from "next/link";

export default function CategoryMenu({ data }: { data: Category[] }) {
  const [open, setOpen] = useState(false);
  const [activeItemId, setActiveItemId] = useState<number | null>(null);

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        setActiveItemId(null);
      }}
    >
      <DialogTrigger asChild>
        <Button size="md" className="w-40 md:flex hidden">
          <icons.Category className="text-xl shrink-0" />
          Kateqoriyalar
        </Button>
      </DialogTrigger>
      <DialogContent className="translate-0! inset-x-0! top-40!">
        <VisuallyHidden>
          <DialogTitle>Categories</DialogTitle>
        </VisuallyHidden>
        <div className="container" onPointerLeave={() => setActiveItemId(null)}>
          <div className="flex">
            <div className="rounded-xl p-2 bg-background">
              {data.map((item, index) => (
                <button
                  className="rounded-lg hover:bg-gray-100 flex items-center justify-between gap-4 p-2 w-70"
                  key={item.id}
                  onPointerEnter={() => setActiveItemId(item.id)}
                  onClick={() => setActiveItemId(item.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-md bg-background">
                      <Image
                        src={categoryAssets.icon[index]}
                        alt={item.name}
                        size={40}
                      />
                    </div>
                    <span className="leading-[22px]">{item.name}</span>
                  </div>
                  <icons.ChevronRight fontSize={20} />
                </button>
              ))}
            </div>
            <AnimatePresence>
              {activeItemId && (
                <motion.div
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  initial={{
                    opacity: 0,
                  }}
                  className="rounded-xl p-2 bg-background"
                >
                  {data.map((item, index) => (
                    <Link
                      href={`/search?category_id=${item.id}`}
                      className="rounded-lg hover:bg-gray-100 flex items-center justify-between gap-4 p-2 w-[280px]"
                      key={item.id}
                      onPointerEnter={() => setActiveItemId(item.id)}
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="rounded-md bg-background">
                          <Image
                            src={categoryAssets.icon[index]}
                            alt={item.name}
                            size={40}
                          />
                        </div>
                        <span className="leading-[22px]">{item.name}</span>
                      </div>
                      <icons.ChevronRight fontSize={20} />
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
