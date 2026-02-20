import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/schemas";
import { Input } from "@/components/ui/input";
import Checkbox from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { login } from "@/actions/auth.action";
import { toast } from "sonner";
import { useAuthDialogStore } from "@/stores/auth.store";
import { useSearchParams } from "@/hooks/use-search-params";
import { useRouter } from "next/navigation";
import { queryClient } from "@/lib/query-client";

export default function LoginForm() {
  const { setOpen } = useAuthDialogStore();
  const searchParams = useSearchParams();
  const [saveCheck, setSaveCheck] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: { email: "test@test.com", password: "password1Passwor$" },
    resolver: zodResolver(loginSchema),
  });

  const redirectTo = searchParams.get("redirectTo");

  return (
    <form
      className="flex flex-col gap-6 w-full animate-in fade-in-0 zoom-in-95 duration-500"
      onSubmit={handleSubmit((data) => {
        startTransition(async () => {
          const res = await login(data);
          if (res.success) {
            // setProfile(res.data.user);
            toast.success(res.message);
            setOpen(false);
            queryClient.invalidateQueries({
              queryKey: ["profile"],
            });
            if (redirectTo) router.replace(redirectTo);
          } else {
            toast.error(res.message);
          }
        });
      })}
    >
      <div className="flex flex-col gap-4">
        <Input
          label="E-mail"
          type="text"
          {...register("email")}
          error={errors.email}
        />
        <Input
          label="Şifrə"
          type="password"
          {...register("password")}
          error={errors.password}
        />
      </div>
      <div className="flex items-center justify-between h-[22px]">
        <Checkbox
          checked={saveCheck}
          onCheck={() => setSaveCheck((prevState) => !prevState)}
          className="leading-none"
        >
          Yadda saxla
        </Checkbox>
        <button
          type="button"
          className="text-blue-600 font-medium hover:underline leading-none"
        >
          Şifrəni unutdun?
        </button>
      </div>
      <Button type="submit" loading={isPending}>
        Giriş
      </Button>
    </form>
  );
}
