"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowLeft } from "@/components/icons/others";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "react-responsive";

interface SearchFilterContextProps {
  isOpen: boolean;
  filterSidebarId: string;
  toggle: () => void;
}

const SearchFilterContext =
  React.createContext<SearchFilterContextProps | null>(null);

export function useSearchFilterContext() {
  const context = React.useContext(SearchFilterContext);
  if (!context)
    throw new Error("useSearchFilterContext must be used within the context");
  return context;
}

export function SearchFilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const id = React.useId();
  const isDesktopMode = useMediaQuery({
    query: "(min-width: 768px)",
  });

  const filterSidebarId = `filter-sidebar-:${id}`;

  function toggle() {
    if (isDesktopMode) setIsOpen((prevState) => !prevState);
  }

  return (
    <SearchFilterContext.Provider value={{ isOpen, toggle, filterSidebarId }}>
      {children}
    </SearchFilterContext.Provider>
  );
}

export function SearchFilterTrigger(props: React.ComponentProps<"button">) {
  const { toggle, isOpen } = useSearchFilterContext();
  const { children, className, ...rest } = props;

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.key === "b" || event.key === "B") && event.ctrlKey) {
        event.preventDefault();
        toggle();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggle, isOpen]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={cn(
              "border rounded-xl h-13 justify-start flex items-center text-gray-800 font-semibold gap-2 hover:bg-gray-50 transition-all max-md:hidden",
              isOpen ? "px-3 border-transparent w-80" : "w-fit px-4",
              className,
            )}
            onClick={toggle}
            {...rest}
          >
            {children}
            {isOpen && <ArrowLeft className="ml-auto animate-fade-in" />}
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-gray-800 text-background">
          Ctrl+B
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function SearchFilterSidebar(props: React.ComponentProps<"aside">) {
  const { isOpen, filterSidebarId } = useSearchFilterContext();
  const isDesktopMode = useMediaQuery({
    query: "(min-width: 768px)",
  });
  if (!isDesktopMode) return;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={filterSidebarId}
          animate={{
            width: "320px",
            opacity: 1,
          }}
          initial={{
            width: 0,
            opacity: 0,
          }}
          exit={{
            opacity: 0,
            width: 0,
          }}
          className="shrink-0"
        >
          <aside
            data-search-sidebar
            {...props}
            className={cn("px-3 pb-6 sticky top-0", props.className)}
          >
            <div className="w-full h-px rounded bg-gray-300" />
            {props.children}
          </aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
