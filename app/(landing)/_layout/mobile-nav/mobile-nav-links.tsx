"use client";

import {
  CategoryFill,
  CategoryOutline,
  HomeFill,
  HomeOutline,
  PlusRounded,
  PlusRoundedFill,
  Search,
  SearchFill,
  Store,
  StoreFill,
} from "@/components/icons/others";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { newStore } from "@/routes";

export default function MobileNavLinks() {
  const pathname = usePathname();
  return (
    <>
      <Link
        href="/"
        className={cn(
          "flex flex-col grow gap-1 items-center hover:bg-blue-50 active:scale-95 hover:text-blue-600 rounded-xl transition justify-center size-full",
          pathname === "/" && "text-blue-600",
        )}
      >
        {pathname === "/" ? <HomeFill /> : <HomeOutline />}
        Əsas
      </Link>
      <Link
        href="/search"
        className={cn(
          "flex flex-col grow gap-1 items-center hover:bg-blue-50 active:scale-95 hover:text-blue-600 rounded-xl transition justify-center size-full",
          pathname === "/search" && "text-blue-600",
        )}
      >
        {pathname === "/search" ? <SearchFill /> : <Search />}
        Axtarış
      </Link>
      <Link
        href="/new-ad"
        className={cn(
          "flex flex-col grow gap-1 items-center hover:bg-blue-50 active:scale-95 hover:text-blue-600 rounded-xl transition justify-center size-full",
          pathname === "/listings/new" && "text-blue-600",
        )}
      >
        {pathname === "/listings/new" ? <PlusRoundedFill /> : <PlusRounded />}
        Yeni
      </Link>
      <Link
        href={newStore}
        className={cn(
          "flex flex-col grow gap-1 items-center hover:bg-blue-50 active:scale-95 hover:text-blue-600 rounded-xl transition justify-center size-full",
          pathname === newStore && "text-blue-600",
        )}
      >
        {pathname === newStore ? <StoreFill /> : <Store />}
        Mağaza aç
      </Link>
      <Link
        href="/profile/listings"
        className={cn(
          "flex flex-col grow gap-1 items-center hover:bg-blue-50 active:scale-95 hover:text-blue-600 rounded-xl transition justify-center size-full",
          pathname.includes("/profile/") &&
            !pathname.includes("/profile/stores") &&
            "text-blue-600",
        )}
      >
        {pathname.includes("/profile/") &&
        !pathname.includes("/profile/stores") ? (
          <CategoryFill />
        ) : (
          <CategoryOutline />
        )}
        Menyu
      </Link>
    </>
  );
}
