import React from "react";

// Example logos and names (replace with your actual client logos)
const clients = [
  { id: 1, name: "Apple", logo: "https://logo.clearbit.com/apple.com" },
  { id: 2, name: "Google", logo: "https://logo.clearbit.com/google.com" },
  { id: 3, name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com" },
  { id: 4, name: "Amazon", logo: "https://logo.clearbit.com/amazon.com" },
  { id: 5, name: "Facebook", logo: "https://logo.clearbit.com/facebook.com" },
  { id: 6, name: "Tesla", logo: "https://logo.clearbit.com/tesla.com" },
  { id: 7, name: "Intel", logo: "https://logo.clearbit.com/intel.com" },
  { id: 8, name: "Netflix", logo: "https://logo.clearbit.com/netflix.com" },
  { id: 9, name: "Adobe", logo: "https://logo.clearbit.com/adobe.com" },
  { id: 10, name: "Nike", logo: "https://logo.clearbit.com/nike.com" },
  { id: 11, name: "Coca Cola", logo: "https://logo.clearbit.com/coca-cola.com" },
  { id: 12, name: "Samsung", logo: "https://logo.clearbit.com/samsung.com" },
  { id: 13, name: "Sony", logo: "https://logo.clearbit.com/sony.com" },
  { id: 14, name: "IBM", logo: "https://logo.clearbit.com/ibm.com" },
  { id: 15, name: "Spotify", logo: "https://logo.clearbit.com/spotify.com" },
  { id: 16, name: "Uber", logo: "https://logo.clearbit.com/uber.com" },
  { id: 17, name: "Airbnb", logo: "https://logo.clearbit.com/airbnb.com" },
  { id: 18, name: "PayPal", logo: "https://logo.clearbit.com/paypal.com" },
  { id: 19, name: "Oracle", logo: "https://logo.clearbit.com/oracle.com" },
  { id: 20, name: "Slack", logo: "https://logo.clearbit.com/slack.com" },
];

const Clientele = () => {
  return (
    <div className="w-full bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Our Clients
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            We are proud to have partnered with these leading brands to deliver outstanding experiences.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center justify-items-center">
          {clients.map((client) => (
            <div
              key={client.id}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center w-full h-40"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-16 object-contain mb-3"
              />
              <span className="text-gray-800 font-semibold text-center">{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clientele;
