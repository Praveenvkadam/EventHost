import React from "react";
import { FaBirthdayCake, FaHandshake, FaMusic, FaLaptop, FaUsers, FaGift } from "react-icons/fa";

const services = [
  {
    id: 1,
    title: "Corporate Events",
    icon: <FaHandshake />,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    title: "Weddings & Engagements",
    icon: <FaGift />,
    color: "from-pink-500 to-pink-600",
  },
  {
    id: 3,
    title: "Birthday & Anniversary Parties",
    icon: <FaBirthdayCake />,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: 4,
    title: "Music & Cultural Festivals",
    icon: <FaMusic />,
    color: "from-green-500 to-green-600",
  },
  {
    id: 5,
    title: "Virtual & Hybrid Events",
    icon: <FaLaptop />,
    color: "from-yellow-500 to-yellow-600",
  },
  {
    id: 6,
    title: "Team Building & Workshops",
    icon: <FaUsers />,
    color: "from-indigo-500 to-indigo-600",
  },
];

const WhatWeDo = () => {
  return (
    <div className="w-full bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            What We Do
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            We specialize in creating unforgettable experiences. Our services are designed to engage, inspire, and leave lasting impressions.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className={`group bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300`}
            >
              <div
                className={`w-20 h-20 flex items-center justify-center mb-5 text-white text-3xl rounded-full bg-gradient-to-r ${service.color} transition-transform duration-300 group-hover:scale-110`}
              >
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {service.title} are crafted with precision and creativity to ensure maximum impact and memorable experiences.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;
