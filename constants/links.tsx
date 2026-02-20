import React from "react";
import {
  Documents,
  EmptyWallet,
  ReceiptDisscount,
  Setting1,
  Stars4,
} from "bartaz-icons";
import { MultiUsers } from "@/components/icons/others";

export interface ProfileLinkProps {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export const links: ProfileLinkProps[] = [
  {
    label: "Elanlarım",
    href: "/profile/listings",
    icon: <Documents className="transition" />,
  },
  {
    label: "Balans",
    href: "/profile/balance",
    icon: <EmptyWallet className="transition" />,
  },
  {
    label: "Tənzimləmələr",
    href: "/profile/settings",
    icon: <Setting1 className="transition" />,
  },
  {
    label: "Xidmətlər",
    href: "/profile/services",
    icon: <ReceiptDisscount className="transition" />,
  },
  {
    label: "Abunəliklər",
    href: "/profile/subscriptions",
    icon: <Stars4 className="transition" />,
  },
  {
    label: "Referral",
    href: "/profile/referrals",
    icon: <MultiUsers className="transition" />,
  },
];
