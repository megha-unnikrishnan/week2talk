// features/followers/followerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for following a user
export const followUser = createAsyncThunk(
  'followers/followUser',
  async (followedId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8000/api/follow/${followedId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to follow user');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for unfollowing a user
export const unfollowUser = createAsyncThunk(
  'followers/unfollowUser',
  async (followedId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8000/api/unfollow/${followedId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to unfollow user');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const followerSlice = createSlice({
  name: 'followers',
  initialState: {
    following: [], // Should be an array of user objects with an 'id' property
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(followUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.following.push(action.payload);
      })
      .addCase(followUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(unfollowUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.following = state.following.filter(f => f.id !== action.payload.id);
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default followerSlice.reducer;
