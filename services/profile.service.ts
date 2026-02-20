"use client";

import { getProfile } from "@/actions/profile.action";
import { User } from "@/types/models/user";
import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";

export function useGetProfileQuery(
  options?: Partial<UndefinedInitialDataOptions<User | undefined>>,
) {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const data = await getProfile();
      return data?.data.user;
    },
    staleTime: 60 * 60 * 1000, // 1 hour
    ...options,
  });
}
