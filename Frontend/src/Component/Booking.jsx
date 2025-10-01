import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // If navigated with a booking (update mode)
  const existingBooking = location.state?.booking || null;
  const service = location.state?.event || null; // Service selected before booking

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    eventDate: "",
    eventTime: "",
    guests: "",
    venue: "",
    address: "",
    notes: "",
    bookedService: service ? { id: service.id } : null,
  });

  // Pre-fill when editing booking
  useEffect(() => {
    if (existingBooking) {
      setFormData({
        fullName: existingBooking.fullName,
        email: existingBooking.email,
        phone: existingBooking.phone,
        eventDate: existingBooking.eventDate,
        eventTime: existingBooking.eventTime,
        guests: existingBooking.guests,
        venue: existingBooking.venue,
        address: existingBooking.address,
        notes: existingBooking.notes,
        bookedService: { id: existingBooking.serviceId },
      });
    }
  }, [existingBooking]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation function
  const validateForm = () => {
    if (!formData.fullName.trim()) {
      alert("Full name is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert("Enter a valid email");
      return false;
    }
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      alert("Phone must be 10 digits");
      return false;
    }
    if (!formData.eventDate) {
      alert("Please select an event date");
      return false;
    }
    if (!formData.eventTime) {
      alert("Please select an event time");
      return false;
    }
    if (!formData.guests || formData.guests < 1) {
      alert("Guests must be at least 1");
      return false;
    }
    if (!formData.venue.trim()) {
      alert("Venue is required");
      return false;
    }
    if (!formData.address.trim()) {
      alert("Address is required");
      return false;
    }
    return true;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (existingBooking) {
        await axios.put(
          `http://localhost:8080/api/bookings/${existingBooking.id}`,
          formData
        );
        alert("Booking updated successfully!");
      } else {
        await axios.post("http://localhost:8080/api/bookings", formData);
        alert("Booking created successfully!");
      }
      navigate("/final-submit");
    } catch (err) {
      console.error("Booking save failed:", err);
      alert("Failed to save booking.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">
          {existingBooking ? "Update Booking" : "New Booking"}
        </h1>

        {/* ✅ Show service details */}
        {(service || existingBooking) && (
          <div className="mb-6 bg-white p-5 rounded-xl shadow border border-slate-200">
            <img
              src={service?.img || existingBooking?.image1}
              alt={service?.name || existingBooking?.serviceName}
              className="w-full h-52 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-semibold text-slate-900">
              {service?.name || existingBooking?.serviceName}
            </h2>
            <p className="text-indigo-600 font-bold text-lg mt-1">
              ₹{service?.price?.toLocaleString() || existingBooking?.price}
            </p>
            <p className="text-slate-600 mt-2 leading-relaxed">
              {service?.description || existingBooking?.description}
            </p>
          </div>
        )}

        {/* ✅ Booking Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded-xl shadow border border-slate-200"
        >
          {/* Full Name */}
          <div>
            <label className="block font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="mt-1 w-full border border-slate-300 rounded-lg p-2"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="mt-1 w-full border border-slate-300 rounded-lg p-2"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="10-digit phone number"
              className="mt-1 w-full border border-slate-300 rounded-lg p-2"
            />
          </div>

          {/* Event Date */}
          <div>
            <label className="block font-medium">Event Date</label>
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-slate-300 rounded-lg p-2"
            />
          </div>

          {/* Event Time */}
          <div>
            <label className="block font-medium">Event Time</label>
            <input
              type="time"
              name="eventTime"
              value={formData.eventTime}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-slate-300 rounded-lg p-2"
            />
          </div>

          {/* Guests */}
          <div>
            <label className="block font-medium">Guests</label>
            <input
              type="number"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
              placeholder="Number of guests"
              className="mt-1 w-full border border-slate-300 rounded-lg p-2"
            />
          </div>

          {/* Venue */}
          <div>
            <label className="block font-medium">Venue</label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              required
              placeholder="Enter venue name"
              className="mt-1 w-full border border-slate-300 rounded-lg p-2"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block font-medium">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Enter full address"
              className="mt-1 w-full border border-slate-300 rounded-lg p-2"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block font-medium">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Additional notes (optional)"
              className="mt-1 w-full border border-slate-300 rounded-lg p-2"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            {existingBooking ? "Update Booking" : "Submit Booking"}
          </button>
        </form>
      </section>
      <Footer />
    </div>
  );
};

export default Booking;
