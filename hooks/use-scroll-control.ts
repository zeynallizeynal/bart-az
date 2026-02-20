import React from "react";

interface UseScrollControlOptions {
  itemSelector: string;
}

export function useScrollControl({ itemSelector }: UseScrollControlOptions) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = React.useState(false);
  const [showRightArrow, setShowRightArrow] = React.useState(true);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    setShowLeftArrow(container.scrollLeft > 0);

    setShowRightArrow(
      Math.ceil(container.scrollLeft) <
        Math.ceil(container.scrollWidth - container.offsetWidth)
    );
  };

  React.useEffect(() => {
    handleScroll();
    const observer = new ResizeObserver(handleScroll);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (!container) return;

    const buttonElement = container.querySelector(itemSelector) as HTMLElement;
    if (!buttonElement) return;

    const scrollAmount = buttonElement.offsetWidth;
    const targetScroll =
      container.scrollLeft +
      (direction === "left" ? -scrollAmount : scrollAmount);

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  return {
    scroll,
    showLeftArrow,
    showRightArrow,
    containerRef,
    handleScroll,
  };
}
