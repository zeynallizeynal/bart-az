import {
  Camera1,
  Check,
  MonitorCurved,
  PhoneVibration,
  Sofa1,
  Store,
  VacuumCleaner,
} from "@/components/icons/others";
import GlassIcon from "@/components/glass-icon";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ButtonLink from "@/components/button-link";
import { newStore } from "@/routes";

export default function StoreBanner() {
  return (
    <section className="py-4">
      <div className="container">
        <div className="rounded-3xl relative overflow-hidden bg-blue-50">
          <Image
            src="/images/banners/store_home_banner.png"
            alt="Store banner"
            fill
            className="object-cover lg:block hidden"
          />
          <Image
            src="/images/banners/store_home_banner_bg-res.png"
            alt="Store banner"
            fill
            className="lg:hidden"
          />
          <div className="relative flex lg:flex-row flex-col items-center lg:justify-start justify-center lg:p-0 px-5 py-10">
            <div className="relative z-[5] lg:order-1 order-2 lg:pl-16 lg:py-10 space-y-6 flex flex-col lg:items-start items-center">
              <div className="px-6 rounded-2xl bg-background w-fit">
                <h2 className="text-3xl h-16 lg:inline-flex hidden items-center">
                  Mağaza aç
                </h2>
              </div>
              <div
                className={cn(
                  "bg-opacity-30 text-background p-4 relative",
                  "after:rounded-2xl lg:after:opacity-100 after:opacity-30 after:absolute after:z-0 after:inset-0.5 after:bg-bannerBox",
                  "before:rounded-2xl lg:before:opacity-30 before:opacity-30 before:absolute before:z-0 before:inset-0 before:bg-glass",
                )}
              >
                <GlassIcon className="absolute z-10 right-3.5 -top-6 lg:inline-block hidden rotate-12">
                  <Store className="size-6" />
                </GlassIcon>
                <GlassIcon className="absolute lg:hidden z-10 -left-5 -bottom-5 rotate-45">
                  <PhoneVibration size={24} />
                </GlassIcon>
                <ul className="space-y-1 relative z-10">
                  <li className="text-lg font-semibold mb-3">
                    Mağaza açmanın üstünlükləri
                  </li>
                  <li className="text-sm font-medium grid grid-cols-[1fr_20px] gap-4">
                    <span className="opacity-65">
                      Elanların əsas səhifə və axtarışlarda daha önə çıxsın
                    </span>
                    <Check />
                  </li>
                  <li className="text-sm font-medium grid grid-cols-[1fr_20px] gap-4">
                    <span className="opacity-65">
                      Daha çox sayda elan yerləşdir
                    </span>
                    <Check />
                  </li>
                  <li className="text-sm font-medium grid grid-cols-[1fr_20px] gap-4">
                    <span className="opacity-65">
                      Profilinə banner, logo, sosial və veb sayt linkləri əlavə
                      etmə
                    </span>
                    <Check />
                  </li>
                  <li className="text-sm font-medium grid grid-cols-[1fr_20px] gap-4">
                    <span className="opacity-65">
                      Daha çox alıcıya göstərilmə
                    </span>
                    <Check />
                  </li>
                </ul>
              </div>
              <ButtonLink href={newStore} size="lg" className="lg:w-fit w-full">
                <Store />
                Mağaza aç
              </ButtonLink>
              <GlassIcon className="absolute lg:hidden -right-5 -bottom-4 -rotate-45">
                <MonitorCurved size={24} />
              </GlassIcon>
            </div>
            <div className="lg:order-2 order-1 flex flex-col items-center gap-6 lg:w-[640px] lg:h-[426px] w-full">
              <div className="px-6 rounded-2xl lg:hidden bg-background md:w-fit w-full text-center relative z-[5]">
                <h2 className="text-3xl h-16 inline-flex items-center">
                  Mağaza aç
                </h2>
                <GlassIcon className="absolute lg:hidden z-10 -bottom-7 -right-5 -rotate-2">
                  <VacuumCleaner size={24} />
                </GlassIcon>
              </div>
              <div className="relative">
                <div className="lg:hidden">
                  <GlassIcon className="absolute lg:inline-block hidden z-10 lg:left-16 lg:top-20 -top-10 right-5 -rotate-2">
                    <VacuumCleaner size={24} />
                  </GlassIcon>
                  <GlassIcon className="absolute z-10 right-12 top-44 lg:hidden rotate-12">
                    <Store className="size-6" />
                  </GlassIcon>
                  <GlassIcon className="absolute z-10 lg:left-12 lg:top-52 left-6 top-44 -rotate-12">
                    <Sofa1 size={24} />
                  </GlassIcon>
                  <GlassIcon className="absolute lg:inline-block hidden left-40 z-10 top-80 -rotate-45">
                    <MonitorCurved size={24} />
                  </GlassIcon>
                  <GlassIcon className="absolute lg:inline-block hidden right-16 z-10 top-72 rotate-45">
                    <PhoneVibration size={24} />
                  </GlassIcon>
                  <GlassIcon className="absolute lg:right-20 lg:top-10 z-10 rotate-12">
                    <Camera1 size={24} />
                  </GlassIcon>
                </div>
                <Image
                  src="/images/banners/store_banner.png"
                  alt="Store banner"
                  width={304}
                  height={233}
                  className="lg:hidden"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
