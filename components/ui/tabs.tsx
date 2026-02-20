"use client";

import React, { ComponentProps, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TabProps extends React.ComponentProps<"button"> {
  children?: React.ReactNode;
  isPillActive?: boolean;
  isIndicatorActive?: boolean;
  layout?: boolean | "position" | "size" | "preserve-aspect";
}

interface TabsContextProps {
  activeIndicatorId: string;
  activePillId: string;
}

interface TabsProviderProps extends ComponentProps<"div"> {
  children: React.ReactNode;
}

const TabsContext = React.createContext<TabsContextProps | null>(null);
 function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (!context)
    throw new Error(
      "useTabsContext cannot be used outside of the TabsProvider",
    );
  return context;
}

export function Tabs({ children, className, ...etc }: TabsProviderProps) {
  const id = useId();
  const activeIndicatorId = `indicated-tab${id}`;
  const activePillId = `active-tab${id}`;

  return (
    <TabsContext.Provider value={{ activeIndicatorId, activePillId }}>
      <div
        role="tablist"
        data-orientation={etc["aria-orientation"]}
        className={cn(
          "flex",
          etc["aria-orientation"] === "vertical" ? "flex-col" : "items-center",
          className,
        )}
        {...etc}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function Tab(props: TabProps) {
  const { activePillId, activeIndicatorId } = useTabsContext();
  const {
    children,
    isPillActive,
    className,
    isIndicatorActive,
    layout,
    ...etc
  } = props;

  const active = isPillActive ? "pill" : isIndicatorActive ? "indicator" : null;

  return (
    <button
      role="tab"
      data-active={active}
      className={cn("relative center shrink-0 active:!scale-100", className)}
      {...etc}
    >
      <AnimatePresence>
        {isPillActive && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            layoutId={activePillId}
            layout={layout}
            data-active-pill=""
            className="absolute inset-0"
          />
        )}
      </AnimatePresence>
      <span className="relative z-[1] shrink-0">{children}</span>
      <AnimatePresence>
        {isIndicatorActive && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            layoutId={activeIndicatorId}
            layout={layout}
            data-active-indicator=""
            className="absolute w-full bg-blue-500 bottom-0 rounded-xl"
            transition={{
              type: "spring",
              bounce: 0.2,
              duration: 0.5,
            }}
          />
        )}
      </AnimatePresence>
    </button>
  );
}

export function TabDefault(props: TabProps) {
  return (
    <Tab
      {...props}
      className={cn(
        "px-6 h-[60px] rounded-md data-[active=indicator]:font-bold data-[active=indicator]:text-gray-900 font-medium text-gray-600 [&_[data-active-indicator]]:h-[3px]",
      )}
    />
  );
}
