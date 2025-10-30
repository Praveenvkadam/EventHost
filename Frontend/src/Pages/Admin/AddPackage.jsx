import React, { useState, useEffect } from "react";
import axios from "axios";

const AddService = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image1: "",
    image2: "",
    image3: "",
    image4: ""
  });

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const API_URL = "http://localhost:8080/api/services";

  // Fetch all services (public endpoint)
  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setServices(res.data);
    } catch (err) {
      console.error("Error fetching services:", err);
      setError("Failed to fetch services.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Get authorization config
  const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized. Please log in as admin first.");
      throw new Error("No token found");
    }
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // Handle form submit (admin only)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.description || !formData.price) {
      setError("Name, description, and price are required.");
      return;
    }

    const payload = { ...formData, price: Number(formData.price) };

    try {
      const res = await axios.post(API_URL, payload, getAuthConfig());
      setSuccess("✅ Service added successfully!");
      setFormData({
        name: "",
        description: "",
        price: "",
        image1: "",
        image2: "",
        image3: "",
        image4: ""
      });
      fetchServices();
    } catch (err) {
      console.error("Error adding service:", err.response || err);
      if (err.response?.status === 403) {
        setError("You are not authorized to add services (Admin only).");
      } else {
        setError("Failed to add service.");
      }
    }
  };

  // Handle delete (admin only)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`, getAuthConfig());
      setSuccess("✅ Service deleted successfully!");
      fetchServices();
    } catch (err) {
      console.error("Error deleting service:", err.response || err);
      if (err.response?.status === 403) {
        setError("You are not authorized to delete services (Admin only).");
      } else {
        setError("Failed to delete service.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Add New Service</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Service Name"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
          {[1, 2, 3, 4].map((num) => (
            <input
              key={num}
              type="text"
              name={`image${num}`}
              value={formData[`image${num}`]}
              onChange={handleChange}
              placeholder={`Image URL ${num}`}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          ))}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold p-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Add Service
          </button>

          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
          {success && <p className="text-green-600 mt-2 text-center">{success}</p>}
        </form>

        {/* List */}
        <h3 className="text-2xl font-semibold mt-10 mb-6 text-gray-800 text-center">All Services</h3>
        {loading ? (
          <p className="text-center text-gray-500">Loading services...</p>
        ) : services.length === 0 ? (
          <p className="text-center text-gray-500">No services added yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.id} className="border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
                <div className="grid grid-cols-2 gap-1">
                  {[service.image1, service.image2, service.image3, service.image4].map(
                    (img, idx) =>
                      img && (
                        <img
                          key={idx}
                          src={img}
                          alt={`${service.name} ${idx + 1}`}
                          className="w-full h-32 object-cover"
                        />
                      )
                  )}
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-lg text-gray-900">{service.name}</h4>
                  <p className="text-gray-700 mt-2">{service.description}</p>
                  <p className="text-indigo-600 font-semibold mt-2">₹{service.price}</p>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddService;
