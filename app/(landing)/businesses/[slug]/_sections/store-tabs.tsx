"use client";

import { cn } from "@/lib/utils";
import { Tab, Tabs } from "@/components/ui/tabs";
import { useState } from "react";

const fakeTabs = [
  { name: "Bütün elanlar", number: 27 },
  { name: "Elektronika", number: 20 },
  { name: "Şəxsi əşyalar", number: 4 },
  { name: "Ev və bağ üçün", number: 3 },
];

export default function StoreTabs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="overflow-x-auto bg-blue-50 rounded-xl">
      <Tabs className="px-2 text-gray-900 [&_[data-active-indicator]]:h-0.5 w-max overflow-hidden">
        {fakeTabs.map((tab, index) => (
          <Tab
            key={index}
            isIndicatorActive={activeTab === index}
            className={cn("px-6 h-[60px] rounded-md", {
              "font-bold text-gray-900": activeTab === index,
              "font-medium text-gray-600": activeTab !== index,
            })}
            onClick={() => {
              setActiveTab(index);
            }}
          >
            {tab.name} ({tab.number})
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
