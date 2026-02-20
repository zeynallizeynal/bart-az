"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { links, ProfileLinkProps } from "@/constants/links";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { HamburgerMenu } from "bartaz-icons";

export function ProfileLinks() {
  return (
    <ProfileLinksContainer>
      {links.map((link, index) => (
        <ProfileLink link={link} key={index} />
      ))}
    </ProfileLinksContainer>
  );
}

export function ProfileLinksContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div role="list" className="flex flex-col gap-2 font-medium text-base">
      {children}
    </div>
  );
}

export function ProfileLink({
  link,
  onClick,
}: {
  link: ProfileLinkProps;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  return (
    <Link
      onClick={onClick}
      role="listitem"
      href={link.href}
      className={cn(
        "h-12 rounded-xl px-3 flex items-center gap-3 transition [&_svg]:size-6 [&:hover_svg]:-translate-y-0.5",
        pathname.startsWith(link.href)
          ? "bg-blue-50 text-blue-700 hover:bg-blue-100/65"
          : "text-gray-900 hover:bg-gray-100",
      )}
    >
      {link.icon}
      {link.label}
    </Link>
  );
}

export function ProfileLinkButton({ link }: { link: ProfileLinkProps }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <button
      role="listitem"
      onClick={() => router.push(link.href)}
      className={cn(
        "h-12 rounded-xl px-3 flex items-center gap-3 transition [&:hover_svg]:-translate-y-0.5 w-full",
        pathname.startsWith(link.href)
          ? "bg-blue-50 text-blue-700 hover:bg-blue-100/65"
          : "text-gray-900 hover:bg-gray-100",
      )}
    >
      {link.icon}
      {link.label}
    </button>
  );
}

export function ProfileLinksDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
      <DrawerTrigger asChild onClick={() => setIsOpen(true)}>
        <Button
          variant="outline"
          aria-label="Naviqasiya menyusu"
          className="size-12 px-0 text-2xl"
        >
          <HamburgerMenu />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Profilim</DrawerTitle>
        </DrawerHeader>
        <div className="pb-4">
          <ProfileLinksContainer>
            {links.map((link, index) => (
              <ProfileLink
                link={link}
                key={index}
                onClick={() => setIsOpen(false)}
              />
            ))}
          </ProfileLinksContainer>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
