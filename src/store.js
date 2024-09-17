import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import userReducer from './features/userSlice';
import followerSlice from './features/followerSlice ';


const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    followers: followerSlice,
  },
});

export default store;
