'use client';
import { useState } from 'react';

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

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState('Open');
  const [expandedTicket, setExpandedTicket] = useState(null);

  const filteredTickets = ticketsData.filter(t => t.status === activeTab);

  return (
    <div className="min-h-screen bg-blue-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Support & Help</h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-4 border-b">
        {['Open', 'Closed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 border-b-2 font-medium ${
              activeTab === tab
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent'
            }`}
          >
            {tab} Tickets
          </button>
        ))}
      </div>

      {/* Tickets List */}
      <div className="bg-white rounded-lg shadow">
        {filteredTickets.length === 0 && (
          <div className="text-center text-gray-500 py-6">No {activeTab.toLowerCase()} tickets found.</div>
        )}
        {filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="border-b last:border-none hover:bg-gray-50 transition cursor-pointer"
            onClick={() =>
              setExpandedTicket(expandedTicket === ticket.id ? null : ticket.id)
            }
          >
            <div className="flex justify-between items-center p-4">
              <div>
                <p className="font-medium">{ticket.subject}</p>
                <p className="text-sm text-gray-500">{ticket.date}</p>
              </div>
              <span
                className={`text-sm px-2 py-1 rounded ${
                  ticket.status === 'Open'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {ticket.status}
              </span>
            </div>

            {expandedTicket === ticket.id && (
              <div className="px-4 pb-4 text-sm text-gray-700">
                <p><strong>Ticket ID:</strong> {ticket.id}</p>
                <p className="mt-2">{ticket.message}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
