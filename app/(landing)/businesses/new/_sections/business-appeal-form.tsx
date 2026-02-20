"use client";

import { createBusinessAppeal } from "@/actions/business.action";
import { Send2 } from "@/components/icons/others";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { routes } from "@/constants/routes";
import { createBusinessAppealSchema } from "@/lib/schemas/business.schema";
import { useGetProfileQuery } from "@/services/profile.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function BusinessAppealForm() {
  const { data: profile } = useGetProfileQuery();
  const form = useForm({
    defaultValues: {
      email: profile?.email.toString(),
      fullname: profile?.name.toString(),
      phone: profile?.phone.toString(),
    },
    resolver: zodResolver(createBusinessAppealSchema),
  });
  const router = useRouter();
  return (
    <div className="rounded-custom-xl md:space-y-12 space-y-10 border border-gray-200 p-8 mx-4 lg:mx-0">
      <h2 className="text-gray-900 leading-10 md:text-3xl text-2xl">
        Öz əlaqə vasitələrinizi qeyd edin və biz{" "}
        <span className="text-blue-600">sizinlə</span> əlaqə saxlayaq!
      </h2>
      <form
        className="space-y-5"
        onSubmit={form.handleSubmit(async (formData) => {
          try {
            const res = await createBusinessAppeal(formData);
            form.reset();
            toast.success(res.message);
            router.push(routes.dashboard.root);
          } catch (err: any) {
            toast.error(err.message);
          }
        })}
      >
        <Input
          label="Adınız və soyadınız"
          {...form.register("fullname")}
          error={form.formState.errors?.fullname}
        />
        <Input
          label="Telefon nömrəniz"
          {...form.register("phone")}
          error={form.formState.errors?.phone}
        />
        <Input
          label="E-mail"
          {...form.register("email")}
          error={form.formState.errors?.email}
        />
        <Textarea
          placeholder="Biznesinizi qısa təsvir edin"
          {...form.register("text")}
          error={form.formState.errors?.text}
        />
        <Button
          variant="success"
          className="w-full mt-12!"
          type="submit"
          loading={form.formState.isSubmitting}
        >
          Müraciət et <Send2 />
        </Button>
      </form>
    </div>
  );
}
