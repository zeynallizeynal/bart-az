"use client";

import { updateProfile } from "@/actions/profile.action";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Radio } from "@/components/ui/radio";
import { queryClient } from "@/lib/query-client";
import { updateProfileSchema } from "@/lib/schemas/profile.schema";
import { useGetProfileQuery } from "@/services/profile.service";
import { BoolStatus } from "@/types/models/base";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "bartaz-icons";
import { format } from "date-fns";
import { Upload } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { LuCloudUpload } from "react-icons/lu";
import { toast } from "sonner";

export const symbolRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/;

export default function SettingsForm() {
  const { data: profile, isPending: isPendingProfile } = useGetProfileQuery();
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    hasMinLength: false,
    hasUppercase: false,
    hasDigit: false,
    hasSymbol: false,
  });

  const form = useForm({
    resolver: zodResolver(updateProfileSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (!isPendingProfile && profile) {
      form.reset({
        birthday: profile.birthday,
        email: profile.email,
        gender: profile.gender?.toString() as BoolStatus,
        name: profile.name,
        phone: profile.phone,
        whatsapp: profile.whatsapp,
      });
    }
  }, [isPendingProfile, profile, form]);

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    const password = event.target.value;
    const strength = {
      score: 0,
      hasMinLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasDigit: /\d/.test(password),
      hasSymbol: symbolRegex.test(password),
    };
    strength.score = Object.values(strength).filter(Boolean).length;
    setPasswordStrength(strength);
  }

  const passwordProgress = (passwordStrength.score / 4) * 100;

  return (
    <form
      onSubmit={form.handleSubmit(async (formData) => {
        try {
          const res = await updateProfile(formData);
          toast.success(res.message);
          queryClient.invalidateQueries({
            queryKey: ["profile"],
          });
        } catch (err) {
          toast.error((err as Error).message);
        }
      })}
      className="flex flex-col px-6 py-5 border border-gray-200 gap-10 rounded-3xl"
    >
      <div className="space-y-6">
        <h6 className="text-gray-800 font-semibold">Şəxsi məlumatlar</h6>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <div className="text-gray-500 font-semibold text-base md:block hidden">
              Profil şəkliniz
            </div>
            <div className="md:grid hidden grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-200 px-6 py-4 flex flex-col items-center gap-3">
                <span className="size-10 border border-gray-200 rounded-lg center text-gray-500">
                  <LuCloudUpload size={20} />
                </span>
                <div className="flex flex-col gap-1 text-sm text-gray-600 items-center">
                  <div>
                    <span className="text-blue-600 font-semibold mr-1">
                      Şəkil yükləmək üçün klikləyin
                    </span>
                    yada dartıb atın
                  </div>
                  <div>SVG, PNG, JPG or GIF (max. 800x800px)</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="relative">
                  <Image
                    src="/images/profile_placeholder.png"
                    alt="Name"
                    width={126}
                    height={126}
                  />
                  <button
                    aria-label="Şəkili sil"
                    type="button"
                    className="rounded-xl hover:bg-error-700 bg-red-600 text-background size-9 center absolute bottom-0 right-0"
                  >
                    <Trash width={20} height={20} />
                  </button>
                </div>
              </div>
            </div>
            <div className="md:hidden flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Image
                  src="/images/profile_placeholder.png"
                  width={64}
                  height={64}
                  alt="Shahin Mammadov"
                />
                <div className="space-y-1">
                  <div className="text-base text-gray-800 font-medium">
                    Şəkil yükləmək üçün klikləyin
                  </div>
                  <div className="text-gray-500 text-xs">
                    JPG, PNG, Bitmap, 3 MB-dan çox olmayan
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="border border-blue-200 rounded-lg inline-flex gap-1.5 text-blue-600 text-sm font-semibold leading-5 px-4 py-3 hover:bg-blue-600 hover:text-background hover:border-transparent transition focus-visible:bg-blue-700"
              >
                <Upload size={20} />
                Fayl yüklə
              </button>
            </div>
          </div>
          <Input
            label="Adınız"
            type="text"
            {...form.register("name")}
            error={form.formState.errors.name}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Telefon nömrəniz"
              type="tel"
              {...form.register("phone")}
              error={form.formState.errors.phone}
            />
            <Input
              label="Whatsapp nömrəniz"
              type="tel"
              {...form.register("whatsapp")}
              error={form.formState.errors.whatsapp}
            />
          </div>
          <Controller
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <DatePicker
                label="Doğum tarixi"
                value={field.value ? new Date(field.value) : undefined}
                onValueChange={(date) =>
                  field.onChange(date ? format(date, "yyyy-MM-dd") : undefined)
                }
              />
            )}
          />
          <div className="flex items-center gap-3">
            <Controller
              render={({ field }) => (
                <Radio
                  name="gender"
                  value="1"
                  onChange={(event) => field.onChange(event.target.value)}
                  checked={field.value === "1"}
                >
                  Male
                </Radio>
              )}
              control={form.control}
              name="gender"
            />
            <Controller
              render={({ field }) => (
                <Radio
                  name="gender"
                  value="2"
                  onChange={(event) => field.onChange(event.target.value)}
                  checked={field.value === "2"}
                >
                  Female
                </Radio>
              )}
              control={form.control}
              name="gender"
            />
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <h6 className="text-gray-800 font-semibold">
          Təhlükəsizlik məlumatları
        </h6>
        <div className="flex flex-col gap-6">
          <Input
            label="E-mailiniz"
            type="text"
            {...form.register("email")}
            error={form.formState.errors.email}
          />
          {/* <Input
            label="Köhnə şifrəniz"
            type="password"
            {...form.register("oldPassword")}
            error={form.formState.errors.oldPassword}
          /> */}
          {/* <div className="space-y-3">
            <Input
              label="Yeni şifrəniz"
              type="password"
              {...form.register("newPassword", {
                onChange: handlePasswordChange,
              })}
              error={form.formState.errors.newPassword}
            />
            <Progress
              value={passwordProgress}
              className="bg-gray-200 h-1 [&_div]:bg-success-500"
            />
            <div className="font-semibold">Şifrənizdə olmalı simvollar:</div>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-1">
                <CheckCircle2
                  size={20}
                  className={cn(
                    "transition",
                    passwordStrength.hasMinLength
                      ? "text-success-600"
                      : "text-gray-500",
                  )}
                />
                Minimum 8 simvol
              </li>
              <li className="flex items-center gap-1">
                <CheckCircle2
                  size={20}
                  className={cn(
                    "transition",
                    passwordStrength.hasUppercase
                      ? "text-success-600"
                      : "text-gray-500",
                  )}
                />
                Böyük hərf
              </li>
              <li className="flex items-center gap-1">
                <CheckCircle2
                  size={20}
                  className={cn(
                    "transition",
                    passwordStrength.hasDigit
                      ? "text-success-600"
                      : "text-gray-500",
                  )}
                />
                Rəqəm
              </li>
              <li className="flex items-center gap-1">
                <CheckCircle2
                  size={20}
                  className={cn(
                    "transition",
                    passwordStrength.hasSymbol
                      ? "text-success-600"
                      : "text-gray-500",
                  )}
                />
                İşarələr
              </li>
            </ul>
          </div> */}
          {/* <Input
            label="Yeni şifrənizi təsdiq edin"
            type="password"
            {...form.register("confirmPassword")}
            error={form.formState.errors.confirmPassword}
          /> */}
        </div>
      </div>
      <Button
        type="submit"
        className="md:w-fit"
        loading={form.formState.isSubmitting}
      >
        Yadda Saxla
      </Button>
    </form>
  );
}
