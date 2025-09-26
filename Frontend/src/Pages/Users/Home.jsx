import React, { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../../Component/Navbar"
import VideBox from "../../Component/VideBox"

const Home = () => {
  const navigate = useNavigate()
  const [isGuest, setIsGuest] = useState(false)
  const guestTimeoutRef = useRef(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      // Guest mode
      setIsGuest(true)
      startGuestTimer()
    }

    return () => {
      if (guestTimeoutRef.current) clearTimeout(guestTimeoutRef.current)
    }
  }, [])

  const startGuestTimer = () => {
    if (guestTimeoutRef.current) clearTimeout(guestTimeoutRef.current)
    guestTimeoutRef.current = setTimeout(() => {
      alert("Your guest session has been active for 3 minutes. Please login for full access.")
    }, 3 * 60 * 1000)
  }

  const goToLogin = () => {
    if (guestTimeoutRef.current) clearTimeout(guestTimeoutRef.current)
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-sky-200">
      <Navbar />
      <VideBox />
    </div>
  )
}

export default Home
