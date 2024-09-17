
// import React from 'react';
// import { GoogleLogin } from '@react-oauth/google';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { loginUser } from '../features/authSlice'; // Adjust the path as necessary

// const GoogleLoginButton = () => {
//   const dispatch = useDispatch();

//   const handleSuccess = async (response) => {
//     try {
//       const idToken = response.credential; // This is the ID token from Google

//       // Send the ID token to your Django backend for verification
//       const { data } = await axios.post('http://localhost:8000/api/auth/google/', { idToken });

//       // Handle successful login and update Redux store with user data
//       dispatch(loginUser({ userData: data, isAdmin: false }));

//       // You can also store the token in localStorage or cookie if needed
//       localStorage.setItem('token', data.token);
//     } catch (error) {
//       console.error('Google login failed', error);
//     }
//   };

//   const handleFailure = (error) => {
//     console.error('Google login failed', error);
//   };

//   return (
//     <GoogleLogin
//       onSuccess={handleSuccess}
//       onError={handleFailure}
//       clientId="221641798990-tjggsbal6ffkec13snt89l2hgmad4eo5.apps.googleusercontent.com"
//     />
//   );
// };

// export default GoogleLoginButton;


// GoogleLoginButton.js
import React, { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { googleLogin } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { fetchUserDetails } from '../features/authSlice';
const GoogleLoginButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status } = useSelector((state) => state.auth);

   // In GoogleLoginButton component
   const responseGoogle = async (response) => {
    if (response.credential) {
      const tokenId = response.credential;
      console.log('Google token:', tokenId);
  
      try {
        const loginResponse = await dispatch(googleLogin({ idToken: tokenId })).unwrap();
        console.log('Login response:', loginResponse);
  
        // Store token in localStorage
        localStorage.setItem('token', loginResponse.token);
  
        // Fetch user details after successful login
        await dispatch(fetchUserDetails()).unwrap();
      } catch (error) {
        console.error('Error during Google login:', error);
        console.error('Error details:', error.message, error.stack);
      }
    } else {
      console.error('Failed to receive token');
    }
  };


    useEffect(() => {
        if (status === 'succeeded') {
            navigate('/dashboard');
        }
    }, [status, navigate]);

    return (
        <GoogleLogin
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            logo="Google"
            clientId="221641798990-tjggsbal6ffkec13snt89l2hgmad4eo5.apps.googleusercontent.com" // Replace with your actual client ID
        />
    );
};

export default GoogleLoginButton;
