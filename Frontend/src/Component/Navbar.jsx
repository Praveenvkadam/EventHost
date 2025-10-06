import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // dropdown menu
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile sidebar
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("userName");
    const id = localStorage.getItem("userId");
    if (name) setUserName(name);
    if (id) setUserId(Number(id));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Scroll hide/show
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false); // scrolling down
      } else {
        setShowNavbar(true); // scrolling up
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-sky-600 text-white shadow-md transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-bold hover:text-yellow-300 transition-colors"
          >
            MyApp
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            <Link to="/" className="hover:text-yellow-300 transition-colors">
              Home
            </Link>
            <Link to="/about" className="hover:text-yellow-300 transition-colors">
              About
            </Link>
            <Link
              to="/services"
              className="hover:text-yellow-300 transition-colors"
            >
              Services
            </Link>
            <Link
              to="/gallaryPage"
              className="hover:text-yellow-300 transition-colors"
            >
              Gallery
            </Link>
            <Link
              to="/feedback"
              className="hover:text-yellow-300 transition-colors"
            >
              Feedback
            </Link>
            {userId === 1 && (
              <Link
                to="/admin/dashboard"
                className="hover:text-yellow-300 transition-colors"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* User/Profile & Mobile Button */}
          <div className="flex items-center gap-4">
            {userName ? (
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-xl hover:bg-white/30 transition-colors"
                >
                  <FaUserCircle className="text-2xl text-white" />
                  <span>{userName}</span>
                </button>

                {/* Dropdown */}
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg overflow-hidden text-gray-800">
                    <ul>
                      {userId === 1 && (
                        <li>
                          <Link
                            to="/admin/dashboard"
                            className="block px-4 py-2 hover:bg-sky-100 transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            Dashboard
                          </Link>
                        </li>
                      )}
                      <li>
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-sky-100 transition-colors"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex gap-4">
                <Link
                  to="/login"
                  className="bg-white text-indigo-600 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 hover:text-white transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-indigo-600 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 hover:text-white transition-all"
                >
                  Signup
                </Link>
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              className="md:hidden text-white text-2xl"
              onClick={() => setSidebarOpen(true)}
            >
              <FaBars />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4 text-gray-600 text-2xl"
          onClick={() => setSidebarOpen(false)}
        >
          <FaTimes />
        </button>

        <div className="mt-16 flex flex-col gap-6 px-6">
          <Link to="/" onClick={() => setSidebarOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setSidebarOpen(false)}>About</Link>
          <Link to="/services" onClick={() => setSidebarOpen(false)}>Services</Link>
          <Link to="/gallaryPage" onClick={() => setSidebarOpen(false)}>Gallery</Link>
          <Link to="/feedback" onClick={() => setSidebarOpen(false)}>Feedback</Link>
          {userId === 1 && (
            <Link to="/admin/dashboard" onClick={() => setSidebarOpen(false)}>Dashboard</Link>
          )}
          <hr />
          {userName ? (
            <button
              onClick={() => {
                handleLogout();
                setSidebarOpen(false);
              }}
              className="text-left"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" onClick={() => setSidebarOpen(false)}>Login</Link>
              <Link to="/signup" onClick={() => setSidebarOpen(false)}>Signup</Link>
            </>
          )}
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
