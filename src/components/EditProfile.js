
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
// import { updateProfile, fetchUserDetails, updatePassword, logout } from '../features/authSlice';
// import Sidebar from './SideBar';

// const EditProfile = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // Initialize useNavigate for redirection
//   const user = useSelector((state) => state.auth.user);
//   const error = useSelector((state) => state.auth.error);
//   const message = useSelector((state) => state.auth.message);
//   const loading = useSelector((state) => state.auth.loading);

//   const [formData, setFormData] = useState({
//     firstName: '',
//     username: '',
//     email: '',
//     bio: '',
//     dob: '',
//     mobileNumber: '',
//     password: '',
//     newPassword: '',
//     confirmPassword: '',
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [popupMessage, setPopupMessage] = useState('');
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupType, setPopupType] = useState('success'); // 'success' or 'error'
//   const [formErrors, setFormErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     dispatch(fetchUserDetails());
//   }, [dispatch]);

//   useEffect(() => {
//     if (user) {
//       setFormData({
//         firstName: user.first_name || '',
//         username: user.username || '',
//         email: user.email || '',
//         bio: user.bio || '',
//         dob: user.dob || '',
//         mobileNumber: user.mobile || '',
//         password: '',
//         newPassword: '',
//         confirmPassword: '',
//       });
//     }
//   }, [user]);

//   useEffect(() => {
//     if (error) {
//       if (error.non_field_errors) {
//         setFormErrors({ general: error.non_field_errors.join(', ') });
//       } else {
//         setFormErrors({ general: 'An unexpected error occurred.' });
//       }
//     }
//   }, [error]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmitProfile = async (e) => {
//     e.preventDefault();
//     const updatedProfile = {
//       first_name: formData.firstName,
//       username: formData.username,
//       email: formData.email,
//       bio: formData.bio,
//       dob: formData.dob,
//       mobile: formData.mobileNumber,
//     };

//     const isProfileUpdated = Object.keys(updatedProfile).some(
//       (key) => updatedProfile[key] !== (user[key] || '')
//     );

//     if (!isProfileUpdated) {
//       setPopupMessage('No changes made to the profile.');
//       setPopupType('error');
//       setShowPopup(true);
//       return;
//     }

//     try {
//       setIsSubmitting(true);
//       await dispatch(updateProfile(updatedProfile)).unwrap();
//       setPopupMessage('Profile updated successfully!');
//       setPopupType('success');
//     } catch {
//       setPopupMessage('Failed to update profile.');
//       setPopupType('error');
//     } finally {
//       setIsSubmitting(false);
//       setShowPopup(true);
//     }
//   };

//   const handleSubmitPassword = async (e) => {
//     e.preventDefault();

//     if (formData.newPassword !== formData.confirmPassword) {
//       setPopupMessage('New passwords do not match.');
//       setPopupType('error');
//       setShowPopup(true);
//       return;
//     }

//     if (!formData.password || !formData.newPassword) {
//       setPopupMessage('Please fill in all password fields.');
//       setPopupType('error');
//       setShowPopup(true);
//       return;
//     }

//     if (formData.newPassword.length < 8) {
//       setPopupMessage('New password must be at least 8 characters long.');
//       setPopupType('error');
//       setShowPopup(true);
//       return;
//     }

//     try {
//       setIsSubmitting(true);
//       await dispatch(
//         updatePassword({
//           oldPassword: formData.password,
//           newPassword: formData.newPassword,
//         })
//       ).unwrap();
//       setPopupMessage('Password updated successfully!');
//       setPopupType('success');

//       // Log out the user after a successful password update
//       dispatch(logout()); // Assume there's a logout action defined

//       // Redirect to the login page after a delay
//       setTimeout(() => {
//         navigate('/'); // Redirect to the login page
//       }, 3000);
//     } catch (error) {
//       let errorMessage = 'Old password is incorrect.';
//       if (error.response?.data?.non_field_errors) {
//         errorMessage = error.response.data.non_field_errors.join(', ');
//       } else if (error.response?.status === 400) {
//         errorMessage = 'Old password is incorrect.';
//       } else if (error.response?.data?.detail) {
//         errorMessage = error.response.data.detail;
//       }
//       setPopupMessage(errorMessage);
//       setPopupType('error');
//     } finally {
//       setIsSubmitting(false);
//       setShowPopup(true);
//     }
//   };

//   useEffect(() => {
//     if (showPopup) {
//       const timer = setTimeout(() => setShowPopup(false), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [showPopup]);

