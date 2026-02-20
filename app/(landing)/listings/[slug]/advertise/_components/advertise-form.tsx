"use client";

import { FormEvent, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "@/components/icons/others";
import ActionDialog, {
  ActionDialogDefaultClose,
} from "@/components/ad-actions/action-dialog";
import DialogPing from "@/components/ad-actions/dialog-ping";
import AdvertiseFormPayments from "@/app/(landing)/listings/[slug]/advertise/_components/advertise-form-payment";
import AdvertiseFormPlans from "@/app/(landing)/listings/[slug]/advertise/_components/advertise-form-plans";

export const fakePlans = [
  {
    name: "Premium",
    price: 8,
    discount: 2.01,
    discountPercentage: 40,
    features: [
      { name: "Elan 30 gün müddətinə dərc edilir", value: true },
      { name: "Daha çox alıcıya göstərilmə", value: true },
      { name: "Elanın xüsusi rənglə fərqləndirilməsi (10 gün)", value: true },
      {
        name: "Elanın ön sıralara çəkilməsi (10 gün / gündə 1 dəfə)",
        value: true,
      },
    ],
  },
  {
    name: "VIP",
    price: 2.99,
    features: [
      { name: "Elan 30 gün müddətinə dərc edilir", value: true },
      { name: "Daha çox alıcıya göstərilmə", value: true },
      { name: "Elanın xüsusi rənglə fərqləndirilməsi (10 gün)", value: false },
      {
        name: "Elanın ön sıralara çəkilməsi (10 gün / gündə 1 dəfə)",
        value: false,
      },
    ],
  },
  {
    name: "Sadə",
    price: 0,
    features: [
      { name: "Elan 30 gün müddətinə dərc edilir", value: true },
      { name: "Daha çox alıcıya göstərilmə", value: false },
      { name: "Elanın xüsusi rənglə fərqləndirilməsi (10 gün)", value: false },
      {
        name: "Elanın ön sıralara çəkilməsi (10 gün / gündə 1 dəfə)",
        value: false,
      },
    ],
  },
];

export const fakePayments = [
  {
    name: "Onlayn ödəniş",
    value: "online",
    image: "/images/icons/credit_card.png",
  },
  {
    name: "Balansdan ödəniş",
    value: "wallet",
    image: "/images/icons/wallet.png",
    balance: 0,
  },
];

export default function AdvertiseForm() {
  const [plan, setPlan] = useState(fakePlans[0].name);
  const [paymentMethod, setPaymentMethod] = useState(fakePayments[0].value);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <input type="hidden" name="plan" value={plan} />
      <input type="hidden" name="payment" value={paymentMethod} />
      <AdvertiseFormPlans plan={plan} setPlan={setPlan} />
      <AdvertiseFormPayments
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />
      <div className="flex items-center gap-3 py-4">
        <Link
          href="/ads/1"
          className="bg-gray-50 hover:bg-gray-100 text-gray-800 border-none w-64 h-14 rounded-xl flex items-center gap-2 justify-center font-medium"
        >
          <FaArrowLeftLong size={10} />
          Elana qayıt
        </Link>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-64">
              Ödəniş et
              <Check size={16} />
            </Button>
          </DialogTrigger>
          <ActionDialog>
            <DialogPing variant="success" title="Elanı reklam edildi!">
              <Check size={48} />
            </DialogPing>
            <ActionDialogDefaultClose />
          </ActionDialog>
        </Dialog>
      </div>
    </form>
  );
}
