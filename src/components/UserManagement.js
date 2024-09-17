// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserDetailsAdmin, setFilter, blockUser, unblockUser, updateUserList } from '../features/userSlice';
// import { Link, useNavigate } from 'react-router-dom';
// import { logout } from '../features/authSlice';
// import { selectFilteredUsers } from '../features/selectors';
// import { searchUsers } from '../features/authSlice';
// import { updateSearchResults } from '../features/authSlice';

// const UserManagement = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState('');
//   const { loading, error, filter, searchResults } = useSelector((state) => state.user);
//   const filteredUsers = useSelector((state) => selectFilteredUsers(state));

  

//   useEffect(() => {
//     dispatch(fetchUserDetailsAdmin());
//   }, [dispatch]);

  


//   useEffect(() => {
//     if (searchQuery.trim() === '') {
//       dispatch(updateSearchResults(filteredUsers));
//     } else {
//       dispatch(searchUsers(searchQuery)).then((response) => {
//         dispatch(updateSearchResults(response.data));
//       });
//     }
//   }, [searchQuery, dispatch, filteredUsers, searchResults]);


//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/adminlogin');
//   };

//   const handleFilterChange = (e) => {
//     dispatch(setFilter(e.target.value));
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value.trim()); // Trim leading/trailing spaces
//   };
  

//   useEffect(() => {
//     dispatch(fetchUserDetailsAdmin())
//       .catch((error) => {
//         if (error.response && error.response.status === 403) {
//           alert('Your account is blocked or suspended');
//           window.location.href = '/login'; // Redirect to login page
//         }
//       });
//   }, [dispatch]);

//   const handleBlockUser = (userId) => {
//     dispatch(blockUser(userId))
//       .then(() => {
//         const updatedUsers = (filteredUsers || []).map((user) =>
//           user.id === userId ? { ...user, is_suspended: true } : user
//         );
//         dispatch(updateUserList(updatedUsers)); // Update user list after blocking
//       });
//   };

//   const handleUnblockUser = (userId) => {
//     dispatch(unblockUser(userId))
//       .then(() => {
//         const updatedUsers = (filteredUsers || []).map((user) =>
//           user.id === userId ? { ...user, is_suspended: false } : user
//         );
//         dispatch(updateUserList(updatedUsers)); // Update user list after unblocking
//       });
//   };

//   const errorMessage = error && typeof error === 'object' ? JSON.stringify(error) : error;

  
//   const displayedUsers = searchQuery.trim() === '' ? filteredUsers || [] : searchResults ?? [];

//   // useEffect(() => {
//   //   if (searchQuery.trim() === '') {
//   //     dispatch(updateSearchResults(filteredUsers));
//   //   } else {
//   //     dispatch(searchUsers(searchQuery)).then((response) => {
//   //       dispatch(updateSearchResults(response.data));
//   //     });
//   //   }
//   // }, [searchQuery, dispatch, filteredUsers]);
    
