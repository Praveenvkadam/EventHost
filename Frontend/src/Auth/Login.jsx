import React, { useState, useEffect } from "react";

const AddPackage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image1: "",
    image2: "",
    image3: "",
    image4: ""
  });

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch all services
  const fetchServices = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/services", {
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("You must login first");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to add service");
      }

      const newService = await res.json();
      alert("Service added successfully");

      // Reset form
      setFormData({
        title: "",
        description: "",
        price: "",
        image1: "",
        image2: "",
        image3: "",
        image4: ""
      });

      // Refresh list
      fetchServices();
    } catch (err) {
      console.error(err);
      alert("Failed to add service. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          Add New Service
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Service Title"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            name="image1"
            value={formData.image1}
            onChange={handleChange}
            placeholder="Image URL 1"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            name="image2"
            value={formData.image2}
            onChange={handleChange}
            placeholder="Image URL 2"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            name="image3"
            value={formData.image3}
            onChange={handleChange}
            placeholder="Image URL 3"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            name="image4"
            value={formData.image4}
            onChange={handleChange}
            placeholder="Image URL 4"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-semibold p-3 rounded-lg hover:bg-indigo-700 transition"
          >
            {loading ? "Adding..." : "Add Service"}
          </button>
        </form>

        <h3 className="text-2xl font-semibold mt-10 mb-6 text-gray-800 text-center">
          All Services
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.length === 0 && (
            <p className="text-center col-span-full text-gray-500">
              No services added yet.
            </p>
          )}
          {services.map((svc) => (
            <div
              key={svc.id}
              className="border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
            >
              <div className="grid grid-cols-2 gap-1">
                {[svc.image1, svc.image2, svc.image3, svc.image4].map(
                  (img, idx) =>
                    img && (
                      <img
                        key={idx}
                        src={img}
                        alt={`${svc.title} ${idx + 1}`}
                        className="w-full h-32 object-cover"
                      />
                    )
                )}
              </div>
              <div className="p-4">
                <h4 className="font-bold text-lg text-gray-900">{svc.title}</h4>
                <p className="text-gray-700 mt-2">{svc.description}</p>
                <p className="text-indigo-600 font-semibold mt-2">₹{svc.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddPackage;
