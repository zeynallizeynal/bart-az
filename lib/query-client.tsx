"use client";
import {
  QueryClient,
  QueryClientProviderProps,
  QueryClientProvider as QueryProvider,
} from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  },
});

export function QueryClientProvider(
  props: Omit<QueryClientProviderProps, "client">,
) {
  return <QueryProvider {...props} client={queryClient} />;
}
