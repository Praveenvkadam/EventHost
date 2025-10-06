import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, CalendarClock, IndianRupee, TrendingUp } from 'lucide-react'; // Only icons

const AdminSidebar = () => {
  const location = useLocation();

  // Function to check active link
  const isActive = (path) => location.pathname === path ? 'bg-sky-600 text-white' : 'text-gray-200 hover:bg-sky-500 hover:text-white';

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-sky-700 to-sky-900 text-white shadow-lg">
      <div className="flex items-center justify-center h-16 border-b border-sky-600 font-bold text-xl">
        Admin Panel
      </div>

      <nav className="mt-4">
        <ul className="flex flex-col">
          <li>
            <Link to="/admin/dashboard" className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-colors duration-300 ${isActive('/admin/dashboard')}`}>
              <TrendingUp className="w-5 h-5" />
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/admin/users" className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-colors duration-300 ${isActive('/admin/users')}`}>
              <Users className="w-5 h-5" />
              Users
            </Link>
          </li>

          <li>
            <Link to="/admin/events" className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-colors duration-300 ${isActive('/admin/events')}`}>
              <CalendarClock className="w-5 h-5" />
              Add Packages
            </Link>
          </li>

          <li>
            <Link to="/admin/addemp" className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-colors duration-300 ${isActive('/admin/addemp')}`}>
              <Users className="w-5 h-5" />
              Add Employees
            </Link>
          </li>

          <li>
            <Link to="/admin/gallery" className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-colors duration-300 ${isActive('/admin/gallery')}`}>
              <CalendarClock className="w-5 h-5" />
              Gallery
            </Link>
          </li>

          <li>
            <Link to="/admin/orders" className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-colors duration-300 ${isActive('/admin/orders')}`}>
              <IndianRupee className="w-5 h-5" />
              Orders
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
