import { ChevronRight } from "@/components/icons/others";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function Breadcrumb({
  links,
  className,
}: {
  links: { href: string; label: string }[];
  className?: string;
}) {
  return (
    <section
      className={cn(
        "container md:h-18 h-14 hidden items-center md:flex",
        className,
      )}
    >
      <div className="flex items-center gap-1 text-gray-600 text-base">
        {links.map(({ href, label }, index) => (
          <div key={index} className="flex items-center gap-1">
            <Link href={href} className="hover:text-gray-900 transition">
              {label}
            </Link>
            {index !== links.length - 1 && <ChevronRight size={16} />}
          </div>
        ))}
      </div>
    </section>
  );
}
