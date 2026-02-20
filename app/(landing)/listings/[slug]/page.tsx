import { getListingBySlug, getListings } from "@/actions/listing.action";
import MobileHeader from "@/components/mobile-header";
import { ProductCardsContainer } from "@/components/product-card/product-card";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "../../../../components/breadcrumb";
import AdInfo from "./_sections/ad-info";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);

  if (!listing) notFound();

  const similarListings = await getListings({
    category_id: listing.data.category.id.toString(),
  });

  const data = listing.data;

  return (
    <div className="md:border-t border-gray-200">
      <Breadcrumb
        links={[
          { href: "/", label: "Ana Səhifə" },
          { href: `/listings/${data.slug}`, label: data.name },
        ]}
      />
      <MobileHeader goBack>{data.name}</MobileHeader>
      <AdInfo data={data} />
      <section className="bg-gray-50 md:py-16 py-5">
        <div className="container">
          <div className="flex flex-col md:gap-10 gap-5">
            <div className="flex justify-between items-center">
              <h3 className="text-3xl">Oxşar elanlar</h3>
              <Link
                href={`/search?category_id=${data.category.id}`}
                className="font-semibold animated-underline text-lg text-blue-500"
              >
                Hamısına bax
              </Link>
            </div>
            <ProductCardsContainer data={similarListings.data} />
          </div>
        </div>
      </section>
    </div>
  );
}
