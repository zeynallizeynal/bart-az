import { DialogClose, DialogContent } from "@/components/ui/dialog";
import { DialogCloseProps, DialogContentProps } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { IoClose } from "react-icons/io5";
import { Button } from "@/components/ui/button";

export default function ActionDialog(props: DialogContentProps) {
  return (
    <DialogContent
      {...props}
      className={cn(
        "rounded-custom-xl md:p-8 p-6 pt-0! bg-background max-w-86 sm:max-w-120 w-full overflow-hidden flex flex-col",
        props.className,
      )}
    >
      <DialogClose className="absolute top-6 size-10 right-8 z-40 flex items-center justify-center text-xl text-gray-500 hover:text-foreground transition">
        <IoClose />
      </DialogClose>
      {props.children}
    </DialogContent>
  );
}

export function ActionDialogClose(props: DialogCloseProps) {
  return (
    <DialogClose
      {...props}
      className={cn(
        "h-14 grow center bg-gray-50 hover:bg-gray-100 rounded-xl font-semibold",
        props.className,
      )}
    />
  );
}

export function ActionDialogDefaultClose() {
  return (
    <ActionDialogClose className="md:mt-12 mt-10 md:w-60 w-full md:mx-auto">
      Bağla
    </ActionDialogClose>
  );
}

export function ActionDialogBottomButtons({
  children,
  className,
  ...rest
}: React.ComponentProps<typeof Button>) {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-3 md:mt-12 mt-10">
      <Button className={cn("md:order-2", className)} {...rest}>
        {children}
      </Button>
      <ActionDialogClose className="md:order-1">Bağla</ActionDialogClose>
    </div>
  );
}
