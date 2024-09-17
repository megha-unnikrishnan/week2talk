
import React, { useState, useRef, useEffect } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import defaultCover from '../assets/cover-photo.png';
import defaultProfile from '../assets/profile-pic.jpeg';
import { Link } from 'react-router-dom';
import Sidebar from './SideBar';
import { fetchUserDetails, updatePictures } from '../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const UserProfile = () => {
  const [coverPhoto, setCoverPhoto] = useState(defaultCover);
  const [profilePic, setProfilePic] = useState(defaultProfile);
  const [coverPreview, setCoverPreview] = useState(defaultCover);
  const [profilePreview, setProfilePreview] = useState(defaultProfile);
  const [cropCover, setCropCover] = useState(false);
  const [cropProfile, setCropProfile] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const coverCropperRef = useRef(null);
  const profileCropperRef = useRef(null);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setCoverPhoto(user.cover_picture || defaultCover);
      setProfilePic(user.profile_picture || defaultProfile);
    }
  }, [user]);

  const username = user ? user.first_name : '';
  const bio = user ? user.bio : '';

  const handleCoverPhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCoverPreview(URL.createObjectURL(file));
      setCropCover(true);
    }
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePreview(URL.createObjectURL(file));
      setCropProfile(true);
    }
  };

  const cropCoverPhoto = async () => {
    if (coverCropperRef.current) {
      const cropper = coverCropperRef.current?.cropper;
      if (cropper) {
        const croppedCanvas = cropper.getCroppedCanvas();
        if (croppedCanvas) {
          const croppedImage = croppedCanvas.toDataURL();
          const blob = await (await fetch(croppedImage)).blob();
          const formData = new FormData();
          formData.append('cover_photo', blob, 'cover_photo.jpg');
          dispatch(updatePictures(formData)).then(() => {
            setCoverPhoto(croppedImage);
            setCoverPreview(croppedImage);
            setCropCover(false);
            setUpdateSuccess(true);
            setTimeout(() => setUpdateSuccess(false), 3000);
            dispatch(fetchUserDetails());
          });
        }
      }
    }
  };

  const cropProfilePic = async () => {
    if (profileCropperRef.current) {
      const cropper = profileCropperRef.current?.cropper;
      if (cropper) {
        const croppedCanvas = cropper.getCroppedCanvas();
        if (croppedCanvas) {
          const croppedImage = croppedCanvas.toDataURL();
          const blob = await (await fetch(croppedImage)).blob();
          const formData = new FormData();
          formData.append('profile_picture', blob, 'profile_picture.jpg');
          dispatch(updatePictures(formData)).then(() => {
            setProfilePic(croppedImage);
            setProfilePreview(croppedImage);
            setCropProfile(false);
            setUpdateSuccess(true);
            setTimeout(() => setUpdateSuccess(false), 3000);
            dispatch(fetchUserDetails());
          });
        }
      }
    }
  };

  const handleNewPostSubmit = () => {
    if (newPost.trim()) {
      setNewPost('');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64 p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          {/* Cover Photo */}
          <div className="relative w-full h-72 mb-6">
            <img
              src={coverPhoto}
              alt="Cover photo"
              className="w-full h-full object-cover rounded-t-lg"
            />
            <label
              htmlFor="cover-photo-upload"
              className="absolute bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full cursor-pointer"
            >
              <i className="bx bx-camera text-xl"></i>
              <input
                id="cover-photo-upload"
                type="file"
                accept="image/*"
                onChange={handleCoverPhotoChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Profile Section */}
          <div className="flex items-center mb-6">
            <div className="relative">
              <img
                src={profilePic}
                alt="Profile picture"
                className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg"
              />
              <label
                htmlFor="profile-pic-upload"
                className="absolute bottom-0 right-0 bg-gray-800 text-white p-2 rounded-full cursor-pointer"
              >
                <i className="bx bx-camera text-xl"></i>
                <input
                  id="profile-pic-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  className="hidden"
                />
              </label>
            </div>
            <div className="ml-4 flex-1">
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">{username}</h1>
              <p className="text-gray-600">{bio}</p>
              <Link to="/edit-profile" className="text-blue-600 hover:underline">
                Edit Profile
              </Link>
            </div>
          </div>

          {/* Add a New Post Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Add a New Post</h2>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
            />
            <button
              onClick={handleNewPostSubmit}
              className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Post
            </button>
          </div>

          {/* User's Posts */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Posts</h2>
            {/* Render user's posts */}
          </div>
        </div>
      </div>

      {/* Cover Photo Cropper */}
      {cropCover && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Cropper
            src={coverPreview}
            style={{ height: 400, width: '100%' }}
            aspectRatio={16 / 9}
            guides={false}
            ref={coverCropperRef}
          />
          <button
            onClick={cropCoverPhoto}
            className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Crop and Save
          </button>
        </div>
      )}

      {/* Profile Pic Cropper */}
      {cropProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Cropper
            src={profilePreview}
            style={{ height: 400, width: '100%' }}
            aspectRatio={1 / 1}
            guides={false}
            ref={profileCropperRef}
          />
          <button
            onClick={cropProfilePic}
            className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Crop and Save
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;

