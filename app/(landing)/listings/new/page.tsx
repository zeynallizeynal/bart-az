import {
  ListingForm,
  ListingFormProvider,
  ListingFormSubmit,
} from "@/components/listing-form";
import MobileHeader from "@/components/mobile-header";
import Link from "next/link";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <MobileHeader goBack>Yeni elan əlavə et</MobileHeader>
      <section className="md:py-16 py-4 md:bg-gray-50">
        <div className="md:container flex md:flex-row flex-col-reverse gap-6 justify-between md:overflow-auto">
          <div className="md:w-186 w-full shrink-0 py-6 px-4 md:p-0 bg-gray-50 md:bg-transparent">
            <div className="rounded-custom-xl md:p-8 p-6 shadow-box md:space-y-8">
              <h3 className="md:block hidden">Yeni elan əlavə et</h3>
              <Suspense fallback={<div>Loading form...</div>}>
                <ListingFormProvider>
                  <ListingForm>
                    <div className="mt-3 grid grid-cols-1">
                      <ListingFormSubmit>Elanı yerləşdir</ListingFormSubmit>
                    </div>
                  </ListingForm>
                </ListingFormProvider>
              </Suspense>
            </div>
          </div>
          <article className="shrink-0 md:w-90 w-full md:p-0 p-4 text-gray-900 h-fit">
            <div className="rounded-2xl shadow-box p-6 space-y-5">
              <h6 className="md:text-[22px] text-xl md:leading-7 leading-[26px] font-semibold">
                Qaydalarımız
              </h6>
              <ul className="space-y-4 leading-[1.47]">
                <li>Eyni elanı bir neçə dəfə təqdim etməyin.</li>
                <li>
                  Təsvir və ya şəkillərdə telefon, email və ya sayt ünvanı
                  göstərməyin.
                </li>
                <li>Ad yerində qiymət yazmayın - bunun üçün ayrıca yer var.</li>
                <li>Qadağan olunmuş məhsulları satmayın.</li>
                <li>
                  <Link
                    href="/public"
                    className="text-blue-600 font-medium underline"
                  >
                    Bütün qaydaları oxu
                  </Link>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
