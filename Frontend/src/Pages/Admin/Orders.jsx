import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/admin/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Failed to load orders:", err));
  }, []);

  const getStatusClasses = (status) => {
    const normalized = (status || "").toUpperCase();

    switch (normalized) {
      case "PAID":
      case "SUCCESS":
        return "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-300";
      case "PENDING":
      case "CREATED":
        return "bg-amber-100 text-amber-700 ring-1 ring-amber-300";
      case "FAILED":
      case "CANCELLED":
        return "bg-rose-100 text-rose-700 ring-1 ring-rose-300";
      default:
        return "bg-slate-100 text-slate-700 ring-1 ring-slate-300";
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6 transform-gpu transition-all duration-300 hover:-translate-y-1">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-600 via-indigo-600 to-fuchsia-600 p-6 shadow-2xl">
          <div
            className="absolute inset-0 opacity-30 mix-blend-overlay"
            style={{
              backgroundImage:
                "radial-gradient(64rem 32rem at 120% -10%, rgba(255,255,255,.35), transparent 40%), radial-gradient(48rem 24rem at -20% 120%, rgba(255,255,255,.2), transparent 40%)",
            }}
          />
          <div className="relative">
            <h1 className="text-2xl font-extrabold tracking-tight text-white drop-shadow">Orders</h1>
            <p className="mt-1 text-sm text-white/80">Track payment status, IDs and amounts in a sleek table.</p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs text-white ring-1 ring-inset ring-white/30 backdrop-blur">
              <span className="font-semibold">Total</span>
              <span className="rounded-full bg-white/20 px-2 py-0.5">{orders.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="relative rounded-2xl border border-slate-200 bg-white/90 p-1 shadow-xl backdrop-blur-sm">
          <table className="min-w-full overflow-hidden rounded-xl bg-white">
            <thead className="bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-inner">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Booking ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Order ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Payment ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.length > 0 ? (
                orders.map((order, idx) => (
                  <tr
                    key={order.id}
                    className={`transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                      idx % 2 === 0 ? "bg-slate-50/60" : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-3 text-slate-700">{order.id}</td>
                    <td className="px-4 py-3 text-slate-700">{order.bookingId}</td>
                    <td className="px-4 py-3 text-slate-700">{order.razorpayOrderId}</td>
                    <td className="px-4 py-3 text-slate-700">{order.razorpayPaymentId || "-"}</td>
                    <td className="px-4 py-3 font-semibold text-slate-900">₹{order.amount}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                          order.status
                        )}`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                        {order.status || "-"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{formatDate(order.createdAt)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-4 py-10 text-center text-slate-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
