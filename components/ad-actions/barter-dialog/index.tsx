import { Barter3 } from "@/components/icons/others";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ActionDialog from "@/components/ad-actions/action-dialog";
import BarterDialogWrapper from "@/components/ad-actions/barter-dialog/barter-dialog-wrapper";

export default function BarterDialog() {
  return (
    <Dialog>
      <DialogTrigger className="flex-1 center gap-2 rounded-xl border border-blue-300 bg-blue-50 px-4 py-3.5 text-blue-500 hover:bg-blue-100">
        Barter təklif et <Barter3 />
      </DialogTrigger>
      <ActionDialog>
        <BarterDialogWrapper />
      </ActionDialog>
    </Dialog>
  );
}
