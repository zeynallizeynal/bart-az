import z from "zod";
import { az } from "zod/locales";

z.config(az());

export const loginSchema = z.object({
  email: z.email().min(1),
  password: z.string().min(1),
});

export const registerSchema = loginSchema
  .safeExtend({
    name: z.string().min(1),
    password: z
      .string()
      .min(10)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
        "Şifrə minimum 1 simvol, 1 hərf (böyük və balaca), 1 rəqəmdən ibarət olmalıdır.",
      ),
    password_confirmation: z.string().min(1),
    phone: z.string().min(1),
    whatsapp: z.string().min(1),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Şifrələr üst-üstə düşmür",
    path: ["password_confirmation"],
  });
