import { z } from "zod";
import { booleanSchema } from ".";

export const updateProfileSchema = z.object({
  name: z.string().optional(),
  email: z.email().optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  birthday: z.string().optional(),
  gender: booleanSchema.optional(),
});
