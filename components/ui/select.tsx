"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { Check, ChevronDown, X } from "@/components/icons/others";
import { FieldError } from "react-hook-form";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    data-slot="select-trigger"
    className={cn(
      "bg-gray-100 active:!scale-100 text-gray-800 px-4 py-2 h-14 text-base rounded-custom relative flex items-center gap-1.5 justify-between group",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      data-slot="select-content"
      ref={ref}
      className={cn(
        "rounded-xl border border-gray-200 min-w-40 bg-background z-50 focus:ring-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    data-slot="select-label"
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    data-slot="select-item"
    ref={ref}
    className={cn(
      "px-2 h-10 cursor-pointer focus:bg-gray-50 focus:ring-0 transition rounded-md text-base flex items-center justify-between **:[svg]:size-5",
      className,
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator>
      <Check />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn(
      "-mx-1 my-1 h-px bg-neutral-100 dark:bg-neutral-800",
      className,
    )}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

function DefaultSelect({
  className,
  placeholder,
  items,
  onOpenChange,
  error,
  onValueChange,
  removableValue = false,
  triggerClassName,
  align,
  side,
  value,
  open,
  defaultValue,
  ...props
}: React.ComponentProps<typeof Select> &
  React.ComponentProps<typeof SelectPrimitive.SelectContent> &
  SelectPrimitive.SelectProps & {
    placeholder?: string;
    items: { label: string; value: string | number }[] | undefined;
    className?: string;
    error?: FieldError;
    removableValue?: boolean;
    triggerClassName?: string;
  }) {
  const id = React.useId();

  return (
    <div className={cn("flex flex-col gap-1 relative", className)}>
      <Select
        onValueChange={onValueChange}
        open={open}
        onOpenChange={onOpenChange}
        value={value ?? ""}
        defaultValue={defaultValue ?? ""}
        {...props}
      >
        <div className="relative w-full">
          <SelectTrigger
            id={id}
            className={cn(
              "w-full",
              placeholder &&
                (value || defaultValue) &&
                "[&>span[data-slot=select-value]]:place-self-end",
              triggerClassName,
            )}
          >
            <SelectValue data-slot="select-value" placeholder="" />
            {placeholder && (
              <span
                className={cn(
                  "absolute text-gray-800 z-1 top-1/2 -translate-y-1/2 left-4 transition-all leading-none",
                  (value || defaultValue) &&
                    "!text-default-xs text-gray-500 top-2 translate-y-0",
                )}
              >
                {placeholder}
              </span>
            )}
          </SelectTrigger>
          {(value || defaultValue) && removableValue && (
            <button
              type="button"
              title="Hamısını silin"
              onClick={(event) => {
                event.stopPropagation();
                onValueChange?.("");
              }}
              className="absolute top-1/2 -translate-y-1/2 right-12"
            >
              <X />
            </button>
          )}
        </div>
        <SelectContent align={align} side={side}>
          {items?.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value.toString()}
              className="focus:bg-gray-200"
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-error-500 text-xs">{error.message}</p>}
    </div>
  );
}

export {
  DefaultSelect,
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
