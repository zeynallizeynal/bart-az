import {
  Barter2,
  Category,
  Documents,
  Location,
  PercentageCircle,
  Stars,
} from "@/components/icons/others";
import { Listing } from "@/types/models/listing";

export default function AdFeatures({ data }: { data: Listing }) {
  return (
    <div className="bg-background px-6 py-4 border border-gray-200 rounded-custom-xl flex sm:flex-row flex-col sm:items-center items-start sm:gap-8">
      <div className="sm:w-[189px] w-full flex flex-col justify-center">
        <div className="flex gap-3 items-center text-blue-500 py-3">
          <Location size={32} />
          <div>
            <div className="text-sm text-gray-500 leading-4">Şəhər</div>
            <div className="text-gray-700 font-medium leading-[1.2]">
              {data.city.name}
            </div>
          </div>
        </div>
        <div className="flex gap-3 items-center text-blue-500 py-3">
          <Documents size={32} />
          <div>
            <div className="text-sm text-gray-500 leading-4">Elan növü</div>
            <div className="text-gray-700 font-medium leading-[1.2]">
              {data.type.name}
            </div>
          </div>
        </div>
      </div>
      <div className="w-px h-28 bg-gray-200 hidden sm:block" />
      <div className="sm:w-[189px] w-full flex flex-col justify-center">
        <div className="flex gap-3 items-center text-blue-500 py-3">
          <Category size={32} />
          <div>
            <div className="text-sm text-gray-500 leading-4">Kateqoriya</div>
            <div className="text-gray-700 font-medium leading-[1.2]">
              {data.category.name}
            </div>
          </div>
        </div>
        <div className="flex gap-3 items-center text-blue-500 py-3">
          <Stars size={32} />
          <div>
            <div className="text-sm text-gray-500 leading-4">Vəziyyəti</div>
            <div className="text-gray-700 font-medium leading-[1.2]">
              {data.info.condition === "2" ? "Köhnə" : "Yeni"}
            </div>
          </div>
        </div>
      </div>
      <div className="w-px h-28 bg-gray-200 hidden sm:block" />
      <div className="sm:w-[189px] w-full flex flex-col justify-center">
        <div className="flex gap-3 items-center text-blue-500 py-3">
          <Barter2 size={32} />
          <div>
            <div className="text-sm text-gray-500 leading-4">Barter</div>
            <div className="text-gray-700 font-medium leading-[1.2]">
              {data.info.condition === "2" ? "Mümkün deyil" : "Mümkündür"}
            </div>
          </div>
        </div>
        <div className="flex gap-3 items-center text-blue-500 py-3">
          <PercentageCircle size={32} />
          <div>
            <div className="text-sm text-gray-500 leading-4">Kredit</div>
            <div className="text-gray-700 font-medium leading-[1.2]">
              {data.credit === "1" ? "Mümkündür" : "Mümkün deyil"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
