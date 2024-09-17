// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/download.png'; // Update with your actual logo path
import { logout } from '../features/authSlice';
import { useDispatch } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate('/'); // Redirect to the login page
  };
  return (
    <aside className="w-64 bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg p-6 fixed h-full">
    <div className="flex items-center mb-8">
      <img src={logo} alt="App logo" className="w-14 h-14 rounded-full shadow-lg" />
      <span className="text-3xl font-bold ml-4">TalkStream</span>
    </div>
    <nav className="space-y-6">
      <Link to="/profile" className="flex items-center p-3 rounded-lg hover:bg-blue-700 transition duration-200">
        <i className="bx bx-user w-8 h-8 mr-3 text-white"></i>
        <span className="text-lg">Profile</span>
      </Link>
      <Link to="/dashboard" className="flex items-center p-3 rounded-lg hover:bg-blue-700 transition duration-200">
        <i className="bx bx-home w-8 h-8 mr-3 text-white"></i>
        <span className="text-lg">Dashboard</span>
      </Link>
      <Link to="/settings" className="flex items-center p-3 rounded-lg hover:bg-blue-700 transition duration-200">
        <i className="bx bx-cog w-8 h-8 mr-3 text-white"></i>
        <span className="text-lg">Settings</span>
      </Link>
      <button onClick={handleLogout} className="flex items-center p-3 rounded-lg hover:bg-blue-700 transition duration-200 mt-auto">
        <i className="bx bx-log-out w-8 h-8 mr-3 text-white"></i>
        <span className="text-lg">Logout</span>
      </button>
    </nav>
  </aside>
  );
};

export default Sidebar;
