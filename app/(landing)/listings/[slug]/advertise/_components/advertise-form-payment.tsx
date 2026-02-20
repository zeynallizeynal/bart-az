import { fakePayments } from "@/app/(landing)/listings/[slug]/advertise/_components/advertise-form";
import { cn } from "@/lib/utils";
import { useGetProfileQuery } from "@/services/profile.service";
import { formatCurrency } from "@/utils/currency.util";
import Image from "next/image";

export default function AdvertiseFormPayments({
  paymentMethod,
  setPaymentMethod,
}: {
  paymentMethod: string;
  setPaymentMethod(value: string): void;
  }) {
  const {data:profile} = useGetProfileQuery()
  
  return (
    <div className="space-y-3">
      <div className="text-lg">Ödəniş növünü seçin:</div>
      <div className="flex gap-4">
        {fakePayments.map((item, index) => (
          <div
            tabIndex={0}
            key={index}
            onClick={() => setPaymentMethod(item.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setPaymentMethod(item.value);
              }
            }}
            className={cn(
              "rounded-2xl hover:bg-gray-50 p-6 flex gap-4 focus-visible:ring transition cursor-pointer active:scale-[0.97] flex-1",
              paymentMethod === item.value
                ? "ring-[3px] ring-blue-500"
                : "ring-1 ring-gray-200",
            )}
          >
            <input
              tabIndex={-1}
              type="radio"
              value={item.value}
              name="advertise-payment"
              className="sr-only"
            />
            <div className="flex items-center gap-4 flex-1">
              <span
                className={cn(
                  "size-5 rounded-full relative border border-gray-300 after:absolute after:size-2 after:top-1/2 after:-translate-y-1/2 after:left-1/2 after:bg-background after:-translate-x-1/2 after:rounded-full",
                  {
                    "bg-blue-600 border-none": paymentMethod === item.value,
                  },
                )}
              />
              <Image src={item.image} alt={item.name} width={68} height={56} />
              <h4 className="text-gray-600">{item.name}</h4>
              {profile ? (
                <div className="text-sm flex items-center gap-2 ml-auto">
                  Balans:
                  <span className="text-xl font-bold text-gray-900">
                    {formatCurrency(profile.balance)}
                  </span>
                </div>
              ) : (
                "Loading..."
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
