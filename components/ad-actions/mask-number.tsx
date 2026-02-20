"use client";

import { Call } from "@/components/icons/others";
import { JSX, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function MaskNumber({
  number,
  className,
}: {
  number: string;
  className?: string;
}): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);

  const maskPhoneNumber = (number: string) => {
    if (number.includes(" ")) {
      const parts = number.split(" ");

      if (parts.length < 2) {
        return number.slice(0, -4) + "****";
      }

      const maskedParts = parts.map((part, index) => {
        if (index >= parts.length - 2) {
          return "*".repeat(part.length);
        }
        return part;
      });

      return maskedParts.join(" ");
    } else {
      if (number.length <= 4) {
        return "*".repeat(number.length);
      }
      return number.slice(0, -4) + "****";
    }
  };

  return isVisible ? (
    <Link
      target="_blank"
      href={`tel:${number.replaceAll(" ", "")}`}
      className={cn(
        "w-full bg-success-500 text-background rounded-xl px-6 flex flex-col items-center justify-center h-14 hover:bg-success-600 transition",
        className,
      )}
    >
      <span className="font-bold flex items-center gap-2">
        <Call size={22} />
        {number}
      </span>
    </Link>
  ) : (
    <button
      onClick={() => setIsVisible(true)}
      className={cn(
        "w-full bg-success-500 text-background rounded-xl px-6 flex flex-col items-center justify-center h-14 hover:bg-success-600 transition",
        className,
      )}
    >
      <span data-show-number-text="" className="text-xs font-medium">
        Nömrəni göstər
      </span>
      <span className="font-bold flex items-center gap-2">
        <Call size={22} />
        {maskPhoneNumber(number)}
      </span>
    </button>
  );
}
