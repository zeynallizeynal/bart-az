"use server";

import { api, apiAuth } from "@/lib/api-server";
import {
  createListingSchema,
  updateListingSchema,
} from "@/lib/schemas/listing.schema";
import { APIResponse } from "@/types/models/base";
import { Listing, ListingType } from "@/types/models/listing";
import { cacheLife, cacheTag, updateTag } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";
import { upload } from "./upload.action";

export async function getListings(
  query: Partial<{
    search: string;
    city_id: string;
    vip: string;
    special: string;
    price_to: string;
    price_from: string;
    sort_by: string;
    sort_order: string;
    user_id: string;
    category_id: string;
    per_page: string;
    page: string;
  }> = {
    per_page: "8",
    page: "1",
  },
) {
  "use cache";
  cacheTag("listings", ...Object.values(query ?? {}).filter(Boolean));
  cacheLife("hours");

  const sp = new URLSearchParams();
  sp.set("per_page", "8");
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value && value !== "false") {
      sp.set(key, value);
    }
  }

  const res = await api<APIResponse<Listing[]>>(`/adv?${sp.toString()}`);

  return res.data;
}

export async function createListing(data: z.infer<typeof createListingSchema>) {
  try {
    const store = await cookies();
    const { image, images, ...validData } =
      await createListingSchema.parseAsync(data);

    let uploadedCoverImage: string | undefined,
      uploadedImages: string[] | undefined;
    if (image) uploadedCoverImage = (await upload({ file: image })).data.path;
    if (images && images?.length > 0)
      uploadedImages = await Promise.all(
        images.map(async (i) => (await upload({ file: i })).data.path),
      );

    const res = await api.post<APIResponse<Listing>>(
      "/adv",
      { ...validData, image: uploadedCoverImage, images: uploadedImages },
      {
        headers: {
          Authorization: store.get("access_token")?.value
            ? `Bearer ${store.get("access_token")?.value}`
            : "",
        },
      },
    );

    updateTag("listings");

    return res.data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message);
  }
}

export async function updateListing(data: z.infer<typeof updateListingSchema>) {
  try {
    const store = await cookies();
    const {
      image,
      images,
      id,
      uploadedImageUrls = [],
      ...validData
    } = await updateListingSchema.parseAsync(data);

    let uploadedCoverImage: string | undefined,
      uploadedImages: string[] | undefined;
    if (image) uploadedCoverImage = (await upload({ file: image })).data.path;

    if (images && images?.length > 0)
      uploadedImages = await Promise.all(
        images.map(async (i) => (await upload({ file: i })).data.path),
      );

    const res = await api.patch<APIResponse<Listing>>(
      `/adv/${id}`,
      {
        ...validData,
        ...(uploadedCoverImage && { image: uploadedCoverImage }),
        images: [...uploadedImageUrls, ...(uploadedImages ?? [])],
      },
      {
        headers: {
          Authorization: store.get("access_token")?.value
            ? `Bearer ${store.get("access_token")?.value}`
            : "",
        },
      },
    );

    updateTag("listings");

    return res.data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message);
  }
}

export async function deleteListing(id: number) {
  try {
    const res = await apiAuth.delete<APIResponse>(`/adv/${id}`);

    updateTag("listings");

    return res.data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message);
  }
}

export async function getListingById(id: string) {
  const res = await api<APIResponse<Listing>>(`/adv/${id}`);

  return res.data;
}

export async function getListingBySlug(slug: string) {
  try {
    const res = await api<APIResponse<Listing>>(`/adv/slug/${slug}`);

    return res.data;
  } catch {
    return null;
  }
}

export async function getListingTypes() {
  "use cache";
  cacheTag("listing-types");
  cacheLife("max");

  const res = await api<APIResponse<ListingType[]>>("/types");

  return res.data;
}
