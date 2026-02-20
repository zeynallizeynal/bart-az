import ProfileBody from "@/app/(landing)/profile/_layout/profile-body";
import AdLink from "@/components/ad-link";
import { InfoCircleFill } from "@/components/icons/others";
import ReferralsTable from "@/app/(landing)/profile/referrals/_sections/referrals-table";

export default function Page() {
  return (
    <ProfileBody title="Referral">
      <AdLink label="Referral linki" link="bart.az/#66687" />
      <div className="flex gap-3 items-start rounded-xl px-4 py-3 bg-blue-50 text-blue-400 font-medium">
        <InfoCircleFill className="text-2xl shrink-0" />
        Referralı olan şəxslərin referalı öz balansını artırsa 10% artırdığı
        məbləğ dəyərində balans əlavə olunacaq.
      </div>
      <div className="border border-gray-200 rounded-3xl p-4">
        <ReferralsTable />
      </div>
    </ProfileBody>
  );
}
