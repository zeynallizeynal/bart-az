import { Tab, Tabs } from "@/components/ui/tabs";
import { useState } from "react";
import BarterDialogAds from "@/components/ad-actions/barter-dialog/barter-dialog-ads";
import BarterDialogProduct from "@/components/ad-actions/barter-dialog/barter-dialog-product";

export default function BarterDialogForm() {
  const [activeTab, setActiveTab] = useState<"with-ads" | "with-product">(
    "with-ads",
  );

  return (
    <div className="space-y-5">
      <Tabs className="[&_[data-active-indicator]]:h-0.5 w-full">
        <Tab
          layout="size"
          onClick={() => setActiveTab("with-ads")}
          isIndicatorActive={activeTab === "with-ads"}
          className="h-12 w-1/2 data-[active]:text-blue-500 rounded-xl data-[active]:font-bold data-[active]:text-base font-medium"
        >
          Elanlarımla
        </Tab>
        <Tab
          layout="size"
          onClick={() => setActiveTab("with-product")}
          isIndicatorActive={activeTab === "with-product"}
          className="h-12 w-1/2 data-[active]:text-blue-500 rounded-xl data-[active]:font-bold data-[active]:text-base font-medium"
        >
          Əlimdəki məhsulla
        </Tab>
      </Tabs>
      <div className="space-y-3">
        {activeTab === "with-ads" ? (
          <BarterDialogAds />
        ) : (
          <BarterDialogProduct />
        )}
      </div>
    </div>
  );
}
