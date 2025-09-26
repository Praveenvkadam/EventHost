import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaUserCircle } from "react-icons/fa"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [userName, setUserName] = useState(null)
  const [userId, setUserId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const name = localStorage.getItem("userName")
    const id = localStorage.getItem("userId")
    if (name) setUserName(name)
    if (id) setUserId(Number(id))
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    navigate("/login")
  }

  return (
    <nav className="bg-gradient-to-r from-sky-500 to-indigo-600 shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-white hover:text-yellow-300 transition-colors"
        >
          MyApp
        </Link>

        {/* Main menu */}
        <div className="hidden md:flex gap-6 items-center text-white font-medium">
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
            to="/contact"
            className="hover:text-yellow-300 transition-colors"
          >
            Contact
          </Link>
          {userId === 1 && (
            <Link
              to="/admin/*"
              className="hover:text-yellow-300 transition-colors"
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* User section */}
        <div className="relative">
          {userName ? (
            <>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-2 rounded-xl hover:bg-white/30 transition-colors"
              >
                <FaUserCircle className="text-2xl text-white" />
                <span className="text-white font-medium">{userName}</span>
              </button>

              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg overflow-hidden">
                  <ul className="text-gray-800 text-sm">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-indigo-100 transition-colors"
                      >
                        Profile
                      </Link>
                    </li>
                    {userId === 1 && (
                      <li>
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 hover:bg-indigo-100 transition-colors"
                        >
                          Dashboard
                        </Link>
                      </li>
                    )}
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-indigo-100 transition-colors"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <div className="flex gap-4">
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
        </div>
      </div>
    </nav>
  )
}

export default Navbar
