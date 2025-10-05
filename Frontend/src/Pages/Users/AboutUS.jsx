import React from "react";
import { motion } from "framer-motion";
import Navbar from "../../Component/Navbar";
import Footer from "../../Component/Footer";

export default function AboutUs() {
  const sections = [
    {
      title: "Weddings & Celebrations",
      description:
        "We specialize in crafting dream weddings and joyous celebrations that reflect your unique story. From decor to entertainment, every detail is managed with care and passion.",
      image:
        "https://www.maharaniweddings.com/wp-content/uploads/2012/12/1-indian-wedding-ceremony-mandap-floral-bride-and-groom.jpg",
    },
    {
      title: "Corporate Events",
      description:
        "Our team designs professional and engaging corporate events — conferences, product launches, and team-building activities that leave a lasting impression.",
      image:
        "https://emg.co.in/images/corporate-event-header.jpg",
    },
    {
      title: "Cultural & Music Festivals",
      description:
        "From local cultural programs to grand music concerts, we ensure every event is a vibrant experience filled with energy, creativity, and joy.",
      image:
        "https://www.indianeagle.com/travelbeats//wp-content/uploads/2013/10/khajuraho-dance-festival-overview.jpg?w=547",
    },
    {
      title: "Exhibitions & Trade Shows",
      description:
        "We provide complete exhibition and trade show management — from stall design to logistics — ensuring smooth execution and a strong brand impact.",
      image:
        "https://www.thetradeshownetwork.com/hubfs/1673620641503.jpg",
    },
    {
      title: "College & Community Events",
      description:
        "We collaborate with colleges and communities to bring innovative and fun events to life — fests, cultural programs, sports meets, and more.",
      image:
        "https://www.instaevent.in/images/webimages/college%20events/idea.jpg",
    },
  ];

  return (
    <div className="bg-white text-gray-900 font-sans">
      <Navbar />
      {/* Hero Section */}
      <section className="relative h-[500px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-6">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-white mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            About Us
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl text-white max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Turning ideas into unforgettable events with creativity, precision, and passion.
          </motion.p>
        </div>
      </section>

      {/* Zig-Zag Sections */}
      {sections.map((sec, idx) => (
        <section
          key={idx}
          className={`py-20 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 ${
            idx % 2 === 1 ? "md:flex-row-reverse" : ""
          }`}
        >
          <motion.img
            src={sec.image}
            alt={sec.title}
            className="w-full md:w-1/2 h-80 md:h-96 object-cover rounded-3xl shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: idx % 2 === 1 ? 100 : -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">{sec.title}</h2>
            <p className="text-gray-700 text-lg leading-relaxed">{sec.description}</p>
          </motion.div>
        </section>
      ))}

      {/* Map Section */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-4xl font-bold mb-12">Visit Us in Chikodi</h2>
        <div className="w-full max-w-5xl mx-auto h-96 rounded-3xl overflow-hidden shadow-2xl">
          <iframe
            title="Chikodi Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3830.756290793103!2d74.58255687564617!3d16.443190988482003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc12b6b8f7888ed%3A0x625e0a0d1a0d3ef2!2sChikodi%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1696257985394!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      <Footer />
    </div>
  );
}
