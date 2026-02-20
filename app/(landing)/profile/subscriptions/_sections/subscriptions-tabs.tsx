"use client";

import ProfileBody from "@/app/(landing)/profile/_layout/profile-body";
import { Tab, Tabs } from "@/components/ui/tabs";
import ActivePlanTable from "@/app/(landing)/profile/subscriptions/_sections/active-plan-table";
import OtherPlans from "@/app/(landing)/profile/subscriptions/_sections/other-plans";
import { cn } from "@/lib/utils";
import { useSearchParams } from "@/hooks/use-search-params";

const fakeItems = [
  {
    content: "Aktiv abunəlik",
    value: "active",
  },
  { content: "Digər paketlər", value: "others" },
];

export default function SubscriptionsTabs() {
  const searchParams = useSearchParams();
  const subscription = searchParams.get("subscription") || "active";

  return (
    <ProfileBody title="Abunəliklər">
      <div className="space-y-6">
        <Tabs className="bg-gray-100 rounded-xl overflow-x-auto [&_[data-active-indicator]]:h-[3px]">
          {fakeItems.map((item, i) => (
            <Tab
              key={i}
              onClick={() => searchParams.set("subscription", item.value)}
              isIndicatorActive={item.value === subscription}
              className={cn("px-6 h-[60px] rounded-md", {
                "font-bold text-gray-900": item.value === subscription,
                "font-medium text-gray-600": subscription !== item.value,
              })}
            >
              {item.content}
            </Tab>
          ))}
        </Tabs>
        <div className="space-y-6">
          {subscription === "active" ? (
            <div className="border border-gray-200 rounded-3xl p-4">
              <ActivePlanTable />
            </div>
          ) : (
            <OtherPlans />
          )}
        </div>
      </div>
    </ProfileBody>
  );
}