//   if (!user) {
//     return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   }

//   return (
//     <div className="flex h-screen bg-white-100">
//       <Sidebar />
//       <main className="flex-1 ml-64 p-8">
//         <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
//             {/* Back Button */}
//             <button
//               onClick={() => navigate('/profile')} // Navigate to profile page
//               className="py-2 px-4 bg-gray-600 text-white rounded-md shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
//             >
//               Back
//             </button>
//           </div>

//           {/* Popup for success and error messages */}
//           {showPopup && (
//             <div
//               className={`fixed top-4 right-4 py-2 px-4 rounded-lg shadow-lg transition duration-300 ${
//                 popupType === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
//               }`}
//             >
//               {popupMessage}
//             </div>
//           )}

//           {/* Display Form Errors */}
//           {formErrors.general && (
//             <div className="mb-4 text-red-600">{formErrors.general}</div>
//           )}

//           {/* Profile Form */}
//           <form onSubmit={handleSubmitProfile} className="space-y-6 mb-8">
//             <div className="space-y-4">
//               <div className="flex flex-col">
//                 <label htmlFor="firstName" className="text-base font-medium text-gray-700 mb-1">First Name</label>
//                 <input
//                   type="text"
//                   id="firstName"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="username" className="text-base font-medium text-gray-700 mb-1">Username</label>
//                 <input
//                   type="text"
//                   id="username"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleChange}
//                   className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="email" className="text-base font-medium text-gray-700 mb-1">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="p-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-500 cursor-not-allowed"
//                   readOnly
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="bio" className="text-base font-medium text-gray-700 mb-1">Bio</label>
//                 <textarea
//                   id="bio"
//                   name="bio"
//                   value={formData.bio}
//                   onChange={handleChange}
//                   className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="dob" className="text-base font-medium text-gray-700 mb-1">Date of Birth</label>
//                 <input
//                   type="date"
//                   id="dob"
//                   name="dob"
//                   value={formData.dob}
//                   onChange={handleChange}
//                   className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="mobileNumber" className="text-base font-medium text-gray-700 mb-1">Mobile Number</label>
//                 <input
//                   type="text"
//                   id="mobileNumber"
//                   name="mobileNumber"
//                   value={formData.mobileNumber}
//                   onChange={handleChange}
//                   className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>
//             <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-sm shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500" disabled={isSubmitting}>
//               {isSubmitting ? 'Updating...' : 'Update Profile'}
//             </button>
//           </form>

