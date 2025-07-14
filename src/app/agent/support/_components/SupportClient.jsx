'use client';

import { useState } from 'react';

export default function SupportClient({ tickets }) {
  const [activeTab, setActiveTab] = useState('Open');
  const [expandedTicket, setExpandedTicket] = useState(null);

  const filteredTickets = tickets.filter((t) => t.status === activeTab);

  return (
    <>
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
          <div className="text-center text-gray-500 py-6">
            No {activeTab.toLowerCase()} tickets found.
          </div>
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
                <p>
                  <strong>Ticket ID:</strong> {ticket.id}
                </p>
                <p className="mt-2">{ticket.message}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
