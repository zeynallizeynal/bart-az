import { getProfile } from "@/actions/profile.action";
import { ProfileLinks } from "@/app/(landing)/profile/_layout/profile-links";
import Image from "next/image";

export default async function ProfileSidebar() {
  const profile = await getProfile();

  return (
    <aside className="rounded-custom-xl md:block hidden border border-gray-200 space-y-4 p-3 h-fit sticky top-0">
      {profile ? (
        <div className="px-3 py-4 flex flex-col gap-3 items-center">
          <Image
            src="/images/account_img.png"
            width={64}
            height={64}
            alt={profile.data.user.name}
          />
          <div className="text-gray-900 font-semibold leading-tight text-xl">
            {profile.data.user.name}
          </div>
        </div>
      ) : (
        "Loading..."
      )}
      <ProfileLinks />
    </aside>
  );
}
