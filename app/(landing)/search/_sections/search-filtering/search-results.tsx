import { getListings } from "@/actions/listing.action";
import { ProductCardsContainer } from "@/components/product-card/product-card";
import { SearchParams } from "@/types/models/base";

export default async function SearchResults({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { s } = await searchParams;
  const {
    city_id,
    vip,
    special,
    price_to,
    price_from,
    sort_by,
    sort_order,
    per_page,
    page,
    category_id,
  } = await searchParams;

  const listings = await getListings({
    search: s as string,
    city_id: Array.isArray(city_id) ? city_id.join(",") : city_id,
    category_id: Array.isArray(category_id)
      ? category_id.join(",")
      : category_id,
    vip,
    price_from,
    price_to,
    special,
    sort_by,
    sort_order,
    page,
    per_page,
  });

  return (
    <section className="md:pb-30 pb-10 pt-2 w-full">
      <div className="flex flex-col gap-10 w-full">
        {listings.data.length > 0 ? (
          <ProductCardsContainer
            paginationProps={{
              pagination: listings.pagination,
            }}
            data={listings.data}
          />
        ) : (
          <div className="flex items-center justify-center font-medium text-2xl">
            Məlumat tapılmadı
          </div>
        )}
        {/*<button className="text-blue-500 font-semibold text-lg w-fit mx-auto animated-underline">*/}
        {/*  Daha çox göstər*/}
        {/*</button>*/}
      </div>
    </section>
  );
}
