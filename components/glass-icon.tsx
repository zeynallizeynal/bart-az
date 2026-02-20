import { cn } from "@/lib/utils";

export default function GlassIcon({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "rounded-2xl inline-block p-0.5 overflow-hidden size-12 bg-glass-stroke backdrop-blur-[2px] shadow-glass text-background",
        className,
      )}
    >
      <span className="rounded-[14px] size-full inline-flex items-center justify-center">
        {children}
      </span>
    </span>
  );
}
