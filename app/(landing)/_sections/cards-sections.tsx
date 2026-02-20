import { OptimizedImage } from "@/components/ui/image";
import { ProductCardsContainer } from "@/components/product-card/product-card";
import Link from "next/link";
import { getListings } from "@/actions/listing.action";

export default async function CardsSections() {
  const data = await getListings();

  return (
    <>
      <section className="bg-gray-50 md:py-16 py-5">
        <div className="container">
          <div className="flex flex-col md:gap-10 gap-5">
            <div className="flex justify-between items-center">
              <h3 className="flex items-center md:gap-4 gap-2">
                <span className="relative md:size-10 size-8">
                  <OptimizedImage
                    src="/images/icons/fire.svg"
                    alt="Fire icon"
                    quality={100}
                  />
                </span>
                Dəyərindən aşağı satılanlar
              </h3>
              <Link
                href="/search"
                className="font-semibold animated-underline hidden md:inline-block text-lg text-blue-500"
              >
                Hamısına bax
              </Link>
            </div>
            <ProductCardsContainer data={data.data} />
            <Link
              href="/search"
              className="font-semibold animated-underline md:hidden mx-auto inline-block text-lg text-blue-500"
            >
              Hamısına bax
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-background md:py-16 py-5">
        <div className="container">
          <div className="flex flex-col md:gap-10 gap-5">
            <div className="flex justify-between items-center">
              <h3 className="flex items-center md:gap-4 gap-2">
                <span className="relative md:size-10 size-8">
                  <OptimizedImage
                    src="/images/icons/lightning.svg"
                    alt="Lightning icon"
                    quality={100}
                  />
                </span>
                Premium elanlar
              </h3>
              <Link
                href="/search"
                className="font-semibold animated-underline hidden md:inline-block text-lg text-blue-500"
              >
                Hamısına bax
              </Link>
            </div>
            <ProductCardsContainer data={data.data} />
            <Link
              href="/"
              className="font-semibold animated-underline md:hidden mx-auto inline-block text-lg text-blue-500"
            >
              Hamısına bax
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-gray-50 md:py-16 py-5">
        <div className="container">
          <div className="flex flex-col md:gap-10 gap-5">
            <div className="flex justify-between items-center">
              <h3 className="flex items-center md:gap-4 gap-2">
                <span className="relative md:size-10 size-8">
                  <OptimizedImage
                    src="/images/icons/clock2.svg"
                    alt="Clock icon"
                    quality={100}
                  />
                </span>
                Son elanlar
              </h3>
              <Link
                href="/search"
                className="font-semibold animated-underline hidden md:inline-block text-lg text-blue-500"
              >
                Hamısına bax
              </Link>
            </div>
            <ProductCardsContainer data={data.data} />
            <Link
              href="/search"
              className="font-semibold animated-underline md:hidden mx-auto inline-block text-lg text-blue-500"
            >
              Hamısına bax
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
