"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { SwitchProps } from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";
import { FieldError } from "react-hook-form";

export function Switch({
  className,
  label,
  error,
  ...props
}: SwitchProps & { label: string; error?: FieldError }) {
  const id = React.useId();
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <label
        data-slot="switch-label"
        htmlFor={id}
        className="leading-6 grow inline-flex items-center"
      >
        {label}
      </label>

      <SwitchPrimitives.Root
        id={id}
        data-slot="switch"
        className={cn(
          "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-50 data-[state=checked]:bg-blue-400 data-[state=unchecked]:bg-gray-300 data-[state=unchecked]:hover:bg-gray-400 data-[state=checked]:hover:bg-blue-500",
        )}
        {...props}
      >
        <SwitchPrimitives.Thumb
          data-slot="switch-thumb"
          className={cn(
            "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-switch ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
          )}
        />
      </SwitchPrimitives.Root>
      {error && <p className="text-error-500 text-xs">{error.message}</p>}
    </div>
  );
}
