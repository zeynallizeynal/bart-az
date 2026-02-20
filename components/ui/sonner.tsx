"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import {
  CheckCircleFill,
  InfoCircleFill,
  WarningFill,
  XClose,
} from "../icons/others";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      position="bottom-right"
      className="pointer-events-auto"
      closeButton
      icons={{
        error: <WarningFill />,
        success: <CheckCircleFill />,
        info: <InfoCircleFill />,
        warning: <InfoCircleFill />,
        close: <XClose className="size-5" />,
      }}
      toastOptions={{
        unstyled: true,
        className:
          "w-180 min-h-14 text-sm gap-3 font-medium flex bg-background items-center shadow rounded-xl px-4",
        classNames: {
          closeButton: "order-3 ml-auto",
          error: "bg-error-50 text-error-600",
          success: "bg-success-50 text-success-600",
          warning: "bg-warning-50 text-warning-600",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
