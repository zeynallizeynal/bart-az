"use client";

import { useMediaQuery } from "react-responsive";
import { usePathname } from "next/navigation";
import React from "react";

export default function Header({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDesktop = useMediaQuery({
    query: "(min-width: 768px)",
  });
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (pathname === "/" || isDesktop) return children;
}
