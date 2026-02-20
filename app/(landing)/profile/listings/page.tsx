import { getProfile } from "@/actions/profile.action";
import { getListings } from "@/actions/listing.action";
import MyListings from "@/app/(landing)/profile/listings/_sections/my-listings";
import { SearchParams } from "@/types/models/base";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { page } = await searchParams;
  const profile = await getProfile();
  const listings = await getListings({
    per_page: "6",
    user_id: profile?.data.user.id.toString(),
    page,
  });
  return listings ? (
    <MyListings listings={listings.data} pagination={listings.pagination} />
  ) : (
    "Loading listings..."
  );
}
