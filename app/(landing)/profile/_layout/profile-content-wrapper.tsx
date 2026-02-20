import ProfileSidebar from "@/app/(landing)/profile/_layout/profile-sidebar";
import { Balance } from "@/app/(landing)/profile/_layout/balance";

export default function ProfileContentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container md:pb-[120px] pb-10">
      <div className="grid grid-cols-1 md:grid-cols-[264px_1fr] gap-6">
        <ProfileSidebar />
        <div className="flex flex-col gap-8">
          <Balance />
          {children}
        </div>
      </div>
    </div>
  );
}
