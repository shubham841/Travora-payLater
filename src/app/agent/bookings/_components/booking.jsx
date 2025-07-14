'use client';
import { useState } from 'react';

const statusColors = {
  'KYC Submitted': 'text-yellow-600',
  'KYC Approved': 'text-green-600',
  'KYC Rejected': 'text-red-600',
  'Trip Completed': 'text-blue-600',
  'Payment Initiated': 'text-purple-600',
};

export default function Booking({ bookings }) {
  const [filter, setFilter] = useState({ date: '', package: '', status: '' });
  const [selected, setSelected] = useState(null);
  const [showPackageDropdown, setShowPackageDropdown] = useState(false);

  const allPackages = [...new Set(bookings.map((b) => b.package))];

  const filtered = bookings.filter((b) =>
    (!filter.date || b.date.includes(filter.date)) &&
    (!filter.package || b.package.toLowerCase().includes(filter.package.toLowerCase())) &&
    (!filter.status || b.status === filter.status)
  );

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4 relative">
        <input
          type="date"
          className="p-2 rounded border"
          value={filter.date}
          onChange={(e) => setFilter({ ...filter, date: e.target.value })}
        />

        {/* Package filter with dropdown */}
        <div className="relative">
          <div className="flex">
            <input
              type="text"
              placeholder="Search Package"
              className="p-2 rounded-l border border-r-0"
              value={filter.package}
              onChange={(e) => setFilter({ ...filter, package: e.target.value })}
            />
            <button
              onClick={() => setShowPackageDropdown((prev) => !prev)}
              className="px-3 rounded-r border border-l-0 bg-white hover:bg-gray-100"
            >
              ▼
            </button>
          </div>
          {showPackageDropdown && (
            <div className="absolute z-10 w-full bg-white border rounded mt-1 shadow">
              {allPackages.map((pkg) => (
                <div
                  key={pkg}
                  onClick={() => {
                    setFilter({ ...filter, package: pkg });
                    setShowPackageDropdown(false);
                  }}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {pkg}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Status filter */}
        <select
          className="p-2 rounded border"
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
        >
          <option value="">All Statuses</option>
          {Object.keys(statusColors).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Bookings Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Package</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr
                key={b.id}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => setSelected(b)}
              >
                <td className="px-4 py-2">{b.name}</td>
                <td className="px-4 py-2">{b.contact}</td>
                <td className="px-4 py-2">{b.date}</td>
                <td className="px-4 py-2">{b.package}</td>
                <td className={`px-4 py-2 font-semibold ${statusColors[b.status]}`}>
                  {b.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center text-gray-500 p-4">No bookings found.</div>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
            <h3 className="text-lg font-bold mb-2">Booking Details</h3>
            <p><strong>Name:</strong> {selected.name}</p>
            <p><strong>Contact:</strong> {selected.contact}</p>
            <p><strong>Package:</strong> {selected.package}</p>
            <p><strong>Status:</strong> {selected.status}</p>
            <p><strong>Summary:</strong> {selected.summary}</p>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => setSelected(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
