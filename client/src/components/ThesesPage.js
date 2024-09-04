import React, { useState } from 'react';
import './ThesesPage.css';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import UploadForm from './UploadForm';

const ThesesPage = () => {
  const [theses, setTheses] = useState([
    // ... existing theses
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [thesisToDelete, setThesisToDelete] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const handleInputChange = (e) => {
    // Handle input change
  };

  const addThesis = () => {
    // Add thesis logic
  };

  const editThesis = (id) => {
    // Edit thesis logic
  };

  const saveThesis = () => {
    // Save thesis logic
  };

  const openModal = (id) => {
    setIsModalOpen(true);
    setThesisToDelete(id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setThesisToDelete(null);
  };

  const confirmDelete = () => {
    setTheses(theses.filter((thesis) => thesis.id !== thesisToDelete));
    closeModal();
  };

  const openFormModal = () => {
    setIsFormModalOpen(true);
  };

  const closeFormModal = () => {
    setIsFormModalOpen(false);
  };

  const filteredTheses = theses.filter(
    (thesis) =>
      thesis.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thesis.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thesis.year.toString().includes(searchQuery)
  );

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        <div className="admin-page">
          <Sidebar isVisible={sidebarVisible} />
          <div className={`content ${sidebarVisible ? 'sidebar-open' : ''}`}>
            <button onClick={toggleSidebar} className="menu-button">
              ☰
            </button>
            <h1>Theses - Admin Panel</h1>
            <div className="top-bar">
              <input
                type="text"
                placeholder="Search theses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-bar"
              />
              <button onClick={openFormModal} className="upload-button">
                <span className="plus-icon">+</span> Upload
              </button>
            </div>
            <table className="theses-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Year</th>
                  <th>Author</th>
                  <th>File</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTheses.map((thesis) => (
                  <tr key={thesis.id}>
                    <td>{thesis.title}</td>
                    <td>{thesis.category}</td>
                    <td>{thesis.year}</td>
                    <td>{thesis.author}</td>
                    <td>{thesis.file}</td>
                    <td>
                      <button onClick={() => editThesis(thesis.id)} className="edit-button">Edit</button>
                      <button onClick={() => openModal(thesis.id)} className="delete-button">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Form Modal */}
          {isFormModalOpen && (
            <UploadForm onClose={closeFormModal} />
          )}

          {/* Delete Confirmation Modal */}
          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <h2>Confirm Deletion</h2>
                <p>Are you sure you want to delete this thesis?</p>
                <div className="modal-buttons">
                  <button onClick={confirmDelete} className="confirm-button">Yes, Delete</button>
                  <button onClick={closeModal} className="cancel-button">Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ThesesPage;
