import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from './Auth/Signup'
import Login from './Auth/Login'
import Forgetpwd from './Auth/Forgetpwd'
import { Home } from './Pages/Users/Home'
import A_home from './Pages/Admin/A_home'
import ResetPassword from './Auth/ResetPassword'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />   
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<A_home />} />
      <Route path="/forgot-password" element={<Forgetpwd />} />
      <Route path="/home" element={<Home />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  )
}

export default App
    
    

 