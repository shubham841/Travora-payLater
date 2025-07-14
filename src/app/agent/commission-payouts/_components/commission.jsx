'use client';
import { useState } from 'react';

const tabStyles = {
  Pending: 'text-yellow-600 border-yellow-600',
  Paid: 'text-green-600 border-green-600',
  Rejected: 'text-red-600 border-red-600',
};

export default function CommissionClient({ payouts }) {
  const [activeTab, setActiveTab] = useState('Pending');

  const filteredData = payouts.filter((p) => p.status === activeTab);

  return (
    <>
      {/* Tabs */}
      <div className="flex gap-4 mb-4 border-b">
        {['Pending', 'Paid', 'Rejected'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 border-b-2 font-medium ${
              activeTab === tab ? tabStyles[tab] : 'text-gray-500 border-transparent'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">Booking ID</th>
              <th className="px-4 py-2">Customer Name</th>
              <th className="px-4 py-2">Trip Value</th>
              <th className="px-4 py-2">Commission</th>
              <th className="px-4 py-2">Payout Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-100">
                <td className="px-4 py-2">{entry.id}</td>
                <td className="px-4 py-2">{entry.name}</td>
                <td className="px-4 py-2">₹{entry.tripValue.toLocaleString()}</td>
                <td className="px-4 py-2">₹{entry.commission.toLocaleString()}</td>
                <td className="px-4 py-2">{entry.payoutDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredData.length === 0 && (
          <div className="text-center text-gray-500 p-4">No payouts found in this tab.</div>
        )}
      </div>
    </>
  );
}
