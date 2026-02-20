"use client";

import React from "react";
import { ChevronDown, SwapVertical } from "bartaz-icons";
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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "react-responsive";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Feature {
  label: string;
  timeLeft: string;
  status: "active" | "disabled";
}

const features: Feature[] = [
  {
    label: "Elan 30 gün müddətinə dərc edilir",
    timeLeft: "15 gün",
    status: "active",
  },
  {
    label: "Daha çox alıcıya göstərilmə",
    timeLeft: "12.05.2024",
    status: "disabled",
  },
  {
    label: "Elanın xüsusi rənglə fərqləndirilməsi (10 gün)",
    timeLeft: "2 gün",
    status: "active",
  },
  {
    label: "Elanın ön sıralara çəkilməsi (10 gün / gündə 1 dəfə)",
    timeLeft: "0 gün",
    status: "disabled",
  },
];

const columns: ColumnDef<Feature>[] = [
  {
    accessorKey: "label",
    header: "Xidmətin adı",
  },
  {
    accessorKey: "timeLeft",
    header: "Qalan",
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) =>
      row.original.status === "active" ? (
        <button className="flex items-center w-full justify-center px-4 py-1 rounded-md font-bold bg-success-50 text-success-600 hover:bg-success-100 transition">
          Aktiv
        </button>
      ) : (
        <button className="flex items-center w-full justify-center px-4 py-1 rounded-md font-bold bg-error-50 text-error-600 hover:bg-error-100 transition">
          Deaktiv
        </button>
      ),
  },
];

export default function ActivePlanTable() {
  const isDesktopMode = useMediaQuery({
    query: "(min-width: 768px)",
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data: features,
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
      <div className="flex items-center flex-wrap gap-2 justify-between text-gray-800 text-lg font-semibold">
        <span className="shrink-0">Premium abunəlik</span>
        <Button size="sm" className="shrink-0">
          Paketi yenilə
          <SwapVertical className="text-2xl" />
        </Button>
      </div>
      {isDesktopMode ? (
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50">
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header, index) => (
                  <TableHead
                    key={header.id}
                    className={cn("text-blue-600", index === 0 && "w-[576px]")}
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
            <div className="pl-4">Xidmətin adı</div>
          </div>
          <Accordion type="single" collapsible>
            {features.map((feature, index) => (
              <AccordionItem value={feature.label + index} key={index}>
                <AccordionTrigger className="active:!scale-100 grid grid-cols-[1fr_48px] h-16 py-0 text-gray-900">
                  <div>{feature.label || "-"}</div>
                  <div className="place-self-center text-base">
                    <ChevronDown />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="bg-gray-100 flex flex-col p-4 gap-4 rounded-custom">
                  <div className="flex justify-between text-sm text-gray-800">
                    <span className="text-gray-500">Qalan</span>
                    <span className="font-medium">{feature.timeLeft}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Status</span>
                    {feature.status === "active" ? (
                      <span className="font-bold border border-success-600 text-success-600 text-xs px-4 py-1 rounded-md bg-success-50">
                        Aktiv
                      </span>
                    ) : (
                      <span className="font-bold border border-error-600 text-error-600 text-xs px-4 py-1 rounded-md bg-error-50">
                        Deaktiv
                      </span>
                    )}
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