//           {/* Password Form */}
//           <form onSubmit={handleSubmitPassword} className="space-y-6">
//             <h2 className="text-2xl font-bold mb-4 text-gray-900">Change Password</h2>
//             <div className="space-y-4">
//               <div className="flex flex-col">
//                 <label htmlFor="password" className="text-base font-medium text-gray-700 mb-1">Current Password</label>
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   id="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="newPassword" className="text-base font-medium text-gray-700 mb-1">New Password</label>
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   id="newPassword"
//                   name="newPassword"
//                   value={formData.newPassword}
//                   onChange={handleChange}
//                   className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="confirmPassword" className="text-base font-medium text-gray-700 mb-1">Confirm New Password</label>
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="showPassword"
//                   checked={showPassword}
//                   onChange={() => setShowPassword((prev) => !prev)}
//                   className="mr-2"
//                 />
//                 <label htmlFor="showPassword" className="text-base font-medium text-gray-700">Show Password</label>
//               </div>
//             </div>
//             <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500" disabled={isSubmitting}>
//               {isSubmitting ? 'Changing Password...' : 'Change Password'}
//             </button>
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default EditProfile;
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { updateProfile, fetchUserDetails, updatePassword, logout } from '../features/authSlice';
import Sidebar from './SideBar';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate for redirection
  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.auth.error);
  const message = useSelector((state) => state.auth.message);
  const loading = useSelector((state) => state.auth.loading);

  const [formData, setFormData] = useState({
    firstName: '',
    username: '',
    email: '',
    bio: '',
    dob: '',
    mobileNumber: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState('success'); // 'success' or 'error'
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.first_name || '',
        username: user.username || '',
        email: user.email || '',
        bio: user.bio || '',
        dob: user.dob || '',
        mobileNumber: user.mobile || '',
        password: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      if (error.non_field_errors) {
        setFormErrors({ general: error.non_field_errors.join(', ') });
      } else {
        setFormErrors({ general: 'An unexpected error occurred.' });
      }
    }
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    const updatedProfile = {
      first_name: formData.firstName,
      username: formData.username,
      email: formData.email,
      bio: formData.bio,
      dob: formData.dob,
      mobile: formData.mobileNumber,
    };

    const isProfileUpdated = Object.keys(updatedProfile).some(
      (key) => updatedProfile[key] !== (user[key] || '')
    );

    if (!isProfileUpdated) {
      setPopupMessage('No changes made to the profile.');
      setPopupType('error');
      setShowPopup(true);
      return;
    }

    try {
      setIsSubmitting(true);
      await dispatch(updateProfile(updatedProfile)).unwrap();
      setPopupMessage('Profile updated successfully!');
      setPopupType('success');
    } catch {
      setPopupMessage('Failed to update profile.');
      setPopupType('error');
    } finally {
      setIsSubmitting(false);
      setShowPopup(true);
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setPopupMessage('New passwords do not match.');
      setPopupType('error');
      setShowPopup(true);
      return;
    }

    if (!formData.password || !formData.newPassword) {
      setPopupMessage('Please fill in all password fields.');
      setPopupType('error');
      setShowPopup(true);
      return;
    }

    if (formData.newPassword.length < 8) {
      setPopupMessage('New password must be at least 8 characters long.');
      setPopupType('error');
      setShowPopup(true);
      return;
    }

    try {
      setIsSubmitting(true);
      await dispatch(
        updatePassword({
          oldPassword: formData.password,
          newPassword: formData.newPassword,
        })
      ).unwrap();
      setPopupMessage('Password updated successfully!');
      setPopupType('success');

      // Log out the user after a successful password update
      dispatch(logout()); // Assume there's a logout action defined

      // Redirect to the login page after a delay
      setTimeout(() => {
        navigate('/'); // Redirect to the login page
      }, 3000);
    } catch (error) {
      let errorMessage = 'Old password is incorrect.';
      if (error.response?.data?.non_field_errors) {
        errorMessage = error.response.data.non_field_errors.join(', ');
      } else if (error.response?.status === 400) {
        errorMessage = 'Old password is incorrect.';
      } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      }
      setPopupMessage(errorMessage);
      setPopupType('error');
    } finally {
      setIsSubmitting(false);
      setShowPopup(true);
    }
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-white-100">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
            {/* Back Button */}
            <button
              onClick={() => navigate('/profile')} // Navigate to profile page
              className="py-1 px-2 bg-gray-600 text-white rounded-sm shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 ease-in-out text-xs inline-block"
            >
              Back
            </button>
          </div>

          {/* Popup for success and error messages */}
          {showPopup && (
            <div
              className={`fixed top-4 right-4 py-1 px-2 rounded-sm shadow-lg transition duration-300 ${
                popupType === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
              }`}
            >
              {popupMessage}
            </div>
          )}

          {/* Display Form Errors */}
          {formErrors.general && (
            <div className="mb-4 text-red-600">{formErrors.general}</div>
          )}

          {/* Profile Form */}
          <form onSubmit={handleSubmitProfile} className="space-y-6 mb-8">
            <div className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="firstName" className="text-base font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-sm shadow-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="username" className="text-base font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-sm shadow-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-base font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-sm shadow-sm bg-gray-200 text-gray-500 cursor-not-allowed"
                  readOnly
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="bio" className="text-base font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-sm shadow-sm focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="dob" className="text-base font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-sm shadow-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="mobileNumber" className="text-base font-medium text-gray-700 mb-1">Mobile Number</label>
                <input
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-sm shadow-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Update Profile Button */}
            <button
              type="submit"
              className="py-1 px-3 bg-blue-600 text-white rounded-sm shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out text-xs inline-block"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update Profile'}
            </button>
          </form>

          {/* Change Password Form */}
          <h2 className="text-3xl font-bold text-gray-900">Change password</h2><br/>
          <form onSubmit={handleSubmitPassword} className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="password" className="text-base font-medium text-gray-700 mb-1">Current Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-sm shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm text-blue-600 hover:underline mt-1"
                >
                  {showPassword ? 'Hide' : 'Show'} Password
                </button>
              </div>
              <div className="flex flex-col">
                <label htmlFor="newPassword" className="text-base font-medium text-gray-700 mb-1">New Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-sm shadow-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="confirmPassword" className="text-base font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-sm shadow-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Change Password Button */}
            <button
              type="submit"
              className="py-1 px-3 bg-blue-600 text-white rounded-sm shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out text-xs inline-block"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Changing Password...' : 'Change Password'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditProfile;
