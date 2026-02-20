import { useCallback, useEffect } from "react";
interface UseRestrictBodyProps {
  condition: boolean;
  preventTab?: boolean;
}

export const useRestrictBody = ({
  condition,
  preventTab,
}: UseRestrictBodyProps) => {
  const getScrollbarWidth = useCallback(() => {
    return window.innerWidth - document.documentElement.clientWidth;
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (condition && preventTab && event.key === "Tab") {
        event.preventDefault();
      }
    };

    const scrollbarWidth = getScrollbarWidth();

    if (condition) {
      // Store current body padding
      const currentPadding = parseInt(
        window
          .getComputedStyle(document.body)
          .getPropertyValue("padding-right"),
        10
      );

      // Apply restrictions
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
      document.body.style.pointerEvents = "none";
    } else {
      // Remove restrictions
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.body.style.pointerEvents = "auto";
    }

    document.addEventListener("keydown", handleKeyDown);

    // Cleanup function to ensure restrictions are removed when component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [condition, getScrollbarWidth, preventTab]);
};

/*
  const getScrollbarWidth = useCallback(() => {
    const outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.overflow = "scroll";
    document.body.appendChild(outer);

    const inner = document.createElement("div");
    outer.appendChild(inner);

    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    outer.parentNode?.removeChild(outer);

    return scrollbarWidth;
  }, []);

  const applyBodyStyles = useCallback(
    (portalExists: boolean, scrollbarWidth: number) => {
      if (portalExists) {
        document.body.style.marginRight = `${scrollbarWidth}px`;
        document.body.style.overflow = "hidden";
        document.body.style.pointerEvents = "none";
      } else {
        document.body.style.marginRight = "0px";
        document.body.style.overflow = "";
        document.body.style.pointerEvents = "auto";
      }
    },
    []
  );

  const handleNestedDialogs = useCallback(() => {
    const dialog = document.body.querySelector("[role=dialog]") as HTMLElement;
    const menu = document.body.querySelector("[role=menu]") as HTMLElement;
    const nestedDialog = !!(dialog && menu);

    if (nestedDialog && menu) {
      dialog.style.pointerEvents = "none";
    } else if (dialog) {
      dialog.style.pointerEvents = "auto";
    }
  }, []);

  useEffect(() => {
    function applyStyles() {
      const portalExists = document.body.querySelector(PORTAL_SELECTOR);
      const scrollbarWidth = getScrollbarWidth();

      applyBodyStyles(!!portalExists, scrollbarWidth);
      handleNestedDialogs();
    }

    applyStyles();

    // Cleanup function
    return () => {
      document.body.style.marginRight = "0px";
      document.body.style.overflow = "";
      document.body.style.pointerEvents = "auto";
    };
  }, [condition, getScrollbarWidth, applyBodyStyles, handleNestedDialogs]);

*/
