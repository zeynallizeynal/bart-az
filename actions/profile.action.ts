"use server";

import { apiAuth } from "@/lib/api-server";
import { updateProfileSchema } from "@/lib/schemas/profile.schema";
import { APIResponse } from "@/types/models/base";
import { User } from "@/types/models/user";
import { cacheTag, cacheLife, updateTag } from "next/cache";
import z from "zod";

export async function getProfile() {
  "use cache: private";
  cacheTag("profile");
  cacheLife("hours");
  try {
    const res = await apiAuth<APIResponse<{ user: User }>>("/user");
    return res.data;
  } catch {
    return null;
  }
}

export async function updateProfile(data: z.infer<typeof updateProfileSchema>) {
  try {
    const validData = updateProfileSchema.parse(data)
    const res = await apiAuth.post<APIResponse<{ user: User }>>("/user/update", validData)
    updateTag("profile");
    return res.data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message);
  }
}