//   useEffect(() => {
//     dispatch(searchUsers(searchQuery)).then((response) => {
//       dispatch(updateSearchResults(response.data));
//     });
//   }, [searchQuery, dispatch]);

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-900 text-white shadow-lg fixed inset-y-0 left-0 flex flex-col">
//         <div className="flex items-center justify-center h-20 bg-gray-800 text-xl font-bold border-b border-gray-700">
//           Admin Dashboard
//         </div>
//         <nav className="flex-1 p-4">
//           <ul className="space-y-2">
//             <li>
//               <Link to="/admin-dashboard" className="block p-3 rounded-lg hover:bg-gray-700 transition-colors">Dashboard</Link>
//             </li>
//             <li>
//               <Link to="/admin-user" className="block p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">Users</Link>
//             </li>
//             <li>
//               <Link to="/admin-settings" className="block p-3 rounded-lg hover:bg-gray-700 transition-colors">Settings</Link>
//             </li>
//             <li>
//               <Link to="/admin-analytics" className="block p-3 rounded-lg hover:bg-gray-700 transition-colors">Analytics</Link>
//             </li>
//             <li>
//               <button onClick={handleLogout} className="w-full text-left p-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors mt-auto">Logout</button>
//             </li>
//           </ul>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 ml-64 p-8 bg-gray-100 overflow-y-auto">
//         <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-300">
//           <div className="flex items-center justify-between mb-4">
//             <h1 className="text-4xl font-bold text-gray-800">User Management</h1>
//             {error && <p className="text-red-500">Error: {error}</p>}
//             <div className="relative w-80">
//               <input
//                 type="text"
//                 placeholder="Search users..."
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 width="20"
//                 height="20"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a7 7 0 11-7 7 7 7 0 017-7zm0 14a7 7 0 01-7-7 7 7 0 017-7 7 7 0 017 7 7 7 0 01-7 7z" />
//               </svg>
//             </div>
//           </div>
//           <div className="mb-6 flex items-center space-x-4">
//             <select
//               value={filter}
//               onChange={handleFilterChange}
//               className="block w-48 p-2 border border-gray-300 rounded-md bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="All Users">All Users</option>
//               <option value="Active Users">Active Users</option>
//               <option value="Blocked Users">Blocked Users</option>
//             </select>
//             <button className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
//               Add New User
//             </button>
//           </div>
//           <div className="overflow-x-auto">
//             {loading ? (
//               <p className="text-gray-500">Loading...</p>
//             ) : error ? (
//               <p className="text-red-500">Error: {errorMessage}</p>
//             ) : (
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {displayedUsers.length > 0 ? (
//                     displayedUsers.map((user) => (
//                       <tr key={user.id}>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.first_name} {user.last_name}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {user.is_suspended ? 'Blocked' : 'Active'}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                           {user.is_suspended ? (
//                             <button onClick={() => handleUnblockUser(user.id)} className="text-blue-600 hover:text-blue-900">Unblock</button>
//                           ) : (
//                             <button onClick={() => handleBlockUser(user.id)} className="text-red-600 hover:text-red-900">Block</button>
//                           )}
//                           <Link to={`/admin-user/${user.id}`} className="ml-4 text-indigo-600 hover:text-indigo-900">Details</Link>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No users found</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default UserManagement;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetailsAdmin, setFilter, blockUser, unblockUser, updateUserList } from '../features/userSlice';
import { searchUsers,updateSearchResults } from '../features/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../features/authSlice';
import { selectFilteredUsers } from '../features/selectors';

const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { loading, error, filter, searchResults } = useSelector((state) => state.user);
  const filteredUsers = useSelector((state) => selectFilteredUsers(state));

  useEffect(() => {
    dispatch(fetchUserDetailsAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      dispatch(updateSearchResults(filteredUsers));
    } else {
      dispatch(searchUsers(searchQuery)).then((response) => {
        dispatch(updateSearchResults(response.data));
      });
    }
  }, [searchQuery, dispatch, filteredUsers]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/adminlogin');
    }
  }, [navigate]);

  


  const handleLogout = () => {
    dispatch(logout());
    navigate('/adminlogin');
  };

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.trim()); // Trim leading/trailing spaces
  };

  useEffect(() => {
    dispatch(fetchUserDetailsAdmin())
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          alert('Your account is blocked or suspended');
          window.location.href = '/login'; // Redirect to login page
        }
      });
  }, [dispatch]);

  const handleBlockUser = (userId) => {
    dispatch(blockUser(userId))
      .then(() => {
        const updatedUsers = (filteredUsers || []).map((user) =>
          user.id === userId ? { ...user, is_suspended: true } : user
        );
        dispatch(updateUserList(updatedUsers)); // Update user list after blocking
      });
  };

  const handleUnblockUser = (userId) => {
    dispatch(unblockUser(userId))
      .then(() => {
        const updatedUsers = (filteredUsers || []).map((user) =>
          user.id === userId ? { ...user, is_suspended: false } : user
        );
        dispatch(updateUserList(updatedUsers)); // Update user list after unblocking
      });
  };

  const errorMessage = error && typeof error === 'object' ? JSON.stringify(error) : error;

  const displayedUsers = searchQuery.trim() === '' ? filteredUsers || [] : filteredUsers.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  ) ?? [];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white shadow-lg fixed inset-y-0 left-0 flex flex-col">
        <div className="flex items-center justify-center h-20 bg-gray-800 text-xl font-bold border-b border-gray-700">
          Admin Dashboard
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link to="/admin-dashboard" className="block p-3 rounded-lg hover:bg-gray-700 transition-colors">Dashboard</Link>
            </li>
            <li>
              <Link to="/admin-user" className="block p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">Users</Link>
            </li>
            <li>
              <Link to="/admin-settings" className="block p-3 rounded-lg hover:bg-gray-700 transition-colors">Settings</Link>
            </li>
            <li>
              <Link to="/admin-analytics" className="block p-3 rounded-lg hover:bg-gray-700 transition-colors">Analytics</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="w-full text-left p-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors mt-auto">Logout</button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 bg-gray-100 overflow-y-auto">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-300">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-gray-800">User Management</h1>
            {error && <p className="text-red-500">Error: {error}</p>}
            <div className="relative w-80">
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width="20"
                height="20"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a7 7 0 11-7 7 7 7 0 017-7zm0 14a7 7 0 01-7-7 7 7 0 017-7 7 7 0 017 7 7 7 0 01-7 7z" />
              </svg>
            </div>
          </div>
          <div className="mb-6 flex items-center space-x-4">
            <select
              value={filter}
              onChange={handleFilterChange}
              className="block w-48 p-2 border border-gray-300 rounded-md bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="All Users">All Users</option>
              <option value="Active Users">Active Users</option>
              <option value="Blocked Users">Blocked Users</option>
            </select>
            {/* <button className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Add New User
            </button> */}
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-red-500">Error: {errorMessage}</p>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {displayedUsers.length > 0 ? (
                    displayedUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.first_name} {user.last_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.is_suspended ? 'Blocked' : 'Active'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {user.is_suspended ? (
                            <button onClick={() => handleUnblockUser(user.id)} className="text-blue-600 hover:text-blue-900">Unblock</button>
                          ) : (
                            <button onClick={() => handleBlockUser(user.id)} className="text-red-600 hover:text-red-900">Block</button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No users found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserManagement;
