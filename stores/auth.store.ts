"use client";

import { User } from "@/types/models/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  profile: User | null;
  setProfile: (profile: User | null) => void;
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

type AuthDialogPage = "login" | "register" | "success";
type AuthRegisterPage = "form" | "email" | "success";
type AuthLoginPage = "form" | "forgot-password" | "reset-password" | "success";

interface AuthDialogStore {
  dialogPage: AuthDialogPage;
  setDialogPage: (page: AuthDialogPage) => void;
  registerPage: AuthRegisterPage;
  setRegisterPage: (page: AuthRegisterPage) => void;
  loginPage: AuthLoginPage;
  setLoginPage: (page: AuthLoginPage) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}
export const useAuthDialogStore = create<AuthDialogStore>((set) => ({
  dialogPage: "login",
  setDialogPage: (page) => set({ dialogPage: page }),
  registerPage: "form",
  setRegisterPage: (page) => set({ registerPage: page }),
  loginPage: "form",
  setLoginPage: (page) => set({ loginPage: page }),
  open: false,
  setOpen: (open) =>
    set((state) => {
      if (!open)
        return {
          ...state,
          open: false,
          dialogPage: "login",
          registerPage: "form",
          loginPage: "form",
        };
      else return { ...state, open: true };
    }),
}));
