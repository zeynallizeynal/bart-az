import { Suspense } from "react";
import ProfileMobileHeader from "@/app/(landing)/profile/_layout/profile-mobile-header";
import StoreBanner from "@/components/store-banner";
import ProfileContentWrapper from "@/app/(landing)/profile/_layout/profile-content-wrapper";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <ProfileMobileHeader />
      <ProfileContentWrapper>{children}</ProfileContentWrapper>
      <StoreBanner />
    </Suspense>
  );
}
