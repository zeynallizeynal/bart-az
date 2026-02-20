"use client";

import Breadcrumb from "@/components/breadcrumb";
import { useSearchParams } from "next/navigation";

export default function ProfileBreadcrumb() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const getBreadcrumbLabel = (type: string | null) => {
    switch (type) {
      case "published":
        return "Dərc olunmuş elanlar";
      case "expired":
        return "Müddəti başa çatmış elanlar";
      case "checking":
        return "Yoxlanılan elanlar";
      default:
        return "Bütün elanlar";
    }
  };
  const breadcrumbLinks = [
    { label: "Profil", href: "/profile" },
    { label: "Elanlarım", href: "/profile/listings" },
    {
      label: getBreadcrumbLabel(type),
      href: `/profile/listings${type ? `?type=${type}` : ""}`,
    },
  ];
  return <Breadcrumb links={breadcrumbLinks} />;
}
