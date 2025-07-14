import Booking from "./_components/booking";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const bookingsData = [
  {
    id: 1,
    name: 'John Doe',
    contact: '1234567890',
    date: '2025-07-08',
    package: 'Goa Trip',
    status: 'KYC Submitted',
    summary: '2 Adults, 3 Nights, Beachside hotel',
  },
  {
    id: 2,
    name: 'Jane Smith',
    contact: '9876543210',
    date: '2025-07-09',
    package: 'Manali Adventure',
    status: 'Trip Completed',
    summary: '4 Adults, 5 Nights, Hillside resort',
  },
];

export default async function BookingsPage() {
  const user = await currentUser();
  
    if (!user) return redirect("/auth/agent/login");
  
    const metadata = user.publicMetadata || {};
    if (!metadata.agentOnboarded) return redirect("/auth/agent/onboarding");
  return (
    <div className="py-4 px-7 bg-blue-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Bookings Tracker</h2>
      <Booking bookings={bookingsData} />
    </div>
  );
}
