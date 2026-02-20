import { cn } from "@/lib/utils";
import { Check, XClose } from "@/components/icons/others";
import { formatCurrency } from "@/utils/currency.util";
import { fakePlans } from "@/app/(landing)/listings/[slug]/advertise/_components/advertise-form";

export default function AdvertiseFormPlans({
  plan,
  setPlan,
}: {
  plan: string;
  setPlan(value: string): void;
}) {
  return (
    <div className="space-y-3">
      <div className="text-lg">Reklam edəcəyiniz planı seçin:</div>
      <div className="flex gap-4">
        {fakePlans.map((item, index) => (
          <div
            key={index}
            tabIndex={0}
            onClick={() => setPlan(item.name)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setPlan(item.name);
              }
            }}
            className={cn(
              "rounded-2xl hover:bg-gray-50 p-6 pb-8 flex flex-col gap-4 focus-visible:ring transition cursor-pointer active:scale-[0.97] flex-1",
              plan === item.name
                ? "ring-[3px] ring-blue-500"
                : "ring-1 ring-gray-200",
            )}
          >
            <input
              tabIndex={-1}
              type="radio"
              value={item.name}
              name="plan"
              className="sr-only"
            />
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "size-5 rounded-full relative border border-gray-300 after:absolute after:size-2 after:top-1/2 after:-translate-y-1/2 after:left-1/2 after:bg-background after:-translate-x-1/2 after:rounded-full",
                  {
                    "bg-blue-600 border-none": plan === item.name,
                  },
                )}
              />
              <h4 className="text-gray-600">{item.name}</h4>
              {item.discountPercentage && (
                <div className="h-8 text-background bg-blue-500 font-semibold flex items-center px-1 5 rounded-md ml-auto">
                  -{item.discountPercentage}% endirim
                </div>
              )}
            </div>
            <ul className="flex flex-col gap-5 text-default font-medium flex-1">
              {item.features.map((feature, index) => (
                <li
                  key={index}
                  className="text-gray-800 flex items-center gap-3 leading-[22px]"
                >
                  <span className={cn(!feature.value && "text-gray-400")}>
                    {feature.name}
                  </span>
                  {feature.value ? (
                    <Check className="text-success-500 shrink-0 [&_path]:stroke-[3px] ml-auto" />
                  ) : (
                    <XClose className="text-gray-300 shrink-0 [&_path]:stroke-[3px] ml-auto" />
                  )}
                </li>
              ))}
            </ul>
            <div className="text-gray-900 leading-tight">
              <strong className="font-bold text-[1.75rem]">
                {item.price > 0
                  ? formatCurrency(
                      item.discount ? item.price - item.discount : item.price,
                    )
                  : "Pulsuz"}
              </strong>
              {item.discountPercentage && (
                <del className="text-gray-500 text-base font-medium ml-1.5">
                  {formatCurrency(item.price)}
                </del>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
