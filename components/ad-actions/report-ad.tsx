"use client";

import { InfoCircle } from "@/components/icons/others";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ActionDialog, {
  ActionDialogBottomButtons,
  ActionDialogDefaultClose,
} from "@/components/ad-actions/action-dialog";
import DialogPing from "@/components/ad-actions/dialog-ping";
import { IoWarningOutline } from "react-icons/io5";
import { Radio } from "@/components/ui/radio";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const values = [
  { value: "misleading_info", label: "Misleading or false information" },
  { value: "fraud", label: "Potential scam or fraud" },
  { value: "prohibited_item", label: "Prohibited or restricted item" },
  { value: "other", label: "Digər" },
];

export default function ReportAd() {
  const [value, setValue] = useState("");
  const [otherReport, setOtherReport] = useState("");
  const [page, setPage] = useState("form");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen)
      setTimeout(() => {
        setPage("form");
      }, 500);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition gap-2 h-[52px] w-60">
        Şikayət et
        <InfoCircle />
      </DialogTrigger>
      <ActionDialog
        className={cn(
          "justify-center",
          page === "form" && "md:max-w-150 max-w-86",
        )}
      >
        {page === "form" ? (
          <div className="animate-fade-in">
            <DialogPing title="Şikayət et" variant="danger">
              <IoWarningOutline />
            </DialogPing>
            <form
              className="mt-12"
              onSubmit={(e) => {
                e.preventDefault();
                setPage("result");
              }}
            >
              <div className="flex flex-col max-h-64 [&>label]:border-b last:[&>label]:border-none">
                {values.map((v) => (
                  <Radio
                    name="reporOptions"
                    key={v.value}
                    value={v.value}
                    onChange={(event) => setValue(event.target.value)}
                    checked={value === v.value}
                    className="leading-[60px] flex-grow"
                  >
                    {v.label}
                  </Radio>
                ))}
              </div>
              {value === "other" && (
                <textarea
                  name="report"
                  value={otherReport}
                  onChange={(event) => setOtherReport(event.target.value)}
                  className="border mt-2 rounded-custom px-4 py-3.5 text-gray-500 placeholder-gray-500 w-full h-[105px] resize-none"
                  placeholder="Səbəbi qeyd edin..."
                />
              )}
              <ActionDialogBottomButtons
                type="submit"
                variant="destructive"
                className="bg-error-600 hover:bg-error-700 text-background"
              >
                Şikayət et
                <InfoCircle />
              </ActionDialogBottomButtons>
            </form>
          </div>
        ) : (
          <div className="animate-fade-in">
            <DialogPing title="Şikayətiniz qeydə alındı!" variant="danger">
              <IoWarningOutline />
            </DialogPing>
            <ActionDialogDefaultClose />
          </div>
        )}
      </ActionDialog>
    </Dialog>
  );
}
