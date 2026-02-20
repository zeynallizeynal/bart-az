import ProfileBody from "../../../_layout/profile-body";
import TransactionsTable from "./table";

export default function BalanceTable() {
  return (
    <ProfileBody title='Balans'>
      <div className='border border-gray-200 rounded-3xl p-4'>
        <TransactionsTable />
      </div>
    </ProfileBody>
  );
}
