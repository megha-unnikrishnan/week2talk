import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserLogin from './components/UserLogin';
import AdminLogin from './components/AdminLogin';
import Register from './components/Register';
import Confirmation from './components/Confirmation';
import VerifyEmail from './components/VerifyEmail';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import UserDashboard from './components/UserDashboad';
import UserProfile from './components/UserProfile';
import EditProfile from './components/EditProfile';
import AdminDashboard from './components/AdminDashboard';
import UserManagement from './components/UserManagement';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin-user' element={<UserManagement />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/verify-email/:user_id/:token" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:user_id/:token" element={<ResetPassword />} />
       
      </Routes>
    </Router>
  );
};

export default App;
