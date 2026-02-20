import { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { LuLoaderCircle } from "react-icons/lu";

export const buttonVariants = cva(
  "rounded-xl border font-medium flex items-center justify-center gap-2 duration-200 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-blue-600 text-background border-transparent active:bg-blue-500 hover:bg-blue-500 focus-visible:bg-blue-500 focus-visible:border-blue-600 disabled:bg-blue-100 disabled:text-gray-400",
        secondary:
          "bg-gray-800 text-background border-gray-700 active:bg-gray-900 hover:bg-gray-900 focus-visible:bg-gray-900 disabled:bg-gray-200 disabled:text-gray-400",
        outline:
          "bg-background text-gray-800 hover:bg-gray-50 focus-visible:bg-gray-50 focus-visible:border-gray-400 disabled:bg-foreground disabled:border-gray-200 disabled:text-gray-300",
        success:
          "bg-success-500 text-background hover:bg-success-600 active:border-gray-300 focus-visible:bg-success-600 disabled:bg-gray-100 disabled:text-gray-500",
        destructive:
          "bg-error-50 border-transparent text-error-500 hover:bg-error-100 focus-visible:bg-error-200 disabled:bg-gray-100 disabled:text-gray-500",
      },
      size: {
        sm: "px-4 h-10 text-sm",
        md: "px-5 h-12",
        lg: "px-6 h-[52px]",
      },
      icon: {
        true: "",
      },
    },
    compoundVariants: [
      {
        size: "lg",
        icon: true,
        className: "p-4",
      },
      {
        size: "md",
        icon: true,
        className: "p-3",
      },
      {
        size: "sm",
        icon: true,
        className: "p-2",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  },
);

interface ButtonProps
  extends
    Omit<ComponentProps<"button">, "className">,
    VariantProps<typeof buttonVariants> {
  className?: string;
  loading?: boolean;
}

export function Button({
  children,
  className,
  variant,
  size,
  icon,
  loading,
  ...etc
}: ButtonProps) {
  return (
    <button
      {...etc}
      type={etc.type || "button"}
      disabled={loading || etc.disabled}
      className={cn(buttonVariants({ variant, size, icon }), className)}
    >
      {loading ? <LuLoaderCircle className="animate-spin size-5" /> : children}
    </button>
  );
}
