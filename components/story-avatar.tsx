import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";

export default function StoryAvatar({
  image,
  alt,
  imageSize,
  className,
}: {
  image: string;
  alt: string;
  imageSize: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "p-[3px] z-10 inline-block bg-story-linear-bg rounded-full",
        className,
      )}
    >
      <div className="p-[3px] bg-background rounded-full relative">
        <div className="absolute inset-[3px] bg-story-linear-bg rounded-full" />
        <Image
          src={image}
          alt={alt}
          width={imageSize}
          height={imageSize}
          className="hover:opacity-50 transition relative z-[1]"
        />
      </div>
    </div>
  );
}
