import React from 'react';

const Infocard = ({ companyName = "EventFlow" }) => {
  return (
    <div className="w-full p-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl shadow-xl border border-gray-100">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          Our Philosophy at {companyName}
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
      </div>

      {/* Main Paragraph */}
      <div className="mb-8">
        <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
          At {companyName}, we believe that every event is more than just a gathering—it's an experience. 
          Our mission is to craft memorable moments that inspire, connect, and leave a lasting impact on attendees. 
          From corporate conferences and product launches to cultural festivals and private celebrations, 
          we approach every project with creativity, precision, and passion.
        </p>
      </div>

      {/* Key Points Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Client-Centered Approach */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Client-Centered Approach</h3>
              <p className="text-gray-600">
                We prioritize understanding your vision and goals to design events that reflect your brand and values.
              </p>
            </div>
          </div>
        </div>

        {/* Innovative Experiences */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Innovative Experiences</h3>
              <p className="text-gray-600">
                Using cutting-edge technology and creative concepts, we make every event unique and engaging.
              </p>
            </div>
          </div>
        </div>

        {/* Seamless Execution */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Seamless Execution</h3>
              <p className="text-gray-600">
                Our team ensures flawless planning and coordination, so clients can focus on enjoying the moment.
              </p>
            </div>
          </div>
        </div>

        {/* Sustainability */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-emerald-500 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Sustainability</h3>
              <p className="text-gray-600">
                We incorporate eco-friendly practices wherever possible to reduce environmental impact.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 text-center">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-xl text-white">
          <h3 className="text-2xl font-bold mb-2">Diverse Expertise</h3>
          <p className="text-lg opacity-90">
            From logistics to entertainment, decor to digital marketing, we handle every aspect of the event.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Infocard;
