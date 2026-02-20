"use client";

import React, { ComponentProps, ReactNode, useId } from "react";
import { cn } from "@/lib/utils";
import { Check } from "@/components/icons/others";
import { FaMinus } from "react-icons/fa6";

interface CheckboxProps
  extends Omit<ComponentProps<"input">, "size" | "disabled"> {
  children: ReactNode;
  checked: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "check" | "remove";
  className?: string;

  onCheck(): void;
}

export default function Checkbox({
  children,
  checked,
  onCheck,
  disabled,
  variant = "check",
  size = "md",
  className,
  ...etc
}: CheckboxProps) {
  const id = useId();

  return (
    <label
      tabIndex={disabled ? 0 : -1}
      htmlFor={`checkbox${id}`}
      className={cn("flex items-center gap-2 font-medium cursor-pointer w-fit")}
    >
      <span
        data-checked={checked ? "" : null}
        data-disabled={disabled ? "" : null}
        className={cn(
          "border border-gray-300 text-background transition flex items-center justify-center shrink-0",
          "data-[checked]:bg-blue-400 data-[checked]:border-transparent focus-within::ring-0 data-[checked]:focus-within:shadow-checkbox-checked focus-within:shadow-checkbox",
          "data-[disabled]:bg-gray-100 data-[disabled]:data-[checked]:text-gray-300 data-[disabled]:cursor-not-allowed",
          {
            "size-4 [&_svg]:size-3 rounded": size === "sm",
            "size-5 [&_svg]:size-3.5 rounded-md": size === "md",
            "size-6 [&_svg]:size-4 rounded-md": size === "lg",
          },
        )}
      >
        {checked &&
          (variant === "check" ? (
            <Check aria-hidden="true" />
          ) : (
            <FaMinus aria-hidden="true" />
          ))}

        <input
          aria-checked={checked}
          aria-disabled={disabled}
          type="checkbox"
          id={`checkbox${id}`}
          className="sr-only"
          onChange={onCheck}
          checked={checked}
          disabled={disabled}
          {...etc}
        />
      </span>
      <span className={cn("leading-[150%] text-gray-800", className)}>
        {children}
      </span>
    </label>
  );
}
