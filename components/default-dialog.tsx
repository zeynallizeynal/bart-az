import { DialogClose, DialogContent } from "@/components/ui/dialog";
import { XClose } from "@/components/icons/others";
import { cn } from "@/lib/utils";

export default function DefaultDialog({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <DialogContent
        className={cn(
          "max-w-110 w-full p-10 bg-background shadow-box rounded-2xl overflow-auto max-h-[90dvh]",
          className,
        )}
        style={{
          scrollbarWidth: "thin",
        }}
      >
        <DialogClose className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 transition">
          <XClose size={24} />
        </DialogClose>
        {children}
      </DialogContent>
    </>
  );
}
