"use client";

import { DefaultSelect } from "@/components/ui/select";
import React from "react";

const langs = [
  { label: "Azerbaijan", value: "AZ" },
  { label: "English", value: "ENG" },
];

export default function SelectLanguage() {
  const [language, setLanguage] = React.useState(langs[0].value);

  return (
    <DefaultSelect
      align='end'
      triggerClassName='h-7 px-2 rounded-md !font-semibold focus:ring-1 ring-blue-700 bg-gray-200 text-gray-900'
      value={language}
      onValueChange={setLanguage}
      items={langs}
    />
  );
}
