import CommissionClient from "./_components/commission";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const payoutsData = [
  {
    id: 'B001',
    name: 'John Doe',
    tripValue: 100000,
    commission: 5000,
    payoutDate: '2025-07-10',
    status: 'Pending',
  },
  {
    id: 'B002',
    name: 'Jane Smith',
    tripValue: 80000,
    commission: 4000,
    payoutDate: '2025-07-05',
    status: 'Paid',
  },
  {
    id: 'B003',
    name: 'Ravi Kumar',
    tripValue: 60000,
    commission: 3000,
    payoutDate: '2025-07-06',
    status: 'Rejected',
  },
];

export default async function CommissionPage() {
  const user = await currentUser();
  
    if (!user) return redirect("/auth/agent/login");
  
    const metadata = user.publicMetadata || {};
    if (!metadata.agentOnboarded) return redirect("/auth/agent/onboarding");
  return (
    <div className="min-h-screen bg-blue-100">
      <main className="py-4 px-7">
        <h2 className="text-2xl font-bold mb-4">Commission & Payouts</h2>
        <CommissionClient payouts={payoutsData} />
      </main>
    </div>
  );
}
