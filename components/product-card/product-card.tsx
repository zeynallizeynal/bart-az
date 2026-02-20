import { cn } from "@/lib/utils";
import { Listing } from "@/types/models/listing";
import { formatCurrency } from "@/utils/currency.util";
import Link from "next/link";
import { OptimizedImage } from "../ui/image";
import { TooltipProvider } from "../ui/tooltip";
import ProductCardMenu from "./product-card-menu";
import { Pagination } from "../ui/pagination";
import { ComponentProps } from "react";

export function ProductCardsContainer({
  enableRenew,
  enableOptions,
  data,
  className,
  paginationProps,
}: {
  enableRenew?: boolean;
  enableOptions?: boolean;
  className?: string;
  data: Listing[];
  paginationProps?: ComponentProps<typeof Pagination>;
}) {
  return (
    <div className={cn("@container space-y-4", className)}>
      <div className="grid gap-4 grid-cols-1 @5xl:grid-cols-4 @xs:gap-6 @xs:grid-cols-3">
        {data.map((item, index) => (
          <ProductCard
            enableOptions={enableOptions}
            enableRenew={enableRenew}
            item={item}
            key={index}
          />
        ))}
      </div>
      {paginationProps && (
        <Pagination className="justify-self-center" {...paginationProps} />
      )}
    </div>
  );
}

export function ProductCard({
  enableOptions,
  enableRenew,
  item,
}: {
  enableRenew?: boolean;
  enableOptions?: boolean;
  item: Listing;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border-gray-200 p-0.5 rounded-custom-xl h-fit",
        // item.windows.color ? "border-2" :
        "border",
      )}
      // style={{
      //   borderColor: item.windows.color ? item.windows.color : "",
      // }}
    >
      {enableOptions && <ProductCardMenu data={item} />}
      <Link href={`/listings/${item.slug}`} className={cn("group")}>
        {item.type && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-blue-600 text-background font-medium text-default-sm rounded-md z-2">
            {item.type.name}
          </div>
        )}
        <TooltipProvider>
          <div className="relative rounded-2xl overflow-hidden w-full sm:h-50 h-35">
            <OptimizedImage
              src={item.image[0]?.full_url ?? "/images/placeholder.svg"}
              alt={item.name}
              className="object-cover group-hover:scale-105 transition z-1"
            />
            {/* {item.tags && (
              <span className="md:hidden flex absolute left-3 bottom-3 items-center gap-1 z-[1]">
                {item.tags.map((tag, index: number) => (
                  <Tooltip key={index}>
                    <TooltipTrigger>
                      <span aria-label={tag} className="cursor-default">
                        {tag === "barter" ? (
                          <Barter size={24} />
                        ) : tag === "credit" ? (
                          <Credit size={24} />
                        ) : null}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent
                      className={cn("capitalize font-medium", {
                        "bg-success-100 text-success-600": tag === "barter",
                        "bg-blue-100 text-blue-600": tag === "credit",
                      })}
                    >
                      {tag}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </span>
            )} */}
          </div>
          <div className="space-y-2 md:pt-5 md:pb-4 md:px-3.5 p-2.5 pt-3">
            <p className="md:text-xl text-base md:font-extrabold font-bold flex items-center justify-between">
              {formatCurrency(parseFloat(item.price))} {item.currency?.symbol}
              {/* {item.tags && (
                <span className="md:flex hidden items-center gap-1">
                  {item.tags.map((tag, index: number) => (
                    <Tooltip key={index}>
                      <TooltipTrigger>
                        <span aria-label={tag} className="cursor-default">
                          {tag === "barter" ? (
                            <Barter size={24} />
                          ) : tag === "credit" ? (
                            <Credit size={24} />
                          ) : null}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent
                        className={cn("capitalize font-medium", {
                          "bg-success-100 text-success-600": tag === "barter",
                          "bg-blue-100 text-blue-600": tag === "credit",
                        })}
                      >
                        {tag}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </span>
              )} */}
            </p>
            <p className="md:text-default-lg text-sm font-medium line-clamp-1 leading-6 group-hover:text-blue-600 transition">
              {item.name}
            </p>
            <p className="text-gray-500 md:text-default text-xxs">
              {item.city.name}
            </p>
          </div>
        </TooltipProvider>
      </Link>
      {enableRenew && (
        <div className="md:p-3.5 p-2.5">
          <button
            onClick={(event) => {
              event.stopPropagation();
            }}
            className="w-full border border-blue-200 rounded-xl h-10 flex items-center justify-center font-medium text-sm bg-blue-50 text-blue-600 hover:bg-blue-100/60 transition"
          >
            Vaxtını yenilə
          </button>
        </div>
      )}
    </div>
  );
}
