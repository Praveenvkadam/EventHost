import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold mb-4">MyApp</h2>
          <p className="text-gray-200">
            We create unforgettable events and experiences for our clients with precision and creativity.
          </p>
          <div className="flex mt-4 gap-4">
            <a href="#" className="hover:text-yellow-300 transition-colors"><FaFacebookF /></a>
            <a href="#" className="hover:text-yellow-300 transition-colors"><FaTwitter /></a>
            <a href="#" className="hover:text-yellow-300 transition-colors"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-yellow-300 transition-colors"><FaInstagram /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-yellow-300 transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-yellow-300 transition-colors">About</Link></li>
            <li><Link to="/services" className="hover:text-yellow-300 transition-colors">Services</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-300 transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Our Services</h3>
          <ul className="space-y-2">
            <li><Link to="/services#event-planning" className="hover:text-yellow-300 transition-colors">Event Planning</Link></li>
            <li><Link to="/services#weddings" className="hover:text-yellow-300 transition-colors">Weddings</Link></li>
            <li><Link to="/services#corporate" className="hover:text-yellow-300 transition-colors">Corporate Events</Link></li>
            <li><Link to="/services#festivals" className="hover:text-yellow-300 transition-colors">Festivals</Link></li>
          </ul>
        </div>

        {/* Contact / Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-200 mb-4">123 Event Street, Bengaluru, Karnataka, India</p>
          <p className="text-gray-200 mb-2">Email: info@myapp.com</p>
          <p className="text-gray-200 mb-4">Phone: +91 9876543210</p>

          {/* Newsletter */}
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 rounded-lg text-black flex-1"
            />
            <button
              type="submit"
              className="bg-yellow-300 text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-12 border-t border-white/20 pt-6 text-center text-gray-200 text-sm">
        &copy; {new Date().getFullYear()} MyApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
