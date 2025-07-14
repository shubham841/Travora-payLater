import SupportClient from './_components/SupportClient';
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const ticketsData = [
  {
    id: 'T001',
    subject: 'Unable to upload KYC',
    date: '2025-07-05',
    status: 'Open',
    message: 'I’m facing an issue while uploading customer documents.',
  },
  {
    id: 'T002',
    subject: 'Commission not credited',
    date: '2025-07-03',
    status: 'Closed',
    message: 'Commission for Booking ID B001 is missing.',
  },
  {
    id: 'T003',
    subject: 'Package edit request',
    date: '2025-07-01',
    status: 'Open',
    message: 'Need to update trip dates for Booking ID B005.',
  },
];

export default async function SupportPage() {
  const user = await currentUser();
  
    if (!user) return redirect("/auth/agent/login");
  
    const metadata = user.publicMetadata || {};
    if (!metadata.agentOnboarded) return redirect("/auth/agent/onboarding");
  return (
    <div className="min-h-screen bg-blue-100 py-4 px-7">
      <h2 className="text-2xl font-bold mb-4">Support & Help</h2>
      <SupportClient tickets={ticketsData} />
    </div>
  );
}
