"use server";

import { api, apiAuth } from "@/lib/api-server";
import { APIResponse } from "@/types/models/base";
import { cacheLife, cacheTag, updateTag } from "next/cache";
import { Business } from "@/types/models/business";
import z from "zod";
import { createBusinessAppealSchema } from "@/lib/schemas/business.schema";

export async function getBusinesses({ search } = { search: "" }) {
  "use cache";
  cacheTag("businesses", search);
  cacheLife("hours");

  const query = new URLSearchParams();
  if (search) query.set("search", search);

  const res = await api<APIResponse<Business[]>>(
    `/businesses?${query.toString()}`,
  );

  return res.data;
}

export async function createBusinessAppeal(
  data: z.infer<typeof createBusinessAppealSchema>,
) {
  try {
    const validData = await createBusinessAppealSchema.parseAsync(data);
    const res = await apiAuth.post<APIResponse>("/business-appeals", validData);
    updateTag("business-appeals");
    return res.data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message);
  }
}

// export async function createBusiness(
//   data: z.infer<typeof createBusinessSchema>,
// ) {
//   try {
//     const validData = createBusinessSchema.parse(data);
//     const res = await apiAuth.post<APIResponse<Business>>(
//       "/businesses",
//       validData,
//     );
//     updateTag("businesses");
//
//     return res.data;
//   } catch (err: any) {
//     return err.data as APIResponse;
//   }
// }

export async function getBusinessById(id: string) {
  const res = await api<APIResponse<Business>>(`/businesses/${id}`);

  return res.data;
}

export async function getBusinessBySlug(slug: string) {
  try {
    const res = await api<APIResponse<Business>>(`/businesses/slug/${slug}`);

    return res.data;
  } catch (err: any) {
    return null;
  }
}
