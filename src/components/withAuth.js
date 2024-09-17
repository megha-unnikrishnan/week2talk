import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
      if (user.is_suspended) {
        alert('Your account is blocked or suspended');
        localStorage.removeItem('token');
       navigate('/') // Redirect to login page
      }
    }, [user.is_suspended, navigate]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
