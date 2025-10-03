import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", description: "" });

  useEffect(() => {
    axios.get("http://localhost:8080/api/admin/services")
      .then(res => setServices(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.description) return;

    axios.post("http://localhost:8080/api/admin/services", form)
      .then(res => {
        setServices(prev => [res.data, ...prev]);
        setForm({ name: "", price: "", description: "" });
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/admin/services/${id}`)
      .then(() => setServices(prev => prev.filter(s => s.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Manage Services</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
        <input name="name" placeholder="Service Name" value={form.name} onChange={handleChange} className="w-full p-3 border rounded" />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} className="w-full p-3 border rounded" />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full p-3 border rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Service</button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map(s => (
          <div key={s.id} className="bg-white p-4 rounded-lg shadow relative">
            <h3 className="font-bold text-lg">{s.name}</h3>
            <p className="text-gray-600">Price: ₹{s.price}</p>
            <p className="text-gray-700">{s.description}</p>
            <button onClick={() => handleDelete(s.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminServices;
