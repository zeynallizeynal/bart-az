import MobileHeader from "@/components/mobile-header";
import Breadcrumb from "@/components/breadcrumb";
import StoreInfo from "./_sections/business-info";
import StoreAds from "./_sections/store-ads";
import { getBusinessBySlug } from "@/actions/business.action";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ [key: string]: string }>;
}) {
  const { slug } = await params;
  const res = await getBusinessBySlug(slug);
  if (!res) notFound();
  const data = res.data;

  return (
    <>
      <MobileHeader goBack>{slug}</MobileHeader>
      <Breadcrumb
        links={[
          { href: "/", label: "Ana Səhifə" },
          { href: `/businesses/${data.slug}`, label: data.name },
        ]}
        className="flex"
      />
      <div className="bg-[url('/images/banners/store_bg.png')] bg-cover bg-no-repeat">
        <div className="container">
          <StoreInfo data={data} />
          <StoreAds data={data} />
        </div>
      </div>
    </>
  );
}
