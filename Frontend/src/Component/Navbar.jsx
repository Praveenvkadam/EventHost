import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaUserCircle, FaBars, FaTimes, FaShoppingCart } from "react-icons/fa"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [userName, setUserName] = useState(null)
  const [userId, setUserId] = useState(null)
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [requestedCount, setRequestedCount] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const name = localStorage.getItem("userName")
    const id = localStorage.getItem("userId")
    if (name) setUserName(name)
    if (id) setUserId(Number(id))
    const rc = Number(localStorage.getItem('requestedCount') || 0)
    setRequestedCount(isNaN(rc) ? 0 : rc)
  }, [])

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'requestedCount') {
        const rc = Number(e.newValue || 0)
        setRequestedCount(isNaN(rc) ? 0 : rc)
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    navigate("/login")
  }

  // Scroll listener for hiding/showing navbar
  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false) // hide on scroll down
      } else {
        setShowNavbar(true) // show on scroll up
      }
      setLastScrollY(window.scrollY)
    }

    window.addEventListener("scroll", controlNavbar)
    return () => {
      window.removeEventListener("scroll", controlNavbar)
    }
  }, [lastScrollY])

  return (
    <>
      {/* Navbar */}
      <nav
        className={`bg-gradient-to-r from-sky-500 to-indigo-600 shadow-lg fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-bold text-white hover:text-yellow-300 transition-colors"
          >
            MyApp
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center text-white font-medium">
            <Link to="/" className="hover:text-yellow-300 transition-colors">
              Home
            </Link>
            <Link to="/about" className="hover:text-yellow-300 transition-colors">
              About
            </Link>
            <Link to="/services" className="hover:text-yellow-300 transition-colors">
              Services
            </Link>
            <Link to="/gallaryPage" className="hover:text-yellow-300 transition-colors">
            Gallary
            </Link>
            <Link to="/feedback" className="hover:text-yellow-300 transition-colors">
             Feedback
            </Link>
            {userId === 1 && (
              <Link to="/admin/*" className="hover:text-yellow-300 transition-colors">
                Dashboard
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars />
          </button>

          {/* Right Section for Desktop: Cart + User */}
          <div className="hidden md:flex items-center gap-4 relative">
            {/* Cart */}
            <button
              onClick={() => navigate('/final-submit')}
              className="relative rounded-xl bg-white/20 backdrop-blur-md p-2 text-white hover:bg-white/30 transition-colors"
              aria-label="Requested events"
              title="Requested events"
            >
              <FaShoppingCart className="text-2xl" />
              <span className="absolute -top-2 -right-2 min-w-[20px] h-5 px-1 rounded-full bg-yellow-400 text-indigo-900 text-xs font-bold flex items-center justify-center">
                {requestedCount}
              </span>
            </button>

            {userName ? (
              <>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-2 rounded-xl hover:bg-white/30 transition-colors"
                >
                  <FaUserCircle className="text-2xl text-white" />
                  <span className="text-white font-medium">{userName}</span>
                </button>

                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg overflow-hidden">
                    <ul className="text-gray-800 text-sm">
                      <li>
                      
                      </li>
                      {userId === 1 && (
                        <li>
                          <Link
                            to="/admin/*"
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

      {/* Sidebar (Mobile) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 text-2xl"
          onClick={() => setSidebarOpen(false)}
        >
          <FaTimes />
        </button>

        <div className="mt-16 flex flex-col gap-6 px-6 text-gray-800 font-medium">
          {/* Show user name if logged in */}
          {userName && (
            <div className="flex items-center gap-2 mb-4">
              <FaUserCircle className="text-2xl text-gray-700" />
              <span className="font-semibold">{userName}</span>
            </div>
          )}

          {/* Links */}
          <Link to="/" onClick={() => setSidebarOpen(false)}>
            Home
          </Link>
          <Link to="/about" onClick={() => setSidebarOpen(false)}>
            About
          </Link>
          <Link to="/services" onClick={() => setSidebarOpen(false)}>
            Services
          </Link>
          <Link to="/gallaryPage" onClick={() => setSidebarOpen(false)}>
           Gallary
          </Link>

          {/* Admin Dashboard link */}
          {userId === 1 && (
            <Link to="/admin/*" onClick={() => setSidebarOpen(false)}>
              Dashboard
            </Link>
          )}

          <hr />

          {/* Login/Signup or Profile/Logout */}
          {userName ? (
            <>
              
              <button
                onClick={() => {
                  handleLogout()
                  setSidebarOpen(false)
                }}
                className="text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setSidebarOpen(false)}>
                Login
              </Link>
              <Link to="/signup" onClick={() => setSidebarOpen(false)}>
                Signup
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Overlay when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  )
}

export default Navbar