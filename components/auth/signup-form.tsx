import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/schemas";
import { Input } from "@/components/ui/input";
import Checkbox from "@/components/ui/checkbox";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/spinner";
import { register as registerAction } from "@/actions/auth.action";
import { toast } from "sonner";
import { useAuthDialogStore, useAuthStore } from "@/stores/auth.store";
import ConfirmEmailForm from "@/components/auth/confirm-email-form";
import { queryClient } from "@/lib/query-client";

export default function SignupForm() {
  const { registerPage, setDialogPage } = useAuthDialogStore();
  const [saveCheck, setSaveCheck] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { setProfile } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    values: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      phone: "",
      whatsapp: "",
    },
  });

  if (registerPage === "email") return <ConfirmEmailForm message="test" />;

  return (
    <form
      className="flex flex-col gap-6 animate-in fade-in-0 zoom-in-95 duration-500"
      onSubmit={handleSubmit((data) => {
        startTransition(async () => {
          const res = await registerAction(data);
          if (res.success) {
            setProfile(res.data?.user);
            // setRegisterPage("email");
            setDialogPage("success");
            queryClient.invalidateQueries({
              queryKey: ["profile"],
            });
            toast.success(res.message);
          } else {
            toast.error(res.message);
          }
        });
      })}
    >
      <div className="flex flex-col gap-4 w-full">
        <Input
          label="Ad"
          type="text"
          {...register("name")}
          error={errors.name}
        />
        <Input
          label="E-mail"
          type="email"
          {...register("email")}
          error={errors.email}
        />
        <Input
          label="Telefon"
          type="tel"
          {...register("phone")}
          error={errors.phone}
        />
        <Input
          label="Whatsapp"
          type="tel"
          {...register("whatsapp")}
          error={errors.whatsapp}
        />
        <Input
          label="Şifrə"
          type="password"
          {...register("password")}
          error={errors.password}
        />
        <Input
          label="Şifrənin təsdiqi"
          type="password"
          {...register("password_confirmation")}
          error={errors.password_confirmation}
        />
      </div>
      <div>
        <Checkbox
          checked={saveCheck}
          size="lg"
          onCheck={() => setSaveCheck((prevState) => !prevState)}
          className="text-default-sm h-10"
        >
          Qeydiyyatdan keçərək bart.az-ın{" "}
          <Link href="#" className="text-blue-600 underline">
            istifadəçi razılaşması
          </Link>{" "}
          və{" "}
          <Link href="#" className="text-blue-600 underline">
            məxfilik siyasəti
          </Link>{" "}
          ilə razılaşıram.
        </Checkbox>
      </div>
      <Button type="submit" size="lg" loading={isPending}>
        Qeydiyyatdan keç {isPending && <Spinner />}
      </Button>
    </form>
  );
}
