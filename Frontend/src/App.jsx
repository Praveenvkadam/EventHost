import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from './Auth/Signup'
import Login from './Auth/Login'
import Forgetpwd from './Auth/Forgetpwd'
import Home from './Pages/Users/Home'
import ResetPassword from './Auth/ResetPassword'
import A_Home from './Pages/Admin/A_Home'
import GallaryPage from './Pages/Users/GallaryPage'
import AboutUS from './Pages/Users/AboutUS'
import Service from './Pages/Users/Service'
import Booking from './Component/Booking'
import FinalSubmit from './Component/FinalSubmit'
import Payment from './Component/Payment'



const App = () => {
  return (
    <div>
      <div className="pt-16">
        <Routes>
          {/* Public routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<Forgetpwd />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* User Home */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path='/gallaryPage' element={<GallaryPage/>}/>
          <Route path='/about' element={<AboutUS/>}/>
          <Route path='/services' element={<Service/>}/>
          <Route path='/booking' element={<Booking/>}/>
          <Route path='/final-submit' element={<FinalSubmit/>}/>
          <Route path='/payment' element={<Payment/>}/>
          

          {/* Admin Panel */}
          <Route path="/admin/*" element={<A_Home />} />
          {/* A_Home will handle internal routes like:
              /admin/dashboard, /admin/users, /admin/events, /admin/gallary, etc.
          */}
        </Routes>
      </div>
    </div>
  )
}

export default App
