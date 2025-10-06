import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState({ confirmed: 0, pending: 0, cancelled: 0 });

  const token = localStorage.getItem("token");
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    // Fetch user
    if (token) {
      axios.get("http://localhost:8080/api/auth/me", axiosConfig)
        .then(res => setUser(res.data))
        .catch(err => console.error(err));
    }

    // Fetch events (mock or backend)
    axios.get("http://localhost:8080/api/events", axiosConfig)
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));

    // Fetch booking stats (mock or backend)
    axios.get("http://localhost:8080/api/bookings/stats", axiosConfig)
      .then(res => setBookings(res.data))
      .catch(err => console.error(err));
  }, [token]);

  if (!user) return <p className="text-center mt-10">Loading dashboard...</p>;

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* Welcome Panel */}
      <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.username}</h1>
          <p className="text-gray-600 mt-1">{user.email}</p>
        </div>
        <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg font-semibold">Admin Panel</div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2">Total Events</h3>
          <p className="text-3xl font-bold text-gray-800">{events.length}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2">Confirmed Bookings</h3>
          <p className="text-3xl font-bold text-green-600">{bookings.confirmed}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2">Pending Bookings</h3>
          <p className="text-3xl font-bold text-yellow-500">{bookings.pending}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-3">Monthly Revenue</h3>
          <Line
            data={{
              labels: ["Jan","Feb","Mar","Apr","May","Jun"],
              datasets: [{
                label: "Revenue ($)",
                data: [1200, 2500, 1800, 3200, 2700, 3500],
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                borderColor: "rgb(59, 130, 246)",
                tension: 0.3
              }]
            }}
            options={{ responsive: true }}
          />
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-3">Booking Status</h3>
          <Doughnut
            data={{
              labels: ["Confirmed","Pending","Cancelled"],
              datasets: [{
                data: [bookings.confirmed, bookings.pending, bookings.cancelled],
                backgroundColor: ["#22c55e","#f59e0b","#ef4444"]
              }]
            }}
            options={{ responsive: true }}
          />
        </div>
      </div>

      {/* Upcoming Events Table */}
      <div className="bg-white p-5 rounded-xl shadow mt-6">
        <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">Event Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Venue</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {events.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">No upcoming events</td>
                </tr>
              ) : (
                events.map(ev => (
                  <tr key={ev.id}>
                    <td className="px-6 py-4">{ev.name}</td>
                    <td className="px-6 py-4">{new Date(ev.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{ev.venue}</td>
                    <td className={`px-6 py-4 font-semibold ${
                      ev.status === "Confirmed" ? "text-green-600" :
                      ev.status === "Pending" ? "text-yellow-500" :
                      "text-red-500"
                    }`}>{ev.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
