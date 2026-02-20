import { Megaphone2 } from "@/components/icons/others";
import Link from "next/link";
import BarterDialog from "@/components/ad-actions/barter-dialog";
import AdvertiseMobileDialog from "../../../../../../components/ad-actions/advertise-dialog";

export default function AdActions({ editable }: { editable?: boolean }) {
  return (
    <div className="flex items-center gap-3 font-semibold">
      <Link
        href="/ads/1/advertise"
        className="md:flex hidden flex-1 items-center justify-center gap-2 rounded-xl border border-error-300 bg-error-50 px-4 py-3.5 text-error-500 hover:bg-error-100 transition"
      >
        Elanı reklam et <Megaphone2 />
      </Link>
      <AdvertiseMobileDialog />
      {!editable && <BarterDialog />}
    </div>
  );
}
