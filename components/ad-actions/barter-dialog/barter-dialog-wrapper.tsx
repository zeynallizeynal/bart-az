"use client";

import DialogPing from "@/components/ad-actions/dialog-ping";
import { Barter3, Check } from "@/components/icons/others";
import {
  ActionDialogBottomButtons,
  ActionDialogDefaultClose,
} from "@/components/ad-actions/action-dialog";
import { useState } from "react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import BarterDialogForm from "@/components/ad-actions/barter-dialog/barter-dialog-form";

export default function BarterDialogWrapper() {
  const [page, setPage] = useState<"default" | "form" | "done">("default");

  if (page === "default")
    return (
      <>
        <DialogPing title="Barter təklif et" variant="success">
          <Barter3 size={48} />
        </DialogPing>
        <p className="text-gray-500 text-base leading-6 mt-2 text-center">
          Barter təklif etmək üçün ya öz elanlarınızdan seçməlisiniz, yada
          əlinizdəki məhsulun şəkillərini göndərməlisiniz.
        </p>
        <ActionDialogBottomButtons onClick={() => setPage("form")}>
          Təklif et <Check />
        </ActionDialogBottomButtons>
      </>
    );
  if (page === "form")
    return (
      <div className="flex flex-col pt-6 animate-in fade-in-0 duration-500">
        <DialogHeader className="mb-10">
          <div className="size-10 rounded-full bg-blue-100 text-background center">
            <span className="center size-7 rounded-full bg-blue-500">
              <Barter3 size={16} />
            </span>
          </div>
          <DialogTitle className="mb-0">Barter təklif et</DialogTitle>
        </DialogHeader>
        <BarterDialogForm />
        <ActionDialogBottomButtons onClick={() => setPage("done")}>
          Təklif et <Check />
        </ActionDialogBottomButtons>
      </div>
    );
  if (page === "done")
    return (
      <div className="animate-fade-in">
        <DialogPing title="Barter təklif edildi!" variant="success">
          <Barter3 size={48} />
        </DialogPing>
        <ActionDialogDefaultClose />
      </div>
    );
}
