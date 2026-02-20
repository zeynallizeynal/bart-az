"use client";

import { AuthDialog } from "@/components/auth/auth-dialog";
import LogoutAlert from "@/components/auth/logout-alert";
import { EmptyWallet, Store } from "@/components/icons/others";
import { defaultProfile, newStore } from "@/routes";
import { useGetProfileQuery } from "@/services/profile.service";
import { formatCurrency } from "@/utils/currency.util";
import { Home } from "bartaz-icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuLoaderCircle } from "react-icons/lu";
import { MdOutlineSpaceDashboard } from "react-icons/md";

export default function HeaderRightButtons() {
  const { data, isPending } = useGetProfileQuery();
  const pathname = usePathname();

  if (!pathname.startsWith("/profile"))
    return (
      <>
        {data && (
          <Link
            href={defaultProfile}
            className="inline-flex items-center gap-1.5"
          >
            <MdOutlineSpaceDashboard size={24} />
            Kabinet
          </Link>
        )}
        <Link href={newStore} className="inline-flex items-center gap-1.5">
          <Store size={24} />
          Mağaza aç
        </Link>
        {data ? <LogoutAlert /> : <AuthDialog />}
      </>
    );
  return (
    <>
      <Link href="/" className="inline-flex items-center gap-1.5">
        <Home className="size-6" />
        Ev
      </Link>
      <span className="rounded-custom-xl px-2 h-10 inline-flex items-center border border-gray-300 text-gray-700 gap-1.5 hover:bg-gray-200 transition">
        <EmptyWallet className="text-gray-800" />
        {formatCurrency(0)}
      </span>
      <button className="flex items-center border border-gray-300 px-2 h-10 gap-2 rounded-custom-xl hover:bg-gray-200 transition">
        {isPending ? (
          <LuLoaderCircle className="animate-spin" />
        ) : (
          <>
            <Image
              src="/images/account_img.png"
              alt={data!.name}
              width={24}
              height={24}
              className="object-top object-cover"
            />
            {data?.name}
          </>
        )}
      </button>
    </>
  );
}
