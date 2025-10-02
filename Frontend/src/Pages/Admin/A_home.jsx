import React from 'react'
import { Link, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../../Component/Navbar'
import Gallary from './Gallary'
import Users from './Users'
import AddPackage from './AddPackage'
import Orders from './Orders'
import AddEmp from './AddEmp'
import { Users as UsersIcon, CalendarClock, IndianRupee, TrendingUp } from 'lucide-react'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
)

const Dashboard = () => {
  const kpis = [
    {
      title: 'Total Users',
      value: '12,480',
      delta: '+4.2% MoM',
      icon: <UsersIcon className='h-6 w-6 text-sky-600' />,
      bg: 'from-sky-50 to-white'
    },
    {
      title: 'Upcoming Events',
      value: '86',
      delta: '+12 scheduled',
      icon: <CalendarClock className='h-6 w-6 text-indigo-600' />,
      bg: 'from-indigo-50 to-white'
    },
    {
      title: 'Revenue (MTD)',
      value: '₹ 8.7L',
      delta: '+7.9% MoM',
      icon: <IndianRupee className='h-6 w-6 text-emerald-600' />,
      bg: 'from-emerald-50 to-white'
    },
    {
      title: 'Conversion Rate',
      value: '3.14%',
      delta: '+0.3pp',
      icon: <TrendingUp className='h-6 w-6 text-amber-600' />,
      bg: 'from-amber-50 to-white'
    }
  ]

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Bookings',
        data: [120, 150, 180, 160, 210, 240, 260],
        borderColor: 'rgb(2, 132, 199)',
        backgroundColor: 'rgba(2, 132, 199, 0.2)',
        tension: 0.35,
        fill: true,
        pointRadius: 3
      }
    ]
  }

  const barData = {
    labels: ['Wedding', 'Corporate', 'Birthday', 'Festival'],
    datasets: [
      {
        label: 'Revenue (₹ in thousands)',
        data: [560, 420, 260, 310],
        backgroundColor: ['#38bdf8', '#818cf8', '#34d399', '#f59e0b']
      }
    ]
  }

  const doughnutData = {
    labels: ['Confirmed', 'Pending', 'Cancelled'],
    datasets: [
      {
        data: [62, 28, 10],
        backgroundColor: ['#22c55e', '#f59e0b', '#ef4444'],
        borderWidth: 1
      }
    ]
  }

  const commonOptions = {
    plugins: {
      legend: { display: true, position: 'bottom' },
      tooltip: { enabled: true }
    },
    maintainAspectRatio: false
  }

  return (
    <div className='p-6 space-y-6'>
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
        {kpis.map((kpi) => (
          <div key={kpi.title} className={`rounded-xl border border-gray-200 bg-gradient-to-br ${kpi.bg} p-5 shadow-sm`}>
            <div className='flex items-center justify-between'>
              <div>
                <div className='text-sm font-medium text-gray-500'>{kpi.title}</div>
                <div className='mt-1 text-2xl font-bold text-gray-800'>{kpi.value}</div>
                <div className='mt-1 text-xs font-semibold text-emerald-600'>{kpi.delta}</div>
              </div>
              <div className='rounded-full bg-white p-3 shadow-inner'>
                {kpi.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 xl:grid-cols-3 gap-6'>
        <div className='xl:col-span-2 rounded-xl border border-gray-200 bg-white p-5 shadow-sm'>
          <div className='mb-3 flex items-center justify-between'>
            <h3 className='text-lg font-semibold text-gray-800'>Monthly Bookings</h3>
            <span className='text-xs text-gray-500'>Last 7 months</span>
          </div>
          <div className='h-72'>
            <Line data={lineData} options={commonOptions} />
          </div>
        </div>

        <div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm'>
          <div className='mb-3 flex items-center justify-between'>
            <h3 className='text-lg font-semibold text-gray-800'>Booking Status</h3>
            <span className='text-xs text-gray-500'>This month</span>
          </div>
          <div className='h-72'>
            <Doughnut data={doughnutData} options={commonOptions} />
          </div>
        </div>
      </div>

      <div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm'>
        <div className='mb-3 flex items-center justify-between'>
          <h3 className='text-lg font-semibold text-gray-800'>Revenue by Category</h3>
          <span className='text-xs text-gray-500'>Year to date</span>
        </div>
        <div className='h-80'>
          <Bar data={barData} options={commonOptions} />
        </div>
      </div>
    </div>
  )
}

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
                Add Packages
              </Link>
            </li>
            <li>
              <Link
                to="/admin/addemp"
                className={`block w-full rounded-lg px-4 py-2 text-left font-medium text-white hover:bg-sky-600 transition-colors duration-300 ${isActive('/admin/addemp')}`}
              >
                Add Employees
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
                to="/admin/orders"
                className={`block w-full rounded-lg px-4 py-2 text-left font-medium text-white hover:bg-sky-600 transition-colors duration-300 ${isActive('/admin/analytics')}`}
              >
                Orders
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
          <Route path="events" element={<AddPackage />} />
          <Route path="gallery" element={<Gallary />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="orders" element={<Orders />} />
          <Route path="addemp" element={<AddEmp />} />
        </Routes>
      </main>
    </div>
  )
}

export default A_Home
