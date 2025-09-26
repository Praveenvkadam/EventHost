import React from 'react'
import { Link, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../../Component/Navbar'
import Gallary from './Gallary'

const Dashboard = () => <div className='p-6'>Dashboard Content</div>
const Users = () => <div className='p-6'>Users Content</div>
const Events = () => <div className='p-6'>Events Content</div>
const Analytics = () => <div className='p-6'>Analytics Content</div>
const Settings = () => <div className='p-6'>Settings Content</div>

const A_Home = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path ? 'bg-sky-600' : ''

  return (
    <div className='flex min-h-screen w-full bg-gray-100'>
      <Navbar />

      {/* Sidebar */}
      <aside className='hidden md:block fixed left-0 top-0 z-20 h-screen w-64 shrink-0 bg-gradient-to-b from-sky-700 to-sky-900 text-white'>
        <div className='flex h-16 items-center justify-center border-b border-sky-600 px-4 font-bold text-lg tracking-wide'>
          Admin Panel
        </div>
        <nav className='p-4'>
          <ul className='space-y-2'>
            <li>
              <Link
                to="/admin/dashboard"
                className={`block w-full rounded-lg px-4 py-2 text-left font-medium text-white hover:bg-sky-600 transition-colors duration-300 ${isActive('/admin/dashboard')}`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className={`block w-full rounded-lg px-4 py-2 text-left font-medium text-white hover:bg-sky-600 transition-colors duration-300 ${isActive('/admin/users')}`}
              >
                Users
              </Link>
            </li>
            <li>
              <Link
                to="/admin/events"
                className={`block w-full rounded-lg px-4 py-2 text-left font-medium text-white hover:bg-sky-600 transition-colors duration-300 ${isActive('/admin/events')}`}
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/admin/gallery"
                className={`block w-full rounded-lg px-4 py-2 text-left font-medium text-white hover:bg-sky-600 transition-colors duration-300 ${isActive('/admin/gallery')}`}
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                to="/admin/analytics"
                className={`block w-full rounded-lg px-4 py-2 text-left font-medium text-white hover:bg-sky-600 transition-colors duration-300 ${isActive('/admin/analytics')}`}
              >
                Analytics
              </Link>
            </li>
            <li>
              <Link
                to="/admin/settings"
                className={`block w-full rounded-lg px-4 py-2 text-left font-medium text-white hover:bg-sky-600 transition-colors duration-300 ${isActive('/admin/settings')}`}
              >
                Settings
              </Link>
            </li>
            <li className='pt-4'>
              <span
                onClick={handleLogout}
                className='block w-full cursor-pointer rounded-lg px-4 py-2 text-left font-medium text-red-400 hover:bg-red-500 hover:text-white transition-colors duration-300'
              >
                Logout
              </span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className='flex flex-1 flex-col md:ml-64'>
        <header className='sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6'>
          <h1 className='text-2xl font-semibold text-gray-800'>Admin Home</h1>
          <div className='text-gray-600 font-medium'>Welcome back, Admin</div>
        </header>

        {/* Nested Routes */}
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="events" element={<Events />} />
          <Route path="gallery" element={<Gallary />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  )
}

export default A_Home
