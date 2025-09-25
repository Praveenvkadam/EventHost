import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

      // Save JWT and username for Navbar / auth
      localStorage.setItem('token', data.token)
      localStorage.setItem('userName', data.name || 'User')
      localStorage.setItem('userId', data.id)

      alert('Logged in successfully!')
      setFormValues({ email: '', password: '' })
      setErrors({})
      if(data.id===1){
        navigate('/admin')
      }else{
        navigate('/home')
      }
      // redirect to home or dashboard

    } catch (err) {
      alert(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-slate-200">
          <div className="px-6 pt-6 pb-2 text-center">
            <h1 className="text-2xl font-semibold text-slate-800">Welcome back</h1>
            <p className="text-slate-500 text-sm mt-1">Log in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="px-6 pb-6 pt-2 space-y-4">
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-medium py-2.5 shadow-md hover:from-sky-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Logging in…' : 'Log in'}
            </button>

            <p className="text-center text-sm text-slate-600">
              Don't have an account? <Link to="/" className="text-sky-600 hover:underline">Sign up</Link>
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
