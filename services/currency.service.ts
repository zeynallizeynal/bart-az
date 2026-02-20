"use client";

import { getCurrencies } from "@/actions/currency.action";
import { Currency } from "@/types/models/currency";
import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";

export function useGetCurrenciesQuery(
  options?: Partial<UndefinedInitialDataOptions<Currency[]>>,
) {
  return useQuery({
    queryKey: ["currencies"],
    queryFn: async () => {
      const data = await getCurrencies();
      return data.data;
    },
    staleTime: 12 * 30 * 24 * 60 * 60 * 1000, // 1 year
    ...options,
  });
}
