import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../Component/Navbar";
import Footer from "../../Component/Footer";
import axios from "axios";

export default function FeedbackPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "", rating: 0 });
  const [feedbacks, setFeedbacks] = useState([]);
  const [isAdmin] = useState(true); // Replace with real admin check
  const sliderRef = useRef(null);

  // Fetch feedback
  useEffect(() => {
    axios.get("http://localhost:8080/api/feedback")
      .then(res => setFeedbacks(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRating = (rating) => {
    setForm((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message || form.rating === 0) {
      alert("All fields and rating are required!");
      return;
    }

    axios.post("http://localhost:8080/api/feedback", form)
      .then(res => {
        setFeedbacks((prev) => [res.data, ...prev]);
        setForm({ name: "", email: "", message: "", rating: 0 });
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/feedback/${id}`)
      .then(() => {
        setFeedbacks((prev) => prev.filter(fb => fb.id !== id));
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 font-sans">
      <Navbar />

      {/* Feedback Form */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Send Us Your Feedback</h2>
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-3xl shadow-xl flex flex-col gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Feedback"
            rows={5}
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Rating Stars */}
          <div className="flex gap-2 text-yellow-400 text-4xl justify-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                onClick={() => handleRating(i)}
                className={`cursor-pointer ${i <= form.rating ? "text-yellow-400" : "text-gray-300"}`}
              >
                ★
              </span>
            ))}
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition"
          >
            Submit Feedback
          </button>
        </motion.form>
      </section>

      {/* Feedback Slider */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Recent Feedback</h2>

        <motion.div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto px-2 cursor-grab"
          drag="x"
          dragConstraints={{ left: -((feedbacks.length) * 336 - sliderRef.current?.offsetWidth || 0), right: 0 }}
        >
          <AnimatePresence>
            {feedbacks.length === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-gray-500 w-full"
              >
                No feedback submitted yet.
              </motion.p>
            )}

            {feedbacks.map((fb) => (
              <motion.div
                key={fb.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex-shrink-0 w-80 bg-white p-6 rounded-2xl shadow-md border-l-4 border-blue-500 relative"
              >
                <h3 className="text-xl font-semibold">{fb.name}</h3>
                <p className="text-gray-500 text-sm mb-2">{fb.email}</p>
                <p className="text-gray-700 mb-3">{fb.message}</p>
                <div className="flex gap-1 text-yellow-400 text-3xl mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < fb.rating ? "★" : "☆"}</span>
                  ))}
                </div>

                {isAdmin && (
                  <button
                    onClick={() => handleDelete(fb.id)}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 font-bold"
                  >
                    ✕
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
