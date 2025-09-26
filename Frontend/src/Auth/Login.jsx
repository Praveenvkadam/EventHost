import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Lottie from "lottie-react"
import loader from "../assets/Loading circles.json" 
import WrongAnim from "../assets/404 not found.json" // Wrong password animation

const Login = () => {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showErrorAnim, setShowErrorAnim] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues(prev => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formValues.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) newErrors.email = 'Enter a valid email'
    if (!formValues.password) newErrors.password = 'Password is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues)
      })

      if (!response.ok) {
        const errText = await response.text()
        throw new Error(errText || 'Login failed')
      }

      const data = await response.json()

      // ✅ Save JWT + user info from backend
      localStorage.setItem('token', data.token)
      localStorage.setItem('userName', data.username)  // fixed
      localStorage.setItem('userId', data.id)
      localStorage.setItem('email', data.email)
      localStorage.setItem('phone', data.phone)

      // Loader before redirect
      setIsLoading(true)
      setTimeout(() => navigate('/'), 1500)

    } catch (err) {
      setShowErrorAnim(true)
      alert(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Loader screen
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="absolute inset-0 bg-white/70 backdrop-blur-md flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Lottie animationData={loader} loop={true} className="w-40 h-40" />
            <p className="mt-4 text-slate-700 font-medium">Redirecting to Home...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 p-4 relative overflow-y-auto">
      {/* ❌ Wrong password modal */}
      {showErrorAnim && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center max-w-sm relative">
            {/* Close button */}
            <button
              onClick={() => setShowErrorAnim(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-xl"
            >
              ×
            </button>

            <h2 className="text-xl font-bold text-rose-600 mb-4">Wrong Password</h2>
            <Lottie animationData={WrongAnim} loop={true} className="w-40 h-40" />
            <p className="mt-2 text-slate-600">Please try again!</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-slate-200">
          <div className="px-6 pt-6 pb-2 text-center">
            <h1 className="text-2xl font-semibold text-slate-800">Welcome back</h1>
            <p className="text-slate-500 text-sm mt-1">Log in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="px-6 pb-6 pt-2 space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full rounded-xl border ${errors.email ? 'border-rose-400' : 'border-slate-300'} bg-white px-4 py-2.5 text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 ${errors.email ? 'focus:ring-rose-200' : 'focus:ring-sky-200'} focus:border-sky-400`}
              />
              {errors.email && <p className="mt-1 text-sm text-rose-600">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formValues.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full rounded-xl border ${errors.password ? 'border-rose-400' : 'border-slate-300'} bg-white px-4 py-2.5 pr-10 text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 ${errors.password ? 'focus:ring-rose-200' : 'focus:ring-sky-200'} focus:border-sky-400`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute inset-y-0 right-2 my-auto h-8 px-2 text-slate-500 hover:text-slate-700"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-rose-600">{errors.password}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-medium py-2.5 shadow-md hover:from-sky-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Logging in…' : 'Log in'}
            </button>

            {/* Links */}
            <p className="text-center text-sm text-slate-600">
              Don't have an account? <Link to="/signup" className="text-sky-600 hover:underline">Sign up</Link>
            </p>
            <p className="text-center text-sm text-slate-600">
              <Link to="/forgot-password" className="text-sky-600 hover:underline">Forgot password?</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
