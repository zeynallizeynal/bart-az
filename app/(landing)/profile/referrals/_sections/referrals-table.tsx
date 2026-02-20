"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "react-responsive";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "bartaz-icons";

interface Referral {
  name: string;
  registerDate: string;
  bonus: string;
}

const referrals: Referral[] = [
  {
    name: "Ruslan Əlizadə",
    registerDate: "12.05.2024",
    bonus: "12 AZN",
  },
  {
    name: "Ruslan Əlizadə",
    registerDate: "12.05.2024",
    bonus: "12 AZN",
  },
  {
    name: "Ruslan Əlizadə",
    registerDate: "12.05.2024",
    bonus: "12 AZN",
  },
  {
    name: "Ruslan Əlizadə",
    registerDate: "12.05.2024",
    bonus: "12 AZN",
  },
];

const columns: ColumnDef<Referral>[] = [
  {
    accessorKey: "name",
    header: "İstifadəçinin adı",
  },
  {
    accessorKey: "registerDate",
    header: "Qeydiyyat tarixi",
  },
  {
    accessorKey: "bonus",
    header: "Qazanılan bonus",
  },
];

export default function ReferralsTable() {
  const isDesktopMode = useMediaQuery({
    query: "(min-width: 768px)",
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data: referrals,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between text-gray-800 text-lg font-semibold">
        Referraldan istifadə edənlər
      </div>
      {isDesktopMode ? (
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50">
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header, index) => (
                  <TableHead
                    key={header.id}
                    className={cn("text-blue-600", index === 0 && "w-[408px]")}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                )),
              )}
            </TableRow>
          </TableHeader>
          <TableBody className="text-gray-900 text-sm">
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="border-b last:border-b-0 border-gray-200 hover:bg-gray-50"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex flex-col">
          <div className="bg-blue-50 flex items-center h-[60px] rounded-custom text-blue-600 font-bold">
            <div className="pl-4">İstifadəçinin adı</div>
          </div>
          <Accordion type="single" collapsible>
            {referrals.map((referral, index) => (
              <AccordionItem value={referral.name + index} key={index}>
                <AccordionTrigger className="active:!scale-100 grid grid-cols-[1fr_48px] h-16 py-0 px-4 text-gray-900">
                  <div>{referral.name || "-"}</div>
                  <div className="place-self-center text-base">
                    <ChevronDown />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="bg-gray-100 flex flex-col p-4 gap-4 rounded-custom">
                  <div className="flex justify-between text-sm text-gray-800">
                    <span className="text-gray-500">Qeydiyyat tarixi</span>
                    <span className="font-medium">{referral.registerDate}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-800">
                    <span className="text-gray-500">Qazanılan bonus</span>
                    <span className="font-medium">{referral.bonus}</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
}
