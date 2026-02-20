"use client";

import React from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  DoubleDown,
  DoubleUp,
  Setting,
} from "@/components/icons/others";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
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
import { useMediaQuery } from "react-responsive";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Service {
  id: number;
  balance: string;
  item?: string;
  service: string;
  amount: string;
  finalBalance: string;
  type: "debit" | "credit";
}

const services: Service[] = [
  {
    id: 10,
    balance: "100 AZN",
    item: "Samsung Galaxy S24 Onyx...",
    service: "İrəli çək - 7 gün",
    amount: "100 AZN",
    finalBalance: "100 AZN",
    type: "debit",
  },
  {
    id: 9,
    balance: "100 AZN",
    item: "Samsung Galaxy S24 Onyx...",
    service: "İrəli çək - 7 gün",
    amount: "100 AZN",
    finalBalance: "100 AZN",
    type: "debit",
  },
  {
    id: 8,
    balance: "100 AZN",
    item: "Samsung Galaxy S24 Onyx...",
    service: "İrəli çək - 7 gün",
    amount: "100 AZN",
    finalBalance: "100 AZN",
    type: "debit",
  },
  {
    id: 7,
    balance: "100 AZN",
    item: "Samsung Galaxy S24 Onyx...",
    service: "İrəli çək - 7 gün",
    amount: "100 AZN",
    finalBalance: "100 AZN",
    type: "debit",
  },
  {
    id: 6,
    balance: "100 AZN",
    service: "Balans artımı",
    amount: "100 AZN",
    finalBalance: "100 AZN",
    type: "credit",
  },
  {
    id: 5,
    balance: "100 AZN",
    service: "Balans artımı",
    amount: "100 AZN",
    finalBalance: "100 AZN",
    type: "credit",
  },
  {
    id: 4,
    balance: "100 AZN",
    item: "Samsung Galaxy S24 Onyx...",
    service: "İrəli çək - 7 gün",
    amount: "100 AZN",
    finalBalance: "100 AZN",
    type: "debit",
  },
  {
    id: 3,
    balance: "100 AZN",
    item: "Samsung Galaxy S24 Onyx...",
    service: "İrəli çək - 7 gün",
    amount: "100 AZN",
    finalBalance: "100 AZN",
    type: "debit",
  },
  {
    id: 2,
    balance: "100 AZN",
    service: "Balans artımı",
    amount: "100 AZN",
    finalBalance: "100 AZN",
    type: "credit",
  },
  {
    id: 1,
    balance: "100 AZN",
    item: "Samsung Galaxy S24 Onyx...",
    service: "İrəli çək - 7 gün",
    amount: "100 AZN",
    finalBalance: "100 AZN",
    type: "debit",
  },
];

const columns: ColumnDef<Service>[] = [
  {
    accessorKey: "id",
    header: "№-si",
  },
  {
    accessorKey: "balance",
    header: "Mövcud balans",
  },
  {
    accessorKey: "item",
    header: "Elan",
  },
  {
    accessorKey: "service",
    header: "İstifadə olunan xidmət",
  },
  {
    accessorKey: "amount",
    header: "Məbləğ",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {row.original.type === "debit" ? (
          <DoubleDown
            size={16}
            className="text-error-600 [&_path]:stroke-[1.5px]"
          />
        ) : (
          <DoubleUp
            size={16}
            className="text-success-600 [&_path]:stroke-[1.5px]"
          />
        )}
        <span
          className={cn(
            row.original.type === "debit"
              ? "font-semibold text-error-600"
              : "font-semibold text-success-600",
          )}
        >
          {row.original.amount}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "finalBalance",
    header: "Son blans",
  },
];

export default function ServicesTable() {
  const isDesktopMode = useMediaQuery({
    query: "(min-width: 768px)",
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data: services,
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
        Xidmətlərin tarixçəsi{" "}
        <button className="text-sm inline-flex justify-center items-center gap-2 h-10 px-4 rounded-xl border border-gray-200 hover:bg-gray-100 transition bg-background">
          <Setting size={20} />
          Filtr
        </button>
      </div>
      {isDesktopMode ? (
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50">
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-blue-600">
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
          <div className="bg-blue-50 grid grid-cols-[52px_1fr_48px] h-[60px] rounded-custom text-blue-600 font-bold items-center   justify-items-center">
            <div>#</div>
            <div className="justify-self-start">Elanın adı</div>
            <div />
          </div>
          <Accordion type="single" collapsible>
            {services.map((service, index) => (
              <AccordionItem value={service.id.toString()} key={index}>
                <AccordionTrigger className="active:!scale-100 grid grid-cols-[52px_1fr_48px] h-16 py-0 text-gray-900">
                  <div className="place-self-center">{service.id}</div>
                  <div className="line-clamp-1">{service.item || "-"}</div>
                  <div className="place-self-center">
                    <ChevronDown className="text-base" />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="bg-gray-100 flex flex-col p-4 gap-4 rounded-custom">
                  <div className="flex flex-col gap-1 text-sm text-gray-800">
                    <span className="text-gray-500">Əməliyyatın adı</span>
                    <span className="font-medium">{service.item || "-"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Mövcud balans</span>
                    <span className="font-medium">{service.balance}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">
                      İstifadə olunan xidmət
                    </span>
                    <span className="font-medium">{service.service}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Məbləğ</span>
                    <span className="font-medium">{service.amount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Son balans</span>
                    <span className="font-medium">{service.finalBalance}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Status</span>
                    {service.type === "credit" ? (
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
      <div className="flex items-center justify-center gap-6 px-1.5 mt-6">
        <button className="size-9 shrink-0 border border-gray-200 rounded-custom flex items-center justify-center bg-background hover:bg-gray-100 transition">
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center text-gray-900 font-semibold">
          <button
            data-active=""
            className="size-9 rounded-custom flex items-center justify-center bg-background data-[active]:bg-gray-50 hover:!bg-gray-100 transition"
          >
            1
          </button>
          <button className="size-9 rounded-custom text-gray-500 flex items-center justify-center bg-background hover:!bg-gray-100 transition">
            2
          </button>
          <button className="size-9 rounded-custom text-gray-500 flex items-center justify-center bg-background hover:!bg-gray-100 transition">
            ...
          </button>
          <button className="size-9 rounded-custom text-gray-500 flex items-center justify-center bg-background hover:!bg-gray-100 transition">
            10
          </button>
        </div>
        <button className="size-9 shrink-0 border border-gray-200 rounded-custom flex items-center justify-center bg-background hover:bg-gray-100 transition">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
