import HeaderRightButtons from "@/app/(landing)/_layout/header/header-right-buttons";
import SelectLanguage from "@/app/(landing)/_layout/header/select-language";
import { Logo } from "@/components/icons/logo";
import Link from "next/link";

export default async function HeaderTop() {
  return (
    <div className="md:bg-gray-100 bg-background text-gray-700 transition-colors">
      <nav className="container flex items-center md:h-14 h-12 md:justify-between justify-center">
        <div className="md:hidden flex items-center">
          <Link href="/">
            <Logo size={24} />
          </Link>
        </div>
        <div className="items-center gap-6 md:flex hidden">
          <Link href="#" className="hover:underline">
            Barter
          </Link>
          <Link href="#" className="hover:underline">
            Satılır
          </Link>
          <Link href="#" className="hover:underline">
            İcarə
          </Link>
          <Link href="#" className="hover:underline">
            Ehtiyacı olanlar üçün
          </Link>
        </div>
        <div className="md:flex hidden items-center gap-5 font-semibold">
          <HeaderRightButtons />
          <SelectLanguage />
        </div>
      </nav>
    </div>
  );
}
