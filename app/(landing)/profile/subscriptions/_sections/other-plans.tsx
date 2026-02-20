import { cn } from "@/lib/utils";
import { Check, XClose } from "@/components/icons/others";
import { formatCurrency } from "@/utils/currency.util";

export default function OtherPlans() {
  return (
    <div className="flex flex-col gap-8">
      <button className="flex flex-col gap-8 rounded-2xl border border-gray-200 p-6 pb-8">
        <div className="flex justify-between w-full">
          <h4 className="text-gray-600">Sadə</h4>
          <span className="inline-flex px-1.5 h-8 items-center rounded-md bg-gray-600 font-semibold text-background">
            Hazırki plan
          </span>
        </div>
        <ul className="flex flex-col gap-3 text-default font-medium w-full">
          <li className="text-gray-800 flex items-center gap-3 justify-between leading-[22px] flex-1">
            <span>Elan 30 gün müddətinə dərc edilir</span>
            <Check className="text-success-500 shrink-0 [&_path]:stroke-[3px]" />
          </li>
          <li className="text-gray-800 flex items-center gap-3 justify-between leading-[22px] flex-1">
            <span className={cn("text-gray-400")}>
              Daha çox alıcıya göstərilmə
            </span>{" "}
            <XClose className="text-gray-300 shrink-0 [&_path]:stroke-[3px]" />
          </li>
          <li className="text-gray-800 flex items-center gap-3 justify-between leading-[22px] flex-1">
            <span className={cn("text-gray-400")}>
              Elanın xüsusi rənglə fərqləndirilməsi
            </span>{" "}
            <XClose className="text-gray-300 shrink-0 [&_path]:stroke-[3px]" />
          </li>
          <li className="text-gray-800 flex items-center gap-3 justify-between leading-[22px] flex-1">
            <span className={cn("text-gray-400")}>
              Elanın ön sıralara çəkilməsi (10 gün / gündə 1 dəfə)
            </span>{" "}
            <XClose className="text-gray-300 shrink-0 [&_path]:stroke-[3px]" />
          </li>
        </ul>
        <div className="border-t border-gray-200 text-gray-900 pt-4 w-full text-start">
          <strong className="text-[28px]">Pulsuz</strong>
        </div>
      </button>
      <button className="flex flex-col gap-8 rounded-2xl border border-gray-200 p-6 pb-8 ring ribg-blue-600">
        <div className="flex justify-between w-full">
          <h4 className="text-gray-600">Premium + VIP</h4>
          <span className="inline-flex px-1.5 h-8 items-center rounded-md bg-blue-600 font-semibold text-background">
            -40% endirim
          </span>
        </div>
        <div className="flex md:flex-row flex-col gap-8">
          <ul className="flex flex-col gap-3 text-default font-medium w-full justify-start text-start">
            <h6 className="mb-3 text-start">VIP paketin üstünlükləri</h6>
            <li className="text-gray-800 flex items-center gap-3 justify-between leading-[22px] flex-1">
              <span>Elan 30 gün müddətinə dərc edilir</span>
              <Check className="text-success-500 shrink-0 [&_path]:stroke-[3px]" />
            </li>
            <li className="text-gray-800 flex items-center gap-3 justify-between leading-[22px] flex-1">
              <span>Daha çox alıcıya göstərilmə</span>{" "}
              <Check className="text-success-500 shrink-0 [&_path]:stroke-[3px]" />
            </li>
            <li className="text-gray-800 flex items-center gap-3 justify-between leading-[22px] flex-1">
              <span>Elanın xüsusi rənglə fərqləndirilməsi</span>{" "}
              <Check className="text-success-500 shrink-0 [&_path]:stroke-[3px]" />
            </li>
            <li className="text-gray-800 flex items-center gap-3 justify-between leading-[22px] flex-1">
              <span>Elanın ön sıralara çəkilməsi (10 gün / gündə 1 dəfə)</span>{" "}
              <Check className="text-success-500 shrink-0 [&_path]:stroke-[3px]" />
            </li>
          </ul>
          <ul className="flex flex-col gap-3 text-default font-medium w-full justify-start text-start">
            <h6 className="mb-3 text-start">Premium paketin üstünlükləri</h6>
            <li className="text-gray-800 flex items-center gap-3 justify-between leading-[22px] flex-1">
              <span>Elan 30 gün müddətinə dərc edilir</span>
              <Check className="text-success-500 shrink-0 [&_path]:stroke-[3px]" />
            </li>
            <li className="text-gray-800 flex items-center gap-3 justify-between leading-[22px] flex-1">
              <span>Daha çox alıcıya göstərilmə</span>{" "}
              <Check className="text-success-500 shrink-0 [&_path]:stroke-[3px]" />
            </li>
            <li className="text-gray-800 flex items-center gap-3 justify-between leading-[22px] flex-1">
              <span>Elanın xüsusi rənglə fərqləndirilməsi</span>{" "}
              <Check className="text-success-500 shrink-0 [&_path]:stroke-[3px]" />
            </li>
            <li className="text-gray-800 flex items-center gap-3 justify-between leading-[22px] flex-1">
              <span>Elanın ön sıralara çəkilməsi (10 gün / gündə 1 dəfə)</span>{" "}
              <Check className="text-success-500 shrink-0 [&_path]:stroke-[3px]" />
            </li>
          </ul>
        </div>
        <div className="border-t border-gray-200 text-gray-900 pt-4 w-full text-start">
          <strong className="text-4xl">{formatCurrency(60)}</strong>
          <del className="text-gray-600 text-base ml-2">
            {formatCurrency(100)}
          </del>
        </div>
      </button>
    </div>
  );
}
