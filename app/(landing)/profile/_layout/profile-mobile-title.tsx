"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfileMobileTitle() {
  const [title, setTitle] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("ads")) setTitle("Elanlarım");
    else if (pathname.includes("balance")) setTitle("Balans");
    else if (pathname.includes("settings")) setTitle("Tənzimləmələr");
    else if (pathname.includes("services")) setTitle("Xidmətlər");
    else if (pathname.includes("subs")) setTitle("Abunəliklər");
    else if (pathname.includes("referrals")) setTitle("Referallar");
  }, [pathname]);

  return <h1 className="text-[28px]">{title}</h1>;
}
