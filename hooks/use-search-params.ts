"use client";

import {
  usePathname,
  useRouter,
  useSearchParams as useSearchParamsNext,
} from "next/navigation";
import { useCallback, useMemo } from "react";

export function useSearchParams(): URLSearchParams & {
  clear(): void;
  size: number;
  setMany(entries: { key: string; value: string }[]): void;
} {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParamsNext();

  const updateSearchParams = useCallback(
    (temp: URLSearchParams) => {
      router.push(`${pathname}?${temp.toString()}`, { scroll: false });
    },
    [router, pathname],
  );

  return useMemo(() => {
    const temp = new URLSearchParams(searchParams);

    return Object.assign(temp, {
      ...searchParams,
      set(name: string, value: string) {
        const updated = new URLSearchParams(searchParams);
        updated.set(name, value);
        updateSearchParams(updated);
      },
      setMany(entries: { key: string; value: string }[]) {
        const updated = new URLSearchParams(searchParams);
        entries.forEach(({ key, value }) => {
          updated.set(key, value);
        });
        updateSearchParams(updated);
      },
      append(name: string, value: string) {
        const updated = new URLSearchParams(searchParams);
        updated.append(name, value);
        updateSearchParams(updated);
      },
      delete(name: string, value?: string) {
        const updated = new URLSearchParams(searchParams);
        updated.delete(name, value);
        updateSearchParams(updated);
      },
      sort() {
        const updated = new URLSearchParams(searchParams);
        updated.sort();
        updateSearchParams(updated);
      },
      clear() {
        router.push(pathname);
      },
      keys() {
        return Array.from(searchParams.keys());
      },
      values() {
        return Array.from(searchParams.values());
      },
    });
  }, [pathname, router, searchParams, updateSearchParams]);
}
