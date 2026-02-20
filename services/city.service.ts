"use client";

import { getCities } from "@/actions/location.action";
import { City } from "@/types/models/location";
import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";

export function useGetCitiesQuery(
  options?: Partial<UndefinedInitialDataOptions<City[]>>,
) {
  return useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const data = await getCities();
      return data.data;
    },
    staleTime: 12 * 30 * 24 * 60 * 60 * 1000, // 1 year
    ...options,
  });
}
