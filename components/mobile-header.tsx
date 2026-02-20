"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useCanGoBack } from "@/hooks/use-can-go-back";

export default function MobileHeader({
  children,
  goBack = true,
}: {
  children: React.ReactNode;
  goBack?: boolean;
}) {
  const router = useRouter();
  const canGoBack = useCanGoBack();

  return (
    <div className="h-12 md:hidden flex justify-center items-center relative text-gray-900">
      <h1 className="text-base leading-6 font-semibold">{children}</h1>
      {canGoBack && goBack && (
        <button
          className="text-xs absolute top-1/2 -translate-y-1/2 left-4 size-6 flex items-center justify-center rounded-md hover:bg-black/10 active:border-black border border-transparent transition"
          onClick={() => router.back()}
        >
          <FaArrowLeftLong />
        </button>
      )}
    </div>
  );
}
