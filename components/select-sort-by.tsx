"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "@/lib/utils";
import { SelectProps } from "@radix-ui/react-select";

const sortOptions = [
  {
    name: "Ən yeni",
    value: "created_at,desc",
  },
  {
    name: "Ən köhnə",
    value: "created_at,asc",
  },
  {
    name: "Ən bahalı",
    value: "price,desc",
  },
  {
    name: "Ən ucuz",
    value: "price,asc",
  },
];

export function SortByDateSelect({
  options = sortOptions,
  onValueChange,
  value: controlledValue,
  triggerClassName,
  defaultValue,
  ...props
}: SelectProps & {
  options?: { value: string; name: string }[];
  triggerClassName?: string;
}) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(
    options[0]?.value,
  );

  const value = controlledValue ?? uncontrolledValue;
  const onChange = React.useCallback(
    (v: string) => {
      setUncontrolledValue(v);
      onValueChange?.(v);
    },
    [onValueChange],
  );

  return (
    <Select
      onValueChange={(value) => {
        onChange(value);
      }}
      value={value}
      defaultValue={defaultValue ?? sortOptions[0].value}
      {...props}
    >
      <SelectTrigger
        className={cn(
          "bg-background border rounded-xl border-gray-200 font-semibold gap-2 hover:bg-gray-50 shrink-0",
          triggerClassName,
        )}
      >
        <SelectValue>
          {options.find((o) => o.value === value)?.name}
        </SelectValue>
      </SelectTrigger>
      <SelectContent align="end" className="bg-background border">
        {options.map((op, i) => (
          <SelectItem key={i} value={op.value}>
            {op.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
