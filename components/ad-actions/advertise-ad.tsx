import { Check, Megaphone2 } from "@/components/icons/others";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ActionDialog, {
  ActionDialogClose,
} from "@/components/ad-actions/action-dialog";
import DialogPing from "@/components/ad-actions/dialog-ping";

export default function AdvertiseAd() {
  return (
    <Dialog>
      <DialogTrigger className="flex-1 center gap-2 rounded-xl border border-error-300 bg-error-50 px-4 py-3.5 text-error-500 hover:bg-error-100">
        Elanı reklam et <Megaphone2 />
      </DialogTrigger>
      <ActionDialog>
        <DialogPing title="Elanı reklam edildi!" variant="success">
          <Check size={48} />
        </DialogPing>
        <ActionDialogClose className="mt-12 w-[240px] mx-auto">
          Bağla
        </ActionDialogClose>
      </ActionDialog>
    </Dialog>
  );
}
