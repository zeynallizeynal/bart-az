import Image from "next/image";
import { Stars } from "@/components/icons/others";
import { DialogClose } from "@/components/ui/dialog";
import ButtonLink from "@/components/button-link";
import { useAuthDialogStore } from "@/stores/auth.store";

export default function AuthSuccess() {
  const { setOpen } = useAuthDialogStore();
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-center items-center">
        <Image
          src="/images/empty_states/auth_success.svg"
          width={164}
          height={164}
          alt="Success"
        />
      </div>
      <div className="space-y-6 text-center text-gray-900">
        <h4>Uğurlu qeydiyyat</h4>
        <p className="body-lg-regular">
          Qeydiyyat uğurla başa çatdı. Yenilənmiş saytımızı kəşf etməyə elə indi
          başla!
        </p>
      </div>
      <DialogClose asChild onClick={() => setOpen(false)}>
        <ButtonLink href="/" size="lg">
          Elnalara bax <Stars />
        </ButtonLink>
      </DialogClose>
    </div>
  );
}
