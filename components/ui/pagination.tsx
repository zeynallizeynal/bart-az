"use client";

import { useSearchParams } from "@/hooks/use-search-params";
import { cn } from "@/lib/utils";
import { Pagination as PaginationType } from "@/types/models/base";
import { useMemo } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";

const itemClassName =
  "cursor-pointer size-8 text-sm flex items-center justify-center rounded-md bg-neutral-100 hover:bg-neutral-200 transition-colors aria-[current=page]:bg-blue-500 aria-[current=page]:text-background";

export function Pagination({
  className,
  pageLinkClassName,
  breakLinkClassName,
  previousLinkClassName,
  nextLinkClassName,
  pagination,
  ...props
}: Omit<ReactPaginateProps, "pageCount"> & {
  pagination: PaginationType;
}) {
  const searchParams = useSearchParams();
  const page = useMemo(() => searchParams.get("page") ?? "1", [searchParams]);

  return (
    <ReactPaginate
      breakLabel={<HiOutlineDotsHorizontal />}
      nextLabel={<LuChevronRight />}
      pageRangeDisplayed={3}
      previousLabel={<LuChevronLeft />}
      renderOnZeroPageCount={null}
      className={cn("flex items-center gap-1", className)}
      pageLinkClassName={cn(itemClassName, pageLinkClassName)}
      breakLinkClassName={cn(itemClassName, breakLinkClassName)}
      previousLinkClassName={cn(itemClassName, previousLinkClassName)}
      nextLinkClassName={cn(itemClassName, nextLinkClassName)}
      pageCount={Math.ceil(pagination.total / pagination.per_page)}
      forcePage={Math.min(+page - 1, 0)}
      onPageChange={({ selected }) => {
        searchParams.set("page", (selected + 1).toString());
      }}
      {...props}
    />
  );
}
