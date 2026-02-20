import Breadcrumb from "@/components/breadcrumb";
import MobileHeader from "@/components/mobile-header";
import { OptimizedImage } from "@/components/ui/image";
import { newStore } from "@/routes";
import BusinessAppealForm from "./_sections/business-appeal-form";

export default function Page() {
  return (
    <>
      <MobileHeader goBack={false}>Mağaza aç</MobileHeader>
      <Breadcrumb
        links={[
          { href: "/", label: "Əsas səhifə" },
          { href: newStore, label: "Mağaza aç" },
        ]}
      />
      <section className="lg:container grid grid-cols-1 lg:grid-cols-2 gap-8 md:pb-30 pb-10">
        <div className="relative rounded-3xl flex flex-col lg:bg-[url('/images/banners/new_store_banner.png')] bg-cover bg-center lg:p-10">
          <div className="lg:mx-0 mx-4 px-6 pt-2.5 pb-3.5 rounded-2xl shadow-new-store-title md:shadow-none bg-background my-4">
            <h1 className="md:text-3xl text-[28px] text-gray-800">
              Biznes qurmağa <strong className="text-blue-600">Bart.az</strong>
              -da başlayın
            </h1>
          </div>
          <div className="relative w-full h-56 sm:h-116.25 lg:hidden">
            <OptimizedImage
              src="/images/banners/new_store_banner-res.png"
              alt="New Store"
              className="md:object-contain object-cover"
              quality={100}
            />
          </div>
        </div>
        <BusinessAppealForm />
      </section>
    </>
  );
}
