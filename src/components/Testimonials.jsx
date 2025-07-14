"use client";

import { Star } from "lucide-react";
import Image from "next/image";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sample Name",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin accumsan risus non felis scelerisque, quis vehicula massa pulvinar. Sed ligula ex, viverra sit amet hendrerit vel, consequat sit amet erat. Sed ut feugiat lorem. In volutpat.",
    },
    {
      name: "Sample Name",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin accumsan risus non felis scelerisque, quis vehicula massa pulvinar. Sed ligula ex, viverra sit amet hendrerit vel, consequat sit amet erat. Sed ut feugiat lorem. In volutpat.",
    },
    {
      name: "Sample Name",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin accumsan risus non felis scelerisque, quis vehicula massa pulvinar. Sed ligula ex, viverra sit amet hendrerit vel, consequat sit amet erat. Sed ut feugiat lorem. In volutpat.",
    },
  ];

  return (
    <section className="bg-white py-16 px-4 md:px-12 lg:px-20">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-black">
          Loved by Travelers like you
        </h2>
        <p className="text-gray-600 mt-2">
          don't just take our word for it, see what our customers are saying.
        </p>
      </div>

      {/* Testimonial Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="bg-[#F9FBFF] rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300"
          >
            {/* Avatar + Name */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                <Image
                  src="/avatar-placeholder.png"
                  alt="user"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-black">
                  {item.name}
                </h4>
                <div className="flex gap-1 text-yellow-500 mt-1">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>
            </div>

            {/* Review */}
            <p className="text-sm text-gray-700 leading-relaxed">
              {item.review}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
