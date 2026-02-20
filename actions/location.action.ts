"use server";

import { api } from "@/lib/api-server";
import { APIResponse } from "@/types/models/base";
import { City } from "@/types/models/location";
import { cacheLife, cacheTag } from "next/cache";

export async function getCities() {
  "use cache";
  cacheTag("cities");
  cacheLife("max");
  const res = await api<APIResponse<City[]>>("/locations/cities?per_page=78");
  return res.data;
}
