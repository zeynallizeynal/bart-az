"use client";

import { ActionDialogDefaultClose } from "@/components/ad-actions/action-dialog";
import AdvertiseDialogForm from "@/components/ad-actions/advertise-dialog/advertise-dialog-form";
import DialogPing from "@/components/ad-actions/dialog-ping";
import { Check, Megaphone2 } from "@/components/icons/others";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

export default function AdvertiseDialogWrapper() {
  const [page, setPage] = useState<"default" | "done">("default");

  if (page === "default")
    return (
      <div className="flex flex-col pt-6 animate-in fade-in-0 duration-500">
        <DialogHeader className="mb-10">
          <div className="size-10 rounded-full bg-error-100 text-background center">
            <span className="center size-7 rounded-full bg-error-500">
              <Megaphone2 size={16} />
            </span>
          </div>
          <DialogTitle className="mb-0">Elanı reklam et</DialogTitle>
        </DialogHeader>
        <p className="rounded-custom bg-warning-50 mb-6 text-warning-600 font-medium px-3 py-2 text-sm">
          Ödədişin miqdarı müddət və paketə görə dəyişir!
        </p>
        <AdvertiseDialogForm setPage={setPage} />
      </div>
    );
  if (page === "done")
    return (
      <div className="animate-fade-in">
        <DialogPing title="Elanı reklam edildi!" variant="success">
          <Check size={48} />
        </DialogPing>
        <ActionDialogDefaultClose />
      </div>
    );
}
