import React from 'react'
import { Link, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom'
import Navbar from '../../Component/Navbar'
import Gallary from './Gallary'
import Users from './Users'
import AddPackage from './AddPackage'
import Orders from './Orders'
import AddEmp from './AddEmp'
import axios from 'axios'

import { Users as UsersIcon, IndianRupee, TrendingUp } from 'lucide-react'
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

const A_Home = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === `/admin/${path}` ? 'bg-sky-600' : ''

  // ---------------- Dashboard state ----------------
  const [kpis, setKpis] = React.useState({
    totalUsers: 0,
    revenue: 0,
    conversionRate: 0,
  })

  const [lineData, setLineData] = React.useState({
    labels: [],
    datasets: [{
      label: 'Monthly Orders',
      data: [],
      borderColor: 'rgb(2, 132, 199)',
      backgroundColor: 'rgba(2, 132, 199, 0.2)',
      tension: 0.35,
      fill: true,
      pointRadius: 3
    }]
  })

  const [doughnutData, setDoughnutData] = React.useState({
    labels: ['Confirmed', 'Pending', 'Cancelled'],
    datasets: [{
      data: [],
      backgroundColor: ['#22c55e', '#f59e0b', '#ef4444'],
      borderWidth: 1
    }]
  })

  const [barData, setBarData] = React.useState({
    labels: [],
    datasets: [{ label: 'Revenue (₹)', data: [], backgroundColor: [] }]
  })

  React.useEffect(() => {
    const token = localStorage.getItem('token')
    const config = { headers: { Authorization: `Bearer ${token}` } }

    // Fetch users count
    axios.get('http://localhost:8080/api/admin/users', config)
      .then(res => setKpis(prev => ({ ...prev, totalUsers: res.data.length })))
      .catch(err => console.error(err))

    // Fetch orders
    axios.get('http://localhost:8080/api/admin/admin-orders', config)
      .then(res => {
        const orders = res.data

        // Line chart: monthly orders
        const monthLabels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        const monthlyOrders = monthLabels.map((_, idx) =>
          orders.filter(o => new Date(o.createdAt).getMonth() === idx).length
        )
        setLineData(prev => ({ ...prev, labels: monthLabels, datasets: [{ ...prev.datasets[0], data: monthlyOrders }] }))

        // Doughnut chart: status
        const statusCounts = {
          Confirmed: orders.filter(o => o.status === 'CONFIRMED').length,
          Pending: orders.filter(o => o.status === 'PENDING').length,
          Cancelled: orders.filter(o => o.status === 'CANCELLED').length,
        }
        setDoughnutData(prev => ({ ...prev, datasets: [{ ...prev.datasets[0], data: [statusCounts.Confirmed, statusCounts.Pending, statusCounts.Cancelled] }] }))

        // Total revenue
        const revenue = orders.reduce((acc, o) => acc + (o.totalPrice || 0), 0)
        setKpis(prev => ({ ...prev, revenue }))

        // Conversion rate
        const conversion = orders.length ? (statusCounts.Confirmed / orders.length) * 100 : 0
        setKpis(prev => ({ ...prev, conversionRate: conversion.toFixed(2) }))
      })
      .catch(err => console.error(err))

    // Revenue by services
    axios.get('http://localhost:8080/api/admin/services', config)
      .then(res => {
        const services = res.data
        setBarData({
          labels: services.map(s => s.name),
          datasets: [{
            label: 'Revenue (₹)',
            data: services.map(s => s.price),
            backgroundColor: services.map((_, idx) => ['#38bdf8','#818cf8','#34d399','#f59e0b'][idx % 4])
          }]
        })
      })
      .catch(err => console.error(err))
  }, [])

  const kpiList = [
    { title: 'Total Users', value: kpis.totalUsers, icon: <UsersIcon className='h-6 w-6 text-sky-600' />, bg: 'from-sky-50 to-white' },
    { title: 'Revenue', value: `₹ ${kpis.revenue}`, icon: <IndianRupee className='h-6 w-6 text-emerald-600' />, bg: 'from-emerald-50 to-white' },
    { title: 'Conversion Rate', value: `${kpis.conversionRate}%`, icon: <TrendingUp className='h-6 w-6 text-amber-600' />, bg: 'from-amber-50 to-white' }
  ]

  const commonOptions = { plugins: { legend: { display: true, position: 'bottom' }, tooltip: { enabled: true } }, maintainAspectRatio: false }

  const Dashboard = () => (
    <div className='p-6 space-y-6'>
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
        {kpiList.map(kpi => (
          <div key={kpi.title} className={`rounded-xl border border-gray-200 bg-gradient-to-br ${kpi.bg} p-5 shadow-sm`}>
            <div className='flex items-center justify-between'>
              <div>
                <div className='text-sm font-medium text-gray-500'>{kpi.title}</div>
                <div className='mt-1 text-2xl font-bold text-gray-800'>{kpi.value}</div>
              </div>
              <div className='rounded-full bg-white p-3 shadow-inner'>{kpi.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6'>
        <div className='xl:col-span-2 rounded-xl border border-gray-200 bg-white p-5 shadow-sm'>
          <h3 className='text-lg font-semibold text-gray-800 mb-3'>Monthly Orders</h3>
          <div className='h-72'>
            <Line data={lineData} options={commonOptions} />
          </div>
        </div>

        <div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm'>
          <h3 className='text-lg font-semibold text-gray-800 mb-3'>Booking Status</h3>
          <div className='h-72'>
            <Doughnut data={doughnutData} options={commonOptions} />
          </div>
        </div>
      </div>

      <div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm mt-6'>
        <h3 className='text-lg font-semibold text-gray-800 mb-3'>Revenue by Service</h3>
        <div className='h-80'>
          <Bar data={barData} options={commonOptions} />
        </div>
      </div>
    </div>
  )

  return (
    <div className='flex min-h-screen w-full bg-gray-100'>
      <Navbar />

      {/* Sidebar */}
      <aside className='hidden md:block fixed left-0 top-0 z-20 h-screen w-64 shrink-0 bg-gradient-to-b from-sky-700 to-sky-900 text-white'>
        <div className='flex h-16 items-center justify-center border-b border-sky-600 px-4 font-bold text-lg tracking-wide'>Admin Panel</div>
        <nav className='p-4'>
          <ul className='space-y-2'>
            <li><Link to="dashboard" className={`block w-full rounded-lg px-4 py-2 text-left font-medium text-white hover:bg-sky-600 transition-colors duration-300 ${isActive('dashboard')}`}>Dashboard</Link></li>
            <li><Link to="users" className={`block w-full rounded-lg px-4 py-2 text-left font-medium text-white hover:bg-sky-600 transition-colors duration-300 ${isActive('users')}`}>Users</Link></li>
            <li><Link to="events" className={`block w-full rounded-lg px-4 py-2 text-left font-medium text-white hover:bg-sky-600 transition-colors duration-300 ${isActive('events')}`}>Add Packages</Link></li>
            <li><Link to="addemp" className={`block w-full rounded-lg px-4 py-2 text-left font-medium text-white hover:bg-sky-600 transition-colors duration-300 ${isActive('addemp')}`}>Add Employees</Link></li>
            <li><Link to="gallery" className={`block w-full rounded-lg px-4 py-2 text-left font-medium text-white hover:bg-sky-600 transition-colors duration-300 ${isActive('gallery')}`}>Gallery</Link></li>
            <li><Link to="orders" className={`block w-full rounded-lg px-4 py-2 text-left font-medium text-white hover:bg-sky-600 transition-colors duration-300 ${isActive('orders')}`}>Orders</Link></li>
            <li className='pt-4'><span onClick={handleLogout} className='block w-full cursor-pointer rounded-lg px-4 py-2 text-left font-medium text-red-400 hover:bg-red-500 hover:text-white transition-colors duration-300'>Logout</span></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className='flex flex-1 flex-col md:ml-64'>
        <header className='sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6'>
          <h1 className='text-2xl font-semibold text-gray-800'>Admin Home</h1>
        </header>

        {/* Nested Routes */}
        <Routes>
          {/* Default Dashboard for /admin */}
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="events" element={<AddPackage />} />
          <Route path="gallery" element={<Gallary />} />
          <Route path="orders" element={<Orders />} />
          <Route path="addemp" element={<AddEmp />} />
          <Route path="*" element={<Navigate to="dashboard" />} />
        </Routes>
      </main>
    </div>
  )
}

export default A_Home
