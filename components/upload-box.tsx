"use client";

import { Delete7, DragIndicator, ImageTick } from "@/components/icons/others";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function UploadBox({
  files,
  onDelete,
}: {
  files: File[];
  onDelete(index: number): void;
}) {
  return (
    <ul className="flex flex-col gap-2 overflow-hidden">
      {files.map((file, index) => (
        <UploadedItem
          file={file}
          key={index}
          onDelete={() => onDelete(index)}
        />
      ))}
    </ul>
  );
}

export function UploadedItem({
  file,
  onDelete,
}: {
  file: File;
  onDelete(): void;
}) {
  const [grabbing, setGrabbing] = useState(false);

  return (
    <AnimatePresence>
      <motion.li
        initial={{ opacity: 0, x: "-50%" }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        exit={{ opacity: 0, x: "50%" }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          duration: 0.3,
        }}
        className="flex px-2 border border-gray-200 bg-background h-14 rounded-xl items-center gap-4"
      >
        <div className="flex items-center gap-2">
          <span
            className={cn({
              "cursor-grab": !grabbing,
              "cursor-grabbing": grabbing,
            })}
            onMouseDown={() => setGrabbing(true)}
            onMouseUp={() => setGrabbing(false)}
            onMouseLeave={() => setGrabbing(false)}
          >
            <DragIndicator />
          </span>
          <Image
            src={URL.createObjectURL(file)}
            alt={file.name}
            width={40}
            height={40}
            className="rounded-lg min-h-10 object-cover"
          />
        </div>
        <p className="text-gray-800 text-default flex-1">{file.name}</p>
        <div className="flex items-center gap-3">
          <ImageTick className="text-success-500" />
          <button onClick={onDelete}>
            <Delete7 className="text-error-500" />
          </button>
        </div>
      </motion.li>
    </AnimatePresence>
  );
}
