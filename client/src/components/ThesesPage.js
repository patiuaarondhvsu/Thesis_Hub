import React, { useState } from 'react';
import './ThesesPage.css';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

const ThesesPage = () => {
  const [theses, setTheses] = useState([
    { id: 1, title: 'TASKGROVE: A TREE-BASED PROJECT MANAGEMENT APPLICATION', author: 'Laxamana, Denzel D., et al.', year: 2023 },
    { id: 2, title: 'COMPAWNION: A PROFILE MANAGEMENT SYSTEM with GEO-LOCATION SYSTEM for NOAH’S ARK DOG AND CAT SHELTER, MABALACAT, PAMPANGA', author: 'De Leon, Aileen P., et al.', year: 2023},
    { id: 3, title: 'CodeQuest:When Java ProgrammingMeets Playful Learning', author: 'Alcantara, Den Dave M., et al.', year: 2023 },
    { id: 4, title: 'HTEFinder: A Web Application Utilizing Geofencing Technology', author: 'CAguas, Angelica P., et al.', year: 2023 },
    { id: 5, title: 'ANTABE: AN INTELLIGENT GUIDE STICK FOR VISUALLY IMPAIRED', author: 'Baquing, Gemiera M., et al.', year: 2023 },
    { id: 6, title: 'Web-Based Equipment Maintenance Monitoring System for DHVSU Facilities', author: 'Astrologo, Neil Daryl P., et al.', year: 2023 },
    { id: 7, title: 'MSWD Online Financial Assistance Program Management System with SMS Notification and Status Tracking', author: 'Bucalin, Christian John Y., et al.', year: 2023 },
    { id: 8, title: 'PALE-NGKIHAN: ONLINE MARKET SYSTEM FOR ARAYAT RICE TRADERS', author: 'David, KC Glenn M., et al.', year: 2023 },
  ]);
  const [newThesis, setNewThesis] = useState({ title: '', author: '', year: '' });
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [thesisToDelete, setThesisToDelete] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewThesis({ ...newThesis, [name]: value });
  };

  const addThesis = () => {
    if (!newThesis.title || !newThesis.author || !newThesis.year) {
      alert('All fields are required.');
      return;
    }
    const newId = theses.length > 0 ? theses[theses.length - 1].id + 1 : 1;
    setTheses([...theses, { id: newId, ...newThesis }]);
    setNewThesis({ title: '', author: '', year: '' });
    closeFormModal();
  };

  const editThesis = (id) => {
    const thesis = theses.find((thesis) => thesis.id === id);
    setNewThesis(thesis);
    setEditingId(id);
    openFormModal();
  };

  const saveThesis = () => {
    if (!newThesis.title || !newThesis.author || !newThesis.year) {
      alert('All fields are required.');
      return;
    }
    setTheses(
      theses.map((thesis) =>
        thesis.id === editingId ? { ...thesis, ...newThesis } : thesis
      )
    );
    setNewThesis({ title: '', author: '', year: '' });
    setEditingId(null);
    closeFormModal();
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
    setNewThesis({ title: '', author: '', year: '' });
    setEditingId(null);
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
    {/* Header */}
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
              <th>Author</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {filteredTheses.map((thesis) => (
              <tr key={thesis.id}>
                <td>{thesis.title}</td>
                <td>{thesis.author}</td>
                <td>{thesis.year}</td>
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
        <div className="modal">
          <div className="modal-content">
            <h2>{editingId ? 'Edit Thesis' : 'Add New Thesis'}</h2>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newThesis.title}
              onChange={handleInputChange}
              className="form-input"
              required
            />
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={newThesis.author}
              onChange={handleInputChange}
              className="form-input"
              required
            />
            <input
              type="text"
              name="year"
              placeholder="Year"
              value={newThesis.year}
              onChange={handleInputChange}
              className="form-input"
              required
            />
            <div className="modal-buttons">
              <button onClick={editingId ? saveThesis : addThesis} className="save-button">
                {editingId ? 'Save Changes' : 'Add Thesis'}
              </button>
              <button onClick={closeFormModal} className="cancel-button">Cancel</button>
            </div>
          </div>
        </div>
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
    </div>
       {/* Footer */}
       <Footer />
    </div>
  );
};

export default ThesesPage;
