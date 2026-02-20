"use server";

import { api } from "@/lib/api-server";
import { APIResponse } from "@/types/models/base";
import { Category } from "@/types/models/category";
import { cacheLife, cacheTag } from "next/cache";

export async function getCategories() {
  "use cache";
  cacheTag("categories");
  cacheLife("max");

  const res = await api<APIResponse<Category[]>>("/categories/parents");

  return res.data;
}
