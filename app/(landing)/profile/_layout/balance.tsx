import Image from "next/image";
import { formatCurrency } from "@/utils/currency.util";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DrawerHeader, DrawerTitle } from "@/components/ui/drawer";

export function Balance() {
  return (
    <div className="rounded-3xl border border-gray-200 p-5 pl-6 md:block hidden">
      <div className="flex items-center gap-6 justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/images/icons/wallet.png"
            width={68}
            height={56}
            alt="Balans"
          />
          <div className="inline-flex gap-2 items-center">
            <span className="text-sm text-gray-600">Balans:</span>
            <b className="text-xl font-bold">{formatCurrency(0)}</b>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Input name="balance" label="Məbləği daxil edin" />
          <Button variant="success">Balansı artır</Button>
        </div>
      </div>
    </div>
  );
}

export function BalanceDrawer() {
  return (
    <>
      <DrawerHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/images/icons/wallet.png"
              width={58}
              height={48}
              alt="Balans"
            />
            <DrawerTitle>Balans</DrawerTitle>
          </div>
          <b className="text-xl font-bold">{formatCurrency(0)}</b>
        </div>
      </DrawerHeader>
      <div className="flex flex-col gap-4 pb-4">
        <Input type="number" label="Məbləği daxil edin" />
        <Button variant="success">Balansı artır</Button>
      </div>
    </>
  );
}
