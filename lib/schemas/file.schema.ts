import { z } from "zod";

export const uploadFileSchema = z.object({
  file: z
    .file()
    .min(1)
    .max(10 * 1024 * 1024),
});
