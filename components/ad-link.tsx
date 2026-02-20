import Copy from "@/components/ui/copy";

export default function AdLink({
  label,
  link,
}: {
  label: string;
  link: string;
}) {
  return (
    <div className="px-4 py-2 rounded-xl bg-gray-100 flex items-center justify-between gap-2">
      <div className="flex flex-col">
        <span className="text-default-xs text-gray-500">{label}</span>
        <p className="text-base text-gray-800">{link}</p>
      </div>
      <Copy text={link} />
    </div>
  );
}
