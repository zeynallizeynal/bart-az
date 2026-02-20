import Breadcrumb from "@/components/breadcrumb";
import MobileHeader from "@/components/mobile-header";
import SearchFiltering from "@/app/(landing)/search/_sections/search-filtering";
import {
  SearchFilterProvider,
  SearchFilterSidebar,
} from "@/app/(landing)/search/_components/search-filter";
import SearchSidebarFilters from "@/app/(landing)/search/_sections/search-filtering/search-sidebar-filters";
import SearchResults from "@/app/(landing)/search/_sections/search-filtering/search-results";
import { getCities } from "@/actions/location.action";
import { SearchParams } from "@/types/models/base";
import { getCategories } from "@/actions/category.action";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const [cities, categories] = await Promise.all([
    getCities(),
    getCategories(),
  ]);
  return (
    <>
      <MobileHeader>Axtarışın nəticəsi</MobileHeader>
      <Breadcrumb
        links={[
          { label: "Əsas səhifə", href: "/" },
          { label: "Axtarışın nəticəsi", href: "/search" },
        ]}
        className="flex"
      />
      {/*<SearchCategories />*/}
      <SearchFilterProvider>
        <SearchFiltering cities={cities?.data} />
        <div className="flex gap-6 container">
          <SearchFilterSidebar>
            <SearchSidebarFilters
              categories={categories?.data}
              cities={cities?.data}
            />
          </SearchFilterSidebar>
          <SearchResults searchParams={searchParams} />
        </div>
      </SearchFilterProvider>
    </>
  );
}
