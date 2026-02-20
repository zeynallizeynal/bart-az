import { FormEvent, useState } from "react";
import { Radio } from "@/components/ui/radio";
import { formatCurrency } from "@/utils/currency.util";
import { Check } from "lucide-react";
import { ActionDialogBottomButtons } from "../action-dialog";
import { DefaultSelect } from "@/components/ui/select";

export default function AdvertiseDialogForm({
  setPage,
}: {
  setPage(value: "default" | "done"): void;
}) {
  const [selectedDeadline, setSelectedDeadline] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("premium");
  const [paymentMethod, setPaymentMethod] = useState("online");

  function onSubmit(event: FormEvent) {
    event.preventDefault();

    setPage("done");
  }
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <DefaultSelect
        items={[
          { label: "1 ay", value: "1-month" },
          { label: "6 ay", value: "6-month" },
          { label: "12 ay", value: "12-month" },
        ]}
        placeholder="Elan müddətini seçin"
        removableValue
        value={selectedDeadline}
        onValueChange={setSelectedDeadline}
      />
      <div className="flex flex-col gap-3">
        <label className="text-base">Reklam edəcəyiniz planı seçin:</label>
        <div className="">
          <Radio
            name="plan"
            value="premium"
            onChange={(event) => setSelectedPlan(event.target.value)}
            checked={selectedPlan === "premium"}
            className="font-medium text-sm text-gray-800 leading-[44px] flex items-center flex-1 justify-between"
          >
            Premium
            <span className="text-sm">{formatCurrency(5.99)}</span>
          </Radio>
          <Radio
            name="plan"
            value="vip"
            onChange={(event) => setSelectedPlan(event.target.value)}
            checked={selectedPlan === "vip"}
            className="font-medium text-sm text-gray-800 leading-[44px] flex items-center flex-1 justify-between"
          >
            VIP
            <span className="text-sm">{formatCurrency(2.99)}</span>
          </Radio>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label className="text-base">Ödəniş növünü seçin:</label>
        <div className="">
          <Radio
            name="payment"
            value="online"
            onChange={(event) => setPaymentMethod(event.target.value)}
            checked={paymentMethod === "online"}
            className="font-medium text-sm text-gray-800 leading-[44px] flex items-center flex-1 justify-between"
          >
            Onlayn ödəniş
          </Radio>
          <Radio
            name="payment"
            value="wallet"
            onChange={(event) => setPaymentMethod(event.target.value)}
            checked={paymentMethod === "wallet"}
            className="font-medium text-sm text-gray-800 leading-[44px] flex items-center flex-1 justify-between"
          >
            Balansdan ödəniş
            <span className="px-3 py-1 rounded-custom border bg-gray-100 leading-7">
              Qalan - {formatCurrency(2.99)}
            </span>
          </Radio>
        </div>
      </div>
      <ActionDialogBottomButtons type="submit">
        Reklam et <Check />
      </ActionDialogBottomButtons>
    </form>
  );
}
