import { ComponentProps, useId } from "react";
import { cn } from "@/lib/utils";
import { InfoCircle } from "@/components/icons/others";
import { FieldError } from "react-hook-form";

interface TextareaProps extends Omit<ComponentProps<"textarea">, "size"> {
  size?: "sm" | "md" | "lg";
  message?: string;
  label?: string;
  error?: FieldError;
}

export function Textarea({
  size = "lg",
  message,
  label,
  className,
  disabled,
  error,
  ...etc
}: TextareaProps) {
  const id = useId();

  return (
    <div className="leading-6 font-medium text-gray-800 text-base flex flex-col gap-3">
      {label && <label htmlFor={`textarea${id}`}>{label}</label>}
      <div
        className={cn("flex items-center bg-gray-100 relative z-[2]", {
          "rounded-xl px-4 py-2 text-base": size === "lg",
          "rounded-lg px-4 py-1.5 text-default": size === "md",
          "rounded-lg px-4 py-[5px] text-sm": size === "sm",
          "cursor-not-allowed select-none": disabled,
        })}
      >
        <textarea
          id={`textarea${id}`}
          className={cn(
            "flex-1 focus:ring-0 text-gray-800 placeholder-gray-500 focus:placeholder-gray-800 transition size-full",
            className,
          )}
          {...etc}
        />
      </div>
      {message && (
        <span className="inline-flex items-center text-gray-500 gap-1 body-sm-regular pl-3.5">
          <InfoCircle size={18} />
          {message}
        </span>
      )}
      {error && <p className="text-error-600 text-sm">{error.message}</p>}
    </div>
  );
}
