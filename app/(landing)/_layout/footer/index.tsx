"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";

export default function Footer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <footer
      className={cn(
        "pt-16 md:pb-0 pb-16",
        pathname.startsWith("/ads") ? "bg-background" : "bg-gray-100",
      )}
    >
      {children}
    </footer>
  );
}
