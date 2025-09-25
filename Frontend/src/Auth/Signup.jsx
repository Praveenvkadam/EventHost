import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()

  // form state
  const [formValues, setFormValues] = useState({
    name: '',             // mapped to 'username' in backend
    email: '',
    phone: '',            // must match 'phone' field in backend
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues(prev => ({ ...prev, [name]: value }))
  }

  // frontend validation
  const validate = () => {
    const newErrors = {}
    if (!formValues.name.trim()) newErrors.name = 'Name is required'
    if (!formValues.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) newErrors.email = 'Enter a valid email'
    if (!formValues.phone.trim()) newErrors.phone = 'Phone number is required'
    else if (!/^\+?[0-9]{7,15}$/.test(formValues.phone)) newErrors.phone = 'Enter a valid phone number'
    if (!formValues.password) newErrors.password = 'Password is required'
    else if (formValues.password.length < 6) newErrors.password = 'Min 6 characters'
    if (!formValues.confirmPassword) newErrors.confirmPassword = 'Confirm your password'
    else if (formValues.confirmPassword !== formValues.password) newErrors.confirmPassword = "Passwords don't match"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formValues.name, // backend expects 'username'
          email: formValues.email,
          phone: formValues.phone,    // backend expects 'phone'
          password: formValues.password
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Signup failed')

      alert('Signed up successfully!')
      setFormValues({ name: '', email: '', phone: '', password: '', confirmPassword: '' })
      setErrors({})
      navigate('/login')  // redirect to login after successful signup
    } catch (err) {
      console.error(err)
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
            <h1 className="text-2xl font-semibold text-slate-800">Create your account</h1>
            <p className="text-slate-500 text-sm mt-1">Sign up to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="px-6 pb-6 pt-2 space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formValues.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full rounded-xl border ${errors.name ? 'border-rose-400' : 'border-slate-300'} bg-white px-4 py-2.5 text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 ${errors.name ? 'focus:ring-rose-200' : 'focus:ring-sky-200'} focus:border-sky-400`}
              />
              {errors.name && <p className="mt-1 text-sm text-rose-600">{errors.name}</p>}
            </div>

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

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Phone number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                value={formValues.phone}
                onChange={handleChange}
                placeholder="+1234567890"
                className={`w-full rounded-xl border ${errors.phone ? 'border-rose-400' : 'border-slate-300'} bg-white px-4 py-2.5 text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 ${errors.phone ? 'focus:ring-rose-200' : 'focus:ring-sky-200'} focus:border-sky-400`}
              />
              {errors.phone && <p className="mt-1 text-sm text-rose-600">{errors.phone}</p>}
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
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-rose-600">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1">Confirm password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={formValues.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full rounded-xl border ${errors.confirmPassword ? 'border-rose-400' : 'border-slate-300'} bg-white px-4 py-2.5 text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'focus:ring-rose-200' : 'focus:ring-sky-200'} focus:border-sky-400`}
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-rose-600">{errors.confirmPassword}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-medium py-2.5 shadow-md hover:from-sky-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Signing up…' : 'Sign up'}
            </button>

            <p className="text-sm text-center text-slate-500 mt-4">
              Already have an account? <Link to="/login" className="text-sky-500 hover:text-sky-600">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
