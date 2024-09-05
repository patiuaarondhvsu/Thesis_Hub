import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ThesesPage.css';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import UploadForm from './UploadForm';

const ThesesPage = () => {
    const [theses, setTheses] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [thesisToDelete, setThesisToDelete] = useState(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(false);

    useEffect(() => {
        // Fetch data from the backend
        axios.get('http://localhost:5000/api/theses')
            .then(response => {
                setTheses(response.data);
            })
            .catch(err => {
                setError(err.message);
            });
    }, []);

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const addThesis = () => {
        // Add thesis logic, e.g., show form modal to add a new thesis
        openFormModal();
    };

    const editThesis = (id) => {
        // Edit thesis logic, e.g., show form modal to edit the thesis
        openFormModal();
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
        axios.delete(`http://localhost:5000/api/thesis/${thesisToDelete}`)
            .then(() => {
                // Update state to remove the deleted thesis
                setTheses(theses.filter((thesis) => thesis._id !== thesisToDelete));
                closeModal();
                
            })
            .catch(err => {
                setError(err.message);
                closeModal();
            });
    };

    const openFormModal = () => {
        setIsFormModalOpen(true);
    };

    const closeFormModal = () => {
        setIsFormModalOpen(false);
    };

    const filteredTheses = theses.filter(
        (thesis) =>
            thesis.titlename.toLowerCase().includes(searchQuery.toLowerCase()) ||
            thesis.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            thesis.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            thesis.year.toString().includes(searchQuery)
    );

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
                                onChange={handleInputChange}
                                className="search-bar"
                            />
                            <button onClick={addThesis} className="upload-button">
                                <span className="plus-icon">+</span> Upload
                            </button>
                        </div>
                        {error && <p>Error: {error}</p>}
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
                                    <tr key={thesis._id}>
                                        <td>{thesis.titlename}</td>
                                        <td>{thesis.category}</td>
                                        <td>{thesis.year}</td>
                                        <td>{thesis.author}</td>
                                        <td>{thesis.filename}</td>
                                        <td>
                                            <button onClick={() => editThesis(thesis._id)} className="edit-button">Edit</button>
                                            <button onClick={() => openModal(thesis._id)} className="delete-button">Delete</button>
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
