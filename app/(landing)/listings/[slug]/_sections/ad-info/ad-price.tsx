import Image from "next/image";
import { formatCurrency } from "@/utils/currency.util";
import Link from "next/link";
import {
  Calendar,
  Check,
  EyeFill,
  Hashtag,
  Save,
  XClose,
} from "@/components/icons/others";
import { cn } from "@/lib/utils";
import ShareAd from "@/components/ad-actions/share-ad";
import AdLink from "@/components/ad-link";
import { CloseRemove } from "bartaz-icons";
import { Button } from "@/components/ui/button";
import { Listing } from "@/types/models/listing";
import ContactButtons from "./contact-buttons";
import AdActions from "./ad-actions";
import { parseDate } from "@/utils/parser.util";
import { format } from "date-fns";
import { ListingFormSubmit } from "@/components/listing-form";

export default function AdPrice({
  className,
  editable,
  data,
}: {
  className?: string;
  data: Listing;
  editable?: boolean;
}) {
  return (
    <div
      className={cn(
        "sticky top-0 md:w-90 w-full shrink-0 flex-col gap-5",
        className,
      )}
    >
      <div className="flex bg-background flex-col gap-5 rounded-custom-xl border border-gray-300 p-5 pt-6">
        <div className="space-y-2">
          <div className="font-medium text-xl hidden md:block">{data.name}</div>
          <div className="flex items-center gap-2">
            <strong className="inline-flex items-center gap-1 text-3xl font-extrabold leading-tight">
              {data.sale && (
                <Image
                  src="/images/icons/fire.svg"
                  width={32}
                  height={32}
                  alt="Popular"
                />
              )}
              {formatCurrency(+data.price)} {data.currency?.symbol}
            </strong>
            {data.sale && (
              <div className="inline-flex flex-col h-8.5">
                <span className="leading-4 text-gray-600 text-default-xs">
                  Bazar qiyməti
                </span>
                <del className="text-base text-gray-600 font-bold leading-5.5">
                  {formatCurrency(320)}
                </del>
              </div>
            )}
          </div>
        </div>
        <div className="w-full h-px bg-gray-200" />
        <div className="flex items-center gap-3">
          <Image
            src={
              data.business
                ? "/images/icons/elnur_mobile.png"
                : "/images/profile_placeholder.png"
            }
            alt="Elnur Mobile"
            width={48}
            height={48}
          />
          <div className="space-y-1">
            <div className="text-gray-900 font-medium text-base">
              {data.business?.name ?? data.user.name}
            </div>
            <Link href="#" className="tebg-blue-600 text-sm underline">
              {data.business?.advs_count} elan
            </Link>
          </div>
          {data.business && (
            <span className="text-default-xs font-semibold text-background bg-blue-600 rounded-md px-2 py-1 ml-auto">
              Mağaza
            </span>
          )}
        </div>
        {editable ? (
          <div className="flex flex-col gap-5">
            <ShareAd className="w-full" />
            <AdLink label="Elanın linki" link="bart.az/#66687" />
            <div className="p-5 rounded-xl border border-gray-200 bg-gray-50 flex flex-col gap-4 text-gray-800">
              <div>
                Elanın planı: <b>VIP</b>
              </div>
              <div className="h-px rounded bg-gray-200 w-full" />
              <ul className="flex flex-col gap-5 text-default font-medium flex-1">
                <li className="text-gray-800 flex items-center gap-3 leading-5.5 justify-between">
                  <span>Elan 30 gün müddətinə dərc edilir</span>
                  <Check className="text-success-500 shrink-0 [&_path]:stroke-[3px]" />
                </li>
                <li className="text-gray-800 flex items-center gap-3 leading-5.5 justify-between">
                  <span>Daha çox alıcıya göstərilmə</span>
                  <Check className="text-success-500 shrink-0 [&_path]:stroke-[3px]" />
                </li>
                <li className="text-gray-800 flex items-center gap-3 leading-5.5 justify-between">
                  <span className="text-gray-400">
                    Daha çox alıcıya göstərilmə
                  </span>
                  <XClose className="text-gray-300 shrink-0 [&_path]:stroke-[3px]" />
                </li>
                <li className="text-gray-800 flex items-center gap-3 leading-5.5 justify-between">
                  <span className="text-gray-400">
                    Elanın ön sıralara çəkilməsi (10 gün / gündə 1 dəfə)
                  </span>
                  <XClose className="text-gray-300 shrink-0 [&_path]:stroke-[3px]" />
                </li>
              </ul>
            </div>
            <div className="space-y-3 md:block hidden">
              <ListingFormSubmit className="w-full" variant="success">
                <Save />
                Yadda saxla
              </ListingFormSubmit>
              <Button className="w-full" variant="destructive">
                <CloseRemove className="text-2xl" />
                Deaktiv et
              </Button>
            </div>
          </div>
        ) : (
          <ContactButtons data={data} />
        )}
      </div>
      <div className="flex gap-3">
        <div className="rounded-xl space-y-2 border border-gray-300 p-4 text-gray-400 flex-1 hover:border-gray-400 transition">
          <Hashtag />
          <div>
            <div className="text-gray-600 text-xs leading-normal">
              Elan nömrəsi
            </div>
            <div className="text-sm text-gray-800 font-medium leading-5">
              {data.id}
            </div>
          </div>
        </div>
        <div className="rounded-xl space-y-2 border border-gray-300 p-4 text-gray-400 flex-1 hover:border-gray-400 transition">
          <EyeFill />
          <div>
            <div className="text-gray-600 text-xs leading-normal">
              Baxış sayı
            </div>
            <div className="text-sm text-gray-800 font-medium leading-5">
              {data.info.view_count}
            </div>
          </div>
        </div>
        <div className="rounded-xl space-y-2 border border-gray-300 p-4 text-gray-400 flex-1 hover:border-gray-400 transition">
          <Calendar />
          <div>
            <div className="text-gray-600 text-xs leading-normal">
              Yeniləndi
            </div>
            <div className="text-sm text-gray-800 font-medium leading-5">
              {format(parseDate(data.updated_at), "dd MMMM yyyy")}
            </div>
          </div>
        </div>
      </div>
      <AdActions editable={editable} />
    </div>
  );
}
