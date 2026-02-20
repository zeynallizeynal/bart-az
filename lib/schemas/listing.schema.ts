import { z } from "zod";
import { booleanSchema } from "@/lib/schemas/index";

export const createListingSchema = z
  .object({
    name: z.string().min(1),
    category_id: z.string().min(1),
    text: z.string().min(1),
    business_id: z.string().optional(),
    city_id: z.string().optional(),
    type_id: z.string().optional(),
    head_category_id: z.string().optional(),
    price: z.string().optional(),
    sale: z.string().optional(),
    currency_id: z.string().optional(),
    barter: booleanSchema.default("2"),
    credit: booleanSchema.default("2"),
    discount: booleanSchema.default("2"),
    gift: booleanSchema.optional().default("2"),
    vip: booleanSchema.optional().default("2"),
    special: booleanSchema.optional().default("2"),
    status: z.enum(["1", "0"]).optional().default("1"),
    expired_at: z.iso.datetime().optional(),
    user_id: z.string().optional(),
    user_name: z.string().optional(),
    user_phone: z.string().optional(),
    user_email: z.email().optional(),
    image: z
      .file()
      .max(5 * 1024 * 1024)
      .optional(),
    images: z.array(z.file().max(5 * 1024 * 1024)).optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.user_id) {
      if (!data.user_name) {
        ctx.addIssue({
          code: "custom",
          message: "user_name is required when user_id is not provided",
          path: ["user_name"],
        });
      }
      if (!data.user_phone) {
        ctx.addIssue({
          code: "custom",
          message: "user_phone is required when user_id is not provided",
          path: ["user_phone"],
        });
      }
      if (!data.user_email) {
        ctx.addIssue({
          code: "custom",
          message: "user_email is required when user_id is not provided",
          path: ["user_email"],
        });
      }
    }
  });

export const updateListingSchema = createListingSchema.safeExtend({
  uploadedImageUrls: z.array(z.string()).optional(),
  id: z.number().min(1),
});
