

"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Dot,
} from "recharts";
import React from "react";

const data = [
  { day: "Mon", current: 5000, previous: 8000 },
  { day: "Tue", current: 9500, previous: 12000 },
  { day: "Wed", current: 7200, previous: 11000 },
  { day: "Thu", current: 10542, previous: 9500 },
  { day: "Fri", current: 16542, previous: 15000 },
  { day: "Sat", current: 12500, previous: 13500 },
  { day: "Sun", current: 14200, previous: 13000 },
];

export default function RevenueChart() {
  return (
    <div className="bg-[#1e1e2f] text-white  p-6 w-full max-w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-full bg-pink-500"></span>
            Current Week: <span className="font-semibold">45,320</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-full bg-gray-400"></span>
            Previous Week: <span className="font-semibold">58,610</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid stroke="#2a2a40" strokeDasharray="3 3" />
            <XAxis dataKey="day" stroke="#999" />
            <YAxis stroke="#999" />
            <Tooltip
              contentStyle={{ backgroundColor: "#2a2a40", border: "none" }}
              labelStyle={{ color: "#fff" }}
              formatter={(value) => [`₹${value.toLocaleString()}`, "Revenue"]}
            />
            <Line
              type="monotone"
              dataKey="previous"
              stroke="#b0b3c6"
              strokeDasharray="5 5"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="current"
              stroke="#f43f5e"
              strokeWidth={3}
              dot={{ stroke: "#fff", strokeWidth: 2, r: 4, fill: "#f43f5e" }}
              activeDot={{
                r: 6,
                fill: "#f43f5e",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
