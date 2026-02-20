"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { DialogTitle } from "@/components/ui/dialog";

const length = 7;
// const duration = 4;
// const delay = 1;

export default function DialogPing({
  children,
  variant,
  title,
}: {
  children: React.ReactNode;
  variant: "success" | "info" | "danger";
  title: string;
}) {
  return (
    <div className="flex-grow relative h-[259px] flex flex-col justify-end overflow-hidden shrink-0 bg-background">
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 80%, rgba(255, 255, 255, 1) 100%)",
        }}
      />
      <div className="absolute inset-0 center z-10">
        <div
          className={cn("rounded-full", {
            "bg-gray-100": variant === "info",
            "bg-error-100": variant === "danger",
            "bg-blue-100": variant === "success",
          })}
        >
          <div
            className={cn(
              " rounded-full size-24 text-5xl text-background m-5 center bg-blue-600",
              {
                "bg-gray-500": variant === "info",
                "bg-error-500": variant === "danger",
                "bg-blue-500": variant === "success",
              },
            )}
          >
            {children}
          </div>
        </div>
      </div>
      <div
        className={cn(
          "absolute pos-center size-[136px] center aspect-square rounded-full",
        )}
      >
        {Array.from({ length }, (_, index) => (
          <div
            key={index}
            className={cn("absolute z-[1] rounded-full border", {
              "border-gray-500": variant === "info",
              "border-error-500": variant === "danger",
              "border-blue-500": variant === "success",
            })}
            style={{
              top: `-${(index + 1) * 16}px`,
              left: `-${(index + 1) * 16}px`,
              right: `-${(index + 1) * 16}px`,
              bottom: `-${(index + 1) * 16}px`,
              opacity: length / 10 - (index + 1) / 10,
            }}
          />
        ))}
      </div>
      <DialogTitle className="mb-0 relative z-10 w-full text-center">
        {title}
      </DialogTitle>
    </div>
  );
}
