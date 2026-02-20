"use client";

import { ComponentProps, useId, useState } from "react";
import { cn } from "@/lib/utils";
import { Attach, Eye, EyeSlash, InfoCircle } from "@/components/icons/others";
import Dropzone, { FileRejection } from "react-dropzone";
import { FieldError } from "react-hook-form";

interface CommonProps {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  message?: string;
  error?: FieldError;
}

interface InputProps
  extends Omit<ComponentProps<"input">, "size" | "placeholder">, CommonProps {
  size?: "sm" | "md" | "lg";
}

export function Input({
  size = "lg",
  label,
  placeholder,
  disabled,
  message,
  error,
  type,
  ...etc
}: InputProps) {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1">
      <div
        className={cn("flex items-center bg-gray-100 relative z-[2]", {
          "h-14 rounded-xl px-4 py-2 text-base": size === "lg",
          "h-12 rounded-lg px-4 py-1.5 text-default": size === "md",
          "h-11 rounded-lg px-4 py-[5px] text-sm": size === "sm",
          "cursor-not-allowed select-none": disabled,
        })}
      >
        <input
          id={`input${id}`}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={label ? "" : placeholder}
          disabled={disabled}
          className={cn(
            "flex-1 focus:ring-0 text-gray-800 relative z-[1] leading-none",
            "[&:not(:placeholder-shown)+span[data-label]]:text-default-xs not-placeholder-shown:place-self-end [&:not(:placeholder-shown)+span[data-label]]:top-2 [&:not(:placeholder-shown)+span[data-label]]:translate-y-0 [&:placeholder-shown:focus+span[data-label]]:text-gray-800",
            "disabled:cursor-not-allowed disabled:select-none disabled:text-gray-400 [&:disabled+span[data-label]]:text-gray-400",
            !!error &&
              "[&:not(:placeholder-shown):focus+span[data-label]]:text-error-600",
            size !== "sm" &&
              "[&:not(:placeholder-shown):focus+span[data-label]]:text-blue-600",
          )}
          {...etc}
        />
        {label && (
          <span
            data-label=""
            aria-label={label}
            className={cn(
              "absolute text-gray-500 top-1/2 -translate-y-1/2 left-4 transition-all leading-4",
              error && "text-error-600",
            )}
          >
            {label}
          </span>
        )}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prevState) => !prevState)}
          >
            {!showPassword ? <Eye /> : <EyeSlash />}
          </button>
        )}
      </div>
      {error && <p className="text-error-600 text-sm">{error.message}</p>}
      {message && (
        <span className="inline-flex items-center text-gray-500 gap-1 body-sm-regular pl-3.5">
          <InfoCircle size={18} />
          {message}
        </span>
      )}
    </div>
  );
}

export function FileInput({
  label,
  onDropAccepted,
  onDropRejected,
}: {
  label: string;
  onDropAccepted(files: File[]): void;
  onDropRejected?(fileRejection: FileRejection[]): void;
}) {
  const id = useId();
  const [dragOver, setDragOver] = useState(false);

  return (
    <div className={cn("flex flex-col gap-3")}>
      <p className="body-lg-medium">{label}</p>
      <Dropzone
        onDropAccepted={onDropAccepted}
        onDropRejected={onDropRejected}
        onDragEnter={() => setDragOver(true)}
        onDragLeave={() => setDragOver(false)}
        accept={{
          "image/png": [".png"],
          "image/jpg": [".jpg"],
          "image/jpeg": [".jpeg"],
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            className={cn(
              "flex items-center justify-between rounded-custom bg-gray-100 px-4 h-14 gap-2.5 border border-transparent transition",
              {
                "border-gray-300": dragOver,
              },
            )}
            {...getRootProps()}
          >
            <span className="text-gray-500 text-default">
              Faylı bura yükləyin
            </span>
            <label className="rounded-[0.5rem] cursor-pointer bg-gray-200 border border-gray-300 hover:bg-gray-300 transition flex w-fit items-center gap-2 size-10 body-md-regular text-gray-800 px-4 py-2.5 focus-within:border-gray-400">
              <span className="md:inline-block hidden">Şəkilləri yüklə</span>
              <Attach size={20} />
            </label>
            <input
              type="file"
              id={`id${id}`}
              accept="image/*"
              {...getInputProps()}
            />
          </div>
        )}
      </Dropzone>
    </div>
  );
}
