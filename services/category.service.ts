"use client";

import { getCategories } from "@/actions/category.action";
import { Category } from "@/types/models/category";
import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";

export function useGetCategoriesQuery(
  options?: Partial<UndefinedInitialDataOptions<Category[]>>,
) {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const data = await getCategories();
      return data.data;
    },
    staleTime: 30 * 24 * 60 * 60 * 1000, // 30 days
    ...options,
  });
}
