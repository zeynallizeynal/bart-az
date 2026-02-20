import ButtonLink from "@/components/button-link";
import { ClockFill, LocationFill, Store } from "@/components/icons/others";
import Image from "next/image";
import Link from "next/link";
import MaskNumber from "@/components/ad-actions/mask-number";
import { Listing } from "@/types/models/listing";

export default function ContactButtons({ data }: { data: Listing }) {
  const phone = data.business?.phone1 ?? data.info.user_phone;
  return (
    <div className="space-y-3">
      <MaskNumber number={data.business?.phone1 ?? data.info.user_phone} />
      <Link
        target="_blank"
        href={`https://api.whatsapp.com/send?phone=${phone}`}
        className="w-full bg-success-50 border border-success-300 text-success-600 rounded-xl flex flex-col items-center justify-center h-14 hover:bg-success-100 transition"
      >
        <span className="font-bold flex items-center gap-2">
          <Image
            src="/images/icons/whatsapp.png"
            width={32}
            height={32}
            alt="Whatsapp"
          />
          Whatsapp-da yaz
        </span>
      </Link>
      {data.business && (
        <div className="rounded-xl border border-gray-200 p-5 flex flex-col gap-4 bg-gray-50">
          <div className="space-y-3">
            <p className="font-bold text-base text-gray-800 leading-snug">
              {data.business.name ?? "NULL - Title"}
            </p>
            <p className="text-sm leading-5.5">
              {data.business.description ?? "-"}
            </p>
          </div>
          <div className="w-full h-px bg-gray-200" />
          <ul className="space-y-2">
            <li className="flex gap-1.5 text-gray-800 text-sm">
              <ClockFill size={18} className="opacity-40 shrink-0" />
              <span className="flex flex-col gap-px">
                <span>
                  Hər gün:{" "}
                  {data.business.weekly_work_hour.split("|").join(" - ")}
                </span>
                <span>
                  Həftə sonları:{" "}
                  {data.business.weekend_work_hour.split("|").join(" - ")}
                </span>
              </span>
            </li>
            {data.business.address && (
              <li className="flex items-center gap-1 5 text-gray-800 text-sm">
                <LocationFill size={18} className="opacity-40 shrink-0" />
                <span className="flex flex-col gap-px">
                  {data.business.address}
                </span>
              </li>
            )}
          </ul>
          <ButtonLink href={`/businesses/${data.business.slug}`} size="lg">
            <Store /> Mağazaya keç
          </ButtonLink>
        </div>
      )}
    </div>
  );
}
