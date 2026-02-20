"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useState, useTransition } from "react";
import { LuLoaderCircle, LuLogOut } from "react-icons/lu";
import { Dialog, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ActionDialog, {
  ActionDialogBottomButtons,
} from "@/components/ad-actions/action-dialog";
import { toast } from "sonner";
import { logout } from "@/actions/auth.action";
import { usePathname, useRouter } from "next/navigation";
import { queryClient } from "@/lib/query-client";

export default function LogoutAlert() {
  const [loggingOut, logoutTransition] = useTransition();
  const { setProfile } = useAuthStore();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        disabled={loggingOut}
        className="flex items-center gap-1.5"
      >
        {loggingOut ? (
          <LuLoaderCircle className="animate-spin" size={18} />
        ) : (
          <LuLogOut size={18} />
        )}
        Çıxış
      </DialogTrigger>
      <ActionDialog>
        <DialogTitle className="font-medium text-xl mt-6 mb-0">
          Çıxış etmək istədiyinizə əminsiniz?
        </DialogTitle>
        <ActionDialogBottomButtons
          onClick={() => {
            logoutTransition(async () => {
              const res = await logout();
              if (res.success) {
                setProfile(null);
                queryClient.invalidateQueries({
                  queryKey: ["profile"],
                });
              }

              toast.success(res.message);
              if (pathname.includes("/listings/new")) router.replace("/");
            });
          }}
          loading={loggingOut}
        >
          Bəli
        </ActionDialogBottomButtons>
      </ActionDialog>
    </Dialog>
  );
}
