"use client";

import { cn } from "@/lib/utils";
import React, { ComponentProps, useId } from "react";

interface RadioProps extends Omit<ComponentProps<"input">, "size"> {
  size?: "sm" | "md" | "lg";
}

export function Radio(props: RadioProps) {
  const id = useId();
  const { children, size = "md", className, disabled, ...etc } = props;

  return (
    <label
      tabIndex={disabled ? 0 : -1}
      htmlFor={`radio${id}`}
      className={cn("flex items-center gap-2 font-medium cursor-pointer")}
    >
      <span
        className={cn(
          "border border-gray-300 bg-blue-400 group transition center shrink-0 rounded-full",
          "has-checked:bg-blue-400 has-checked:border-transparent focus-within:ring-0 has-checked:focus-within:shadow-checkbox-selected focus-within:shadow-checkbox",
          "has-disabled:cursor-not-allowed has-disabled:bg-gray-100! has-checked:border-gray-300",
          {
            "size-4 [&_svg]:size-3": size === "sm",
            "size-5 [&_svg]:size-3.5": size === "md",
            "size-6 [&_svg]:size-4": size === "lg",
          },
        )}
      >
        <input
          type="radio"
          id={`radio${id}`}
          className="sr-only peer"
          {...etc}
        />
        <span
          className={cn(
            "bg-background rounded-full transition-all peer-disabled:bg-gray-100 peer-disabled:peer-checked:bg-gray-300! shrink-0 not-peer-checked:size-full",
            {
              "size-1.5": size === "sm",
              "size-2": size === "md",
              "size-2.5": size === "lg",
            },
          )}
        />
      </span>
      <span className={cn("leading-[150%] text-gray-800", className)}>
        {children}
      </span>
    </label>
  );
}
