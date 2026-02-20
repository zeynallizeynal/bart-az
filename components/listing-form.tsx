"use client";

import { createListing, updateListing } from "@/actions/listing.action";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { DefaultSelect } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Upload } from "@/components/ui/upload";
import { createListingSchema } from "@/lib/schemas/listing.schema";
import { useGetCategoriesQuery } from "@/services/category.service";
import { useGetCitiesQuery } from "@/services/city.service";
import { useGetCurrenciesQuery } from "@/services/currency.service";
import { useGetListingTypesQuery } from "@/services/listing.service";
import { useGetProfileQuery } from "@/services/profile.service";
import { Listing } from "@/types/models/listing";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, type PropsWithChildren, ComponentProps } from "react";
import {
  Controller,
  FieldError,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";

export function ListingFormProvider({
  children,
  data,
}: PropsWithChildren & {
  data?: Listing;
}) {
  const { data: currencies } = useGetCurrenciesQuery();
  const { data: profile, isPending: isPendingProfile } = useGetProfileQuery();

  const form = useForm({
    defaultValues: {
      user_id: profile?.id.toString(),
      currency_id:
        data?.currency.id.toString() ??
        currencies?.find((c) => c.order === 1)?.id.toString(),
      barter: data?.barter,
      credit: data?.credit,
      gift: data?.gift,
      discount: data?.discount,
      business_id: data?.business?.id.toString(),
      category_id: data?.category.id.toString(),
      city_id: data?.city.id.toString(),
      type_id: data?.type.id.toString(),
      price: data?.price,
      head_category_id: data?.head_category_id.toString(),
      name: data?.name,
      text: data?.info.text,
    },
    resolver: zodResolver(createListingSchema),
    reValidateMode: "onChange",
    mode: "onChange",
    disabled: isPendingProfile,
  });

  useEffect(() => {
    if (!isPendingProfile) {
      form.reset({
        ...form.getValues(),
        user_id: profile?.id.toString(),
      });
    }
  }, [isPendingProfile, profile, form]);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(async (formData) => {
          try {
            let res;
            if (!data)
              res = await createListing({
                ...formData,
                // head_category_id: categories
                //   ?.find((value) => value.id === +formData.category_id)
                //   ?.parent_id?.toString(),
              });
            else
              res = await updateListing({
                ...formData,
                uploadedImageUrls: data?.images.map((i) => i.path),
                // head_category_id: categories
                //   ?.find((value) => value.id === +formData.category_id)
                //   ?.parent_id?.toString(),
                id: data.id,
              });
            form.reset();
            toast.success(res.message);
          } catch (err: any) {
            toast.error(err.message);
          }
        })}
      >
        {children}
      </form>
    </FormProvider>
  );
}

