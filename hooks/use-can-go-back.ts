"use client";

import { useEffect, useState } from "react";

export function useCanGoBack() {
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    const checkCanGoBack = () => {
      const canGoBack =
        window.history.length > 1 && window.history.state != null;
      setCanGoBack(canGoBack);
    };

    checkCanGoBack();

    window.addEventListener("popstate", checkCanGoBack);
    window.addEventListener("pushstate", checkCanGoBack);
    window.addEventListener("replacestate", checkCanGoBack);

    return () => {
      window.removeEventListener("popstate", checkCanGoBack);
      window.removeEventListener("pushstate", checkCanGoBack);
      window.removeEventListener("replacestate", checkCanGoBack);
    };
  }, []);

  return canGoBack;
}
