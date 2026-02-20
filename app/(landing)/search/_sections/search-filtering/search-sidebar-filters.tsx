"use client";

import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useSearchParams } from "@/hooks/use-search-params";
import { Category } from "@/types/models/category";
import { City } from "@/types/models/location";

export default function SearchSidebarFilters({
  cities,
  categories,
}: {
  cities?: City[];
  categories?: Category[];
}) {
  const searchParams = useSearchParams();

  return (
    <div className="**:[label]:text-default-lg **:[label]:font-medium flex flex-col gap-8 mt-8 max-md:mt-0">
      <Combobox
        items={cities?.map((c) => ({ label: c.name, id: c.id.toString() }))}
        value={searchParams.get("city_id") ?? undefined}
        label="Şəhər"
        name="city_id"
        className="gap-4"
        classNames={{
          label: "text-default-lg",
        }}
        closeOnSelect
        onValueChange={(value) => searchParams.set("city_id", value)}
        onClear={() => searchParams.delete("city_id")}
      />
      <Combobox
        items={categories?.map((c) => ({ label: c.name, id: c.id.toString() }))}
        value={searchParams.get("category_id") ?? undefined}
        label="Kateqoriya"
        name="category_id"
        className="gap-4"
        classNames={{
          label: "text-default-lg",
        }}
        closeOnSelect
        onValueChange={(value) => searchParams.set("category_id", value)}
        onClear={() => searchParams.delete("category_id")}
      />
      <div className="flex-col flex gap-4">
        <label className="md:text-default-lg text-base font-medium">
          Qiymət
        </label>
        {/* <div className="flex gap-2 text-xs">
          {fakeCurrencies.map((item, index) => (
            <button
              key={index}
              className="rounded-md uppercase border border-transparent bg-gray-100 px-3 py-2 data-selected:border-blue-300 data-selected:bg-blue-100 data-selected:text-blue-600 aria-selected:font-medium"
              data-selected={queryStates.currency === item.value ? "" : null}
              onClick={() => searchParams.set("currency", item.value)}
            >
              {item.label}
            </button>
          ))}
        </div> */}
        <div className="flex flex-col gap-2 md:gap-4">
          <Input
            label="min"
            name="price_from"
            value={searchParams.get("price_from") ?? ""}
            type="number"
            min={0}
            onChange={(event) =>
              searchParams.set("price_from", event.target.value)
            }
          />
          <Input
            label="max"
            type="number"
            name="price_to"
            value={searchParams.get("price_to") ?? ""}
            min={0}
            onChange={(event) =>
              searchParams.set("price_to", event.target.value)
            }
          />
        </div>
      </div>
      <div className="bg-gray-300 h-px w-full" />
      <div className="space-y-4">
        <Switch
          label="VIP"
          name="vip"
          checked={Boolean(searchParams.get("vip")) ?? undefined}
          onCheckedChange={(checked) =>
            checked
              ? searchParams.set("vip", "true")
              : searchParams.delete("vip")
          }
        />
        <Switch
          label="Special"
          name="special"
          checked={Boolean(searchParams.get("special")) ?? undefined}
          onCheckedChange={(checked) =>
            checked
              ? searchParams.set("special", "true")
              : searchParams.delete("special")
          }
        />
      </div>
      {/*<div className="flex-col flex gap-4">*/}
      {/*  <label className="md:text-default-lg text-base font-medium">*/}
      {/*    Elanın paketi*/}
      {/*  </label>*/}
      {/*  <div className="flex gap-2 text-xs flex-wrap">*/}
      {/*    {fakePlans.map((item, index) => (*/}
      {/*      <button*/}
      {/*        key={index}*/}
      {/*        className="rounded-md center gap-2 border border-transparent bg-gray-100 px-3 py-2 data-selected:border-blue-300 data-selected:bg-blue-100 data-selected:text-blue-600 aria-selected:font-medium"*/}
      {/*        data-selected={*/}
      {/*          queryStates.plans?.includes(item.value) ? "" : null*/}
      {/*        }*/}
      {/*        onClick={() => {*/}
      {/*          const set = new Set(queryStates.plans);*/}
      {/*          set.has(item.value)*/}
      {/*            ? set.delete(item.value)*/}
      {/*            : set.add(item.value);*/}
      {/*          setQueryStates({*/}
      {/*            plans: Array.from(set),*/}
      {/*          });*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        {item.label}*/}
      {/*        {queryStates.plans?.includes(item.value) ? (*/}
      {/*          <XClose size={20} />*/}
      {/*        ) : (*/}
      {/*          <Plus size={20} />*/}
      {/*        )}*/}
      {/*      </button>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*  <div className="flex-col flex gap-4">*/}
      {/*    <label className="md:text-default-lg text-base font-medium">*/}
      {/*      Elanın əlavələri*/}
      {/*    </label>*/}
      {/*    <div className="flex gap-2 text-xs flex-wrap">*/}
      {/*      {fakeAddons.map((item, index) => (*/}
      {/*        <button*/}
      {/*          key={index}*/}
      {/*          className="rounded-md center gap-2 border border-transparent bg-gray-100 px-3 py-2 data-selected:border-blue-300 data-selected:bg-blue-100 data-selected:text-blue-600 aria-selected:font-medium"*/}
      {/*          data-selected={*/}
      {/*            queryStates.addons?.includes(item.value) ? "" : null*/}
      {/*          }*/}
      {/*          onClick={() => {*/}
      {/*            const set = new Set(queryStates.addons);*/}
      {/*            set.has(item.value)*/}
      {/*              ? set.delete(item.value)*/}
      {/*              : set.add(item.value);*/}
      {/*            setQueryStates({*/}
      {/*              addons: Array.from(set),*/}
      {/*            });*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          {item.label}*/}
      {/*          {queryStates.addons?.includes(item.value) ? (*/}
      {/*            <XClose size={20} />*/}
      {/*          ) : (*/}
      {/*            <Plus size={20} />*/}
      {/*          )}*/}
      {/*        </button>*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}
