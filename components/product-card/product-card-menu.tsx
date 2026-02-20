"use client";

import { deleteListing } from "@/actions/listing.action";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Listing } from "@/types/models/listing";
import Link from "next/link";
import { useState, useTransition } from "react";
import { BsThreeDots } from "react-icons/bs";
import { toast } from "sonner";

export default function ProductCardMenu({ data }: { data: Listing }) {
  const [open, setOpen] = useState(false);
  const [isDeleting, startDeletion] = useTransition();

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="absolute z-2 top-3 right-3 bg-background rounded w-7 h-6 flex items-center justify-center cursor-default">
        <BsThreeDots />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-background" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem
            asChild
            className="px-2 py-1.5 cursor-default focus:bg-gray-100"
          >
            <Link target="_blank" href={`/listings/${data.slug}/edit`}>
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            className="px-2 py-1.5 cursor-default focus:bg-gray-100"
            disabled={isDeleting}
            onClick={(event) => {
              event.preventDefault();
              startDeletion(async () => {
                try {
                  const res = await deleteListing(data.id);
                  toast.success(res.message);
                } catch (err) {
                  toast.error((err as Error).message);
                } finally {
                  setOpen(false)
                }
              });
            }}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
