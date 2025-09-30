import React, { useState, useEffect } from "react";
import axios from "axios";

const AddPackage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image1: "",
    image2: "",
    image3: "",
    image4: ""
  });

  const [packages, setPackages] = useState([]);

  // Fetch packages from backend
  const fetchPackages = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/packages");
      setPackages(res.data);
    } catch (err) {
      console.error("Error fetching packages:", err);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/packages", formData);
      alert("Package added successfully");
      setFormData({
        name: "",
        description: "",
        price: "",
        image1: "",
        image2: "",
        image3: "",
        image4: ""
      });
      fetchPackages();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Add New Package</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Package Name"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <input
            type="text"
            name="image1"
            value={formData.image1}
            onChange={handleChange}
            placeholder="Image URL 1"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <input
            type="text"
            name="image2"
            value={formData.image2}
            onChange={handleChange}
            placeholder="Image URL 2"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <input
            type="text"
            name="image3"
            value={formData.image3}
            onChange={handleChange}
            placeholder="Image URL 3"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <input
            type="text"
            name="image4"
            value={formData.image4}
            onChange={handleChange}
            placeholder="Image URL 4"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold p-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Add Package
          </button>
        </form>

        <h3 className="text-2xl font-semibold mt-10 mb-6 text-gray-800 text-center">All Packages</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.length === 0 && <p className="text-center col-span-full text-gray-500">No packages added yet.</p>}
          {packages.map((pkg) => (
            <div key={pkg.id} className="border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
              <div className="grid grid-cols-2 gap-1">
                {[pkg.image1, pkg.image2, pkg.image3, pkg.image4].map((img, idx) => (
                  img && <img key={idx} src={img} alt={`${pkg.name} ${idx+1}`} className="w-full h-32 object-cover" />
                ))}
              </div>
              <div className="p-4">
                <h4 className="font-bold text-lg text-gray-900">{pkg.name}</h4>
                <p className="text-gray-700 mt-2">{pkg.description}</p>
                <p className="text-indigo-600 font-semibold mt-2">₹{pkg.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddPackage;
