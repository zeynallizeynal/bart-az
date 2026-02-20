import Link from "next/link";
import { Logo } from "@/components/icons/logo";
import { ImFacebook } from "react-icons/im";
import { SlSocialInstagram } from "react-icons/sl";
import { IoLogoTiktok, IoLogoYoutube } from "react-icons/io5";

export default function FooterBody() {
  return (
    <>
      <div className="container flex md:flex-row md:gap-0 gap-6 flex-col items-center justify-between">
        <div className="flex flex-col justify-between md:items-start items-center h-26 md:text-start text-center">
          <Link href="/" aria-label="Bart.az" className="w-fit inline-block">
            <Logo size={40} />
          </Link>
          <div className="flex items-center text-gray-500 gap-5">
            <Link
              href="/"
              className="rounded-full border border-gray-500 size-10 inline-flex items-center justify-center hover:bg-gray-200 transition"
              aria-label="facebook link"
              title="facebook link"
            >
              <ImFacebook />
            </Link>
            <Link
              href="/"
              className="rounded-full border border-gray-500 size-10 inline-flex items-center justify-center hover:bg-gray-200 transition"
              aria-label="instagram link"
              title="instagram link"
            >
              <SlSocialInstagram />
            </Link>
            <Link
              href="/"
              className="rounded-full border border-gray-500 size-10 inline-flex items-center justify-center hover:bg-gray-200 transition"
              aria-label="youtube link"
              title="youtube link"
            >
              <IoLogoYoutube />
            </Link>
            <Link
              href="/"
              className="rounded-full border border-gray-500 size-10 inline-flex items-center justify-center hover:bg-gray-200 transition"
              aria-label="tiktok link"
              title="tiktok link"
            >
              <IoLogoTiktok />
            </Link>
          </div>
        </div>
        <div className="text-base text-gray-800 grid lg:grid-cols-[repeat(4,minmax(0px,max-content))] lg:gap-x-28 md:gap-x-20 sm:gap-x-10 gap-x-4 md:grid-cols-[repeat(3,minmax(0px,max-content))] grid-cols-2 place-items-center gap-y-4">
          <Link
            href="/"
            className="hover:text-foreground transition hover:underline"
          >
            Barter
          </Link>
          <Link
            href="/"
            className="hover:text-foreground transition hover:underline"
          >
            İcarə
          </Link>
          <Link
            href="/"
            className="hover:text-foreground transition hover:underline"
          >
            Mağaza aç
          </Link>
          <Link
            href="/"
            className="hover:text-foreground transition hover:underline"
          >
            Qaydalar
          </Link>
          <Link
            href="/"
            className="hover:text-foreground transition hover:underline"
          >
            Satılır
          </Link>
          <Link
            href="/"
            className="hover:text-foreground transition hover:underline"
          >
            Ehtiyacı olanlar üçün
          </Link>
          <Link
            href="/"
            className="hover:text-foreground transition hover:underline"
          >
            Haqqımızda
          </Link>
          <Link
            href="/"
            className="hover:text-foreground transition hover:underline"
          >
            Əlaqə
          </Link>
        </div>
      </div>
      <div className="container flex sm:flex-row flex-col gap-5 items-center justify-between pt-4 pb-6 border-t border-gray-800/10 text-gray-500 body-sm-regular mt-16 !leading-[1.5]">
        <p className="text-center sm:text-left">
          Saytda yerləşdirilmiş bannerlər və elanların məzmununa görə saytın{" "}
          <br />
          rəhbərliyi məsuliyyət daşımır! Copyright 2015-2024 Bart.az.
        </p>
        <p className="text-center sm:text-right">
          info@bart.az
          <br />
          (070) 274 15 10
        </p>
      </div>
    </>
  );
}
