"use client";

import { SearchFilterTrigger } from "@/app/(landing)/search/_components/search-filter";
import SearchSidebarFilters from "@/app/(landing)/search/_sections/search-filtering/search-sidebar-filters";
import ActionDialog, {
  ActionDialogDefaultClose,
} from "@/components/ad-actions/action-dialog";
import { SortByDateSelect } from "@/components/select-sort-by";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useSearchParams } from "@/hooks/use-search-params";
import { City } from "@/types/models/location";
import { Settings1 } from "bartaz-icons";

const sortOptions = [
  {
    name: "Ən yeni",
    value: "created_at,desc",
  },
  {
    name: "Ən köhnə",
    value: "created_at,asc",
  },
  {
    name: "Ən bahalı",
    value: "price,desc",
  },
  {
    name: "Ən ucuz",
    value: "price,asc",
  },
];

const filterKeys = ["city_id", "vip", "special", "price_from", "price_to"];

export default function SearchFiltering({ cities }: { cities?: City[] }) {
  const searchParams = useSearchParams();
  const s = searchParams?.get("s");

  const appliedFilters = Array.from(
    new Set(
      searchParams.entries().filter(([k, v]) => v && filterKeys.includes(k)),
    ),
  );

  const sortBy = searchParams.get("sort_by");
  const sortOrder = searchParams.get("sort_order");
  const sortValue = sortBy && sortOrder ? `${sortBy},${sortOrder}` : undefined;

  return (
    <section className="pt-6 md:pb-8 pb-4">
      <div className="container">
        <div className="flex flex-col gap-4">
          {s && (
            <div className="md:hidden gap-2 md:text-3xl text-xl flex">
              <span className="leading-10 text-gray-500">
                Axtarışın nəticəsi
              </span>
              <strong className="font-bold leading-10 text-blue-600">
                {s}
              </strong>
            </div>
          )}
          <div className="flex justify-between">
            <div className="flex items-center gap-6">
              <SearchFilterTrigger>
                <Settings1 className="shrink-0" /> Filtrlər
                {appliedFilters.length > 0 && (
                  <span className="size-6 rounded-full shrink-0 border bg-gray-100 center">
                    {appliedFilters.length}
                  </span>
                )}
              </SearchFilterTrigger>
              <Dialog>
                <DialogTrigger className="border rounded-xl h-13 justify-start md:hidden flex items-center text-gray-800 font-semibold gap-2 hover:bg-gray-50 transition-all px-4">
                  <Settings1 className="shrink-0" /> Filtrlər
                  {appliedFilters.length > 0 && (
                    <span className="size-6 rounded-full shrink-0 border bg-gray-100 center">
                      {appliedFilters.length}
                    </span>
                  )}
                </DialogTrigger>
                <ActionDialog className="pt-6! flex flex-col">
                  <DialogHeader className="mb-10">
                    <DialogTitle className="mb-0 leading-10">
                      Filtrlər
                    </DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-6 overflow-y-auto max-h-96">
                    <SearchSidebarFilters cities={cities} />
                  </div>
                  <ActionDialogDefaultClose />
                </ActionDialog>
              </Dialog>
              {s && (
                <div className="md:flex gap-2 text-3xl hidden">
                  <span className="leading-10 text-gray-500">
                    Axtarışın nəticəsi
                  </span>
                  <strong className="font-bold leading-10 text-blue-600">
                    {s}
                  </strong>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <SortByDateSelect
                options={sortOptions}
                value={sortValue}
                defaultValue={sortOptions[0].value}
                onValueChange={(value) => {
                  const [field, order] = value.split(",");
                  searchParams.setMany([
                    { key: "sort_by", value: field },
                    { key: "sort_order", value: order },
                  ]);
                }}
              />
              <Button
                variant="outline"
                className="h-14 text-base font-semibold"
                onClick={() => searchParams.clear()}
              >
                Təmizlə
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
