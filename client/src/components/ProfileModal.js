import React, { useState } from 'react';
import './ProfileModal.css';

const ProfileModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [profileIcon, setProfileIcon] = useState('path/to/default/icon.png'); // Default profile icon

  // State for password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');

  // Handle profile icon change
  const handleIconChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileIcon(e.target.result); // Update profile icon with new image
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if new passwords match
    if (newPassword !== reEnterPassword) {
      alert("New passwords do not match!");
      return;
    }

    // Logic to save the updated profile information and password
    console.log('Updated Name:', name);
    console.log('Updated Email:', email);
    console.log('Updated Profile Icon:', profileIcon);
    console.log('Current Password:', currentPassword);
    console.log('New Password:', newPassword);

    // Clear password fields after submission
    setCurrentPassword('');
    setNewPassword('');
    setReEnterPassword('');

    onClose(); // Close the modal after saving
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content2">
        <h2>Edit My Profile</h2>
        <div className="form-group">
            <label htmlFor="profile-icon">Profile Icon:</label>
            <div className="profile-icon-wrapper">
              <img src={profileIcon} alt="Profile Icon" className="profile-icon-preview" />
              <input
                type="file"
                id="profile-icon"
                accept="image/*"
                onChange={handleIconChange}
              />
            </div>
          </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="current-password">Current Password:</label>
            <input
              type="password"
              id="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="new-password">New Password:</label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="re-enter-password">Re-enter New Password:</label>
            <input
              type="password"
              id="re-enter-password"
              value={reEnterPassword}
              onChange={(e) => setReEnterPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="save-button">Save Changes</button>
          <button type="button" className="close-button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
