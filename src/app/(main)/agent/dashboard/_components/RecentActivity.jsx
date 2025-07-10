"use client";
import {
  MessageSquare,
  FileCheck,
  FileX,
  MapPin,
} from "lucide-react";

const activities = [
  {
    id: 1,
    icon: <MapPin className="w-6 h-6 text-white" />,
    title: (
      <>
        <span className="font-semibold">Customer Name</span> made a new booking
        to <span className="font-semibold">Location</span>.
      </>
    ),
    bookingId: "#1234567",
    bgColor: "bg-blue-500",
  },
  {
    id: 2,
    icon: <FileCheck className="w-6 h-6 text-white" />,
    title: (
      <>
        KYC Approved for <span className="font-semibold">Customer Name</span>.
      </>
    ),
    bookingId: "#1234567",
    bgColor: "bg-green-500",
  },
  {
    id: 3,
    icon: <MessageSquare className="w-6 h-6 text-white" />,
    title: (
      <>
        New Message from <span className="font-semibold">Customer Name</span>.
      </>
    ),
    bookingId: "#1234567",
    bgColor: "bg-purple-500",
  },
  {
    id: 4,
    icon: <FileX className="w-6 h-6 text-white" />,
    title: (
      <>
        KYC Rejected for <span className="font-semibold">Customer Name</span>.
      </>
    ),
    bookingId: "#1234567",
    bgColor: "bg-red-500",
  },
  {
    id: 5,
    icon: <MessageSquare className="w-6 h-6 text-white" />,
    title: (
      <>
        New Message from <span className="font-semibold">Customer Name</span>.
      </>
    ),
    bookingId: "#1234567",
    bgColor: "bg-purple-500",
  },
  {
    id: 6,
    icon: <FileX className="w-6 h-6 text-white" />,
    title: (
      <>
        KYC Rejected for <span className="font-semibold">Customer Name</span>.
      </>
    ),
    bookingId: "#1234567",
    bgColor: "bg-red-500",
  },
];

export default function RecentActivityCard() {
  return (
    <div className="max-w-xl  p-8 rounded-2xl space-y-4 sm:p-6 md:p-8">
      
      {activities.map((item) => (
        <div key={item.id} className="flex items-start space-x-4">
          <div
            className={`p-3 rounded-full ${item.bgColor} flex items-center justify-center`}
          >
            {item.icon}
          </div>
          <div className="flex-1">
            <p className="text-sm sm:text-base text-gray-700">{item.title}</p>
            <p className="text-xs text-gray-500">Booking Id - {item.bookingId}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
