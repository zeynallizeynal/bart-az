"use client";

import { cn, sanitize } from "@/lib/utils";

export function HTMLRenderer({
  html,
  ...props
}: { html?: string | null } & React.ComponentProps<"div">) {
  if (!html || typeof window === "undefined") return null;
  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitize(html) }}
      {...props}
      className={cn(
        "html-renderer **:[ul]:list-disc **:[ul]:pl-6 **:[ol]:list-decimal **:[ol]:pl-6",
        props.className,
      )}
    />
  );
}
