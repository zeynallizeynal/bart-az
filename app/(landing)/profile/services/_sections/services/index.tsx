import ProfileBody from "@/app/(landing)/profile/_layout/profile-body";
import ServicesTable from "@/app/(landing)/profile/services/_sections/services/services-table";

export default function Services() {
  return (
    <ProfileBody title="Xidmətlər">
      <div className="border border-gray-200 rounded-3xl p-4">
        <ServicesTable />
      </div>
    </ProfileBody>
  );
}
