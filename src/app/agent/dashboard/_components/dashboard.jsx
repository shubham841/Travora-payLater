"use client";

import Image from "next/image";
import React from "react";
import CustomerBookingsTable from "./CustomerBook";
import RecentActivityCard from "./RecentActivity";

export default function Dashboard({agent}) {
  
  return (
    <div className="p-4 sm:p-6 md:p-8 bg-blue-100 min-h-screen">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row gap-8 justify-between">
        {/* Left: Summary Cards */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card title="Total Bookings" value="12,450" image="/books.png" />
            <Card title="URL Clicks (Monthly)" value="4,500" image="/tap.png" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card title="Pending Payments" value="1,08,000" image="/paymnt.png" />
            <Card title="Total Earnings" value="8,00,000" image="/earning.png" />
          </div>
        </div>

        {/* Right Box: Recent Activity */}
        <div className="w-full lg:w-1/2 bg-white rounded-3xl p-6 shadow-md">
          <h2 className=" text-xl md:text-2xl font-semibold ">Recent Activity</h2>
          <RecentActivityCard />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10">
        <div className="bg-white w-full p-6 rounded-3xl shadow-md">
          <h2 className=" mt-2 text-xl md:text-2xl font-semibold mb-4">Customer Bookings</h2>
          <CustomerBookingsTable />
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, image }) {
  const isTotalEarnings = title === "Total Earnings";

  return (
    <div className="bg-white rounded-3xl p-4 flex flex-col items-center justify-center shadow-md h-52 sm:h-60 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
      <div className="bg-softBlue rounded-full w-16 h-16 flex items-center justify-center mb-8">
        <Image
          src={image}
          alt={title}
          width={42}
          height={42}
          className="object-contain"
        />
      </div>
      <h2 className="mb-3 text-center text-base sm:text-lg md:text-lg text-gray-800">
        {title}
      </h2>
      <h3
        className={`text-center text-lg sm:text-3xl md:text-4xl font-bold mt-1 ${
          isTotalEarnings ? "text-orange" : "text-gray-900"
        }`}
      >
        {value}
      </h3>
    </div>
  );
}

