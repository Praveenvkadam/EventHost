import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [user, setUser] = useState({
    username: localStorage.getItem("userName") || "",
    id: localStorage.getItem("userId") || "",
  });
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [counts, setCounts] = useState({ confirmed: 0, pending: 0, cancelled: 0 });

  const token = localStorage.getItem("token");
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    if (!token) return;

    // Fetch user info
    axios.get("http://localhost:8080/api/auth/me", axiosConfig)
      .then((res) => setUser((prev) => ({ ...prev, ...res.data })))
      .catch(console.error);

    // Fetch events
    axios.get("http://localhost:8080/api/services", axiosConfig)
      .then((res) => setEvents(res.data))
      .catch(console.error);

    // Fetch bookings
    axios.get("http://localhost:8080/api/bookings", axiosConfig)
      .then((res) => {
        const data = res.data;
        setBookings(data);

        // Count by status dynamically
        const countsObj = { confirmed: 0, pending: 0, cancelled: 0 };
        data.forEach((b) => {
          const status = b.status?.toLowerCase().trim();
          if (status === "confirmed") countsObj.confirmed += 1;
          else if (status === "pending") countsObj.pending += 1;
          else if (status === "cancelled") countsObj.cancelled += 1;
        });
        setCounts(countsObj);
      })
      .catch(console.error);
  }, [token]);

  if (!token) return <p className="text-center mt-10 text-xl font-semibold text-gray-700">Please login to access dashboard.</p>;

  // Revenue per month (example: sum of guests × 100 for confirmed bookings)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const revenuePerMonth = months.map((_, i) => {
    // For demo, random revenue or compute from booking date if available
    const monthNum = i; // 0 = Jan
    return bookings
      .filter((b) => {
        const date = new Date(b.eventDate);
        return b.status?.toLowerCase().trim() === "confirmed" && date.getMonth() === monthNum;
      })
      .reduce((sum, b) => sum + (b.guests || 1) * 100, 0);
  });

  const revenueData = {
    labels: months,
    datasets: [
      {
        label: "Revenue ($)",
        data: revenuePerMonth,
        backgroundColor: "#6366f1",
        borderRadius: 6,
      },
    ],
  };

  const bookingStatusData = {
    labels: ["Confirmed", "Pending", "Cancelled"],
    datasets: [
      {
        data: [counts.confirmed, counts.pending, counts.cancelled],
        backgroundColor: ["#22c55e", "#fbbf24", "#ef4444"],
        hoverOffset: 10,
      },
    ],
  };

  // Events per venue
  const venueCounts = {};
  events.forEach((ev) => {
    venueCounts[ev.venue] = (venueCounts[ev.venue] || 0) + 1;
  });

  const venueData = {
    labels: Object.keys(venueCounts),
    datasets: [
      {
        label: "Events per Venue",
        data: Object.values(venueCounts),
        backgroundColor: "#3b82f6",
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      {/* Welcome Panel */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center transform hover:scale-105 transition-transform duration-300">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user.username}</h1>
          <p className="mt-1 text-indigo-200">{user.email}</p>
        </div>
        <div className="bg-white bg-opacity-20 px-4 py-2 rounded-xl font-semibold">Admin Panel</div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Total Events</h3>
          <p className="text-3xl font-bold text-indigo-500">{events.length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Confirmed Bookings</h3>
          <p className="text-3xl font-bold text-green-500">{counts.confirmed}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Pending Bookings</h3>
          <p className="text-3xl font-bold text-yellow-500">{counts.pending}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Monthly Revenue</h3>
          <Bar data={revenueData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Booking Status</h3>
          <Pie data={bookingStatusData} options={{ responsive: true, plugins: { legend: { position: "bottom" } } }} />
        </div>
      </div>

      {/* Events per Venue */}
      <div className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 mt-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Events per Venue</h3>
        <Bar data={venueData} options={{ indexAxis: "y", responsive: true, plugins: { legend: { display: false } } }} />
      </div>
    </div>
  );
};

export default Dashboard;
