import { SortByDateSelect } from "@/components/select-sort-by";
import StoreTabs from "./store-tabs";
import { Business } from "@/types/models/business";

const fakeSortOptions = [
  {
    name: "Tarixe gore",
    value: "data",
  },
  {
    name: "Qiymete gore",
    value: "price",
  },
];

export default function StoreAds({ data }: { data: Business }) {
  return (
    <section className="bg-background space-y-8 pt-8 md:pb-30 pb-16">
      <StoreTabs />
      <div className="pt-4">
        <div className="flex flex-col md:gap-10 gap-5">
          <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-center">
            <h3>Elanlar</h3>
            <SortByDateSelect
              options={fakeSortOptions}
              triggerClassName="md:w-fit w-full md:justify-between justify-center"
            />
          </div>
          {/* <ProductCardsContainer data={fakeData} /> */}
        </div>
      </div>
    </section>
  );
}
