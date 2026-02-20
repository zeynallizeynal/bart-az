"use client";

import { cn, formatFileSize } from "@/lib/utils";
import React from "react";
import Dropzone, { DropEvent, DropzoneProps } from "react-dropzone";
import { Attach, ImageTick } from "bartaz-icons";
import { Image } from "@/components/ui/image";
import { Delete7 } from "@/components/icons/others";
import { LuTrash } from "react-icons/lu";

export function Upload({
  className,
  label,
  placeholder = "Faylı bura yükləyin",
  value: controlledValue,
  multiple = false,
  onDropAccepted,
  onValueChange,
  ...props
}: DropzoneProps & {
  label?: string;
  placeholder?: string;
  className?: string;
  value?: File[];
  onValueChange?: (files: File[], event?: DropEvent) => void;
}) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<File[]>([]);
  const id = React.useId();

  const value = controlledValue ?? uncontrolledValue;

  const onChange = React.useCallback(
    (f: File[], event?: DropEvent) => {
      onValueChange?.(f, event);
      setUncontrolledValue((prevState) => [...prevState, ...f]);
    },
    [onValueChange],
  );

  return (
    <div className="space-y-5">
      <div className={cn("flex flex-col gap-3", className)}>
        {label && (
          <label htmlFor={id} className="font-medium">
            {label}
          </label>
        )}
        <Dropzone
          multiple={multiple}
          onDropAccepted={(f, event) => {
            onChange([...value, ...f], event);
            onDropAccepted?.(f, event);
          }}
          {...props}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className="rounded-custom cursor-default pl-4 pr-2 h-14 bg-gray-100 flex items-center transition hover:bg-gray-200"
            >
              <input {...getInputProps()} />
              {placeholder && (
                <div className="text-gray-500 text-default/4.5 grow font-jakarta-sans">
                  {placeholder}
                </div>
              )}
              <div className="cursor-pointer border ml-auto rounded-lg py-2 px-4 bg-gray-200 text-gray-800 text-sm flex items-center gap-2">
                {multiple ? "Şəkilləri" : "Şəkili"} yüklə
                <Attach fontSize={20} />
              </div>
            </div>
          )}
        </Dropzone>
      </div>

      {value && value.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-800 justify-between gap-3">
            <span>Uploaded: {value.length}</span>
            <button
              type="button"
              className="flex items-center gap-1 h-6 rounded-md px-2 bg-error-50 font-medium text-error-600 hover:bg-error-100 transition"
              onClick={() => onChange([])}
            >
              Clear all
              <LuTrash />
            </button>
          </div>
          <ul className="space-y-2">
            {value.map((file, index) => (
              <li
                key={index}
                className="border rounded-xl flex items-center justify-between pl-2 pr-3 gap-4"
              >
                <div className="flex items-center h-14 gap-4 grow">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    size={40}
                    className="rounded-lg"
                  />
                  {file.name}
                </div>
                <div className="flex items-center h-full gap-4">
                  <div className="text-xs text-gray-500">
                    {formatFileSize(file.size)}
                  </div>
                  <div className="flex items-center gap-3 text-2xl">
                    <ImageTick
                      aria-label="Uploaded"
                      className="text-success-500"
                    />
                    <button
                      type="button"
                      className="hover:bg-error-50 rounded-md transition hover:*:scale-75 active:bg-error-100"
                      onClick={() => {
                        onChange(value.filter((_, i) => i !== index));
                      }}
                    >
                      <Delete7 className="text-error-500 transition" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
