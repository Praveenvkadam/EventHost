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
    eventDate: "",
    eventTime: "",
    guests: "",
    venue: "",
    address: "",
    notes: "",
    bookedService: service ? { id: service.id } : null,
  });

  useEffect(() => {
    if (existingBooking) {
      setFormData({
        eventDate: existingBooking.eventDate,
        eventTime: existingBooking.eventTime,
        guests: existingBooking.guests,
        venue: existingBooking.venue,
        address: existingBooking.address,
        notes: existingBooking.notes,
        bookedService: { id: existingBooking.serviceId }, // map back to serviceId
      });
    }
  }, [existingBooking]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (existingBooking) {
        // ✅ Update existing booking
        await axios.put(`http://localhost:8080/api/bookings/${existingBooking.id}`, formData);
        alert("Booking updated successfully!");
      } else {
        // ✅ Create new booking
        await axios.post("http://localhost:8080/api/bookings", formData);
        alert("Booking created successfully!");
      }
      navigate("/final-submit"); // redirect back to bookings page
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

        {service && !existingBooking && (
          <div className="mb-6 bg-white p-4 rounded-lg shadow border border-slate-200">
            <h2 className="text-xl font-semibold">{service.name}</h2>
            <p className="text-indigo-600 font-bold">₹{service.price?.toLocaleString()}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow border border-slate-200">
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

          <div>
            <label className="block font-medium">Guests</label>
            <input
              type="number"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-slate-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block font-medium">Venue</label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-slate-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block font-medium">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-slate-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block font-medium">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
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
