import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  const [selectedMethod, setSelectedMethod] = useState("credit-card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const [razorpayKey, setRazorpayKey] = useState("");

  // Redirect if no booking
  useEffect(() => {
    if (!booking) navigate("/final-submit");
  }, [booking, navigate]);

  // Load Razorpay SDK and fetch key
  useEffect(() => {
    if (document.getElementById("razorpay-sdk")) {
      setSdkReady(true);
      return;
    }

    const script = document.createElement("script");
    script.id = "razorpay-sdk";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setSdkReady(true);
    script.onerror = () => alert("Failed to load Razorpay SDK");
    document.body.appendChild(script);

    const fetchRazorpayKey = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/payment/key");
        if (!res.ok) throw new Error(`Failed to fetch key: ${res.status}`);
        const text = await res.text();
        if (!text) throw new Error("Empty response from backend");
        const data = JSON.parse(text);
        if (data.key) setRazorpayKey(data.key);
        else alert("Razorpay key not received from backend");
      } catch (err) {
        console.error("Failed to fetch Razorpay key:", err);
        alert("Failed to load Razorpay key: " + err.message);
      }
    };

    fetchRazorpayKey();
  }, []);

  // Open Razorpay checkout
  const openRazorpay = async () => {
    if (!booking) return alert("Booking data missing");
    if (!sdkReady) return alert("Razorpay SDK not ready");
    if (!razorpayKey) return alert("Razorpay key not loaded");
    if (!window.Razorpay) return alert("Razorpay SDK not available");

    setIsProcessing(true);

    try {
      const res = await fetch(
        `http://localhost:8080/api/payment/create-order?amount=${booking.servicePrice}`
      );
      const orderText = await res.text();
      if (!orderText) throw new Error("No order data returned");
      const orderData = JSON.parse(orderText);

      if (!orderData?.id) {
        alert("Failed to create order");
        setIsProcessing(false);
        return;
      }

      const options = {
        key: razorpayKey,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Event Management",
        description: booking.serviceTitle || "Event Payment",
        order_id: orderData.id,
        handler: async function (response) {
          try {
            const confirmRes = await fetch(`http://localhost:8080/api/payment/confirm`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                paymentId: response.razorpay_payment_id,
                bookingId: booking.id,
                razorpayOrderId: orderData.id,
              }),
            });
            const confirmText = await confirmRes.text();
            const confirmData = confirmText ? JSON.parse(confirmText) : {};

            if (confirmRes.ok) {
              alert("Payment successful. Receipt sent to email.");
            } else {
              alert("Payment succeeded but failed to process backend: " + (confirmData.error || ""));
            }

            navigate("/final-submit", {
              state: { paymentId: response.razorpay_payment_id },
            });
          } catch (err) {
            console.error(err);
            alert("Error confirming payment or sending email");
          }
        },
        prefill: {
          name: booking.fullName || "John Doe",
          email: booking.email || "john@example.com",
          contact: booking.phone || "9876543210",
        },
        notes: { booking_id: booking.id || "12345" },
        theme: { color: "#4F46E5" },
      };

      const razor = new window.Razorpay(options);
      razor.on("payment.failed", function (response) {
        alert("Payment failed: " + response.error.description);
      });
      razor.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong during payment: " + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();
    openRazorpay();
  };

  if (!booking) return <div className="text-center mt-10">Loading...</div>;

  const paymentMethods = [
    { key: "credit-card", label: "Credit Card" },
    { key: "upi", label: "UPI" },
    { key: "net-banking", label: "Net Banking" },
    { key: "wallet", label: "Wallet" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Payment</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Booking Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between"><span>Service:</span><span>{booking.serviceTitle}</span></div>
              <div className="flex justify-between"><span>Date:</span><span>{booking.eventDate}</span></div>
              <div className="flex justify-between"><span>Time:</span><span>{booking.eventTime}</span></div>
              <div className="flex justify-between"><span>Guests:</span><span>{booking.guests}</span></div>
              <div className="flex justify-between"><span>Venue:</span><span>{booking.venue}</span></div>
              <hr className="my-3" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount:</span>
                <span className="text-indigo-600">₹{booking.servicePrice?.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Payment Options</h2>
            <div className="mb-6">
              <label className="block font-medium text-slate-700 mb-3">Select Payment Method</label>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.key}
                    type="button"
                    onClick={() => setSelectedMethod(method.key)}
                    className={`p-3 rounded-lg border-2 transition ${
                      selectedMethod === method.key
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-slate-300 hover:border-slate-400"
                    }`}
                  >
                    <div className="text-center font-medium">{method.label}</div>
                  </button>
                ))}
              </div>
            </div>
            <form onSubmit={handlePayment}>
              <button
                type="submit"
                disabled={isProcessing || !sdkReady}
                className={`w-full py-3 px-6 rounded-lg font-medium transition ${
                  isProcessing || !sdkReady
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                {isProcessing ? "Processing..." : `Pay ₹${booking.servicePrice?.toLocaleString()}`}
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Payment;
