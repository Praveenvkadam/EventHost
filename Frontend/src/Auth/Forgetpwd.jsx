import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Forgetpwd = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  const validate = () => {
    if (!email.trim()) {
      setError('Email is required')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email')
      return false
    }
    setError('')
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    try {
      const response = await fetch('http://localhost:8080/api/auth/reset-password-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }), // only email is needed
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.message || 'Request failed')
      setSent(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-slate-200">
          <div className="px-6 pt-6 pb-2 text-center">
            <h1 className="text-2xl font-semibold text-slate-800">Forgot password</h1>
            <p className="text-slate-500 text-sm mt-1">We'll send a reset link to your email</p>
          </div>

          <form onSubmit={handleSubmit} className="px-6 pb-6 pt-2 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={`w-full rounded-xl border ${error ? 'border-rose-400' : 'border-slate-300'} bg-white px-4 py-2.5 text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 ${error ? 'focus:ring-rose-200' : 'focus:ring-sky-200'} focus:border-sky-400`}
              />
              {error && <p className="mt-1 text-sm text-rose-600">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-medium py-2.5 shadow-md hover:from-sky-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending…' : 'Send reset link'}
            </button>

            {sent && (
              <p className="text-center text-sm text-emerald-600 mt-2">
                If an account exists, a reset link has been sent.
              </p>
            )}

            <p className="text-center text-sm text-slate-600 mt-2">
              Remembered your password? <Link to="/login" className="text-sky-600 hover:underline">Back to login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Forgetpwd
