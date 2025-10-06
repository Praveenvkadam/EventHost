import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const API_BASE = "http://localhost:8080/api/employees";

export default function AddEmployee3D() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", assignedEvent: "", status: "Active" });
  const [employees, setEmployees] = useState([]);
  const [editId, setEditId] = useState(null);

  // Get token from localStorage
  const token = localStorage.getItem("token");

  // Axios config with Authorization header
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const res = await axios.get(API_BASE, axiosConfig);
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch employees. Check your token or server.");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function validate() {
    if (!form.name.trim()) return "Name required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Valid email required";
    if (!/^\d{7,15}$/.test(form.phone)) return "Phone must be 7-15 digits";
    if (!form.assignedEvent.trim()) return "Assigned event required";
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return alert(err);

    try {
      if (editId) {
        await axios.put(`${API_BASE}/${editId}`, form, axiosConfig);
        setEditId(null);
      } else {
        await axios.post(API_BASE, form, axiosConfig);
      }
      setForm({ name: "", email: "", phone: "", assignedEvent: "", status: "Active" });
      fetchEmployees();
    } catch (err) {
      console.error(err);
      alert("Failed to save employee. Check your token or server.");
    }
  };

  const handleEdit = (emp) => {
    setEditId(emp.id);
    setForm({
      name: emp.name,
      email: emp.email,
      phone: emp.phone,
      assignedEvent: emp.assignedEvent,
      status: emp.status
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;
    try {
      await axios.delete(`${API_BASE}/${id}`, axiosConfig);
      fetchEmployees();
    } catch (err) {
      console.error(err);
      alert("Failed to delete employee. Check your token or server.");
    }
  };

  const toggleStatus = async (emp) => {
    const newStatus = emp.status === "Active" ? "Inactive" : "Active";
    try {
      await axios.patch(`${API_BASE}/${emp.id}/status?status=${newStatus}`, {}, axiosConfig);
      fetchEmployees();
    } catch (err) {
      console.error(err);
      alert("Failed to update status. Check your token or server.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-900">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Form */}
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
          whileHover={{ rotateX: 2, rotateY: 6, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          style={{ perspective: 1200 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add / Edit Employee</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["name", "email", "phone", "assignedEvent"].map((field) => (
              <div key={field}>
                <label className="block text-sm mb-1 text-gray-700 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                <input
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full rounded-lg p-3 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                />
              </div>
            ))}
            <div>
              <label className="block text-sm mb-1 text-gray-700">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-lg p-3 bg-gray-100 border border-gray-300 text-gray-900"
              >
                <option>Active</option>
                <option>Inactive</option>
                <option>On Leave</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 rounded-xl bg-blue-500 text-white font-semibold shadow-lg hover:bg-blue-600"
              >
                {editId ? "Update Employee" : "Add Employee"}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Employee Table */}
        <div className="overflow-x-auto" style={{ perspective: 1500 }}>
          <div className="inline-block min-w-full align-middle">
            <div className="rounded-2xl overflow-hidden shadow-md">
              <table className="min-w-full divide-y divide-gray-200 transform-gpu" style={{ transformStyle: "preserve-3d" }}>
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Phone</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Assigned Event</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                    <th className="px-6 py-3 text-right text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <AnimatePresence>
                    {employees.length === 0 && (
                      <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">
                          No employees yet — add one above ✨
                        </td>
                      </motion.tr>
                    )}
                    {employees.map(emp => (
                      <motion.tr
                        key={emp.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ type: "spring", stiffness: 160, damping: 18 }}
                        whileHover={{ translateY: -6, rotateX: 2, scale: 1.01 }}
                        className="hover:shadow-lg"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">{emp.name}</td>
                        <td className="px-6 py-4">{emp.email}</td>
                        <td className="px-6 py-4">{emp.phone}</td>
                        <td className="px-6 py-4">{emp.assignedEvent}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            emp.status === "Active" ? "bg-green-100 text-green-800" :
                            emp.status === "Inactive" ? "bg-red-100 text-red-800" :
                            "bg-yellow-100 text-yellow-800"
                          }`}>{emp.status}</span>
                        </td>
                        <td className="px-6 py-4 text-right flex justify-end space-x-2">
                          <button onClick={() => toggleStatus(emp)} className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200">Toggle</button>
                          <button onClick={() => handleEdit(emp)} className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200">Edit</button>
                          <button onClick={() => handleDelete(emp.id)} className="px-3 py-1 rounded-md bg-red-100 hover:bg-red-200">Delete</button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
