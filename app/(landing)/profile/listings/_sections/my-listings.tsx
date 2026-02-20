"use client";

import ProfileBody from "@/app/(landing)/profile/_layout/profile-body";
import { ProductCardsContainer } from "@/components/product-card/product-card";
import { SortByDateSelect } from "@/components/select-sort-by";
import { Tab, Tabs } from "@/components/ui/tabs";
import { useSearchParams } from "@/hooks/use-search-params";
import { cn } from "@/lib/utils";
import { Pagination } from "@/types/models/base";
import { Listing } from "@/types/models/listing";
import { useEffect, useState } from "react";

const fakeItems = [
  {
    content: "Dərc olunmuş",
    number: 3,
    value: "published",
  },
  { content: "Müddəti başa çatmış", number: 2, value: "expired" },
  { content: "Yoxlanlır", value: "checking", number: 1 },
];

export default function MyListings({
  listings,
  pagination,
}: {
  listings: Listing[];
  pagination: Pagination;
}) {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "published";
  const [title, setTitle] = useState(fakeItems[0].content);

  useEffect(() => {
    const currentTitle =
      fakeItems.find((item) => type === item.value)?.content || "";
    setTitle(currentTitle);
  }, [type]);

  return (
    <ProfileBody title="Elanlarım">
      <div className="space-y-6">
        <Tabs className="bg-gray-100 rounded-xl overflow-x-auto **:data-active-indicator:h-0.75">
          {fakeItems.map((item, i) => (
            <Tab
              key={i}
              onClick={() => searchParams.set("type", item.value)}
              isIndicatorActive={item.value === type}
              className={cn("px-6 h-15 rounded-md", {
                "font-bold text-gray-900": item.value === type,
                "font-medium text-gray-600": type !== item.value,
              })}
            >
              {item.content}
            </Tab>
          ))}
        </Tabs>
        <div className="space-y-6">
          <div className="flex md:flex-row flex-col gap-6 md:justify-between md:items-center justify-center">
            <h4 className="text-gray-900 font-semibold w-full">{title}</h4>
            <SortByDateSelect triggerClassName="justify-center" />
          </div>
          <ProductCardsContainer
            enableOptions
            data={listings}
            paginationProps={{
              pagination,
            }}
          />
          {/* {type === "published" ? (
            <ProductCardsContainer data={fakeData.slice(0, 3)} enableOptions />
          ) : type === "expired" ? (
            <div className="space-y-6">
              <div className="md:rounded-[40px] rounded-custom px-6 py-3 bg-warning-50 text-warning-600 text-sm font-medium">
                Müddəti bitimiş elanın vaxtını uzatmasanız 1 ay sonra saytdan
                silinəcək.
              </div>
              <ProductCardsContainer
                data={fakeData.slice(0, 2)}
                enableOptions
                enableRenew
              />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="md:rounded-[40px] rounded-custom px-6 py-3 bg-warning-50 text-warning-600 text-sm font-medium">
                Yeni yerləşdirdiyiniz elənlar operatorlarımız tərəfində
                baxıldıqdan sonra saytda görünəcək.
              </div>
              <ProductCardsContainer
                data={fakeData.slice(0, 4)}
                enableOptions
              />
            </div>
          )} */}
        </div>
      </div>
    </ProfileBody>
  );
}
