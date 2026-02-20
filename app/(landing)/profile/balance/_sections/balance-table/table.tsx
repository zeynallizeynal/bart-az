"use client";

import {
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
import { useMediaQuery } from "react-responsive";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

interface Transaction {
  id: number;
  balance: string;
  item?: string;
  service: string;
  amount: string;
  finalBalance: string;
  type: "debit" | "credit";
}

const transactions: Transaction[] = [
  {
    id: 10,
    balance: "100 AZN",
    item: "Samsung Galaxy S24 Onyx Black 128GB/8GB",
    service: "İrəli çək - 7 gün",
    amount: "100 AZN",
    finalBalance: "100 AZN",
    type: "debit",
  },
  {
    id: 9,
    balance: "100 AZN",
    item: "Samsung Galaxy S24 Onyx Black 128GB/8GB",
    service: "İrəli çək - 7 gün",
    amount: "100 AZN",
    finalBalance: "100 AZN",
    type: "debit",
  },
  {
    id: 8,
    balance: "100 AZN",
    item: "Samsung Galaxy S24 Onyx Black 128GB/8GB",
    service: "İrəli çək - 7 gün",
    amount: "100 AZN",
    finalBalance: "100 AZN",
    type: "debit",
  },
  {
    id: 7,
    balance: "100 AZN",
    item: "Samsung Galaxy S24 Onyx Black 128GB/8GB",
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
    item: "Samsung Galaxy S24 Onyx Black 128GB/8GB",
    service: "İrəli çək - 7 gün",
    amount: "100 AZN",
    finalBalance: "100 AZN",
    type: "debit",
  },
  {
    id: 3,
    balance: "100 AZN",
    item: "Samsung Galaxy S24 Onyx Black 128GB/8GB",
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
    item: "Samsung Galaxy S24 Onyx Black 128GB/8GB",
    service: "İrəli çək - 7 gün",
    amount: "100 AZN",
    finalBalance: "100 AZN",
    type: "debit",
  },
];

export default function TransactionTable() {
  const isDesktopMode = useMediaQuery({
    query: "(min-width: 768px)",
  });

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between text-gray-800 text-lg font-semibold">
        Balans tarixçəsi{" "}
        <button className="text-sm inline-flex justify-center items-center gap-2 h-10 px-4 rounded-xl border border-gray-200 hover:bg-gray-100 transition bg-background">
          <Setting size={20} />
          Filtr
        </button>
      </div>
      {isDesktopMode ? (
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50">
              <TableHead className="text-blue-600">№-si</TableHead>
              <TableHead className="text-blue-600">Mövcud balans</TableHead>
              <TableHead className="text-blue-600">Elan</TableHead>
              <TableHead className="text-blue-600">
                İstifadə olunan xidmət
              </TableHead>
              <TableHead className="text-blue-600">Məbləğ</TableHead>
              <TableHead className="text-blue-600">Son blans</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-gray-900 text-sm">
            {transactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                className="border-b last:border-b-0 border-gray-200 hover:bg-gray-50"
              >
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction.balance}</TableCell>
                <TableCell>{transaction.item || ""}</TableCell>
                <TableCell>{transaction.service}</TableCell>
                <TableCell className="flex items-center gap-2">
                  {transaction.type === "debit" ? (
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
                      transaction.type === "debit"
                        ? "font-semibold text-error-600"
                        : "font-semibold text-success-600",
                    )}
                  >
                    {transaction.amount}
                  </span>
                </TableCell>
                <TableCell>{transaction.finalBalance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex flex-col">
          <div className="bg-blue-50 grid grid-cols-[52px_48px_1fr_48px] h-[60px] rounded-custom text-blue-600 font-bold place-items-center">
            <div>#</div>
            <div />
            <div>Əməliyyatın adı</div>
            <div />
          </div>
          <Accordion type="single" collapsible>
            {transactions.map((transaction, index) => (
              <AccordionItem value={transaction.id.toString()} key={index}>
                <AccordionTrigger className="active:!scale-100 grid grid-cols-[52px_48px_1fr_48px] h-16 py-0 text-gray-900">
                  <div className="place-self-center">{transaction.id}</div>
                  <div>
                    {transaction.type === "debit" ? (
                      <DoubleDown size={16} className="text-error-600" />
                    ) : (
                      <DoubleUp size={16} className="text-success-600" />
                    )}
                  </div>
                  <div className="line-clamp-1">{transaction.item || "-"}</div>
                  <div className="place-self-center">
                    <ChevronDown size={16} />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="bg-gray-100 flex flex-col p-4 gap-4 rounded-custom">
                  <div className="flex flex-col gap-1 text-sm text-gray-800">
                    <span className="text-gray-500">Əməliyyatın adı</span>
                    <span className="font-medium">
                      {transaction.item || "-"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Mövcud balans</span>
                    <span className="font-medium">{transaction.balance}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">
                      İstifadə olunan xidmət
                    </span>
                    <span className="font-medium">{transaction.service}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Məbləğ</span>
                    <span className="font-medium">{transaction.amount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Son balans</span>
                    <span className="font-medium">
                      {transaction.finalBalance}
                    </span>
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
