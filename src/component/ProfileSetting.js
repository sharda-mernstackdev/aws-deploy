import React, { useState, useEffect } from "react";

function ProfileSetting() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  async function fetchUserDetails() {
    setIsLoading(true);
    try {
      const response = await fetch("http://3.110.84.64:3000/api/users/user-detail", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const data = await response.json();
      if (data.success) {
        setUser(data.data);
        setEditedUser(data.data);
        setProfilePicture(data.data.profile || null);
        setPreviewImage(data.data.profile || null);
        setError(null);
      } else {
        setError(data.message || "An error occurred");
      }
    } catch (err) {
      setError("An error occurred while fetching user details");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUserDetails();
  }, []);

  function handleEdit() {
    setIsEditing(true);
  }

  function handleCancel() {
    setIsEditing(false);
    setEditedUser(user);
    setProfilePicture(user.profile || null);
    setPreviewImage(user.profile || null);
  }

  function handleChange(e) {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  }

  function handleProfilePictureChange(e) {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleSave() {
    setIsLoading(true);
    setSuccessMessage(null);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("name", editedUser.name);
      formData.append("email", editedUser.email);

      if (profilePicture && profilePicture instanceof File) {
        formData.append("profilePicture", profilePicture);
      }

      const response = await fetch(`http://3.110.84.64:3000/api/users/update/${user._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        setProfilePicture(data.user.profile || null);
        setPreviewImage(data.user.profile || null);
        setIsEditing(false);
        setSuccessMessage("Profile updated successfully");
      } else {
        setError(data.message || "An error occurred while updating");
      }
    } catch (err) {
      setError("An error occurred while updating user details");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105">
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
            <p className="font-bold">Success</p>
            <p>{successMessage}</p>
          </div>
        )}
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16">
            <label className="cursor-pointer group">
              <img
                src={previewImage || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover transition-all duration-300 ease-in-out group-hover:shadow-xl"
              />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePictureChange}
                aria-label="Change profile picture"
              />
              <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
            </label>
          </div>
          {!isEditing && (
            <button
              onClick={handleEdit}
              className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-label="Edit profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
          )}
        </div>
        <div className="p-6 text-center mt-16">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={editedUser.name}
                onChange={handleChange}
                className="text-2xl font-semibold mb-2 text-center border-b-2 border-blue-500 focus:outline-none focus:border-blue-700 transition-all duration-300 w-full"
                placeholder="Your Name"
              />
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleChange}
                className="text-gray-600 mb-4 text-center border-b-2 border-blue-500 focus:outline-none focus:border-blue-700 transition-all duration-300 w-full"
                placeholder="your.email@example.com"
              />
              <div className="flex justify-center space-x-4 mt-6">
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-2">{user.name}</h2>
              <p className="text-gray-600 mb-4">{user.email}</p>
              <button
                onClick={handleEdit}
                className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileSetting;

