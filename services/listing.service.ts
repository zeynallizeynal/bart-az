"use client";

import { getListingTypes } from "@/actions/listing.action";
import { ListingType } from "@/types/models/listing";
import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";

export function useGetListingTypesQuery(
  options?: Partial<UndefinedInitialDataOptions<ListingType[]>>,
) {
  return useQuery({
    queryKey: ["listing-types"],
    queryFn: async () => {
      const data = await getListingTypes();
      return data.data;
    },
    staleTime: 24 * 60 * 60 * 1000, // 1 day
    ...options,
  });
}
