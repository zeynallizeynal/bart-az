import { HTMLRenderer } from "@/components/html-renderer";
import { Listing } from "@/types/models/listing";

export default function AdAbout({ data }: { data: Listing }) {
  return (
    <div className="p-8 border bg-background border-gray-200 rounded-custom-xl space-y-4">
      <h4 className="leading-8">Ətraflı məlumat</h4>
      <div className="space-y-1 text-gray-800 text-base p-4 rounded-xl bg-gray-100">
        <HTMLRenderer html={data.info.text} />
        {/* <button className="text-blue-600 leading-6 underline">
          Davamını oxu...
        </button> */}
      </div>
    </div>
  );
}
