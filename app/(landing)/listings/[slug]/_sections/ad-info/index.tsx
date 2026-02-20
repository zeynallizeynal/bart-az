import Image from "next/image";
import Link from "next/link";
import AdAbout from "./ad-about";
import AdFeatures from "./ad-features";
import AdSlider from "./ad-slider";
import ShareAd from "@/components/ad-actions/share-ad";
import ReportAd from "@/components/ad-actions/report-ad";
import { ListingForm, ListingFormSubmit } from "@/components/listing-form";
import { Button } from "@/components/ui/button";
import { Save } from "@/components/icons/others";
import { CloseRemove } from "bartaz-icons";
import { Listing } from "@/types/models/listing";
import AdPrice from "./ad-price";

const items = [
  "yüngül lehimli disklər",
  "ABS",
  "lyuk",
  "yağış sensoru",
  "mərkəzi qapanma",
  "planşetlər",
  "maqnitola",
  "ps3 oyunları",
  "apple notebook",
  "telefon",
  "lg notebook",
  "fotoaparatların satışı",
  "proqramlar",
  "daşınmaz əmlak",
  "torpaq satılır",
  "playstation 3 satılır",
  "chevrolet",
  "lorem ipsum",
  "yüngül lehimli disklər",
  "ABS",
  "lyuk",
];

export default function AdInfo({
  data,
  editable,
}: {
  data: Listing;
  editable?: boolean;
}) {
  return (
    <section className="md:pb-16 md:pt-0 pt-4 md:overflow-auto">
      <div className="container pb-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="space-y-5 md:w-186 w-full">
            {data.images.length > 0 && (
              <AdSlider data={data} editable={editable} />
            )}
            <AdPrice
              data={data}
              editable={editable}
              className="flex md:hidden"
            />
            <AdFeatures data={data} />
            <AdAbout data={data} />
            {!editable ? (
              <>
                <div className="flex gap-3 text-gray-800 font-semibold">
                  <ShareAd />
                  <ReportAd />
                </div>
                <div className="border border-gray-200 px-8 py-6 rounded-custom-xl space-y-6">
                  <h4 className="flex items-center md:gap-4 gap-2">
                    <span className="relative md:size-8 size-6">
                      <Image
                        src="/images/icons/zoom.svg"
                        fill
                        alt="Populyar axtarışlar"
                        quality={100}
                      />
                    </span>{" "}
                    Populyar axtarışlar
                  </h4>
                  <div className="flex flex-wrap gap-3 md:h-auto max-h-52 overflow-auto">
                    {items.map((item, index) => (
                      <Link
                        key={index}
                        href="#"
                        className="bg-gray-100 rounded-md px-4 leading-8 text-sm hover:bg-gray-200 transition"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="p-8 bg-background rounded-custom-xl border border-gray-200">
                <ListingForm />
              </div>
            )}
          </div>
          <AdPrice data={data} editable={editable} className="md:flex hidden" />
        </div>
      </div>
      {editable && (
        <div className="bg-background py-4">
          <div className="container md:hidden">
            <div className="space-y-3 md:hidden block">
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
        </div>
      )}
    </section>
  );
}
