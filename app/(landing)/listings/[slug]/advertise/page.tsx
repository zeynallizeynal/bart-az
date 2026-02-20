import Image from "next/image";
import { formatCurrency } from "@/utils/currency.util";
import { InfoCircleFill } from "@/components/icons/others";
import AdvertiseDeadline from "@/app/(landing)/listings/[slug]/advertise/_components/advertise-deadline";
import AdvertiseForm from "@/app/(landing)/listings/[slug]/advertise/_components/advertise-form";

export default function Page() {
  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="shadow-box rounded-custom-xl p-8 space-y-8 bg-background">
            <h3 className="leading-10">Elan reklam et</h3>
            <div className="border border-gray-200 p-5 flex gap-4 rounded-custom-xl bg-gray-50 w-[524px]">
              <Image
                src="/images/image0.png"
                alt="Samsung Galaxy S24 Onyx Black 128GB/8GB"
                width={132}
                height={108}
                className="rounded-xl"
              />
              <div className="space-y-2">
                <div className="flex flex-col h-[60px] justify-between">
                  <div className="text-xl font-extrabold text-gray-900">
                    {formatCurrency(46500)}
                  </div>
                  <div className="text-default-lg font-medium line-clamp-1 text-gray-800">
                    Samsung Galaxy S24 Onyx Black 128GB / 8GB
                  </div>
                </div>
                <div className="text-gray-500">Bakı, 21 sentyabr 2024</div>
              </div>
            </div>
            <p className="text-warning-600 bg-warning-50 h-[56px] flex items-center px-4 gap-3 rounded-xl font-medium">
              <InfoCircleFill />
              Ödədişin miqdarı müddət və paketə görə dəyişir!
            </p>
            <AdvertiseDeadline>
              <p className="text-base text-gray-800 font-medium">
                Reklam edəcəyiniz müddəti seçin
              </p>
            </AdvertiseDeadline>
            <AdvertiseForm />
          </div>
        </div>
      </section>
    </>
  );
}
