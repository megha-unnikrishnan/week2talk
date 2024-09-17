
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';
import Sidebar from './SideBar';
import logo from '../assets/download.png'; // Replace with your logo path
import postImage1 from '../assets/sample-post-1.jpeg';
import postImage2 from '../assets/sample-post-2.jpeg';
import 'boxicons/css/boxicons.min.css'; // Ensure you have boxicons installed
import { fetchUserDetails } from '../features/authSlice';

const UserDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const username = user ? user.username : null;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 bg-white flex flex-col">
        {/* Navbar */}
        <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg p-4 flex items-center justify-between rounded-b-lg sticky top-0 z-10">
          <div className="relative w-full max-w-lg mx-auto">
            <input
              type="text"
              className="w-full max-w-sm py-2 px-4 border-none rounded-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Search..."
            />
          </div>
          <div>
            <h1 className="text-white text-xl font-bold">Welcome, {username}</h1>
            {/* <p className="text-white"></p> */}
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-white hover:bg-white hover:text-purple-600 rounded-full transition duration-200 relative">
              <i className="bx bx-bell text-2xl"></i>
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center">3</span>
            </button>
            <button className="p-2 text-white hover:bg-white hover:text-purple-600 rounded-full transition duration-200 relative">
              <i className="bx bx-message text-2xl"></i>
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center">5</span>
            </button>
            <button className="p-2 text-white hover:bg-white hover:text-purple-600 rounded-full transition duration-200">
              <i className="bx bx-user text-2xl"></i>
            </button>
            <button onClick={handleLogout} className="p-2 text-white hover:bg-white hover:text-purple-600 rounded-full transition duration-200">
              <i className="bx bx-log-out text-2xl"></i>
            </button>
          </div>
        </nav>

        {/* Content Area */}
        <main className="flex-1 p-6">
          {/* Post Creation Area */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6 max-w-2xl mx-auto border-t-4 border-purple-500">
            <div className="flex items-center mb-4">
              <img src="assets/images/users/user-1.png" alt="User avatar" className="w-12 h-12 rounded-full mr-4" />
              <input
                type="text"
                className="w-full py-2 px-4 border-none rounded-full bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="What's on your mind?"
              />
            </div>

            {/* Upload Section */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-4">
                <button className="flex items-center text-purple-500 hover:text-purple-600 transition">
                  <i className="bx bx-image-add text-2xl mr-2"></i>
                  <span>Add Photo/Video</span>
                </button>
                <button className="flex items-center text-green-500 hover:text-green-600 transition">
                  <i className="bx bx-smile text-2xl mr-2"></i>
                  <span>Feeling/Activity</span>
                </button>
              </div>
              <button className="py-2 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full hover:bg-purple-700 transition duration-200">
                Post
              </button>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Sample Post 1 */}
            <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-purple-500">
              <div className="flex items-center mb-4">
                <img src="assets/images/users/user-2.png" alt="User avatar" className="w-12 h-12 rounded-full mr-4" />
                <div className="flex-1">
                  <h2 className="font-semibold text-gray-800">John Doe</h2>
                  <p className="text-gray-600 text-sm">2 hours ago</p>
                </div>
              </div>
              <p className="text-gray-800 mb-4">
                Just sharing a beautiful moment from my recent trip! Tailwind CSS makes building UI so much easier!
              </p>
              <img src={postImage1} alt="Post content" className="w-full h-64 object-cover rounded-lg mb-4" />
              <div className="flex space-x-4">
                <button className="py-2 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full hover:bg-purple-700 transition duration-200">
                  Like
                </button>
                <button className="py-2 px-4 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition duration-200">
                  Comment
                </button>
                <button className="py-2 px-4 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition duration-200">
                  Share
                </button>
              </div>
            </div>

            {/* Sample Post 2 */}
            <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-purple-500">
              <div className="flex items-center mb-4">
                <img src="assets/images/users/user-3.png" alt="User avatar" className="w-12 h-12 rounded-full mr-4" />
                <div className="flex-1">
                  <h2 className="font-semibold text-gray-800">Jane Smith</h2>
                  <p className="text-gray-600 text-sm">4 hours ago</p>
                </div>
              </div>
              <p className="text-gray-800 mb-4">
                Had an amazing lunch today at a new restaurant! Highly recommend it to everyone.
              </p>
              <img src={postImage2} alt="Post content" className="w-full h-64 object-cover rounded-lg mb-4" />
              <div className="flex space-x-4">
                <button className="py-2 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full hover:bg-purple-700 transition duration-200">
                  Like
                </button>
                <button className="py-2 px-4 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition duration-200">
                  Comment
                </button>
                <button className="py-2 px-4 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition duration-200">
                  Share
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
