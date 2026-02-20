"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Copy2 } from "@/components/icons/others";
import { toast } from "sonner";

const Copy = ({ text, className }: { text: string; className?: string }) => {
  const [copying, setCopying] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopying(true);
      setTimeout(() => setCopying(false), 2000);
    } catch (err: any) {
      toast.error("Could not copy text", err.message);
    }
  };

  return (
    <button
      className={cn(
        "transition-colors size-8 flex items-center justify-center overflow-hidden relative hover:bg-gray-800/10 rounded-md",
        className,
      )}
      onClick={handleClick}
    >
      <span
        aria-hidden={true}
        className="absolute top-1/2 size-6 translate-y-[-50%] flex items-center justify-center"
      >
        <Copy2
          className={cn("transition-all absolute", {
            "scale-100": !copying,
            "scale-0": copying,
          })}
        />
      </span>
      <span
        aria-hidden={true}
        className="absolute top-1/2 size-6 translate-y-[-50%] flex items-center justify-center"
      >
        <Check
          className={cn("transition-all absolute", {
            "scale-100": copying,
            "scale-0": !copying,
          })}
        />
      </span>
    </button>
  );
};

export default Copy;
