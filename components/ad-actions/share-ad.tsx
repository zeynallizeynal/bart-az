import { Share } from "@/components/icons/others";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ActionDialog, {
  ActionDialogDefaultClose,
} from "@/components/ad-actions/action-dialog";
import DialogPing from "@/components/ad-actions/dialog-ping";
import AdLink from "@/components/ad-link";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";
import { RiTelegram2Fill } from "react-icons/ri";
import { cn } from "@/lib/utils";

export default function ShareAd({ className }: { className?: string }) {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition gap-2 h-[52px] w-60",
          className,
        )}
      >
        Elanı paylaş <Share />
      </DialogTrigger>
      <ActionDialog className="justify-center">
        <DialogPing title="Elanı paylaş" variant="info">
          <Share size={48} />
        </DialogPing>
        <div className="flex flex-col gap-5 md:mt-5 mt-2">
          <AdLink link="bart.az/#66687" label="Elanın linki" />
          <Socials />
        </div>
        <ActionDialogDefaultClose />
      </ActionDialog>
    </Dialog>
  );
}

function Socials() {
  return (
    <div className="md:flex gap-2.5 hidden">
      <button className="h-12 rounded-lg flex-grow bg-blue-50 hover:bg-blue-100 text-blue-600 center">
        <FaFacebookF />
      </button>
      <button className="h-12 rounded-lg flex-grow bg-blue-50 hover:bg-blue-100 text-blue-600 center">
        <RiTelegram2Fill />
      </button>
      <button className="h-12 rounded-lg flex-grow bg-blue-50 hover:bg-blue-100 text-blue-600 center">
        <FaXTwitter />
      </button>
      <button className="h-12 rounded-lg flex-grow bg-blue-50 hover:bg-blue-100 text-blue-600 center">
        <FaInstagram />
      </button>
      <button className="h-12 rounded-lg flex-grow bg-blue-50 hover:bg-blue-100 text-blue-600 center">
        <FaTiktok />
      </button>
    </div>
  );
}
