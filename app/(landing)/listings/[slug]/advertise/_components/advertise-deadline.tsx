"use client";

import { DefaultSelect } from "@/components/ui/select";
import React, { useState } from "react";

export default function AdvertiseDeadline({
  children,
}: {
  children: React.ReactNode;
}) {
  const [deadline, setDeadline] = useState("");

  return (
    <div className='flex flex-col gap-3'>
      {children}
      <DefaultSelect
        items={[
          { label: "1 ay", value: "1-month" },
          { label: "6 ay", value: "6-month" },
          { label: "12 ay", value: "12-month" },
        ]}
        value={deadline}
        onValueChange={setDeadline}
      />
    </div>
  );
}
