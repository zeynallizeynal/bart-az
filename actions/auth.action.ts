"use server";

import { apiAuth } from "@/lib/api-server";
import { loginSchema, registerSchema } from "@/lib/schemas";
import { APIResponse } from "@/types/models/base";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

export async function register(data: z.infer<typeof registerSchema>) {
  try {
    const cookie = await cookies();
    const res = await apiAuth.post("/register", data);
    cookie.set("access_token", res.data.data.access_token, {
      secure: false,
      httpOnly: true,
      path: "/",
      maxAge: res.data.data.expires_in,
    });
    updateTag("profile");
    return res.data;
  } catch (err: any) {
    return (err.response?.data || {
      success: false,
      message: "Xəta baş verdi",
    }) as APIResponse;
  }
}

export async function login(data: z.infer<typeof loginSchema>) {
  try {
    const cookie = await cookies();
    const res = await apiAuth.post("/login", data);

    cookie.set("access_token", res.data.data.access_token, {
      secure: false,
      httpOnly: true,
      path: "/",
      maxAge: res.data.data.expires_in,
    });

    updateTag("profile");

    return res.data;
  } catch (err: any) {
    return (err.response?.data || {
      success: false,
      message: "Xəta baş verdi",
    }) as APIResponse;
  }
}

export async function logout() {
  try {
    const cookie = await cookies();
    const res = await apiAuth.post("/logout");

    cookie.delete("access_token");

    updateTag("profile");
    return res.data;
  } catch (err) {
    return err as APIResponse;
  }
}
