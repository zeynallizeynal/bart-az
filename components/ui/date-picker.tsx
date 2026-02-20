"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "bartaz-icons";
import { format } from "date-fns";
import React from "react";
import { FieldError } from "react-hook-form";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

type DatePickerProps = Omit<
  React.ComponentProps<typeof Calendar>,
  "mode" | "selected" | "onSelect" | "required"
> & {
  className?: string;
  label?: string;
  error?: FieldError;
  placeholder?: string;
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date?: Date) => void;
  name?: string;
};

export function DatePicker({
  className,
  label,
  error,
  disabled,
  placeholder,
  name,
  value: controlledValue,
  defaultValue,
  onValueChange,
  ...props
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [uncontrolledValue, setUncontrolledValue] = React.useState<
    Date | undefined
  >(undefined);

  const value = controlledValue ?? uncontrolledValue;

  const onChange = React.useCallback(
    (date?: Date) => {
      onValueChange?.(date);
      setUncontrolledValue(date);
    },
    [onValueChange],
  );

  const id = React.useId();

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <div className={cn("flex flex-col gap-1", className)}>
        <input
          className="sr-only"
          type="date"
          name={name}
          defaultValue={
            defaultValue ? format(defaultValue, "yyyy-MM-dd") : undefined
          }
          value={value ? format(value, "yyyy-MM-dd") : undefined}
          onChange={(event) => {
            onChange(new Date(event.target.value));
          }}
        />
        {label && (
          <label
            data-slot="date-picker-label"
            htmlFor={id}
            className={cn("font-medium")}
          >
            {label}
          </label>
        )}
        <PopoverTrigger
          id={id}
          disabled={!!disabled}
          data-placeholder={!value ? "" : null}
          data-slot="date-picker-trigger"
          className={cn(
            "group h-auto active:scale-100 bg-gray-100 flex items-center px-4 rounded-xl",
            value && "text-foreground",
            error &&
              "border-dashboard-destructive ring-dashboard-destructive/20",
          )}
        >
          <span className="flex flex-col items-start justify-center min-h-14 line-clamp-2">
            {placeholder && (
              <span
                className={cn(
                  "transition-all text-gray-500 mt-0 will-change-transform group-not-data-placeholder:scale-75 origin-left",
                  error && "text-error-600",
                )}
              >
                {placeholder}
              </span>
            )}
            {value && (
              <span className="text-left line-clamp-2 w-full">
                {format(value, "dd.MM.yyyy")}
              </span>
            )}
          </span>
          <span className="ml-auto flex items-center gap-1">
            <ChevronDown className="shrink-0 size-6" />
          </span>
        </PopoverTrigger>
        {error && <p className="text-error-600 text-sm">{error.message}</p>}
      </div>
      <PopoverContent>
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange?.(date);
            setOpen(false);
          }}
          {...props}
        />
      </PopoverContent>
    </Popover>
  );
}
