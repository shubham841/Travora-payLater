"use client";

import React from "react";

const bookings = [
  {
    customer: "Rohan Sharma",
    package: "Mystical Leh Adventure",
    date: "2025-06-20",
    status: "KYC Approved",
    amount: "₹80,000",
  },
  {
    customer: "Anjali Gupta",
    package: "Exotic Thailand Fun",
    date: "2025-06-19",
    status: "KYC Pending",
    amount: "₹95,000",
  },
  {
    customer: "Vikram Singh",
    package: "Romantic Maldives Escape",
    date: "2025-06-18",
    status: "Trip Completed",
    amount: "₹1,50,000",
  },
  {
    customer: "Priya Soni",
    package: "Royal Rajasthan Tour",
    date: "2025-06-15",
    status: "KYC Rejected",
    amount: "₹65,000",
  },
];

const statusColors = {
  "KYC Approved": "bg-green-100 text-green-800",
  "KYC Pending": "bg-yellow-100 text-yellow-800",
  "Trip Completed": "bg-blue-100 text-blue-800",
  "KYC Rejected": "bg-red-100 text-red-800",
};

export default function CustomerBookingsTable() {
  return (
    <div className=" py-4 overflow-x-auto rounded-md">
      

      <table className="min-w-full text-sm sm:text-base table-auto">
        <thead className="">
          <tr className="bg-softBlue  text-gray-600 uppercase text-left">
            <th className="px-2 py-3 rounded-l-lg">Customer</th>
            <th className="px-2 py-3">Package</th>
            <th className="px-2 py-3">Date</th>
            <th className="px-2 py-3">Status</th>
            <th className="px-2 py-3 rounded-r-lg">Amount</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <td className="px-2 py-5 font-medium">{booking.customer}</td>
              <td className="px-2 py-5 text-blue-600">{booking.package}</td>
              <td className="px-2 py-5">{booking.date}</td>
              <td className="px-2 py-5">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[booking.status]}`}
                >
                  {booking.status}
                </span>
              </td>
              <td className="px-4 py-3 font-semibold text-orange">{booking.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
