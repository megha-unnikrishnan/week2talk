
import React ,{useEffect}from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../features/authSlice';
import { fetchUserDetailsAdmin } from '../features/userSlice';
import { useSelector } from 'react-redux';
const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);


  const handleLogout = () => {
    dispatch(logout());
    navigate('/adminlogin');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/adminlogin');
    }
  }, [navigate]);

  useEffect(() => {
    dispatch(fetchUserDetailsAdmin())
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          alert('Your account is blocked or suspended');
          window.location.href = '/login'; // Redirect to login page
        }
      });
  }, [dispatch]);

  useEffect(() => {
    console.log('User details:', user); // Debug output to check the user object
  }, [user]);
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white shadow-md fixed inset-y-0 left-0 flex flex-col">
        <div className="flex items-center justify-center h-20 bg-gray-900 text-xl font-semibold border-b border-gray-700">
          Admin Dashboard
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin-dashboard"
                className="block p-3 rounded-md hover:bg-gray-700 transition-colors"
              >
                <span className="font-medium">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin-user"
                className="block p-3 rounded-md hover:bg-gray-700 transition-colors"
              >
                <span className="font-medium">Users</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin-settings"
                className="block p-3 rounded-md hover:bg-gray-700 transition-colors"
              >
                <span className="font-medium">Settings</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin-analytics"
                className="block p-3 rounded-md hover:bg-gray-700 transition-colors"
              >
                <span className="font-medium">Analytics</span>
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left p-3 rounded-lg hover:bg-blue-700 transition-colors mt-auto"
              >
                <span className="text-lg">Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 bg-gray-100 overflow-y-auto">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2>Welcome, {user?.email || 'Admin'}!</h2>
          <p className="text-gray-600">Here is a quick overview of your dashboard and recent activity.</p>
        </div>

        {/* Analytics Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Analytics Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Total Users</h3>
              <p className="text-3xl font-bold text-blue-600">1,234</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Active Sessions</h3>
              <p className="text-3xl font-bold text-green-600">567</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Revenue</h3>
              <p className="text-3xl font-bold text-yellow-600">$12,345</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
