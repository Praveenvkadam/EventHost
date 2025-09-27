import React, { useState } from "react";

const EXPERTISE = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const expertiseData = [
    {
      id: 1,
      title: "Corporate Conferences",
      description: "Plan and execute seamless corporate conferences, workshops, and seminars with end-to-end management.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
      buttonText: "Explore"
    },
    {
      id: 2,
      title: "Product Launches",
      description: "Create buzz-worthy product launch events that maximize brand visibility and audience engagement.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      buttonText: "Launch Now"
    },
    {
      id: 3,
      title: "Weddings & Engagements",
      description: "Design unforgettable weddings and engagement parties with personalized touches and flawless coordination.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
      buttonText: "Discover"
    },
    {
      id: 4,
      title: "Birthday & Anniversary Parties",
      description: "Celebrate life’s milestones with fun, creative, and memorable birthday and anniversary parties.",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop",
      buttonText: "Plan Event"
    },
    {
      id: 5,
      title: "Festivals & Cultural Events",
      description: "Organize large-scale festivals with entertainment, food, vendors, and complete crowd management.",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop",
      buttonText: "Book Festival"
    },
    {
      id: 6,
      title: "Corporate Parties & Team Building",
      description: "Host engaging corporate parties and team-building activities that boost morale and collaboration.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
      buttonText: "Build Teams"
    },
    {
      id: 7,
      title: "Trade Shows & Exhibitions",
      description: "Comprehensive trade show management, including booth design, logistics, and promotional strategies.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
      buttonText: "Plan Show"
    },
    {
      id: 8,
      title: "Award Ceremonies & Gala Dinners",
      description: "Elegant award ceremonies and gala dinners with exquisite catering, entertainment, and sophisticated ambiance.",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
      buttonText: "Host Gala"
    },
    {
      id: 9,
      title: "Charity & Fundraising Events",
      description: "Organize meaningful charity and fundraising events that leave a lasting impact on your community.",
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=300&fit=crop",
      buttonText: "Make Impact"
    },
    {
      id: 10,
      title: "Virtual & Hybrid Events",
      description: "Innovative virtual and hybrid event solutions for modern digital audiences and global reach.",
      image: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=400&h=300&fit=crop",
      buttonText: "Go Virtual"
    },
    {
      id: 11,
      title: "Brand Activations",
      description: "Creative brand activation events that engage audiences and elevate your brand presence.",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
      buttonText: "Activate Brand"
    },
    {
      id: 12,
      title: "Conferences & Seminars",
      description: "Professional management for seminars, panel discussions, and workshops with full coordination.",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=300&fit=crop",
      buttonText: "Join Now"
    },
  ];

  const slidesPerView = 3;
  const totalSlides = Math.ceil(expertiseData.length / slidesPerView);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Our Expertise
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive range of event management services crafted to make every occasion memorable.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110"
            disabled={currentSlide === 0}
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110"
            disabled={currentSlide === totalSlides - 1}
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="overflow-hidden rounded-2xl">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                    {expertiseData.slice(slideIndex * slidesPerView, (slideIndex + 1) * slidesPerView).map((item) => (
                      <div key={item.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden group">
                        <div className="relative h-64 overflow-hidden">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">{item.title}</h3>
                          <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                          <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">{item.buttonText}</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-gradient-to-r from-blue-500 to-purple-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'}`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300" style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}></div>
            </div>
            <div className="text-center mt-2 text-sm text-gray-600">{currentSlide + 1} of {totalSlides}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EXPERTISE;
