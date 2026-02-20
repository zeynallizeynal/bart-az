import Link from "next/link";
import { cn } from "@/lib/utils";
import { getCategories } from "@/actions/category.action";
import { categoryAssets } from "@/constants/categories";

export default async function CategoriesSection() {
  const data = await getCategories();

  return (
    <section className="container pt-3 md:pb-0 pb-3">
      <div className="overflow-auto flex flex-col gap-3 text-gray-900">
        <div className="md:hidden flex gap-3 h-18">
          {data.data.map((category, index) => (
            <div key={category.id} className="responsive-category-item">
              <Link
                href={`/search?category_id=${category.id}`}
                className={cn(
                  "relative size-full bg-gray-100 inline-flex px-2.5 py-2 rounded-lg hover:bg-gray-200 transition overflow-hidden font-semibold group text-xs",
                )}
              >
                <p className="w-min relative z-1">{category.name}</p>
                <img
                  src={categoryAssets.responsive[index]}
                  alt={category.name}
                  className="bottom-0 object-contain absolute right-0 group-hover:scale-[1.05] transition"
                />
              </Link>
            </div>
          ))}
        </div>
        {data.data.slice(0, 6).length > 0 && (
          <div className="md:grid hidden grid-cols-[208px_172px_166px_152px_204px_166px] gap-3">
            {data.data.slice(0, 6).map((category, index) => (
              <div key={category.id}>
                <Link
                  href={`/search?category_id=${category.id}`}
                  className={cn(
                    "relative w-full bg-gray-100 inline-flex h-28 px-4 py-3 rounded-xl hover:bg-gray-200 transition overflow-hidden font-semibold group",
                  )}
                >
                  <p className="w-min relative z-1">{category.name}</p>
                  <img
                    src={categoryAssets.main[index]}
                    alt={category.name}
                    className="bottom-0 object-contain absolute right-0 group-hover:scale-[1.05] transition"
                  />
                </Link>
              </div>
            ))}
          </div>
        )}
        {data.data.slice(6).length > 0 && (
          <div className="md:grid hidden grid-cols-[128px_152px_144px_180px_144px_164px_144px] gap-3">
            {data.data.slice(6).map((category, index) => (
              <div key={category.id}>
                <Link
                  href={`#`}
                  className={cn(
                    "relative w-full bg-gray-100 inline-flex h-28 px-4 py-3 rounded-xl hover:bg-gray-200 transition overflow-hidden font-semibold group",
                  )}
                >
                  <p className="w-min relative z-1">{category.name}</p>
                  <img
                    src={categoryAssets.main[index]}
                    alt={category.name}
                    className="bottom-0 object-contain absolute right-0 group-hover:scale-[1.05] transition"
                  />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
