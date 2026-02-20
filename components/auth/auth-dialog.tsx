"use client";

import { Dialog, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Profile } from "@/components/icons/others";
import { cn } from "@/lib/utils";
import LoginForm from "@/components/auth/login-form";
import SignupForm from "@/components/auth/signup-form";
import DefaultDialog from "@/components/default-dialog";
import AuthSuccess from "@/components/auth/auth-success";
import { useAuthDialogStore } from "@/stores/auth.store";
import { ReactNode, useEffect } from "react";
import { useSearchParams } from "@/hooks/use-search-params";

type PolymorphicProps<
  T extends React.ElementType,
  OwnProps = object,
> = OwnProps & {
  as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, keyof OwnProps | "as">;

type AuthDialogTriggerProps<T extends React.ElementType = "button"> =
  PolymorphicProps<T> & {
    redirectOnLogin?: string;
  };

export function AuthDialogTrigger({
  as,
  redirectOnLogin,
  ...props
}: AuthDialogTriggerProps) {
  const Component = as || "button";

  const { setOpen } = useAuthDialogStore();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (redirectOnLogin) searchParams.set("redirectTo", redirectOnLogin);
    else searchParams.delete("redirectTo");
  }, [redirectOnLogin]);

  return (
    <Component
      {...props}
      onClick={(event) => {
        setOpen(true);
        props?.onClick?.(event);
      }}
    />
  );
}

export function AuthDialog({ trigger }: { trigger?: ReactNode }) {
  const { open, setOpen, dialogPage, setDialogPage, registerPage } =
    useAuthDialogStore();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger ?? (
        <DialogTrigger className="inline-flex items-center gap-1.5">
          <Profile size={24} />
          Giriş və qeydiyyat
        </DialogTrigger>
      )}
      <DefaultDialog>
        {dialogPage === "success" ? (
          <AuthSuccess />
        ) : (
          <>
            <DialogTitle>Şəxsi kabinetə giriş</DialogTitle>
            <div className="space-y-6">
              <div className="flex shrink-0">
                <button
                  className={cn(
                    "flex-1 h-12 border-b-2 transition border-gray-300 text-gray-600 font-medium",
                    dialogPage === "login" &&
                      "border-blue-600 text-blue-600 text-base font-bold",
                  )}
                  onClick={() => setDialogPage("login")}
                >
                  Giriş
                </button>
                <button
                  className={cn(
                    "flex-1 h-12 border-b-2 transition",
                    dialogPage === "register" &&
                      "border-blue-600 text-blue-600 text-base font-bold",
                  )}
                  onClick={() => setDialogPage("register")}
                >
                  Qeydiyyat
                </button>
              </div>
              {dialogPage === "login" && <LoginForm />}
              {dialogPage === "register" && (
                <>
                  {registerPage === "form" && <SignupForm />}
                  {registerPage === "success" && <AuthSuccess />}
                </>
              )}
            </div>
          </>
        )}
      </DefaultDialog>
    </Dialog>
  );
}
