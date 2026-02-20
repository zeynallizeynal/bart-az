"use server";

import { apiAuth } from "@/lib/api-server";
import { APIResponse } from "@/types/models/base";
import { z, ZodError } from "zod";
import { uploadFileSchema } from "@/lib/schemas/file.schema";
import { Image } from "@/types/models/file";

export async function upload(data: z.infer<typeof uploadFileSchema>) {
  try {
    const validData = uploadFileSchema.parse(data);
    const formData = new FormData();
    formData.append("image", validData.file);

    const res = await apiAuth.post<APIResponse<Image>>(
      "/upload/image",
      formData,
    );

    return res.data;
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(z.prettifyError(err));
    } else if (err.response?.data?.message)
      throw new Error(err.response?.data?.message);
    else throw new Error(err.message);
  }
}
