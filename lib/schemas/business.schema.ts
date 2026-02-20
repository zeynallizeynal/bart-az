import { z } from "zod";

export const createBusinessSchema = z.object({
  name: z.string().min(1),
  user_id: z.string().min(1),
  category_id: z.string().min(1),
  email: z.email().min(1),
  phone1: z.string().min(1),
  banner: z.string().optional(),
  logo: z.string().optional(),
});

export const createBusinessAppealSchema = z.object({
  fullname: z.string().min(1),
  email: z.email().min(1),
  text: z.string().min(1),
  phone: z.string().min(1),
});