export function ListingForm({ children }: PropsWithChildren) {
  const form = useFormContext();

  const { data: categories, isPending: isPendingCategories } =
    useGetCategoriesQuery();
  const { data: cities, isPending: isPendingCities } = useGetCitiesQuery();
  const { data: currencies, isPending: isPendingCurrencies } =
    useGetCurrenciesQuery();
  const { data: listingTypes, isPending: isPendingListingtypes } =
    useGetListingTypesQuery();
  const { data: profile, isPending: isPendingProfile } = useGetProfileQuery();

  return (
    <div className="flex flex-col gap-5 text-base!">
      {!isPendingProfile && !profile && (
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-4 gap-5">
          <Input
            label="İstifadəçi adı"
            {...form.register("user_name")}
            error={form.formState.errors?.user_name as FieldError}
          />
          <Input
            label="İstifadəçi telefonu"
            {...form.register("user_phone")}
            error={form.formState.errors?.user_phone as FieldError}
          />
          <Input
            label="İstifadəçi e-poçtu"
            {...form.register("user_email")}
            error={form.formState.errors?.user_email as FieldError}
          />
        </div>
      )}
      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-5">
        <Input
          label="Elanın adı"
          {...form.register("name")}
          error={form.formState.errors?.name as FieldError}
        />
        <Controller
          render={({ field, fieldState }) => (
            <Combobox
              items={cities?.map((i) => ({
                id: i.id.toString(),
                label: i.name,
              }))}
              placeholder="Şəhər"
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
              error={fieldState.error}
              disabled={isPendingCities}
            />
          )}
          name="city_id"
          control={form.control}
        />
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-5">
        <Input
          type="number"
          label="Qiyməti"
          {...form.register("price")}
          error={form.formState.errors?.price as FieldError}
        />
        <Controller
          render={({ field, fieldState }) => (
            <DefaultSelect
              items={currencies?.map((value) => ({
                value: value.id.toString(),
                label: value.name,
              }))}
              placeholder="Valyuta"
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
              error={fieldState.error}
              disabled={isPendingCurrencies}
            />
          )}
          name="currency_id"
          control={form.control}
        />
      </div>

      <Controller
        render={({ field, fieldState }) => (
          <DefaultSelect
            items={listingTypes?.map((value) => ({
              value: value.id.toString(),
              label: value.name,
            }))}
            placeholder="Elanın növü"
            value={field.value}
            onValueChange={(value) => field.onChange(value)}
            error={fieldState.error}
            disabled={isPendingListingtypes}
          />
        )}
        name="type_id"
        control={form.control}
      />
      <Controller
        render={({ field, fieldState }) => (
          <DefaultSelect
            items={categories?.map((value) => ({
              value: value.id.toString(),
              label: value.name,
            }))}
            placeholder="Kateqoriya"
            value={field.value}
            onValueChange={(value) => field.onChange(value)}
            error={fieldState.error}
            disabled={isPendingCategories}
          />
        )}
        name="category_id"
        control={form.control}
      />
      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-5">
        <Switch
          className="px-4 justify-between rounded-lg bg-gray-100 **:data-[slot=switch-label]:h-14"
          checked={form.watch("barter") === "1"}
          onCheckedChange={(checked) =>
            form.setValue("barter", checked ? "1" : "2", {
              shouldValidate: true,
            })
          }
          label="Barter təklif olunsun?"
          error={form.formState.errors?.barter as FieldError}
        />
        <Switch
          className="px-4 justify-between rounded-lg bg-gray-100 **:data-[slot=switch-label]:h-14"
          checked={form.watch("credit") === "1"}
          onCheckedChange={(checked) =>
            form.setValue("credit", checked ? "1" : "2", {
              shouldValidate: true,
            })
          }
          label="Kredit mümkündür?"
          error={form.formState.errors?.credit as FieldError}
        />
        <Switch
          className="px-4 justify-between rounded-lg bg-gray-100 **:data-[slot=switch-label]:h-14"
          checked={form.watch("discount") === "1"}
          onCheckedChange={(checked) =>
            form.setValue("discount", checked ? "1" : "2", {
              shouldValidate: true,
            })
          }
          label="Endirim olacaq?"
          error={form.formState.errors?.discount as FieldError}
        />
        <Switch
          className="px-4 justify-between rounded-lg bg-gray-100 **:data-[slot=switch-label]:h-14"
          checked={form.watch("gift") === "1"}
          onCheckedChange={(checked) =>
            form.setValue("gift", checked ? "1" : "2", {
              shouldValidate: true,
            })
          }
          label="Hədiyyə olacaq?"
          error={form.formState.errors?.gift as FieldError}
        />
      </div>
      <Textarea label="Mətn" {...form.register("text")} />
      <div className="border border-gray-200 rounded-2xl p-4 flex flex-col gap-3">
        {/*{data && data.images.length > 0 && (
          <div className="flex flex-col gap-2 font-medium">
            Yüklənmiş şəkillər
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin">
              {data.images.map((i) => (
                <Image
                  key={i.id}
                  width={160}
                  height={160}
                  alt={i.alt}
                  src={i.full_url}
                  className="size-40 object-contain"
                />
              ))}
            </div>
          </div>
        )}*/}
        <Controller
          control={form.control}
          name="image"
          render={({ field }) => (
            <Upload
              label="Əsas şəkil"
              // multiple
              value={field.value ? [field.value] : []}
              onValueChange={(files) => {
                field.onChange(files[0]);
              }}
            />
          )}
        />
        <Controller
          control={form.control}
          name="images"
          render={({ field }) => (
            <Upload
              label="Şəkillər"
              multiple
              value={field.value}
              onValueChange={(files) => {
                field.onChange(files);
              }}
            />
          )}
        />
      </div>
      {children}
    </div>
  );
}

export function ListingFormSubmit({
  loading,
  ...props
}: ComponentProps<typeof Button>) {
  const form = useFormContext();
  return (
    <Button
      type="submit"
      loading={loading ?? form.formState.isSubmitting}
      {...props}
    />
  );
}
