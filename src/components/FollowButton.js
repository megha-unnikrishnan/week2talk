// components/FollowButton.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { followUser,unfollowUser } from '../features/followerSlice ';

const FollowButton = ({ userId, isFollowing }) => {
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(followUser(userId));
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser(userId));
  };

  return (
    <button
      onClick={isFollowing ? handleUnfollow : handleFollow}
      className={`btn ${isFollowing ? 'btn-unfollow' : 'btn-follow'}`}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowButton;
