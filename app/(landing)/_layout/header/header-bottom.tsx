import { Logo } from "@/components/icons/logo";
import { Plus } from "@/components/icons/others";
import Link from "next/link";
import HeaderSearch from "@/app/(landing)/_layout/header/header-search";
import CategoryMenu from "./category-menu";
import { getCategories } from "@/actions/category.action";
import { getProfile } from "@/actions/profile.action";
import { AuthDialogTrigger } from "@/components/auth/auth-dialog";

export default async function HeaderBottom() {
  const categories = await getCategories();
  const profile = await getProfile();

  return (
    <div className="container items-center gap-6 md:h-26 md:py-0 py-3 flex">
      <Link
        href="/"
        aria-label="Bart.az"
        className="md:flex hidden items-center justify-start"
      >
        <Logo />
      </Link>
      <div className="flex items-center gap-3 grow">
        <CategoryMenu data={categories.data} />
        <HeaderSearch />
        {profile ? (
          <Link
            href="/listings/new"
            className="text-background bg-success-600 md:flex hidden items-center justify-center h-12 gap-2 w-[172px] rounded-xl hover:bg-success-700 transition-colors"
          >
            Yeni elan
            <Plus />
          </Link>
        ) : (
          <AuthDialogTrigger redirectOnLogin='/listings/new' className="text-background bg-success-600 md:flex hidden items-center justify-center h-12 gap-2 w-[172px] rounded-xl hover:bg-success-700 transition-colors">
            Yeni elan
            <Plus />
          </AuthDialogTrigger>
        )}
      </div>
    </div>
  );
}
