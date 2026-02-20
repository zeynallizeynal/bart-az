import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/currency.util";
import { InfoCircle1 } from "bartaz-icons";
import Image from "next/image";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import ProfileMobileTitle from "@/app/(landing)/profile/_layout/profile-mobile-title";
import { BalanceDrawer } from "@/app/(landing)/profile/_layout/balance";
import { ProfileLinksDrawer } from "@/app/(landing)/profile/_layout/profile-links";

export default function ProfileMobileHeader() {
  return (
    <header className="md:hidden pt-2 pb-6">
      <div className="container">
        <div className="flex flex-col gap-10">
          <div className="flex items-center justify-between">
            <Drawer>
              <DrawerTrigger className="flex items-center gap-2">
                <Image
                  src="/images/account_img.png"
                  width={32}
                  height={32}
                  alt="Shain'in Profi Sekili"
                />
                <span className="text-base text-gray-900 font-semibold">
                  Shahin Mammadov
                </span>
              </DrawerTrigger>
              <DrawerContent className="pb-4">
                <DrawerHeader className="flex gap-0 flex-col items-center text-gray-900 pb-6">
                  <div className="py-4">
                    <div className="size-12 rounded-full bg-error-50 text-error-600 center">
                      <InfoCircle1 />
                    </div>
                  </div>
                  <DrawerTitle>Hesabdan çıxış</DrawerTitle>
                  <DrawerDescription className="mt-2">
                    Hesabdan çıxış etmək istədiyinizə əminsiniz?
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <Button variant="destructive">Çıxış et</Button>
                  <DrawerClose asChild>
                    <Button
                      variant="outline"
                      className="bg-gray-50 hover:bg-gray-100 border-transparent"
                    >
                      Bağla
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            <Drawer>
              <DrawerTrigger className="rounded-custom bg-gray-100 gap-1 flex items-center px-2 py-1">
                <span className="text-xs font-medium text-gray-600">
                  Balans:
                </span>
                <b className="font-bold text-base">{formatCurrency(0)}</b>
              </DrawerTrigger>
              <DrawerContent>
                <BalanceDrawer />
              </DrawerContent>
            </Drawer>
          </div>
          <div className="flex items-center justify-between">
            <ProfileMobileTitle />
            <ProfileLinksDrawer />
          </div>
        </div>
      </div>
    </header>
  );
}
