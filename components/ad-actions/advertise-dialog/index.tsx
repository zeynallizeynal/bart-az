import { Megaphone2 } from "@/components/icons/others";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ActionDialog from "@/components/ad-actions/action-dialog";
import AdvertiseDialogWrapper from "@/components/ad-actions/advertise-dialog/advertise-dialog-wrapper";

export default function AdvertiseMobileDialog() {
  return (
    <Dialog>
      <DialogTrigger className="flex-1 md:hidden center gap-2 rounded-xl border border-error-300 bg-error-50 px-4 py-3.5 text-error-500 hover:bg-error-100">
        Elanı reklam et <Megaphone2 />
      </DialogTrigger>
      <ActionDialog>
        <AdvertiseDialogWrapper />
      </ActionDialog>
    </Dialog>
  );
}
