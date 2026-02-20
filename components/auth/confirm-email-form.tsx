import { useTransition } from "react";
import { Input } from "@/components/ui/input";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/spinner";
import { useAuthDialogStore } from "@/stores/auth.store";

export default function SignupForm({ message }: { message: string }) {
  const { setRegisterPage } = useAuthDialogStore();
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      confirmationCode: "",
    },
  });

  function onSubmit(data: FieldValues) {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setRegisterPage("success");
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 animate-in fade-in-0 zoom-in-95 duration-500"
    >
      <p className="font-medium text-gray-800">{message}</p>
      <Input
        label="Təsdiq kodu"
        {...register("confirmationCode", {
          required: true,
        })}
        error={errors.confirmationCode}
      />
      <p className="text-gray-800 font-medium">
        Tədiq kodu gəlməyib?{" "}
        <button type="button" className="underline text-blue-600">
          Yenidən göndər
        </button>
      </p>
      <Button type="submit">Qeydiyyatı bitir {isPending && <Spinner />}</Button>
    </form>
  );
}
