"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FieldError } from "react-hook-form";
import { LuX } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "bartaz-icons";

interface ComboboxItem {
  label: string;
  id: string;
}
interface ComboboxProps extends React.ComponentProps<"div"> {
  value?: string;
  defaultValue?: string;
  items?: ComboboxItem[];
  closeOnSelect?: boolean;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: FieldError;
  onNewSelect?: (value: string) => void;
  clearable?: boolean;
  onClear?: () => void;
  name?: string;
  classNames?: {
    trigger?: string;
    content?: string;
    label?: string;
  };
}

export function Combobox({
  className,
  defaultValue,
  items = [],
  value: controlledValue,
  disabled,
  onValueChange,
  closeOnSelect = false,
  onClear,
  // onNewSelect,
  placeholder,
  label,
  error,
  classNames,
  clearable,
  name,
  ...props
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string>(
    controlledValue ?? "",
  );

  const id = React.useId();

  const value =
    controlledValue || onValueChange
      ? (controlledValue ?? "")
      : uncontrolledValue;

  const formattedValue = value.includes(",") ? value.split(",") : value;

  const onChange = React.useCallback(
    (v: string) => {
      if (controlledValue || onValueChange) onValueChange?.(v);
      else setUncontrolledValue(v);
    },
    [controlledValue, onValueChange],
  );

  function handleSelect(v: string) {
    onChange(v);
    if (closeOnSelect) {
      setOpen(false);
    }
  }

  const isSelected = (id: string) => {
    if (Array.isArray(formattedValue)) {
      return formattedValue.some((s) => s === id);
    } else {
      return formattedValue === id;
    }
  };

  const filteredItems = items
    ?.filter((i) =>
      i.label.toLowerCase().trim().includes(inputValue.toLowerCase().trim()),
    )
    .sort((a, b) => {
      if (isSelected(a.id) && !isSelected(b.id)) return -1;
      if (!isSelected(a.id) && isSelected(b.id)) return 1;
      return 0;
    });

  const isEmpty = Array.isArray(formattedValue)
    ? formattedValue.length === 0
    : !formattedValue;

  const selected = Array.isArray(formattedValue)
    ? items
        ?.filter((i) => formattedValue.includes(i.id))
        .map((i) => i.label)
        .join(", ")
    : items?.find((i) => formattedValue === i.id)?.label;

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <div className={cn("flex flex-col gap-1", className)} {...props}>
        <select
          aria-hidden="true"
          tabIndex={-1}
          className="sr-only"
          value={formattedValue ?? ""}
          defaultValue={defaultValue ?? ""}
          onChange={(e) => onChange(e.target.value)}
          name={name}
        >
          {items.map((i) => (
            <option key={i.id} value={i.id}>
              {i.label}
            </option>
          ))}
        </select>
        {label && (
          <label htmlFor={id} className={cn("font-medium", classNames?.label)}>
            {label}
          </label>
        )}
        <PopoverTrigger
          id={id}
          disabled={disabled}
          data-placeholder={isEmpty ? "" : null}
          className={cn(
            "group h-auto active:scale-100 bg-gray-100 flex items-center px-4 rounded-xl",
            !isEmpty && "text-foreground",
            classNames?.trigger,
            error &&
              "border-dashboard-destructive ring-dashboard-destructive/20",
          )}
          title={selected}
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
            {!isEmpty && (
              <span className="text-left line-clamp-2 w-full">{selected}</span>
            )}
          </span>
          <span className="ml-auto flex items-center gap-1">
            {(clearable || onClear) && formattedValue.length > 0 && (
              <span
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onChange("");
                    onClear?.();
                  }
                }}
                aria-label="Clear"
                title="Clear"
                onClick={(event) => {
                  event.stopPropagation();
                  onChange("");
                  onClear?.();
                }}
                role="button"
              >
                <LuX />
              </span>
            )}
            <ChevronDown className="shrink-0 size-6" />
          </span>
        </PopoverTrigger>
        {error && <p className="text-error-600 text-sm">{error.message}</p>}
      </div>
      <PopoverContent className={cn("p-1", classNames?.content)}>
        <Command className="*:data-[slot=command-input-wrapper]:px-0">
          <CommandInput
            placeholder="Axtar"
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList className="pt-1 [scrollbar-width:thin]">
            <CommandEmpty>No result</CommandEmpty>
            {filteredItems.map((item) => (
              <CommandItem
                key={item.id}
                value={item.id}
                onSelect={(v) => {
                  handleSelect(v);
                }}
                className="flex-start gap-3 h-10"
                keywords={[item.label]}
              >
                {item.label}
                {isSelected(item.id) && <Check className="ml-auto" />}
              </CommandItem>
            ))}
            {/*{!!onNewSelect &&*/}
            {/*  inputValue.trim() &&*/}
            {/*  (items.length === 0 ||*/}
            {/*    items?.some(*/}
            {/*      (i) =>*/}
            {/*        i.label.toLowerCase().trim() !==*/}
            {/*        inputValue.toLowerCase().trim(),*/}
            {/*    )) && (*/}
            {/*    <CommandItem*/}
            {/*      onValueChange={() => {*/}
            {/*        onNewSelect(inputValue.trim());*/}
            {/*        setOpen(false);*/}
            {/*        setInputValue("");*/}
            {/*      }}*/}
            {/*      value={inputValue.trim()}*/}
            {/*    >*/}
            {/*      Add “{inputValue.trim()}”*/}
            {/*    </CommandItem>*/}
            {/*  )}*/}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
