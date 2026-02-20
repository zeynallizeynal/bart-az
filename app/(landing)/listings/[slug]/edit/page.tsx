import { getProfile } from "@/actions/profile.action";
import { getListingBySlug } from "@/actions/listing.action";
import Breadcrumb from "@/components/breadcrumb";
import MobileHeader from "@/components/mobile-header";
import { notFound } from "next/navigation";
import AdInfo from "../_sections/ad-info";
import { ListingFormProvider } from "@/components/listing-form";
export default async function Page({
  params,
}: {
  params: Promise<{ [key: string]: string }>;
}) {
  const { slug } = await params;

  const profile = await getProfile();
  const listing = await getListingBySlug(slug);
  if (listing?.data.user.id !== profile?.data.user.id) {
    return notFound();
  }

  return (
    <ListingFormProvider data={listing?.data}>
      <div className="border-t border-gray-200">
        <MobileHeader>Yeni Televizor Nikai 32</MobileHeader>
        <Breadcrumb
          links={[
            { href: "/profile/listings", label: "Profil" },
            { href: "/profile/listings", label: "Elanlar" },
          ]}
        />
        {listing ? (
          <AdInfo data={listing.data} editable />
        ) : (
          "Loading listing..."
        )}
      </div>
    </ListingFormProvider>
  );
}
