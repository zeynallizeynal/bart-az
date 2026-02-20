import { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface DefaultLinkProps extends Omit<ComponentProps<"a">, "className"> {
  children: React.ReactNode;
  href: string;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: boolean;
}

export default function ButtonLink({
  children,
  className,
  href,
  variant = "primary",
  size = "md",
  icon,
  ...etc
}: DefaultLinkProps) {
  return (
    <Link
      href={href}
      {...etc}
      className={cn(
        "rounded-xl border font-medium transition-colors center shrink-0 gap-2 duration-200",
        {
          "bg-gray-800 text-background border-gray-700 active:bg-gray-900 hover:bg-gray-900 focus:bg-gray-900 disabled:bg-gray-200 disabled:text-gray-400":
            variant === "secondary",
          "bg-blue-600 text-background border-transparent active:bg-blue-500 hover:bg-blue-500 focus:bg-blue-500 focus:border-blue-600 disabled:bg-blue-100 disabled:text-gray-400":
            variant === "primary",
          "bg-foreground text-gray-800 border-gray-800 active:bg-gray-300 hover:bg-gray-300 active:border-gray-300 focus:bg-gray-300 focus:border-gray-400 disabled:bg-foreground disabled:border-gray-200 disabled:text-gray-300":
            variant === "outline",
          "px-6 h-14": size === "lg",
          "px-5 h-12": size === "md",
          "px-4 h-10": size === "sm",
          "p-4": size === "lg" && icon,
          "p-3": size === "md" && icon,
          "p-2": size === "sm" && icon,
        },
        className,
      )}
    >
      {children}
    </Link>
  );
}
