import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import Dashboard from "./Dashboard";
import Users from "./Users";
import AddPackage from "./AddPackage";
import Gallary from "./Gallary";
import Orders from "./Orders";
import AddEmp from "./AddEmp";
import Navbar from "../../Component/Navbar";

const A_Home = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Navbar is fixed on top */}
      <Navbar />

      {/* Sidebar is fixed on the left */}
      <AdminSidebar />

      {/* Main content */}
      <main className="flex-1 ml-64 mt-16 p-6">
        {/* ml-64 -> margin for sidebar width, mt-16 -> margin for navbar height */}
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" />} />
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
  );
};

export default A_Home;
