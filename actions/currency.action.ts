"use server";

import { api } from "@/lib/api-server";
import { APIResponse } from "@/types/models/base";
import { cacheLife, cacheTag } from "next/cache";
import { Currency } from "@/types/models/currency";

export async function getCurrencies() {
  "use cache";
  cacheTag("currencies");
  cacheLife("max");
  const res = await api<APIResponse<Currency[]>>("/currencies");
  return res.data;
}
