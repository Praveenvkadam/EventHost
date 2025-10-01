import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const FinalSubmit = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch bookings from backend
  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
      alert("Failed to fetch your bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/bookings/${id}`);
      setBookings((prev) => prev.filter((b) => b.id !== id));
      alert("Booking cancelled successfully!");
    } catch (err) {
      console.error("Cancel failed:", err);
      alert("Failed to cancel booking.");
    }
  };

  const handleUpdate = (booking) => {
    navigate("/booking", { state: { booking } });
  };

  const handlePayment = (booking) => {
    navigate("/payment", { state: { booking } });
  };

  if (loading) return <div className="text-center mt-10">Loading your bookings...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Your Bookings</h1>

        {bookings.length === 0 ? (
          <p className="text-slate-600">You have no bookings yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="bg-white p-5 rounded-2xl shadow border border-slate-200"
              >
                {/* Service Info */}
                <div className="flex items-center mb-3">
                  {b.serviceImg ? (
                    <img
                      src={b.serviceImg}
                      alt={b.serviceTitle}
                      className="w-20 h-20 object-cover rounded-xl mr-4"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 rounded-xl mr-4 flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                  <div>
                    <h2 className="text-lg font-semibold">{b.serviceTitle || "Event"}</h2>
                    <p className="text-indigo-600 font-bold">
                      ₹{b.servicePrice?.toLocaleString() ?? "N/A"}
                    </p>
                    <p className="text-sm text-slate-500">Status: {b.status || "pending"}</p>
                  </div>
                </div>

                {/* Service Description */}
                {b.serviceDescription && (
                  <p className="text-sm text-slate-600 mb-3 line-clamp-3">
                    {b.serviceDescription}
                  </p>
                )}

                {/* Booking Details */}
                <div className="text-sm text-slate-700 mb-3">
                  <p><strong>Name:</strong> {b.fullName}</p>
                  <p><strong>Email:</strong> {b.email}</p>
                  <p><strong>Phone:</strong> {b.phone}</p>
                  <p><strong>Date:</strong> {b.eventDate}</p>
                  <p><strong>Time:</strong> {b.eventTime}</p>
                  <p><strong>Guests:</strong> {b.guests}</p>
                  <p><strong>Venue:</strong> {b.venue}</p>
                  <p><strong>Address:</strong> {b.address}</p>
                  <p><strong>Notes:</strong> {b.notes}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 mt-2">
                <button
                    onClick={() => handlePayment(b)}
                    className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                  >
                    Pay
                  </button>
                  <button
                    onClick={() => handleUpdate(b)}
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleCancel(b.id)}
                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default FinalSubmit;
